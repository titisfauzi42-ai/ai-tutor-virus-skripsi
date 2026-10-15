export type ActiveTab = 'chat' | 'summary' | 'diagram' | 'quiz';

export type VirusTopic = 
  | 'semua'
  | 'ciri_ciri'
  | 'struktur'
  | 'reproduksi'
  | 'peranan_pencegahan';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  timestamp: string;
  isError?: boolean;
  topic?: VirusTopic;
}

export interface SuggestedQuestion {
  id: string;
  topic: VirusTopic;
  question: string;
  shortLabel: string;
  category: string;
  iconName: string;
}

export interface ConceptCard {
  id: string;
  topic: VirusTopic;
  title: string;
  subtitle: string;
  summaryPoints: string[];
  keyTerms: { term: string; definition: string }[];
  funFact?: string;
  sampleQuestion: string;
}

export interface DiagramPart {
  id: string;
  name: string;
  functionText: string;
  description: string;
  x: number; // percentage X
  y: number; // percentage Y
  color: string;
}

export interface QuizQuestion {
  id: number;
  topic: VirusTopic;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  hint: string;
}
