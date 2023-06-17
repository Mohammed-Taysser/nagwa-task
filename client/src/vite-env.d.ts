/// <reference types="vite/client" />

// ErrorBoundary
interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

interface Answer {
  id: number;
  value: string;
}

interface Answers {
  [index: number]: string;
}

interface Word {
  id: number;
  pos: string;
  word: string;
}

interface RankContextType {
  words: Word[];
  answers: Answers;
  reset: () => void;
  setWords: (word: Word[]) => void;
  addAnswer: (answer: Answer) => void;
}

interface WrapperProps {
  title: string;
  children: React.ReactNode;
  isLoading: boolean;
  error: Error | string;
}

interface SingleAnswerProps {
  onChange: (answer: string) => void;
  title: string;
  answer: string;
}

interface AnswersProps {
  setAnswer: (answer: string) => void;
  answer: string;
}
