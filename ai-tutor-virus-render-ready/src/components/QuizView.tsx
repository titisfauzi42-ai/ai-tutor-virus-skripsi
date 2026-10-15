import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/virusData';
import { QuizQuestion, VirusTopic } from '../types';
import { HelpCircle, CheckCircle, XCircle, Lightbulb, RefreshCw, MessageSquare, Award } from 'lucide-react';

interface QuizViewProps {
  onAskQuizExplanation: (questionText: string, chosenOption: string, correctAnswer: string) => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ onAskQuizExplanation }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [questionId: number]: number }>({});
  const [showHints, setShowHints] = useState<{ [questionId: number]: boolean }>({});
  const [score, setScore] = useState(0);

  const q = QUIZ_QUESTIONS[currentQuestionIndex];
  const selectedOption = selectedAnswers[q.id];
  const isAnswered = selectedOption !== undefined;
  const isCorrect = selectedOption === q.correctAnswer;

  const handleSelectOption = (optionIndex: number) => {
    if (isAnswered) return; // Prevent re-answering
    setSelectedAnswers({ ...selectedAnswers, [q.id]: optionIndex });
    if (optionIndex === q.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleToggleHint = () => {
    setShowHints({ ...showHints, [q.id]: !showHints[q.id] });
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setShowHints({});
    setScore(0);
    setCurrentQuestionIndex(0);
  };

  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <div className="max-w-3xl mx-auto px-3 py-4 sm:px-6 space-y-4">
      {/* Quiz Progress & Score Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs flex items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 text-xs font-semibold mb-1">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>Kuis Uji Pemahaman Biologi</span>
          </div>
          <h2 className="text-base sm:text-lg font-bold tracking-tight text-slate-800 dark:text-white">
            Soal {currentQuestionIndex + 1} dari {QUIZ_QUESTIONS.length}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Skor Kamu</span>
            <span className="text-base sm:text-xl font-bold text-blue-600 dark:text-blue-400">
              {score * 10} Poin
            </span>
          </div>
          <button
            onClick={handleResetQuiz}
            title="Ulang Kuis"
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
        {/* Question Text */}
        <div className="space-y-1">
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            {q.topic === 'ciri_ciri' && 'Topik: Ciri-Ciri Virus'}
            {q.topic === 'struktur' && 'Topik: Struktur Virus'}
            {q.topic === 'reproduksi' && 'Topik: Reproduksi Virus'}
            {q.topic === 'peranan_pencegahan' && 'Topik: Peranan & Vaksin'}
          </span>
          <h3 className="text-sm sm:text-base font-bold text-slate-800 dark:text-white leading-relaxed">
            {q.question}
          </h3>
        </div>

        {/* Option Choices */}
        <div className="space-y-2">
          {q.options.map((option, idx) => {
            let optionStyle = 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-blue-300';

            if (isAnswered) {
              if (idx === q.correctAnswer) {
                optionStyle = 'bg-blue-50 dark:bg-blue-950/60 border-blue-600 text-blue-950 dark:text-blue-100 font-semibold';
              } else if (idx === selectedOption) {
                optionStyle = 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-950 dark:text-rose-100';
              } else {
                optionStyle = 'opacity-50 bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                disabled={isAnswered}
                className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3 cursor-pointer ${optionStyle}`}
              >
                <span className="w-6 h-6 rounded-full bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 flex items-center justify-center font-bold text-xs shrink-0">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="leading-relaxed flex-1 pt-0.5">{option}</span>
                {isAnswered && idx === q.correctAnswer && (
                  <CheckCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                )}
                {isAnswered && idx === selectedOption && idx !== q.correctAnswer && (
                  <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Hint toggle */}
        {!isAnswered && (
          <div className="pt-2">
            <button
              onClick={handleToggleHint}
              className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Lightbulb className="w-4 h-4" />
              <span>{showHints[q.id] ? 'Sembunyikan Petunjuk' : 'Lihat Petunjuk'}</span>
            </button>
            {showHints[q.id] && (
              <p className="mt-2 p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xl text-xs text-amber-950 dark:text-amber-200 italic">
                {q.hint}
              </p>
            )}
          </div>
        )}

        {/* Explanation box after answer */}
        {isAnswered && (
          <div className="space-y-3 pt-2">
            <div
              className={`p-4 rounded-xl border text-xs sm:text-sm space-y-1.5 ${
                isCorrect
                  ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 text-blue-950 dark:text-blue-100'
                  : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-950 dark:text-rose-100'
              }`}
            >
              <div className="font-bold flex items-center gap-1.5">
                {isCorrect ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    <span>Jawaban Kamu Tepat Sekali! 🎉</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-rose-600" />
                    <span>Kurang Tepat. Jawaban Benar adalah ({String.fromCharCode(65 + q.correctAnswer)})</span>
                  </>
                )}
              </div>
              <p className="leading-relaxed">{q.explanation}</p>
            </div>

            <button
              onClick={() =>
                onAskQuizExplanation(
                  q.question,
                  q.options[selectedOption],
                  q.options[q.correctAnswer]
                )
              }
              className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-lg p-3 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-98"
            >
              <MessageSquare className="w-4 h-4 text-blue-400" />
              <span>Minta Pembahasan Sokratik Kak Bio untuk Soal Ini</span>
            </button>
          </div>
        )}

        {/* Next Question Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
            disabled={currentQuestionIndex === 0}
            className="text-xs font-bold px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-40 cursor-pointer"
          >
            ← Soal Sebelumnya
          </button>
          <span className="text-xs text-slate-500">
            {answeredCount} dari {QUIZ_QUESTIONS.length} Soal Dijawab
          </span>
          <button
            onClick={() => setCurrentQuestionIndex(prev => Math.min(QUIZ_QUESTIONS.length - 1, prev + 1))}
            disabled={currentQuestionIndex === QUIZ_QUESTIONS.length - 1}
            className="text-xs font-bold px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40 cursor-pointer"
          >
            Soal Selanjutnya →
          </button>
        </div>
      </div>
    </div>
  );
};
