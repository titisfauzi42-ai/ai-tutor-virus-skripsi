import React, { useState } from 'react';
import { CONCEPT_CARDS } from '../data/virusData';
import { ConceptCard, VirusTopic } from '../types';
import { BookOpen, Sparkles, HelpCircle, ChevronDown, ChevronUp, MessageSquare, CheckCircle2 } from 'lucide-react';

interface SummaryViewProps {
  onAskConcept: (question: string, topic: VirusTopic) => void;
}

export const SummaryView: React.FC<SummaryViewProps> = ({ onAskConcept }) => {
  const [activeFilter, setActiveFilter] = useState<VirusTopic>('semua');
  const [expandedCardId, setExpandedCardId] = useState<string | null>('c1');

  const filteredCards = activeFilter === 'semua'
    ? CONCEPT_CARDS
    : CONCEPT_CARDS.filter(c => c.topic === activeFilter);

  const filters: { id: VirusTopic; label: string }[] = [
    { id: 'semua', label: 'Semua Modul' },
    { id: 'ciri_ciri', label: 'Ciri-Ciri Virus' },
    { id: 'struktur', label: 'Struktur Virus' },
    { id: 'reproduksi', label: 'Siklus Litik & Lisogenik' },
    { id: 'peranan_pencegahan', label: 'Peranan & Vaksin' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-3 py-4 sm:px-6 space-y-4">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600/30 border border-blue-400/30 text-blue-200 text-xs font-semibold mb-2.5">
            <BookOpen className="w-3.5 h-3.5 text-blue-400" />
            <span>Rangkuman Materi Biologi Kelas X</span>
          </div>
          <h2 className="text-lg sm:text-2xl font-bold tracking-tight mb-1.5">
            Ringkasan Konsep Kunci Virus
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Pahami dasar-dasar virologi dengan cepat lewat modul ringkas ini. Klik tombol **"Tanyakan ke AI Tutor"** pada setiap modul untuk berdiskusi lebih mendalam bersama Kak Bio!
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            className={`text-xs font-semibold px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
              activeFilter === f.id
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Concept Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCards.map((card) => {
          const isExpanded = expandedCardId === card.id;

          return (
            <div
              key={card.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs hover:border-blue-300 dark:hover:border-blue-700 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Title & Subtitle */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-blue-600 dark:text-blue-400">
                      {card.topic === 'ciri_ciri' && 'Modul 1 • Ciri Utama'}
                      {card.topic === 'struktur' && 'Modul 2 • Anatomi Virus'}
                      {card.topic === 'reproduksi' && 'Modul 3 • Daur Reproduksi'}
                      {card.topic === 'peranan_pencegahan' && 'Modul 4 • Peranan & Vaksin'}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold tracking-tight text-slate-800 dark:text-white leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {card.subtitle}
                    </p>
                  </div>
                  <button
                    onClick={() => setExpandedCardId(isExpanded ? null : card.id)}
                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                    title={isExpanded ? 'Tutup Detail' : 'Lihat Detail'}
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {/* Summary Bullet Points */}
                <ul className="space-y-2 mb-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  {card.summaryPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Key Terms Section (Expanded) */}
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
                    <div className="bg-blue-50/70 dark:bg-blue-950/30 rounded-xl p-3 border border-blue-100 dark:border-blue-800/40">
                      <h4 className="text-xs font-bold text-blue-900 dark:text-blue-300 mb-2 flex items-center gap-1">
                        🔑 Istilah Istimewa Biologi:
                      </h4>
                      <div className="space-y-1.5">
                        {card.keyTerms.map((kt, i) => (
                          <div key={i} className="text-xs">
                            <span className="font-bold text-blue-950 dark:text-blue-200">{kt.term}: </span>
                            <span className="text-slate-600 dark:text-slate-300">{kt.definition}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {card.funFact && (
                      <div className="bg-amber-50 dark:bg-amber-950/30 rounded-xl p-3 border border-amber-200 dark:border-amber-800/40 text-xs text-amber-950 dark:text-amber-200 flex items-start gap-2">
                        <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold block mb-0.5">Tahukah Kamu?</span>
                          <p>{card.funFact}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Bottom Action Button */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => onAskConcept(card.sampleQuestion, card.topic)}
                  className="w-full bg-blue-50 hover:bg-blue-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700/80 rounded-lg py-2 px-3 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>Tanyakan Konsep Ini ke AI Tutor</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
