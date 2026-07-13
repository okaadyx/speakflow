import type { Script } from '../types/script.js'

export const mockScripts: Script[] = [
  {
    id: 'script-1',
    title: 'Q3 Marketing Update',
    content: 'Good morning everyone. Today, I am excited to share our marketing performance results for the third quarter. Our primary goal this quarter was to scale user acquisitions while maintaining a low customer acquisition cost. Through targeted optimization of our core channels, we achieved a twenty percent increase in conversions. Let\'s dive into the details.',
    editedAt: '2 hours ago',
    readTime: '1 min read',
    category: 'Marketing'
  },
  {
    id: 'script-2',
    title: 'AI Product Launch Pitch',
    content: 'Imagine a world where routine tasks are automated, and creative minds are freed to focus on what truly matters. Today, we are launching SpeakFlow, an AI-powered delivery coaching platform designed to elevate public speaking. SpeakFlow listens to your pacing, provides live teleprompter autoscrolling, and gives dynamic feedback. Here is how it works.',
    editedAt: 'Yesterday',
    readTime: '2 min read',
    category: 'Product Pitch'
  }
];
