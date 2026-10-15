import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: "10mb" }));

  // Initialize Gemini AI Client
  const getGeminiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY tidak ditemukan di environment variables.");
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  };

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", message: "AI Tutor Virus Server Running" });
  });

  // Chat API endpoint for AI Tutor Virus
  app.post("/api/chat", async (req, res) => {
    try {
      const { history, message, topic } = req.body;

      if (!message && (!history || history.length === 0)) {
        res.status(400).json({ error: "Pesan tidak boleh kosong." });
        return;
      }

      const ai = getGeminiClient();

      // Format chat history for Gemini API
      const formattedContents = [];

      if (Array.isArray(history) && history.length > 0) {
        for (const item of history) {
          if (item.role && item.content) {
            formattedContents.push({
              role: item.role === "user" ? "user" : "model",
              parts: [{ text: item.content }],
            });
          }
        }
      }

      // Append current user message if passed separately
      if (message) {
        formattedContents.push({
          role: "user",
          parts: [{ text: message }],
        });
      }

      const topicContext = topic ? `[Fokus Sub-materi Saat Ini: ${topic}]` : "";

      const systemInstruction = `Anda adalah AI Tutor Biologi yang ramah, komunikatif, dan berdedikasi khusus untuk siswa SMA Kelas X di Indonesia, memfokuskan materi tentang VIRUS. ${topicContext}

Pedoman Utama Tutor:
1. Bahasa & Pendekatan: Gunakan Bahasa Indonesia yang komunikatif, ramah, dan memotivasi khas tutor/guru biologi SMA yang asyik. Sapa siswa dengan ramah.
2. Pendekatan Sokratik & Konseptual: Jangan sekadar memberikan jawaban panjang yang lengkap dan kaku. Jelaskan konsep secara bertahap dengan bahasa sederhana, berikan contoh konkret atau analogi sehari-hari (seperti kunci & gembok untuk adsorpsi, atau pabrik bajakan untuk replikasi), lalu SELALU sertakan 1-2 'Pertanyaan Pemantik' di akhir penjelasan agar siswa terdorong berpikir kritis dan aktif merespons.
3. Fokus Topik Virus Biologi Kelas X:
   - Ciri-Ciri Virus: Ukuran mikroskopis (20-300 nm), aseluler (bukan sel, tidak punya sitoplasma/organel), parasit intraseluler obligat, materi genetik 1 jenis (DNA atau RNA saja), dapat dikristalkan.
   - Struktur Virus: Kapsid (selubung protein), Materi Genetik (DNA/RNA), Kepala, Leher, Ekor, Serabut Ekor, Kapsomer, Selubung Membran (Envelope). Contoh utama: Bakteriofag T4 dan Virus Corona (SARS-CoV-2).
   - Reproduksi Virus:
     * Siklus Litik (Adsorpsi -> Penetrasi/Injeksi -> Sintesis/Replikasi -> Perakitan -> Lisis sel inang).
     * Siklus Lisogenik (Adsorpsi -> Penetrasi -> Penggabungan/Profag -> Pembelahan sel inang -> dapat beralih ke Litik jika kondisi berubah).
   - Peranan Virus:
     * Merugikan (Penyakit Manusia: COVID-19, Influenza, HIV/AIDS, Dengue/DBD, Polio, Campak, Rabies, Cacar, Ebola; Tumbuhan: TMV/Tobacco Mosaic, CVPD, Tungro; Hewan: NCD/Tetelo, FMD/PMK, Rabies).
     * Menguntungkan & Pencegahan: Pembuatan Vaksin (pembentukan antibodi/kekebalan spesifik), Vektor Rekayasa Genetika, Pembangkit Interferon, Pengontrol Populasi Bakteri Hama. Pencegahan: Pola hidup bersih, 3M, Vaksinasi.
4. Format Penyampaian:
   - Format jawaban secara terstruktur rapi (gunakan bold untuk istilah biologi, bullet points untuk poin penting, dan penomoran untuk tahapan).
   - Buat paragraf ringkas yang nyaman dan enak dibaca di layar HP (Mobile Friendly).
5. Pembatasan:
   - Jika siswa bertanya hal di luar materi Biologi/Virus, berikan tanggapan sopan dan ajak kembali belajar Virus Biologi Kelas X.`;

      let replyText = "";
      const modelsToTry = ["gemini-3.1-flash-lite", "gemini-3.8-flash", "gemini-flash-latest"];

      for (const modelName of modelsToTry) {
        try {
          const response = await ai.models.generateContent({
            model: modelName,
            contents: formattedContents,
            config: {
              systemInstruction,
              temperature: 0.7,
            },
          });
          if (response.text) {
            replyText = response.text;
            break;
          }
        } catch (modelError: any) {
          console.warn(`Model ${modelName} failed, trying next:`, modelError?.message);
        }
      }

      if (!replyText) {
        replyText = "Maaf, Kak Bio sedang sibuk sejenak. Silakan ulangi pertanyaanmu ya!";
      }

      res.json({ reply: replyText });
    } catch (error: any) {
      console.error("Error in /api/chat:", error);
      res.status(500).json({
        error: error.message || "Gagal menghubungi AI Tutor. Pastikan kunci API Gemini sudah dikonfigurasi.",
      });
    }
  });

  // Vite middleware setup for development vs production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server AI Tutor Virus running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
