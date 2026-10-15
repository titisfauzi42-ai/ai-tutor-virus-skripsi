import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, VirusTopic, SuggestedQuestion } from '../types';
import { SUGGESTED_QUESTIONS } from '../data/virusData';
import { MarkdownRenderer } from './MarkdownRenderer';
import { 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  HelpCircle, 
  Lightbulb, 
  ChevronRight, 
  BookOpen,
  Filter,
  RefreshCw,
  MessageSquareText
} from 'lucide-react';

interface ChatViewProps {
  messages: ChatMessage[];
  isLoading: boolean;
  onSendMessage: (text: string, topic?: VirusTopic) => void;
  selectedTopic: VirusTopic;
  setSelectedTopic: (topic: VirusTopic) => void;
  initialQuestion?: string;
}

export const ChatView: React.FC<ChatViewProps> = ({
  messages,
  isLoading,
  onSendMessage,
  selectedTopic,
  setSelectedTopic,
  initialQuestion,
}) => {
  const [inputText, setInputText] = useState('');
  const [showQuestionsGrid, setShowQuestionsGrid] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (initialQuestion) {
      setInputText(initialQuestion);
      inputRef.current?.focus();
    }
  }, [initialQuestion]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    onSendMessage(inputText.trim(), selectedTopic);
    setInputText('');
  };

  const handleSelectSuggestedQuestion = (q: SuggestedQuestion) => {
    onSendMessage(q.question, q.topic);
  };

  // Filter suggested questions based on active topic filter
  const filteredQuestions = selectedTopic === 'semua' 
    ? SUGGESTED_QUESTIONS 
    : SUGGESTED_QUESTIONS.filter(q => q.topic === selectedTopic);

  const topicFilters: { id: VirusTopic; label: string; icon: string }[] = [
    { id: 'semua', label: 'Semua Topik', icon: '✨' },
    { id: 'ciri_ciri', label: '1. Ciri-Ciri Virus', icon: '🦠' },
    { id: 'struktur', label: '2. Struktur Virus', icon: '🧬' },
    { id: 'reproduksi', label: '3. Litik & Lisogenik', icon: '🔄' },
    { id: 'peranan_pencegahan', label: '4. Peranan & Vaksin', icon: '💉' },
  ];

  return (
    <div className="flex flex-col h-[560px] sm:h-[620px] md:h-[660px] w-full">
      {/* Top Filter Bar for Questions */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 sm:p-3.5 mb-2.5 shadow-xs shrink-0">
        <div className="flex items-center justify-between mb-2.5 px-1">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <span>Contoh Pertanyaan yang Bisa Diklik</span>
          </div>
          <button
            onClick={() => setShowQuestionsGrid(!showQuestionsGrid)}
            className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            {showQuestionsGrid ? 'Sembunyikan' : 'Tampilkan Pertanyaan'}
          </button>
        </div>

        {/* Topic Pills Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 no-scrollbar">
          {topicFilters.map((tf) => (
            <button
              key={tf.id}
              onClick={() => setSelectedTopic(tf.id)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap transition-all cursor-pointer ${
                selectedTopic === tf.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/60 dark:border-slate-700'
              }`}
            >
              <span>{tf.icon}</span> <span className="ml-1">{tf.label}</span>
            </button>
          ))}
        </div>

        {/* Suggested Clickable Questions Pills */}
        {showQuestionsGrid && (
          <div className="mt-2.5 flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1 no-scrollbar">
            {filteredQuestions.map((q) => (
              <button
                key={q.id}
                onClick={() => handleSelectSuggestedQuestion(q)}
                disabled={isLoading}
                className="text-left text-xs bg-white hover:bg-blue-50/80 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-full px-3.5 py-1.5 transition-all flex items-center gap-1.5 group cursor-pointer active:scale-98 disabled:opacity-50"
              >
                <span className="line-clamp-1">{q.question}</span>
                <ChevronRight className="w-3.5 h-3.5 text-blue-500 shrink-0 group-hover:translate-x-0.5 transition-transform" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Chat Conversation Messages Box */}
      <div className="flex-1 bg-slate-100/80 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 overflow-y-auto space-y-5 shadow-xs">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-4">
            <div className="w-14 h-14 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-3 shadow-md">
              <Bot className="w-7 h-7" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-white mb-1">
              Halo! Saya Kak Bio, AI Tutor Virus Biologi SMA Kelas X 🧬
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mb-4 leading-relaxed">
              Ada yang ingin kamu pahami tentang **Ciri-Ciri**, **Struktur**, **Siklus Litik & Lisogenik**, atau **Peranan & Vaksin Virus**? 
            </p>
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 max-w-md text-left text-xs text-slate-700 dark:text-slate-200 shadow-xs">
              <span className="font-semibold text-blue-600 dark:text-blue-400 block mb-1 flex items-center gap-1">
                💡 Metode Belajar Sokratik:
              </span>
              Kak Bio akan membantu kamu memahami konsep lewat penjelasan sederhana, contoh nyata, dan **pertanyaan pemantik** di akhir setiap penjelasan agar kamu makin jago Biologi!
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-xs text-xs font-bold ${
                  msg.sender === 'user'
                    ? 'bg-slate-800 text-white'
                    : 'bg-blue-600 text-white'
                }`}
              >
                {msg.sender === 'user' ? 'ME' : 'AI'}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] sm:max-w-[78%] rounded-2xl px-4 py-3.5 text-xs sm:text-sm shadow-xs ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : msg.isError
                    ? 'bg-rose-50 dark:bg-rose-950/60 border border-rose-200 text-rose-900 dark:text-rose-200 rounded-tl-none'
                    : 'bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700/80 text-slate-700 dark:text-slate-100 rounded-tl-none'
                }`}
              >
                {msg.sender === 'tutor' ? (
                  <MarkdownRenderer 
                    content={msg.text} 
                    onAskFollowUp={(qText) => {
                      setInputText(qText);
                      inputRef.current?.focus();
                    }}
                  />
                ) : (
                  <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                )}

                <div
                  className={`mt-1.5 text-[10px] text-right ${
                    msg.sender === 'user'
                      ? 'text-blue-200'
                      : 'text-slate-400 dark:text-slate-500'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))
        )}

        {/* Loading typing indicator */}
        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 animate-pulse">
              <Bot className="w-5 h-5" />
            </div>
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl rounded-tl-none p-3.5 shadow-xs flex items-center gap-2">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
              <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                Kak Bio sedang merangkai penjelasan Sokratik...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Message Form */}
      <form onSubmit={handleSubmit} className="mt-2.5 relative flex items-center gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-2 shadow-xs">
        <input
          ref={inputRef}
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Tanyakan sesuatu tentang virus..."
          disabled={isLoading}
          className="flex-1 bg-transparent px-3 py-2 text-xs sm:text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={isLoading || !inputText.trim()}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white font-semibold p-2.5 sm:px-4 sm:py-2.5 rounded-lg shadow-xs flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline text-xs font-bold">Kirim</span>
        </button>
      </form>
    </div>
  );
};
