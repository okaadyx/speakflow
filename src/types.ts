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
  iconType: 'leaf' | 'mic' | 'shield' | 'megaphone'
}

export const INITIAL_SCRIPTS: Script[] = []

export const INSPIRATIONS: Inspiration[] = [
  {
    id: 'insp-1',
    title: 'Tell a motivational story',
    description: 'Generate a 3-minute narrative about overcoming a professional challenge.',
    prompt: 'Write a 3-minute motivational story about a software engineering team resolving a critical production database bug hours before a major client demo. Focus on collaboration, quick thinking, and resilience.',
    iconType: 'leaf'
  },
  {
    id: 'insp-2',
    title: '5-minute English practice',
    description: 'A conversational script focusing on business idioms and clear articulation.',
    prompt: 'Create a 5-minute English practice speech discussing the importance of setting boundaries in modern remote work setups, integrating idioms like "on the same page", "hit the ground running", and "think outside the box".',
    iconType: 'mic'
  },
  {
    id: 'insp-3',
    title: 'Mock Interview Answers',
    description: 'Practice common behavioral questions using the STAR method.',
    prompt: 'Draft an interview response using the STAR method (Situation, Task, Action, Result) answering the common question: "Describe a time you led a project with tight deadlines and resources, and how you delivered it."',
    iconType: 'shield'
  },
  {
    id: 'insp-4',
    title: 'Wedding Toast',
    description: 'A lighthearted, 2-minute structure for a best man or maid of honor speech.',
    prompt: 'Write a humorous and emotional wedding toast as a best man, celebrating the groom\'s change from a college jokester into a dedicated partner, keeping it friendly, clean, and around 300 words.',
    iconType: 'megaphone'
  }
]

export const CATEGORIES = ['English Speaking', 'Storytelling', 'Interview Practice', 'Public Speaking', 'Presentation']
