import React, { useState, useEffect, useRef } from 'react'

interface Script {
  id: string
  title: string
  content: string
  editedAt: string
  readTime: string
  category: string
}

interface PracticeLog {
  id: string
  scriptTitle: string
  date: string
  duration: number // in seconds
  wpm: number
  paceRating: 'Too Slow' | 'Perfect' | 'Too Fast'
  satisfaction: number // 1-5 stars
}

const INITIAL_SCRIPTS: Script[] = [
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

const INSPIRATIONS = [
  {
    id: 'insp-1',
    title: 'Tell a motivational story',
    description: 'Generate a 3-minute narrative about overcoming a professional challenge.',
    prompt: 'Write a 3-minute motivational story about a software engineering team resolving a critical production database bug hours before a major client demo. Focus on collaboration, quick thinking, and resilience.',
    icon: (
      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20 transition-all duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
        </svg>
      </div>
    )
  },
  {
    id: 'insp-2',
    title: '5-minute English practice',
    description: 'A conversational script focusing on business idioms and clear articulation.',
    prompt: 'Create a 5-minute English practice speech discussing the importance of setting boundaries in modern remote work setups, integrating idioms like "on the same page", "hit the ground running", and "think outside the box".',
    icon: (
      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-zinc-800 text-zinc-300 group-hover:bg-zinc-700 transition-all duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      </div>
    )
  },
  {
    id: 'insp-3',
    title: 'Mock Interview Answers',
    description: 'Practice common behavioral questions using the STAR method.',
    prompt: 'Draft an interview response using the STAR method (Situation, Task, Action, Result) answering the common question: "Describe a time you led a project with tight deadlines and resources, and how you delivered it."',
    icon: (
      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-zinc-800 text-zinc-300 group-hover:bg-zinc-700 transition-all duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      </div>
    )
  },
  {
    id: 'insp-4',
    title: 'Wedding Toast',
    description: 'A lighthearted, 2-minute structure for a best man or maid of honor speech.',
    prompt: 'Write a humorous and emotional wedding toast as a best man, celebrating the groom\'s change from a college jokester into a dedicated partner, keeping it friendly, clean, and around 300 words.',
    icon: (
      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-zinc-800 text-zinc-300 group-hover:bg-zinc-700 transition-all duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        </svg>
      </div>
    )
  }
]

const CATEGORIES = ['English Speaking', 'Storytelling', 'Interview Practice', 'Public Speaking', 'Presentation']

export default function App() {
  // Navigation & Theme
  const [activeTab, setActiveTab] = useState<'home' | 'my-scripts' | 'practice-history'>('home')
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  
  // Script States
  const [scripts, setScripts] = useState<Script[]>(() => {
    const saved = localStorage.getItem('speakflow_scripts')
    return saved ? JSON.parse(saved) : INITIAL_SCRIPTS
  })
  const [inputText, setInputText] = useState('')
  const [activeCategory, setActiveCategory] = useState('')
  
  // AI Generator Simulation State
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  
  // Teleprompter / Practice State
  const [practiceScript, setPracticeScript] = useState<Script | null>(null)
  const [isPracticing, setIsPracticing] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [scrollSpeed, setScrollSpeed] = useState(1.5) // Speed units
  const [fontSize, setFontSize] = useState('text-xl md:text-3xl') // Display font size
  const [isRecording, setIsRecording] = useState(false)
  const [recordingSeconds, setRecordingSeconds] = useState(0)
  const [soundBars, setSoundBars] = useState<number[]>([1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
  
  // Script Editor state
  const [editingScript, setEditingScript] = useState<Script | null>(null)
  
  // Practice History logs
  const [logs, setLogs] = useState<PracticeLog[]>(() => {
    const saved = localStorage.getItem('speakflow_logs')
    return saved ? JSON.parse(saved) : []
  })

  // Fullscreen helper
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Settings Panel State
  const [showSettings, setShowSettings] = useState(false)
  const [userWpmTarget, setUserWpmTarget] = useState(130)

  // References
  const teleprompterRef = useRef<HTMLDivElement>(null)
  const scrollIntervalRef = useRef<number | null>(null)
  const timerIntervalRef = useRef<number | null>(null)
  const visualizerIntervalRef = useRef<number | null>(null)

  // Persist scripts
  useEffect(() => {
    localStorage.setItem('speakflow_scripts', JSON.stringify(scripts))
  }, [scripts])

  // Persist logs
  useEffect(() => {
    localStorage.setItem('speakflow_logs', JSON.stringify(logs))
  }, [logs])

  // Apply Theme on load and change
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [theme])

  // Track Recording Timer
  useEffect(() => {
    if (isRecording) {
      timerIntervalRef.current = window.setInterval(() => {
        setRecordingSeconds((prev) => prev + 1)
      }, 1000)
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current)
      }
      setRecordingSeconds(0)
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current)
    }
  }, [isRecording])

  // Mock voice volume waves
  useEffect(() => {
    if (isRecording) {
      visualizerIntervalRef.current = window.setInterval(() => {
        setSoundBars(
          Array.from({ length: 10 }, () => Math.floor(Math.random() * 3) + 1) // 1: quiet, 2: normal, 3: loud
        )
      }, 120)
    } else {
      if (visualizerIntervalRef.current) {
        clearInterval(visualizerIntervalRef.current)
      }
      setSoundBars([1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
    }
    return () => {
      if (visualizerIntervalRef.current) clearInterval(visualizerIntervalRef.current)
    }
  }, [isRecording])

  // Scroll logic for teleprompter
  useEffect(() => {
    if (isPlaying && teleprompterRef.current) {
      const scrollStep = () => {
        if (teleprompterRef.current) {
          const { scrollTop, scrollHeight, clientHeight } = teleprompterRef.current
          // If we reach the bottom, stop
          if (scrollTop + clientHeight >= scrollHeight - 2) {
            setIsPlaying(false)
            return
          }
          teleprompterRef.current.scrollTop += scrollSpeed
        }
      }
      scrollIntervalRef.current = window.setInterval(scrollStep, 30)
    } else {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current)
      }
    }
    return () => {
      if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current)
    }
  }, [isPlaying, scrollSpeed])

  // Fullscreen Handler
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true)
      }).catch(err => {
        console.error('Error enabling fullscreen', err)
      })
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  // Handle category / tag selection
  const selectCategory = (cat: string) => {
    setActiveCategory(cat)
    // Pre-populate input box depending on selection
    if (cat === 'English Speaking') {
      setInputText('Draft an English practice speech on giving construct feedback in corporate environments without demotivating team members.')
    } else if (cat === 'Storytelling') {
      setInputText('Create a narrative speech demonstrating how learning from failing is the ultimate catalyst for software engineers.')
    } else if (cat === 'Interview Practice') {
      setInputText('Create a behavioral script describing how I handled a major scope-creep incident in my previous project using the STAR framework.')
    } else if (cat === 'Public Speaking') {
      setInputText('Write an inspiring opening key speech addressing why digital accessibility needs to be standard across the web.')
    } else if (cat === 'Presentation') {
      setInputText('Draft a structured presentation introducing our new platform SpeakFlow, outlining its architecture and primary user benefits.')
    }
  }

  // Trigger Simulated AI Speech Generation
  const handleAiGenerate = () => {
    const prompt = inputText.trim() || 'Write a speech about public speaking and confidence.'
    setIsGenerating(true)
    setGenerationProgress(0)

    // Interval to simulate API loading
    const totalDuration = 2500 // 2.5s
    const step = 50
    let current = 0

    const progressInterval = setInterval(() => {
      current += step
      const progress = Math.min((current / totalDuration) * 100, 100)
      setGenerationProgress(Math.floor(progress))

      if (progress >= 100) {
        clearInterval(progressInterval)
        
        // Mock generation completion
        const generatedTitle = `AI: ${prompt.split(' ').slice(0, 3).join(' ')}...`
        const generatedContent = `Ladies and gentlemen, thank you for being here today. Let's discuss a crucial subject: ${prompt.toLowerCase().replace(/^(write a speech about|create a|draft a|write a)\s*/i, '')}. 

When we step onto a stage or speak in a meeting, we are not just delivering words; we are sharing ideas. The path of development is filled with variables, complex configurations, and decisions. But standard practice shows that it is the clarity of communication that creates consensus.

To communicate with impact, we must practice with intent. We must understand our rhythm, adjust our pacing, and shape our message to match our audience. In a distraction-free space, we can listen to our own pacing, refine our tone, and construct a compelling narrative. 

As we look to the future, let us make a promise to prioritize clear communication. Let us speak not just to be heard, but to inspire, to motivate, and to build bridges between our technical creations and human connections. Thank you.`

        const newScript: Script = {
          id: `script-${Date.now()}`,
          title: generatedTitle,
          content: generatedContent,
          editedAt: 'Just now',
          readTime: `${Math.ceil(generatedContent.split(/\s+/).length / 130)} min read`,
          category: activeCategory || 'Presentation'
        }

        setScripts([newScript, ...scripts])
        setInputText('')
        setActiveCategory('')
        setIsGenerating(false)
        
        // Go straight to practicing the newly generated script
        setPracticeScript(newScript)
        setIsPracticing(true)
      }
    }, step)
  }

  const startPractice = (script: Script) => {
    setPracticeScript(script)
    setIsPracticing(true)
    setIsPlaying(false)
    setIsRecording(false)
  }

  const finishPractice = () => {
    if (!practiceScript) return
    
    // Calculate practice performance
    const wordCount = practiceScript.content.split(/\s+/).filter(Boolean).length
    const durationMin = recordingSeconds > 0 ? recordingSeconds / 60 : 1.2
    const durationSec = recordingSeconds > 0 ? recordingSeconds : 72
    const calculatedWpm = Math.round(wordCount / durationMin)
    
    let pace: 'Too Slow' | 'Perfect' | 'Too Fast' = 'Perfect'
    if (calculatedWpm < userWpmTarget - 20) pace = 'Too Slow'
    else if (calculatedWpm > userWpmTarget + 20) pace = 'Too Fast'

    const newLog: PracticeLog = {
      id: `log-${Date.now()}`,
      scriptTitle: practiceScript.title,
      date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) + ' ' + new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }),
      duration: durationSec,
      wpm: calculatedWpm,
      paceRating: pace,
      satisfaction: 4
    }

    setLogs([newLog, ...logs])
    setIsPracticing(false)
    setIsPlaying(false)
    setIsRecording(false)
    setActiveTab('practice-history')
  }

  const saveEditedScript = () => {
    if (!editingScript) return
    
    const wordCount = editingScript.content.split(/\s+/).filter(Boolean).length
    const updated: Script = {
      ...editingScript,
      editedAt: 'Just now',
      readTime: `${Math.ceil(wordCount / 130)} min read`
    }

    setScripts(scripts.map(s => s.id === updated.id ? updated : s))
    setEditingScript(null)
  }

  const startNewScript = () => {
    const newScript: Script = {
      id: `script-${Date.now()}`,
      title: 'Untitled Script',
      content: 'Write your speech content here...',
      editedAt: 'Just now',
      readTime: '1 min read',
      category: 'Presentation'
    }
    setScripts([newScript, ...scripts])
    setEditingScript(newScript)
  }

  const deleteScript = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (confirm('Are you sure you want to delete this script?')) {
      setScripts(scripts.filter(s => s.id !== id))
    }
  }

  return (
    <div className={`flex flex-col min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-zinc-950 text-zinc-100' : 'bg-zinc-50 text-zinc-900'}`}>
      
      {/* Header */}
      <header className={`sticky top-0 z-30 px-6 py-4 flex items-center justify-between border-b ${theme === 'dark' ? 'bg-zinc-950/80 border-zinc-800/80 backdrop-blur-md' : 'bg-white/80 border-zinc-200/80 backdrop-blur-md'}`}>
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => { setActiveTab('home'); setIsPracticing(false); setEditingScript(null); }}>
            <span className="font-display font-extrabold text-2xl tracking-tight bg-gradient-to-r from-violet-500 via-indigo-500 to-blue-500 bg-clip-text text-transparent hover:opacity-90 transition-opacity">
              SpeakFlow
            </span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => { setActiveTab('home'); setIsPracticing(false); setEditingScript(null); }}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                activeTab === 'home' && !isPracticing && !editingScript
                  ? (theme === 'dark' ? 'bg-zinc-800 text-white' : 'bg-zinc-100 text-zinc-900')
                  : (theme === 'dark' ? 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900' : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100')
              }`}
            >
              Home
            </button>
            <button
              onClick={() => { setActiveTab('my-scripts'); setIsPracticing(false); setEditingScript(null); }}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                activeTab === 'my-scripts' || editingScript
                  ? (theme === 'dark' ? 'bg-zinc-800 text-white' : 'bg-zinc-100 text-zinc-900')
                  : (theme === 'dark' ? 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900' : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100')
              }`}
            >
              My Scripts
            </button>
            <button
              onClick={() => { setActiveTab('practice-history'); setIsPracticing(false); setEditingScript(null); }}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                activeTab === 'practice-history'
                  ? (theme === 'dark' ? 'bg-zinc-800 text-white' : 'bg-zinc-100 text-zinc-900')
                  : (theme === 'dark' ? 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900' : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100')
              }`}
            >
              Practice History
            </button>
          </nav>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center space-x-3">
          {/* Light/Dark Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            title="Toggle theme"
            className={`p-2 rounded-lg transition-all duration-200 ${theme === 'dark' ? 'hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200' : 'hover:bg-zinc-100 text-zinc-600 hover:text-zinc-900'}`}
          >
            {theme === 'dark' ? (
              // Moon Icon
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              // Sun Icon
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            )}
          </button>

          {/* Settings button */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            title="Practice settings"
            className={`p-2 rounded-lg transition-all duration-200 relative ${theme === 'dark' ? 'hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200' : 'hover:bg-zinc-100 text-zinc-600 hover:text-zinc-900'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            title="Toggle Fullscreen"
            className={`p-2 rounded-lg transition-all duration-200 ${theme === 'dark' ? 'hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200' : 'hover:bg-zinc-100 text-zinc-600 hover:text-zinc-900'}`}
          >
            {isFullscreen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 9L4 4m0 0h4M4 4v4m11 1l5-5m0 0h-4m4 0v4M9 15l-5 5m0 0h4m-4 0v-4m11-1l5 5m0 0h-4m4 0v-4" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Settings Modal popover */}
      {showSettings && (
        <div className={`border-b ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800 text-zinc-200' : 'bg-zinc-100 border-zinc-200 text-zinc-800'} px-6 py-4`}>
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h4 className="font-semibold text-sm">Practice Settings</h4>
              <p className="text-xs opacity-75">Configure target speeds and custom speech defaults.</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <label className="text-xs font-medium">Target WPM (Words Per Minute):</label>
                <input
                  type="number"
                  min="80"
                  max="240"
                  value={userWpmTarget}
                  onChange={(e) => setUserWpmTarget(Number(e.target.value))}
                  className={`w-16 px-2 py-1 text-xs rounded border ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-zinc-300 text-zinc-900'}`}
                />
              </div>
              <button
                onClick={() => setShowSettings(false)}
                className="px-3 py-1 rounded bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Workspace Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-8">
        
        {/* Editor Screen */}
        {editingScript && (
          <div className="animate-fadeIn">
            <div className="flex items-center justify-between mb-6">
              <button 
                onClick={() => setEditingScript(null)}
                className={`flex items-center space-x-2 text-sm font-medium ${theme === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-black'} transition-colors`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                <span>Back to Scripts</span>
              </button>
              
              <button
                onClick={saveEditedScript}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg shadow transition-colors flex items-center space-x-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>Save Script</span>
              </button>
            </div>

            <div className={`rounded-xl border p-6 shadow-sm ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
              <input
                type="text"
                placeholder="Script Title"
                value={editingScript.title}
                onChange={(e) => setEditingScript({ ...editingScript, title: e.target.value })}
                className={`w-full font-display text-2xl font-bold bg-transparent border-b pb-3 mb-6 focus:outline-none focus:border-indigo-500 transition-colors ${theme === 'dark' ? 'text-white border-zinc-800' : 'text-zinc-900 border-zinc-200'}`}
              />

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1.5">
                  <span className="text-xs text-zinc-400">Category:</span>
                  <select
                    value={editingScript.category}
                    onChange={(e) => setEditingScript({ ...editingScript, category: e.target.value })}
                    className={`text-xs font-semibold rounded px-2 py-1 border ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-zinc-100 border-zinc-300 text-zinc-800'}`}
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="text-xs text-zinc-400">
                  {editingScript.content.split(/\s+/).filter(Boolean).length} words | {editingScript.content.length} characters
                </div>
              </div>

              <textarea
                value={editingScript.content}
                onChange={(e) => setEditingScript({ ...editingScript, content: e.target.value })}
                rows={14}
                className={`w-full bg-transparent resize-y rounded-lg p-4 font-sans text-lg leading-relaxed focus:outline-none focus:ring-1 focus:ring-indigo-500/40 border ${theme === 'dark' ? 'text-zinc-200 border-zinc-800 bg-zinc-950/40' : 'text-zinc-800 border-zinc-200 bg-zinc-50'}`}
                placeholder="Write your speech body here. Use natural sentence structures for optimal teleprompter practice."
              />
            </div>
          </div>
        )}

        {/* Teleprompter Practice Screen */}
        {isPracticing && practiceScript && (
          <div className="animate-fadeIn max-w-4xl mx-auto">
            {/* Header Controls */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
              <button
                onClick={() => setIsPracticing(false)}
                className={`flex items-center space-x-2 text-sm font-medium ${theme === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-black'} transition-colors`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                <span>Exit Session</span>
              </button>

              <h2 className="font-display font-bold text-xl md:text-2xl tracking-tight text-center md:text-left">
                Practicing: <span className="text-indigo-500">{practiceScript.title}</span>
              </h2>

              <button
                onClick={finishPractice}
                className="w-full md:w-auto px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all flex items-center justify-center space-x-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                </svg>
                <span>Save Practice Session</span>
              </button>
            </div>

            {/* Custom Settings Panel */}
            <div className={`p-4 rounded-xl border flex flex-wrap items-center justify-between gap-4 mb-6 shadow-sm ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
              <div className="flex items-center space-x-6">
                {/* Font Size Selection */}
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-zinc-400">Size:</span>
                  <div className="inline-flex rounded-lg border border-zinc-700/50 p-0.5 bg-zinc-950/20">
                    <button
                      onClick={() => setFontSize('text-lg md:text-2xl')}
                      className={`px-2 py-1 text-xs font-semibold rounded-md transition-all ${fontSize === 'text-lg md:text-2xl' ? 'bg-indigo-600 text-white' : 'text-zinc-400 hover:text-zinc-200'}`}
                    >
                      A-
                    </button>
                    <button
                      onClick={() => setFontSize('text-xl md:text-3xl')}
                      className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${fontSize === 'text-xl md:text-3xl' ? 'bg-indigo-600 text-white' : 'text-zinc-400 hover:text-zinc-200'}`}
                    >
                      A
                    </button>
                    <button
                      onClick={() => setFontSize('text-2xl md:text-4xl')}
                      className={`px-2 py-1 text-xs font-semibold rounded-md transition-all ${fontSize === 'text-2xl md:text-4xl' ? 'bg-indigo-600 text-white' : 'text-zinc-400 hover:text-zinc-200'}`}
                    >
                      A+
                    </button>
                  </div>
                </div>

                {/* Speed Multiplier */}
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-zinc-400">Speed:</span>
                  <div className="flex items-center space-x-2">
                    <input
                      type="range"
                      min="0.5"
                      max="4"
                      step="0.1"
                      value={scrollSpeed}
                      onChange={(e) => setScrollSpeed(Number(e.target.value))}
                      className="w-24 md:w-32 accent-indigo-500 cursor-pointer"
                    />
                    <span className="text-xs font-semibold font-mono bg-zinc-950/30 px-2 py-1 rounded text-indigo-400 border border-zinc-800">
                      {scrollSpeed}x
                    </span>
                  </div>
                </div>
              </div>

              {/* Recording status details */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-zinc-950/40 border border-zinc-800 px-3 py-1.5 rounded-lg">
                  <span className={`w-2 h-2 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-zinc-600'}`}></span>
                  <span className="text-xs font-semibold font-mono text-zinc-400">
                    {Math.floor(recordingSeconds / 60)}:{(recordingSeconds % 60).toString().padStart(2, '0')}
                  </span>
                </div>
                
                {/* Simulated Volume indicator */}
                {isRecording && (
                  <div className="flex items-end space-x-0.5 h-6 text-indigo-400">
                    {soundBars.map((level, i) => (
                      <span
                        key={i}
                        className="wave-bar"
                        style={{
                          height: level === 1 ? '6px' : level === 2 ? '16px' : '26px',
                          animationName: level === 1 ? 'quiet' : level === 2 ? 'normal-wave' : 'loud-wave'
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Scrolling Teleprompter Box */}
            <div className={`relative rounded-2xl border shadow-lg ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
              
              {/* Highlight Guide line */}
              <div className="absolute top-1/2 left-0 right-0 h-16 transform -translate-y-1/2 bg-indigo-500/5 pointer-events-none border-y border-indigo-500/10 z-10" />

              <div
                ref={teleprompterRef}
                className={`h-[420px] overflow-y-auto px-8 md:px-12 py-[200px] text-center select-none leading-relaxed transition-all duration-300 font-medium ${fontSize} ${
                  theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
                }`}
                style={{ scrollBehavior: 'smooth' }}
              >
                {practiceScript.content.split('\n\n').map((paragraph, pIdx) => (
                  <p key={pIdx} className="mb-10 hover:text-zinc-200 transition-colors duration-200">
                    {paragraph}
                  </p>
                ))}
                
                <div className="h-[200px]" /> {/* Extra scroll padding */}
              </div>
            </div>

            {/* Footer Teleprompter Actions */}
            <div className="flex justify-center items-center space-x-6 mt-8">
              {/* Mic Record Toggle */}
              <button
                onClick={() => setIsRecording(!isRecording)}
                className={`p-4 rounded-full shadow-lg transition-all duration-300 border ${
                  isRecording 
                    ? 'bg-red-500 hover:bg-red-600 text-white border-red-400 shadow-red-500/20' 
                    : (theme === 'dark' ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700' : 'bg-white hover:bg-zinc-100 text-zinc-700 border-zinc-300')
                }`}
                title={isRecording ? 'Pause Recording' : 'Start Microphone Practice'}
              >
                {isRecording ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                )}
              </button>

              {/* Play / Pause Scroller */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-6 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-600/30 hover:scale-105 transition-all"
                title={isPlaying ? 'Pause Auto-Scroll' : 'Start Auto-Scroll'}
              >
                {isPlaying ? (
                  // Pause Icon
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  // Play Icon
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </button>

              {/* Reset scroll position */}
              <button
                onClick={() => {
                  if (teleprompterRef.current) teleprompterRef.current.scrollTop = 0
                  setIsPlaying(false)
                }}
                className={`p-4 rounded-full border transition-all ${
                  theme === 'dark' ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700' : 'bg-white hover:bg-zinc-100 text-zinc-700 border-zinc-300'
                }`}
                title="Reset scroll position"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H12M4 9h8" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Dashboard View */}
        {!isPracticing && !editingScript && (
          <div className="space-y-16">
            
            {/* Home Tab */}
            {activeTab === 'home' && (
              <div className="space-y-16 animate-fadeIn">
                
                {/* Hero Section */}
                <div className="text-center max-w-4xl mx-auto space-y-6">
                  <h1 className="font-display font-extrabold text-5xl md:text-7xl leading-tight tracking-tight">
                    <span className="text-zinc-300 dark:text-zinc-300">Practice Your Speech</span>
                    <br />
                    <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                      with Confidence
                    </span>
                  </h1>

                  <p className={`text-lg md:text-xl max-w-2xl mx-auto font-normal ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    Write, generate with AI, or reuse your existing scripts to perfect your delivery in a distraction-free environment.
                  </p>

                  {/* AI Input Container */}
                  <div className="relative max-w-3xl mx-auto mt-10">
                    <div className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                      theme === 'dark' 
                        ? 'bg-zinc-900 border-zinc-800 focus-within:border-indigo-500/50 shadow-lg shadow-black/20' 
                        : 'bg-white border-zinc-200 focus-within:border-indigo-500/50 shadow-md shadow-zinc-200/50'
                    }`}>
                      <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="What would you like to practice today? Type your script, or describe what you want to say..."
                        rows={3}
                        className={`w-full bg-transparent resize-none focus:outline-none text-base md:text-lg leading-relaxed ${
                          theme === 'dark' ? 'text-zinc-200 placeholder-zinc-500' : 'text-zinc-800 placeholder-zinc-400'
                        }`}
                        disabled={isGenerating}
                      />

                      {/* AI Generating Indicator / ProgressBar */}
                      {isGenerating && (
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-semibold text-indigo-400 flex items-center space-x-1.5 animate-pulse">
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 spin" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H12M4 9h8" />
                              </svg>
                              <span>AI Generating Speech...</span>
                            </span>
                            <span className="text-xs font-mono font-bold text-zinc-400">{generationProgress}%</span>
                          </div>
                          <div className="w-full bg-zinc-950/50 rounded-full h-1.5 overflow-hidden border border-zinc-800">
                            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-1.5 rounded-full transition-all duration-100" style={{ width: `${generationProgress}%` }}></div>
                          </div>
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row items-center justify-between border-t border-zinc-800/10 dark:border-zinc-800/50 pt-4 gap-4">
                        <div className="text-xs text-zinc-400 flex items-center space-x-2">
                          {inputText.trim() && (
                            <span>{inputText.trim().split(/\s+/).length} words entered</span>
                          )}
                        </div>

                        <div className="flex space-x-3 w-full sm:w-auto">
                          {/* Start Writing button */}
                          <button
                            onClick={() => {
                              const newScript: Script = {
                                id: `script-${Date.now()}`,
                                title: 'New Speech Script',
                                content: inputText.trim() || 'Welcome back. Let\'s practice speaking clearly and pacing ourselves.',
                                editedAt: 'Just now',
                                readTime: '1 min read',
                                category: activeCategory || 'Presentation'
                              }
                              setScripts([newScript, ...scripts])
                              setEditingScript(newScript)
                            }}
                            className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center space-x-2 ${
                              theme === 'dark' ? 'bg-zinc-800 hover:bg-zinc-700 text-white' : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-950'
                            }`}
                            disabled={isGenerating}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                            <span>Start Writing</span>
                          </button>

                          {/* Generate with AI button */}
                          <button
                            onClick={handleAiGenerate}
                            className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all flex items-center justify-center space-x-2"
                            disabled={isGenerating}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-indigo-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                            <span>Generate with AI</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Filter Categories pills */}
                  <div className="flex flex-wrap items-center justify-center gap-2.5 pt-4">
                    {CATEGORIES.map((cat) => {
                      const isSelected = activeCategory === cat
                      return (
                        <button
                          key={cat}
                          onClick={() => selectCategory(cat)}
                          className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-200 shadow-sm ${
                            isSelected
                              ? 'bg-zinc-800 text-white border-zinc-700'
                              : (theme === 'dark' 
                                  ? 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800/80 hover:text-white' 
                                  : 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50 hover:text-zinc-950')
                          }`}
                        >
                          {cat}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Recent Scripts Section */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="font-display font-extrabold text-2xl md:text-3xl tracking-tight">
                      Recent Scripts
                    </h2>
                    
                    <button
                      onClick={() => setActiveTab('my-scripts')}
                      className={`text-sm font-semibold flex items-center space-x-1.5 transition-colors ${
                        theme === 'dark' ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-500'
                      }`}
                    >
                      <span>View all scripts</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {scripts.slice(0, 3).map((script) => (
                      <div
                        key={script.id}
                        onClick={() => startPractice(script)}
                        className={`group relative rounded-2xl border p-6 flex flex-col justify-between h-[210px] cursor-pointer hover:-translate-y-1 transition-all duration-300 shadow-md ${
                          theme === 'dark' 
                            ? 'bg-zinc-900 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-850 hover:shadow-black/30' 
                            : 'bg-white border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50/50 hover:shadow-zinc-200/50'
                        }`}
                      >
                        <div className="space-y-3">
                          <div className="flex items-start justify-between gap-4">
                            <h3 className={`font-display font-bold text-lg leading-snug line-clamp-1 group-hover:text-indigo-500 transition-colors ${theme === 'dark' ? 'text-zinc-100' : 'text-zinc-900'}`}>
                              {script.title}
                            </h3>
                            <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${theme === 'dark' ? 'bg-zinc-800 text-zinc-400 border border-zinc-700/50' : 'bg-zinc-100 text-zinc-600 border border-zinc-200'}`}>
                              {script.category}
                            </span>
                          </div>
                          <p className={`text-sm leading-relaxed line-clamp-3 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                            {script.content}
                          </p>
                        </div>

                        <div className="flex items-center justify-between border-t border-zinc-800/10 dark:border-zinc-800/50 pt-4 mt-auto">
                          <span className="text-xs text-zinc-400">
                            Edited {script.editedAt}
                          </span>
                          
                          <div className="flex items-center space-x-1.5 text-xs text-zinc-400">
                            {/* Clock icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{script.readTime}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Need Inspiration? Section */}
                <div className="space-y-6">
                  <h2 className="font-display font-extrabold text-2xl md:text-3xl tracking-tight">
                    Need Inspiration?
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {INSPIRATIONS.map((insp) => {
                      // Highlight the first card by default as in reference screenshot
                      const isHighlighted = insp.id === 'insp-1'
                      return (
                        <div
                          key={insp.id}
                          onClick={() => {
                            setInputText(insp.prompt)
                            // Scroll to input container smoothly
                            window.scrollTo({ top: 120, behavior: 'smooth' })
                          }}
                          className={`group rounded-2xl border p-6 space-y-4 cursor-pointer hover:-translate-y-1 transition-all duration-300 shadow-md ${
                            isHighlighted
                              ? (theme === 'dark' 
                                  ? 'bg-violet-950/20 border-violet-800/40 hover:border-violet-500 text-violet-100 hover:shadow-violet-950/10' 
                                  : 'bg-indigo-50 border-indigo-200/80 hover:border-indigo-400 text-indigo-950 hover:shadow-indigo-100/50')
                              : (theme === 'dark' 
                                  ? 'bg-zinc-900 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-850 hover:shadow-black/30' 
                                  : 'bg-white border-zinc-200 hover:border-zinc-350 hover:bg-zinc-50/50 hover:shadow-zinc-200/50')
                          }`}
                        >
                          {insp.icon}

                          <div className="space-y-2">
                            <h3 className={`font-display font-bold text-base leading-snug group-hover:text-indigo-500 transition-colors ${
                              isHighlighted && theme === 'light' ? 'text-indigo-900' : (theme === 'dark' ? 'text-zinc-100' : 'text-zinc-900')
                            }`}>
                              {insp.title}
                            </h3>
                            <p className={`text-xs leading-relaxed ${
                              isHighlighted 
                                ? (theme === 'dark' ? 'text-violet-300' : 'text-indigo-700') 
                                : 'text-zinc-400'
                            }`}>
                              {insp.description}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

              </div>
            )}

            {/* My Scripts Tab */}
            {activeTab === 'my-scripts' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-display font-extrabold text-3xl tracking-tight">
                      My Speech Scripts
                    </h2>
                    <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'} mt-1`}>
                      Create, edit, and launch practice sessions for all your saved speech templates.
                    </p>
                  </div>

                  <button
                    onClick={startNewScript}
                    className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl shadow-md flex items-center space-x-2 transition-all"
                  >
                    {/* Add/Plus icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Create New Script</span>
                  </button>
                </div>

                {scripts.length === 0 ? (
                  <div className={`rounded-2xl border-2 border-dashed p-12 text-center ${theme === 'dark' ? 'border-zinc-800' : 'border-zinc-300'}`}>
                    <p className="text-zinc-400 font-medium">No scripts yet. Create a new one or generate with AI on the homepage.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {scripts.map((script) => (
                      <div
                        key={script.id}
                        onClick={() => startPractice(script)}
                        className={`group relative rounded-2xl border p-6 flex flex-col justify-between min-h-[220px] cursor-pointer hover:-translate-y-1 transition-all duration-300 shadow-md ${
                          theme === 'dark' 
                            ? 'bg-zinc-900 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-850 hover:shadow-black/30' 
                            : 'bg-white border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50/50 hover:shadow-zinc-200/50'
                        }`}
                      >
                        <div className="space-y-3">
                          <div className="flex items-start justify-between gap-4">
                            <h3 className={`font-display font-bold text-lg leading-snug line-clamp-1 group-hover:text-indigo-500 transition-colors ${theme === 'dark' ? 'text-zinc-100' : 'text-zinc-900'}`}>
                              {script.title}
                            </h3>
                            
                            <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${theme === 'dark' ? 'bg-zinc-800 text-zinc-400 border border-zinc-700/50' : 'bg-zinc-100 text-zinc-600 border border-zinc-200'}`}>
                              {script.category}
                            </span>
                          </div>
                          <p className={`text-sm leading-relaxed line-clamp-3 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                            {script.content}
                          </p>
                        </div>

                        <div className="flex items-center justify-between border-t border-zinc-800/10 dark:border-zinc-800/50 pt-4 mt-6">
                          <span className="text-[11px] text-zinc-400">
                            Edited {script.editedAt}
                          </span>

                          <div className="flex items-center space-x-3">
                            <button
                              onClick={(e) => { e.stopPropagation(); setEditingScript(script); }}
                              className={`p-1.5 rounded hover:bg-zinc-950/20 text-zinc-400 hover:text-zinc-200 transition-colors`}
                              title="Edit script content"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                              </svg>
                            </button>
                            <button
                              onClick={(e) => deleteScript(script.id, e)}
                              className={`p-1.5 rounded hover:bg-red-500/10 text-zinc-400 hover:text-red-400 transition-colors`}
                              title="Delete script"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Practice History Tab */}
            {activeTab === 'practice-history' && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h2 className="font-display font-extrabold text-3xl tracking-tight">
                    Practice History Log
                  </h2>
                  <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'} mt-1`}>
                    Review logs of your past speaking practices, calculated speaking speeds, and tracking pace statistics.
                  </p>
                </div>

                {logs.length === 0 ? (
                  <div className={`rounded-2xl border p-12 text-center ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                    <p className="text-zinc-400 font-medium">No practice history recorded yet. Open a script and run a microphone practice to generate logs.</p>
                  </div>
                ) : (
                  <div className={`rounded-2xl border overflow-hidden shadow-md ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className={`border-b text-xs font-semibold uppercase tracking-wider ${theme === 'dark' ? 'bg-zinc-950 text-zinc-400 border-zinc-800' : 'bg-zinc-50 text-zinc-600 border-zinc-200'}`}>
                            <th className="py-4 px-6">Script</th>
                            <th className="py-4 px-6">Date & Time</th>
                            <th className="py-4 px-6">Duration</th>
                            <th className="py-4 px-6">Est. Speed</th>
                            <th className="py-4 px-6">Pacing Rating</th>
                            <th className="py-4 px-6 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-850 dark:divide-zinc-800">
                          {logs.map((log) => (
                            <tr key={log.id} className={`text-sm ${theme === 'dark' ? 'hover:bg-zinc-850/40 text-zinc-200' : 'hover:bg-zinc-50 text-zinc-850'}`}>
                              <td className="py-4 px-6 font-semibold">{log.scriptTitle}</td>
                              <td className="py-4 px-6 text-zinc-400 font-mono text-xs">{log.date}</td>
                              <td className="py-4 px-6 font-mono text-xs">
                                {Math.floor(log.duration / 60)}m {log.duration % 60}s
                              </td>
                              <td className="py-4 px-6 font-semibold text-indigo-400 font-mono text-xs">
                                {log.wpm} WPM
                              </td>
                              <td className="py-4 px-6">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                  log.paceRating === 'Perfect'
                                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                    : log.paceRating === 'Too Fast'
                                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                      : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                }`}>
                                  {log.paceRating}
                                </span>
                              </td>
                              <td className="py-4 px-6 text-right">
                                <button
                                  onClick={() => {
                                    if (confirm('Delete this practice log record?')) {
                                      setLogs(logs.filter(l => l.id !== log.id))
                                    }
                                  }}
                                  className="text-zinc-500 hover:text-red-400 transition-colors p-1"
                                  title="Delete history log"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>
        )}

      </main>

      {/* Footer */}
      <footer className={`py-8 text-center text-xs mt-16 border-t ${
        theme === 'dark' ? 'border-zinc-800/80 text-zinc-500 bg-zinc-950/20' : 'border-zinc-200/80 text-zinc-400 bg-white/20'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} SpeakFlow Studio. Elevate your speaking with AI assistance.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:underline transition-all">Privacy Policy</a>
            <a href="#" className="hover:underline transition-all">Terms of Service</a>
            <a href="#" className="hover:underline transition-all">Support Desk</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
