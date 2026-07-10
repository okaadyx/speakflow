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
  duration: number // in seconds
  wpm: number
  paceRating: 'Too Slow' | 'Perfect' | 'Too Fast'
  satisfaction: number // 1-5 stars
}

export interface Inspiration {
  id: string
  title: string
  description: string
  prompt: string
  iconType: 'leaf' | 'mic' | 'shield' | 'megaphone'
}

export const INITIAL_SCRIPTS: Script[] = [
  {
    id: 'script-1',
    title: 'Q3 Marketing Update',
    content: `Good morning team. Today we're going to review our performance over the last quarter. We've seen incredible growth in our digital channel acquisitions, with a 35% increase in lead generation year-over-year. Key drivers include our refined target marketing campaign and the launch of our updated developer portal. However, we must address the drop in conversion efficiency on our self-serve plans. In the next few minutes, I will outline our core strategies to streamline user onboarding and drive expansion revenue in Q4. Let's dive in.`,
    editedAt: '2h ago',
    readTime: '4 min read',
    category: 'Presentation'
  },
  {
    id: 'script-2',
    title: 'Product Launch Keynote',
    content: `We set out to build something that fundamentally changes how we interact with software. A platform designed to speak your language, streamline complex configurations, and build high-fidelity applications with ease. Today, we are proud to introduce SpeakFlow. It's the culmination of months of research, prototyping, and dedication. SpeakFlow bridges the gap between vision and execution, enabling developers to voice their instructions and see them instantly turned into production-grade interfaces. Let's look at how this changes the landscape.`,
    editedAt: 'Yesterday',
    readTime: '12 min read',
    category: 'Presentation'
  },
  {
    id: 'script-3',
    title: 'Investor Pitch Deck Narration',
    content: `Our market is expanding at a CAGR of 25%, and our unique positioning allows us to capture early enterprise market share. Welcome, everyone. SpeakFlow is the first AI-driven speech design studio. In a world where speed is developer currency, we enable teams to construct modern apps with the power of speech. We are seeking $3 million in seed funding to accelerate our core core engine research, expand our integrations library, and triple our engineering throughput. Let's discuss our competitive advantages and financial forecast.`,
    editedAt: '3 days ago',
    readTime: '8 min read',
    category: 'Interview Practice'
  }
]

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
