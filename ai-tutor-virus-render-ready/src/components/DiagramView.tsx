import React, { useState } from 'react';
import { DIAGRAM_PARTS } from '../data/virusData';
import { DiagramPart, VirusTopic } from '../types';
import { Dna, Info, MessageSquare, RefreshCw, Sparkles, Check, ArrowRight } from 'lucide-react';

interface DiagramViewProps {
  onAskPart: (question: string, topic: VirusTopic) => void;
}

export const DiagramView: React.FC<DiagramViewProps> = ({ onAskPart }) => {
  const [selectedPart, setSelectedPart] = useState<DiagramPart>(DIAGRAM_PARTS[0]);
  const [activeCycle, setActiveCycle] = useState<'litik' | 'lisogenik'>('litik');

  const handleAskPart = (part: DiagramPart) => {
    const q = `Kak Bio, jelaskan lebih detail tentang struktur ${part.name} pada Bakteriofag beserta peranannya saat menginfeksi sel bakteri!`;
    onAskPart(q, 'struktur');
  };

  const handleAskCycle = (cycleName: string) => {
    const q = `Kak Bio, jelaskan secara mendalam tentang ${cycleName} pada reproduksi virus dan apa dampaknya bagi sel inang!`;
    onAskPart(q, 'reproduksi');
  };

  return (
    <div className="max-w-5xl mx-auto px-3 py-4 sm:px-6 space-y-6">
      {/* Section 1: Interactive Bacteriophage Structure */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-semibold mb-1">
              <Dna className="w-3.5 h-3.5 text-blue-600" />
              <span>Anatomi Virus Interaktif</span>
            </div>
            <h2 className="text-base sm:text-xl font-bold tracking-tight text-slate-800 dark:text-white">
              Struktur Bakteriofag T4
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Klik titik bernomor pada gambar untuk mempelajari fungsi setiap organ virus.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Interactive Graphic SVG Container */}
          <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col items-center justify-center relative min-h-[340px]">
            {/* SVG Bacteriophage Illustration */}
            <svg viewBox="0 0 300 360" className="w-full max-w-[280px] h-auto drop-shadow-xs">
              <defs>
                <linearGradient id="headGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2563EB" />
                  <stop offset="100%" stopColor="#1D4ED8" />
                </linearGradient>
                <linearGradient id="dnaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#6D28D9" />
                </linearGradient>
                <linearGradient id="sheathGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#D97706" />
                </linearGradient>
              </defs>

              {/* Icosahedral Head */}
              <polygon
                points="150,20 200,45 215,95 180,130 120,130 85,95 100,45"
                fill="url(#headGrad)"
                stroke="#1E3A8A"
                strokeWidth="3"
                className="transition-all hover:opacity-90 cursor-pointer"
                onClick={() => setSelectedPart(DIAGRAM_PARTS[0])}
              />

              {/* DNA Double Helix strands inside head */}
              <path
                d="M130,50 Q150,65 170,50 T130,80 T170,110"
                fill="none"
                stroke="url(#dnaGrad)"
                strokeWidth="4"
                strokeDasharray="3 3"
                className="cursor-pointer"
                onClick={() => setSelectedPart(DIAGRAM_PARTS[1])}
              />

              {/* Neck / Collar */}
              <rect
                x="135"
                y="130"
                width="30"
                height="18"
                rx="4"
                fill="#2563EB"
                stroke="#1D4ED8"
                strokeWidth="2"
                className="cursor-pointer"
                onClick={() => setSelectedPart(DIAGRAM_PARTS[2])}
              />

              {/* Sheath (Ekor) */}
              <g
                className="cursor-pointer"
                onClick={() => setSelectedPart(DIAGRAM_PARTS[3])}
              >
                <rect x="140" y="148" width="20" height="90" rx="3" fill="url(#sheathGrad)" stroke="#78350F" strokeWidth="2" />
                {/* Sheath rings */}
                {[160, 175, 190, 205, 220, 230].map((y, i) => (
                  <line key={i} x1="138" y1={y} x2="162" y2={y} stroke="#FDE68A" strokeWidth="2" />
                ))}
              </g>

              {/* Base Plate */}
              <polygon
                points="130,238 170,238 180,252 120,252"
                fill="#EC4899"
                stroke="#BE185D"
                strokeWidth="2"
                className="cursor-pointer"
                onClick={() => setSelectedPart(DIAGRAM_PARTS[5])}
              />

              {/* Tail Fibers (Serabut Ekor) */}
              <g
                stroke="#EF4444"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
                className="cursor-pointer"
                onClick={() => setSelectedPart(DIAGRAM_PARTS[4])}
              >
                {/* Left fibers */}
                <path d="M125,248 L90,270 L65,315" />
                <path d="M130,250 L105,285 L85,325" />
                <path d="M135,252 L120,295 L110,335" />
                {/* Right fibers */}
                <path d="M175,248 L210,270 L235,315" />
                <path d="M170,250 L195,285 L215,325" />
                <path d="M165,252 L180,295 L190,335" />
              </g>

              {/* Hotspot pin buttons */}
              {DIAGRAM_PARTS.map((part, index) => {
                const isSelected = selectedPart.id === part.id;
                // SVG coordinates mapped approximately
                const coords: { [key: string]: { x: number; y: number } } = {
                  p1: { x: 150, y: 55 },
                  p2: { x: 150, y: 90 },
                  p3: { x: 150, y: 139 },
                  p4: { x: 150, y: 190 },
                  p5: { x: 80, y: 300 },
                  p6: { x: 150, y: 245 },
                };

                const pos = coords[part.id] || { x: 150, y: 150 };

                return (
                  <g key={part.id} onClick={() => setSelectedPart(part)} className="cursor-pointer">
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={isSelected ? 14 : 10}
                      fill={isSelected ? '#2563EB' : part.color}
                      stroke="#FFFFFF"
                      strokeWidth="2.5"
                      className="transition-all animate-pulse"
                    />
                    <text
                      x={pos.x}
                      y={pos.y + 4}
                      fill="#FFFFFF"
                      fontSize="11"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {index + 1}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Inspector Panel for Selected Part */}
          <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl p-4 sm:p-5 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="w-4 h-4 rounded-full border border-white"
                  style={{ backgroundColor: selectedPart.color }}
                ></span>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  Inspektor Anatomi
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold tracking-tight text-slate-800 dark:text-white mb-1">
                {selectedPart.name}
              </h3>

              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-xl p-3 mb-3 shadow-xs">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-0.5">
                  Fungsi Utama:
                </span>
                <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                  {selectedPart.functionText}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {selectedPart.description}
              </p>
            </div>

            {/* Quick trigger to ask tutor */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
              <button
                onClick={() => handleAskPart(selectedPart)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2.5 px-3 text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs active:scale-98 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Tanya Kak Bio tentang {selectedPart.name}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Visual Flowchart Siklus Litik vs Lisogenik */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 text-xs font-semibold mb-1">
              <RefreshCw className="w-3.5 h-3.5 text-blue-600" />
              <span>Daur Reproduksi Virus</span>
            </div>
            <h2 className="text-base sm:text-xl font-bold tracking-tight text-slate-800 dark:text-white">
              Siklus Litik vs. Siklus Lisogenik
            </h2>
          </div>

          {/* Switcher Toggle */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl self-start sm:self-auto">
            <button
              onClick={() => setActiveCycle('litik')}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeCycle === 'litik'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              🔥 Siklus Litik (Sel Inang Lisis)
            </button>
            <button
              onClick={() => setActiveCycle('lisogenik')}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeCycle === 'lisogenik'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              🌱 Siklus Lisogenik (Profag)
            </button>
          </div>
        </div>

        {/* Step-by-step Visual Pipeline */}
        {activeCycle === 'litik' ? (
          <div className="space-y-3">
            <div className="p-3.5 bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 rounded-xl text-xs sm:text-sm text-blue-950 dark:text-blue-200">
              <span className="font-bold block mb-1">🔥 Karakteristik Siklus Litik:</span>
              Membunuh sel inang secara langsung di akhir siklus. Berlangsung singkat ketika virulensi virus tinggi dan pertahanan sel inang lemah.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs">
              {[
                { step: '1. Adsorpsi', desc: 'Serabut ekor menempel pada reseptor sel inang.' },
                { step: '2. Penetrasi', desc: 'Injeksi DNA/RNA virus ke dalam sel inang.' },
                { step: '3. Sintesis', desc: 'DNA virus mengambil alih mesin sel untuk buat komponen baru.' },
                { step: '4. Perakitan', desc: 'Penyusunan kapsid dan DNA menjadi virus baru utuh.' },
                { step: '5. Lisis', desc: 'Dinding sel inang pecah meliriskan ratusan virus baru!' },
              ].map((s, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 flex flex-col justify-between"
                >
                  <span className="font-bold text-blue-600 dark:text-blue-400 block mb-1">
                    {s.step}
                  </span>
                  <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={() => handleAskCycle('Siklus Litik')}
              className="mt-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Diskusi Sokratik Siklus Litik dengan Kak Bio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="p-3.5 bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 rounded-xl text-xs sm:text-sm text-blue-950 dark:text-blue-200">
              <span className="font-bold block mb-1">🌱 Karakteristik Siklus Lisogenik:</span>
              Sel inang tetap hidup! DNA virus menyatu dengan DNA sel inang membentuk **Profag**. Jika kondisi berubah (terpapar sinar UV/kimia), Profag bisa beralih ke Siklus Litik.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs">
              {[
                { step: '1. Adsorpsi', desc: 'Virus menempel pada permukaan sel bakteri.' },
                { step: '2. Penetrasi', desc: 'Injeksi materi genetik virus ke dalam sel.' },
                { step: '3. Penggabungan', desc: 'DNA virus menyatu dengan kromosom inang menjadi Profag.' },
                { step: '4. Pembelahan', desc: 'Sel inang membelah, Profag ikut terduplikasi dengan aman!' },
                { step: '5. Induksi', desc: 'Terpicu kondisi luar, Profag lepas dan beralih ke Siklus Litik.' },
              ].map((s, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 flex flex-col justify-between"
                >
                  <span className="font-bold text-blue-600 dark:text-blue-400 block mb-1">
                    {s.step}
                  </span>
                  <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={() => handleAskCycle('Siklus Lisogenik')}
              className="mt-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Diskusi Sokratik Siklus Lisogenik dengan Kak Bio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
