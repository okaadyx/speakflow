import { useState, useEffect, useRef } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeView from './components/HomeView'
import MyScriptsView from './components/MyScriptsView'
import PracticeHistoryView from './components/PracticeHistoryView'
import EditorView from './components/EditorView'
import TeleprompterView from './components/TeleprompterView'

import type { Script, PracticeLog } from './types'
import { INITIAL_SCRIPTS } from './types'

export default function App() {
  // Navigation & Theme State
  const [activeTab, setActiveTab] = useState<'home' | 'my-scripts' | 'practice-history'>('home')
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  
  // Scripts state
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
  const [scrollSpeed, setScrollSpeed] = useState(1.5)
  const [fontSize, setFontSize] = useState('text-xl md:text-3xl')
  const [isRecording, setIsRecording] = useState(false)
  const [recordingSeconds, setRecordingSeconds] = useState(0)
  const [soundBars, setSoundBars] = useState<number[]>([1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
  
  // Script Editor State
  const [editingScript, setEditingScript] = useState<Script | null>(null)
  
  // Practice History Logs
  const [logs, setLogs] = useState<PracticeLog[]>(() => {
    const saved = localStorage.getItem('speakflow_logs')
    return saved ? JSON.parse(saved) : []
  })

  // Fullscreen Helper
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
          Array.from({ length: 10 }, () => Math.floor(Math.random() * 3) + 1)
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

  // Trigger Simulated AI Speech Generation
  const handleAiGenerate = () => {
    const prompt = inputText.trim() || 'Write a speech about public speaking and confidence.'
    setIsGenerating(true)
    setGenerationProgress(0)

    const totalDuration = 2500
    const step = 50
    let current = 0

    const progressInterval = setInterval(() => {
      current += step
      const progress = Math.min((current / totalDuration) * 100, 100)
      setGenerationProgress(Math.floor(progress))

      if (progress >= 100) {
        clearInterval(progressInterval)
        
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

  return (
    <div className={`flex flex-col min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-zinc-950 text-zinc-100' : 'bg-zinc-50 text-zinc-900'}`}>
      
      {/* Header component */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        setTheme={setTheme}
        showSettings={showSettings}
        setShowSettings={setShowSettings}
        toggleFullscreen={toggleFullscreen}
        isFullscreen={isFullscreen}
        isPracticing={isPracticing}
        editingScript={editingScript}
        setEditingScript={setEditingScript}
        setIsPracticing={setIsPracticing}
      />

      {/* Target Settings Popover */}
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

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-8">
        
        {/* Render View Components depending on Active State */}
        {editingScript ? (
          <EditorView
            theme={theme}
            editingScript={editingScript}
            setEditingScript={setEditingScript}
            saveEditedScript={saveEditedScript}
          />
        ) : isPracticing && practiceScript ? (
          <TeleprompterView
            theme={theme}
            practiceScript={practiceScript}
            setIsPracticing={setIsPracticing}
            finishPractice={finishPractice}
            teleprompterRef={teleprompterRef}
            fontSize={fontSize}
            setFontSize={setFontSize}
            scrollSpeed={scrollSpeed}
            setScrollSpeed={setScrollSpeed}
            isRecording={isRecording}
            setIsRecording={setIsRecording}
            recordingSeconds={recordingSeconds}
            soundBars={soundBars}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />
        ) : activeTab === 'home' ? (
          <HomeView
            theme={theme}
            scripts={scripts}
            setScripts={setScripts}
            inputText={inputText}
            setInputText={setInputText}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            isGenerating={isGenerating}
            generationProgress={generationProgress}
            handleAiGenerate={handleAiGenerate}
            startPractice={startPractice}
            setEditingScript={setEditingScript}
            setActiveTab={setActiveTab}
          />
        ) : activeTab === 'my-scripts' ? (
          <MyScriptsView
            theme={theme}
            scripts={scripts}
            setScripts={setScripts}
            startPractice={startPractice}
            setEditingScript={setEditingScript}
            startNewScript={startNewScript}
          />
        ) : (
          <PracticeHistoryView
            theme={theme}
            logs={logs}
            setLogs={setLogs}
          />
        )}

      </main>

      {/* Footer component */}
      <Footer theme={theme} />
    </div>
  )
}
