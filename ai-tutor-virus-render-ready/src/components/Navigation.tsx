import React from 'react';
import { ActiveTab } from '../types';
import { PlaySquare, BookOpen, Dna, HelpCircle, Film } from 'lucide-react';

interface NavigationProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  unreadQuizCount?: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const tabs = [
    {
      id: 'chat' as ActiveTab,
      label: 'Video & AI Tutor',
      sublabel: 'Animasi + Kak Bio',
      icon: PlaySquare,
      badge: 'Utama'
    },
    {
      id: 'summary' as ActiveTab,
      label: 'Rangkuman',
      sublabel: 'Konsep Kunci',
      icon: BookOpen,
      badge: '4 Modul'
    },
    {
      id: 'diagram' as ActiveTab,
      label: 'Diagram',
      sublabel: 'Struktur & Siklus',
      icon: Dna,
      badge: 'Interaktif'
    },
    {
      id: 'quiz' as ActiveTab,
      label: 'Kuis',
      sublabel: 'Latihan Soal',
      icon: HelpCircle,
      badge: '6 Soal'
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6">
        <nav className="flex items-center justify-around sm:justify-start sm:gap-2 py-2 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`} />
                <div className="text-left flex flex-col leading-none">
                  <span>{tab.label}</span>
                  <span className={`text-[10px] font-normal hidden sm:block mt-0.5 ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                    {tab.sublabel}
                  </span>
                </div>

                {tab.badge && !isActive && (
                  <span className="hidden lg:inline-block text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
