import React, { useState } from 'react';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { ChatView } from './components/ChatView';
import { VideoPlayer } from './components/VideoPlayer';
import { SummaryView } from './components/SummaryView';
import { DiagramView } from './components/DiagramView';
import { QuizView } from './components/QuizView';
import { ActiveTab, ChatMessage, VirusTopic } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('chat');
  const [selectedTopic, setSelectedTopic] = useState<VirusTopic>('semua');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [initialQuestion, setInitialQuestion] = useState<string>('');

  const formatTimestamp = () => {
    const now = new Date();
    return now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  };

  const handleSendMessage = async (text: string, topic?: VirusTopic) => {
    if (!text.trim() || isLoading) return;

    const userMsgId = `u-${Date.now()}`;
    const userMessage: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      text,
      timestamp: formatTimestamp(),
      topic: topic || selectedTopic,
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      // Prepare history for backend call
      const history = updatedMessages.map((m) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        content: m.text,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          history,
          topic: topic || selectedTopic,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Terjadi kesalahan saat berkomunikasi dengan AI Tutor.');
      }

      const data = await res.json();

      const tutorMessage: ChatMessage = {
        id: `t-${Date.now()}`,
        sender: 'tutor',
        text: data.reply || 'Maaf, Kak Bio belum dapat memproses jawaban.',
        timestamp: formatTimestamp(),
      };

      setMessages((prev) => [...prev, tutorMessage]);
    } catch (err: any) {
      console.error('Error fetching chat:', err);
      const errorMessage: ChatMessage = {
        id: `e-${Date.now()}`,
        sender: 'tutor',
        text: `⚠️ **Gagal Mengirim Pesan:** ${err.message || 'Silakan periksa koneksi internet atau coba lagi nanti.'}`,
        timestamp: formatTimestamp(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    if (window.confirm('Apakah kamu yakin ingin memulai percakapan baru dengan Kak Bio?')) {
      setMessages([]);
      setInitialQuestion('');
    }
  };

  // Jump to Chat tab with custom prompt from Summary
  const handleAskConcept = (question: string, topic: VirusTopic) => {
    setSelectedTopic(topic);
    setActiveTab('chat');
    handleSendMessage(question, topic);
  };

  // Jump to Chat tab with custom prompt from Diagram
  const handleAskPart = (question: string, topic: VirusTopic) => {
    setSelectedTopic(topic);
    setActiveTab('chat');
    handleSendMessage(question, topic);
  };

  // Jump to Chat tab with custom prompt from Quiz
  const handleAskQuizExplanation = (questionText: string, chosenOption: string, correctAnswer: string) => {
    const prompt = `Kak Bio, bantu saya pahami soal ini secara Sokratik:\n\n**Soal:** ${questionText}\n**Jawaban Saya:** ${chosenOption}\n**Jawaban Benar:** ${correctAnswer}\n\nMengapa jawaban benar adalah '${correctAnswer}' dan mengapa pilihan saya/lainnya kurang tepat? Tolong jelaskan dengan analogi yang gampang diingat!`;
    setActiveTab('chat');
    handleSendMessage(prompt, 'semua');
  };

  return (
    <div className="min-h-screen bg-slate-100/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Header Bar */}
      <Header onResetChat={handleResetChat} activeTab={activeTab} />

      {/* Main Tab Navigation */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Active Tab Content View */}
      <main className="flex-1 pb-6">
        {activeTab === 'chat' && (
          <div className="max-w-5xl mx-auto px-2 sm:px-4 py-3 sm:py-4 space-y-4">
            {/* Pemutar Video Animasi di Bagian Atas Halaman */}
            <section aria-label="Pemutar Video Animasi Pembelajaran">
              <VideoPlayer
                onAskVideoTopic={handleAskConcept}
                onNavigateTab={(tab) => setActiveTab(tab)}
              />
            </section>

            {/* Area Percakapan AI Tutor Tepat di Bawah Video */}
            <section aria-label="Area Percakapan AI Tutor">
              <ChatView
                messages={messages}
                isLoading={isLoading}
                onSendMessage={handleSendMessage}
                selectedTopic={selectedTopic}
                setSelectedTopic={setSelectedTopic}
                initialQuestion={initialQuestion}
              />
            </section>
          </div>
        )}

        {activeTab === 'summary' && (
          <SummaryView onAskConcept={handleAskConcept} />
        )}

        {activeTab === 'diagram' && (
          <DiagramView onAskPart={handleAskPart} />
        )}

        {activeTab === 'quiz' && (
          <QuizView onAskQuizExplanation={handleAskQuizExplanation} />
        )}
      </main>
    </div>
  );
}
