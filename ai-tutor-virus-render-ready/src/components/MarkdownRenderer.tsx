import React from 'react';

interface MarkdownRendererProps {
  content: string;
  onAskFollowUp?: (question: string) => void;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, onAskFollowUp }) => {
  // Process the content into sections and paragraphs
  const lines = content.split('\n');
  const renderedElements: React.ReactNode[] = [];

  let currentList: React.ReactNode[] = [];
  let isNumbered = false;

  const parseInline = (text: string) => {
    // Regex to convert **bold** and *italic*
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    const regex = /(\*\*|__)(.*?)\1|(\*|_)(.*?)\3/g;
    let match;

    let keyCounter = 0;
    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }

      if (match[2]) {
        // Bold
        parts.push(
          <strong key={`b-${keyCounter++}`} className="font-semibold text-slate-900 dark:text-blue-200">
            {match[2]}
          </strong>
        );
      } else if (match[4]) {
        // Italic
        parts.push(
          <em key={`i-${keyCounter++}`} className="italic text-slate-700 dark:text-slate-300">
            {match[4]}
          </em>
        );
      }

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  const flushList = (keyIndex: number) => {
    if (currentList.length > 0) {
      if (isNumbered) {
        renderedElements.push(
          <ol key={`ol-${keyIndex}`} className="list-decimal list-inside space-y-1 my-2 pl-1 text-slate-800 dark:text-slate-200 text-sm sm:text-base leading-relaxed">
            {currentList}
          </ol>
        );
      } else {
        renderedElements.push(
          <ul key={`ul-${keyIndex}`} className="list-disc list-inside space-y-1 my-2 pl-1 text-slate-800 dark:text-slate-200 text-sm sm:text-base leading-relaxed">
            {currentList}
          </ul>
        );
      }
      currentList = [];
    }
  };

  lines.forEach((line, idx) => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushList(idx);
      return;
    }

    // Check for bullet list item
    const bulletMatch = trimmed.match(/^[\*\-•]\s+(.*)/);
    const numberedMatch = trimmed.match(/^(\d+)[\.\)]\s+(.*)/);

    if (bulletMatch) {
      if (isNumbered) flushList(idx);
      isNumbered = false;
      currentList.push(
        <li key={`li-${idx}`} className="leading-relaxed">
          {parseInline(bulletMatch[1])}
        </li>
      );
      return;
    }

    if (numberedMatch) {
      if (!isNumbered && currentList.length > 0) flushList(idx);
      isNumbered = true;
      currentList.push(
        <li key={`li-${idx}`} className="leading-relaxed">
          {parseInline(numberedMatch[2])}
        </li>
      );
      return;
    }

    // Not a list item
    flushList(idx);

    // Check for Headers
    if (trimmed.startsWith('### ')) {
      renderedElements.push(
        <h4 key={`h4-${idx}`} className="text-base sm:text-lg font-bold text-slate-800 dark:text-blue-300 mt-3 mb-1">
          {parseInline(trimmed.replace(/^###\s+/, ''))}
        </h4>
      );
      return;
    }

    if (trimmed.startsWith('## ') || trimmed.startsWith('# ')) {
      renderedElements.push(
        <h3 key={`h3-${idx}`} className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-blue-300 mt-4 mb-2 pb-1 border-b border-slate-200 dark:border-slate-800">
          {parseInline(trimmed.replace(/^##?\s+/, ''))}
        </h3>
      );
      return;
    }

    // Check if it's a Socratic Question box highlight (contains ❓ or "Pertanyaan Pemantik")
    if (trimmed.includes('❓') || trimmed.toLowerCase().includes('pertanyaan pemantik') || trimmed.toLowerCase().includes('pemantik:')) {
      const questionText = trimmed.replace(/^[❓\s*#]+/, '').trim();
      renderedElements.push(
        <div key={`socratic-${idx}`} className="my-3 p-3.5 bg-amber-50/90 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-700/50 rounded-xl text-amber-950 dark:text-amber-200 text-xs sm:text-sm shadow-sm transition-all">
          <div className="flex items-start gap-2.5">
            <span className="text-base sm:text-lg flex-shrink-0">❓</span>
            <div className="flex-1">
              <span className="font-semibold text-amber-900 dark:text-amber-300 block mb-0.5 text-xs uppercase tracking-wider">
                Pertanyaan Pemantik dari Kak Bio:
              </span>
              <p className="font-medium leading-relaxed">{parseInline(questionText)}</p>
              {onAskFollowUp && (
                <button
                  onClick={() => onAskFollowUp(`Saya mau jawab pertanyaan ini: "${questionText}"`)}
                  className="mt-2 text-xs font-semibold px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors inline-flex items-center gap-1 shadow-sm active:scale-95"
                >
                  💬 Jawab / Tanya Pertanyaan Ini
                </button>
              )}
            </div>
          </div>
        </div>
      );
      return;
    }

    // Standard paragraph
    renderedElements.push(
      <p key={`p-${idx}`} className="text-slate-800 dark:text-slate-200 text-sm sm:text-base leading-relaxed my-1.5">
        {parseInline(trimmed)}
      </p>
    );
  });

  flushList(lines.length);

  return <div className="markdown-body space-y-1">{renderedElements}</div>;
};
