import React from 'react';
import { ShieldCheck, Sparkles, RefreshCw, BookOpen } from 'lucide-react';

interface HeaderProps {
  onResetChat?: () => void;
  activeTab: string;
}

export const Header: React.FC<HeaderProps> = ({ onResetChat, activeTab }) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 py-2.5 sm:px-6 sm:py-3 flex items-center justify-between">
        {/* Brand & Badge */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs shrink-0">
            <span className="text-xl font-bold tracking-tighter">🧬</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <h1 className="text-sm sm:text-lg font-bold tracking-tight text-slate-800 dark:text-white leading-tight">
                Media Pembelajaran Interaktif Materi Virus
              </h1>
              <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 shrink-0">
                Biologi SMA Kelas X
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Video Pembelajaran Animasi & AI Tutor Sokratik (Kak Bio)</span>
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {activeTab === 'chat' && onResetChat && (
            <button
              onClick={onResetChat}
              title="Mulai percakapan baru dengan Kak Bio"
              className="text-xs font-medium px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Percakapan Baru</span>
            </button>
          )}

          <div className="hidden md:flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>Sesuai Kurikulum Merdeka</span>
          </div>
        </div>
      </div>
    </header>
  );
};
