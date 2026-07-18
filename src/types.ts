export interface Script {
  id: string
  title: string
  content: string
  editedAt: string
  readTime: string
  category: string
}

export interface PracticeLog {
  id: string
  scriptTitle: string
  date: string
  duration: number
  wpm: number
  paceRating: 'Too Slow' | 'Perfect' | 'Too Fast'
  satisfaction: number
}

export interface Inspiration {
  id: string
  title: string
  description: string
  prompt: string
  iconType:
    | "leaf"
    | "mic"
    | "shield"
    | "megaphone"
    | "video"
    | "star"
    | "sparkles"
    | "globe";
}

export const INITIAL_SCRIPTS: Script[] = []

export const INSPIRATIONS: Inspiration[] = [
  {
    id: "insp-1",
    title: "Tell an Inspiring Story",
    description: "Share a meaningful life experience.",
    prompt:
      "Write an emotional story about overcoming a difficult challenge and finding the confidence to keep going.",
    iconType: "leaf",
  },
  {
    id: "insp-2",
    title: "Practice English",
    description: "Improve your speaking confidence.",
    prompt:
      "Create a five-minute English speaking practice about building positive daily habits using natural, conversational language.",
    iconType: "mic",
  },
  {
    id: "insp-3",
    title: "Interview Practice",
    description: "Answer common interview questions confidently.",
    prompt:
      'Write a natural answer for the interview question: "Tell me about yourself."',
    iconType: "shield",
  },
  {
    id: "insp-4",
    title: "Presentation",
    description: "Present an idea clearly and confidently.",
    prompt:
      "Create a presentation introducing a new product, explaining its purpose, key features, and benefits.",
    iconType: "megaphone",
  },
  {
    id: "insp-5",
    title: "Motivational Speech",
    description: "Inspire people to take action.",
    prompt:
      "Write a motivational speech about believing in yourself and embracing new opportunities.",
    iconType: "star",
  },
  {
    id: "insp-6",
    title: "YouTube Script",
    description: "Create engaging video content.",
    prompt:
      "Write a YouTube script explaining five simple habits that can improve productivity in everyday life.",
    iconType: "video",
  },
  {
    id: "insp-7",
    title: "TED-style Talk",
    description: "Deliver a powerful idea worth sharing.",
    prompt:
      "Write a TED-style talk about how curiosity can transform learning and personal growth.",
    iconType: "sparkles",
  },
  {
    id: "insp-8",
    title: "Travel Story",
    description: "Share an unforgettable adventure.",
    prompt:
      "Tell an engaging story about an unexpected experience during a memorable trip.",
    iconType: "globe",
  },
];

export const CATEGORIES = ['English Speaking', 'Storytelling', 'Interview Practice', 'Public Speaking', 'Presentation']
