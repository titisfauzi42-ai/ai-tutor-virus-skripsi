import React, { useState } from 'react';
import { VirusTopic } from '../types';
import { 
  Play, 
  Sparkles, 
  BookOpen, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Lightbulb,
  Link as LinkIcon,
  Check,
  RotateCcw
} from 'lucide-react';

interface VideoPlayerProps {
  onAskVideoTopic?: (question: string, topic: VirusTopic) => void;
  onNavigateTab?: (tab: 'summary' | 'diagram' | 'quiz') => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  onAskVideoTopic,
  onNavigateTab,
}) => {
  const DEFAULT_VIDEO_ID = 'Y8wYQkNzJaY';
  const [currentVideoId, setCurrentVideoId] = useState<string>(DEFAULT_VIDEO_ID);
  const [inputUrl, setInputUrl] = useState<string>('');
  const [showUrlModal, setShowUrlModal] = useState<boolean>(false);
  const [showNotes, setShowNotes] = useState<boolean>(false);

  // Helper to extract clean YouTube ID from any format
  const extractYouTubeId = (url: string): string => {
    if (!url.trim()) return DEFAULT_VIDEO_ID;
    const clean = url.trim();
    // Direct ID check (11 characters alphanumeric + _ -)
    if (/^[a-zA-Z0-9_-]{11}$/.test(clean)) {
      return clean;
    }
    // youtu.be/<id>
    const shortMatch = clean.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
    if (shortMatch) return shortMatch[1];
    // youtube.com/watch?v=<id>
    const watchMatch = clean.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
    if (watchMatch) return watchMatch[1];
    // youtube.com/embed/<id>
    const embedMatch = clean.match(/embed\/([a-zA-Z0-9_-]{11})/);
    if (embedMatch) return embedMatch[1];

    return DEFAULT_VIDEO_ID;
  };

  const handleUpdateVideoUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;
    const newId = extractYouTubeId(inputUrl);
    setCurrentVideoId(newId);
    setShowUrlModal(false);
    setInputUrl('');
  };

  const handleResetDefaultVideo = () => {
    setCurrentVideoId(DEFAULT_VIDEO_ID);
    setInputUrl('');
    setShowUrlModal(false);
  };

  const videoChapters: { title: string; desc: string; topic: VirusTopic; question: string; icon: string }[] = [
    {
      title: 'Ciri & Sifat Virus',
      desc: 'Bukan sel (aseluler), ukuran 20-300 nm, hanya aktif di sel hidup.',
      topic: 'ciri_ciri',
      question: 'Kak Bio, berdasarkan video animasi tadi, mengapa virus disebut aseluler dan parasit intraseluler obligat? Tolong jelaskan dengan analogi!',
      icon: '🦠',
    },
    {
      title: 'Struktur Bakteriofag',
      desc: 'Kepala kapsid, materi genetik (DNA/RNA), leher, lempeng & serabut ekor.',
      topic: 'struktur',
      question: 'Kak Bio, bagaimana cara serabut ekor virus mengenali reseptor sel inang seperti yang diperlihatkan dalam animasi video?',
      icon: '🧬',
    },
    {
      title: 'Daur Litik & Lisogenik',
      desc: 'Tahapan adsorpsi, penetrasi, sintesis, perakitan, hingga lisis/profag.',
      topic: 'reproduksi',
      question: 'Kak Bio, apa perbedaan paling mendasar antara daur litik dan lisogenik saat virus menginfeksi sel bakteri?',
      icon: '🔄',
    },
    {
      title: 'Peranan & Vaksinasi',
      desc: 'Penyakit yang ditimbulkan dan pemanfaatan virus untuk vaksin/rekayasa genetika.',
      topic: 'peranan_pencegahan',
      question: 'Kak Bio, bagaimana prinsip vaksin virus bekerja dalam melatih sistem imun tubuh kita agar kebal?',
      icon: '💉',
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden flex flex-col">
      {/* Video Title Bar */}
      <div className="p-3.5 sm:p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800">
              <Play className="w-3 h-3 fill-current" />
              <span>Video Animasi Pembelajaran</span>
            </span>
            <span className="text-[10px] sm:text-xs text-slate-500 font-medium">
              Biologi SMA Kelas X • Kurikulum Merdeka
            </span>
          </div>
          <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">
            Mengenal Virus: Ciri-Ciri, Struktur & Daur Reproduksi
          </h2>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => setShowUrlModal(!showUrlModal)}
            className="text-xs font-medium px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center gap-1 transition-colors cursor-pointer"
            title="Ganti tautan video YouTube"
          >
            <LinkIcon className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden sm:inline">Tautan Video</span>
          </button>

          <button
            onClick={() => setShowNotes(!showNotes)}
            className="text-xs font-medium px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center gap-1 transition-colors cursor-pointer"
            title={showNotes ? 'Sembunyikan Catatan' : 'Buka Poin Penting Video'}
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            <span className="hidden sm:inline">Poin Kunci</span>
            {showNotes ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Optional Custom YouTube URL input modal */}
      {showUrlModal && (
        <form onSubmit={handleUpdateVideoUrl} className="p-3 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center gap-2 text-xs">
          <div className="flex-1 w-full">
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="Tempel tautan YouTube (misal: https://youtu.be/...)"
              className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0">
            <button
              type="submit"
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg flex items-center gap-1 cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Terapkan</span>
            </button>
            <button
              type="button"
              onClick={handleResetDefaultVideo}
              className="px-2.5 py-1.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-700 dark:text-slate-200 rounded-lg flex items-center gap-1 cursor-pointer"
              title="Kembalikan ke video materi virus default"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Bawaan</span>
            </button>
          </div>
        </form>
      )}

      {/* Embedded YouTube Player Container (Proportional 16:9, Direct in-app Playback) */}
      <div className="relative w-full aspect-video bg-black shadow-inner">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${currentVideoId}?rel=0&modestbranding=1&enablejsapi=1`}
          title="Video Animasi Pembelajaran Materi Virus - Biologi SMA Kelas X"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full border-0 absolute inset-0"
          loading="lazy"
        />
      </div>

      {/* Interactive Helper Prompt Bar */}
      <div className="p-3 sm:p-4 bg-slate-50/70 dark:bg-slate-950/40 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[11px] sm:text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Tanyakan Poin Materi Video ke Kak Bio:</span>
          </p>
          <span className="text-[10px] text-slate-500 dark:text-slate-400">
            Klik untuk tanya langsung
          </span>
        </div>

        {/* Clickable video chapter pills that immediately ask Kak Bio */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {videoChapters.map((ch, idx) => (
            <button
              key={idx}
              onClick={() => onAskVideoTopic && onAskVideoTopic(ch.question, ch.topic)}
              className="text-left p-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-blue-50/80 dark:hover:bg-slate-700/80 border border-slate-200/80 dark:border-slate-700/80 hover:border-blue-300 dark:hover:border-blue-600 text-slate-800 dark:text-slate-200 transition-all cursor-pointer group active:scale-98 shadow-2xs"
            >
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-sm">{ch.icon}</span>
                <span className="text-xs font-bold truncate group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {ch.title}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 leading-snug">
                {ch.desc}
              </p>
            </button>
          ))}
        </div>

        {/* Collapsible Key Notes */}
        {showNotes && (
          <div className="mt-3 pt-3 border-t border-slate-200/80 dark:border-slate-800 space-y-2 text-xs">
            <div className="bg-blue-50/70 dark:bg-blue-950/40 rounded-xl p-3 border border-blue-100 dark:border-blue-800/40 text-blue-950 dark:text-blue-200">
              <span className="font-bold block mb-1">🎯 Panduan Menonton & Belajar Bersama AI Tutor:</span>
              <ul className="space-y-1 text-[11px] list-disc list-inside">
                <li>Video animasi dan panel AI Tutor berada pada satu halaman yang sama tanpa perlu membuka tab baru.</li>
                <li>Tonton animasi penjelasan materi di atas, lalu tanyakan konsep yang sulit langsung ke Kak Bio di bawah.</li>
                <li>Gunakan tombol kartu di atas untuk memicu penjelasan konsep secara Sokratik.</li>
              </ul>
            </div>

            {onNavigateTab && (
              <div className="flex items-center gap-2 pt-1">
                <span className="text-[11px] text-slate-500 font-medium">Menu Pembelajaran Lain:</span>
                <button
                  onClick={() => onNavigateTab('summary')}
                  className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <BookOpen className="w-3 h-3" />
                  <span>Rangkuman</span>
                </button>
                <span className="text-slate-300">•</span>
                <button
                  onClick={() => onNavigateTab('quiz')}
                  className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <HelpCircle className="w-3 h-3" />
                  <span>Uji Kuis</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
