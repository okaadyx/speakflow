export interface Script {
  id: string;
  title: string;
  content: string;
  editedAt: string;
  readTime: string;
  category: string;
}

export interface PracticeLog {
  id: string;
  scriptTitle: string;
  date: string;
  duration: number;
  wpm: number;
  paceRating: 'Too Slow' | 'Perfect' | 'Too Fast';
  satisfaction: number;
}
