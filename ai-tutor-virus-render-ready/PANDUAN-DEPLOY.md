# Panduan menerbitkan salinan AI Tutor di Render

## Sebelum mulai
- Jangan hapus proyek dan tautan Netlify lama; gunakan ini sebagai cadangan.
- Jangan memasukkan API key Gemini ke dalam kode atau mengirimkannya lewat chat.
- Hosting Render Free dapat tidur setelah tidak aktif; akses pertama setelah tidur mungkin perlu menunggu.

## Langkah ringkas
1. Buat repositori GitHub baru untuk salinan ini dan unggah semua isi folder ini (bukan folder pembungkus di luarnya).
2. Di Render, buat **New + > Web Service**, hubungkan repositori GitHub tadi.
3. Gunakan pengaturan: Build Command `npm install && npm run build`; Start Command `npm start`.
4. Di bagian Environment Variables, tambahkan `GEMINI_API_KEY` dengan API key Gemini milikmu. Simpan sebagai rahasia; jangan menulis nilainya di file.
5. Deploy. Setelah selesai, buka alamat Render dan tambahkan `/api/health` di akhir alamat untuk menguji server. Hasil yang diharapkan berupa JSON dengan status `ok`.
6. Buka alamat utama, uji video dan chat AI. Uji juga dari mode samaran atau perangkat orang lain sebelum membagikan untuk penelitian.

Jika chat gagal, periksa log server di Render dan status kuota/billing Gemini. Jangan bagikan API key atau tangkapan layar yang menampilkan nilainya.
