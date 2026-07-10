import type React from 'react'
import type { Script } from '../types'
import { INSPIRATIONS, CATEGORIES } from '../types'

interface HomeViewProps {
  theme: 'dark' | 'light'
  scripts: Script[]
  setScripts: React.Dispatch<React.SetStateAction<Script[]>>
  inputText: string
  setInputText: (text: string) => void
  activeCategory: string
  setActiveCategory: (cat: string) => void
  isGenerating: boolean
  generationProgress: number
  handleAiGenerate: () => void
  startPractice: (script: Script) => void
  setEditingScript: (script: Script | null) => void
  setActiveTab: (tab: 'home' | 'my-scripts' | 'practice-history') => void
}

export default function HomeView({
  theme,
  scripts,
  setScripts,
  inputText,
  setInputText,
  activeCategory,
  setActiveCategory,
  isGenerating,
  generationProgress,
  handleAiGenerate,
  startPractice,
  setEditingScript,
  setActiveTab
}: HomeViewProps) {

  const renderInspirationIcon = (type: string) => {
    switch (type) {
      case 'leaf':
        return (
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20 transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
            </svg>
          </div>
        )
      case 'mic':
        return (
          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
            theme === 'dark' ? 'bg-zinc-800 text-zinc-300 group-hover:bg-zinc-700' : 'bg-zinc-100 text-zinc-600 group-hover:bg-zinc-200'
          }`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </div>
        )
      case 'shield':
        return (
          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
            theme === 'dark' ? 'bg-zinc-800 text-zinc-300 group-hover:bg-zinc-700' : 'bg-zinc-100 text-zinc-600 group-hover:bg-zinc-200'
          }`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
        )
      case 'megaphone':
      default:
        return (
          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
            theme === 'dark' ? 'bg-zinc-800 text-zinc-300 group-hover:bg-zinc-700' : 'bg-zinc-100 text-zinc-600 group-hover:bg-zinc-200'
          }`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
            </svg>
          </div>
        )
    }
  }

  const selectCategory = (cat: string) => {
    setActiveCategory(cat)
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

  return (
    <div className="space-y-16 animate-fadeIn">
      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto space-y-6">
        <h1 className="font-display font-extrabold text-5xl md:text-7xl leading-tight tracking-tight">
          <span className="text-zinc-800 dark:text-zinc-300">Practice Your Speech</span>
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
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 spin animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H12M4 9h8" />
                    </svg>
                    <span>AI Generating Speech...</span>
                  </span>
                  <span className="text-xs font-mono font-bold text-zinc-400">{generationProgress}%</span>
                </div>
                <div className={`w-full rounded-full h-1.5 overflow-hidden border ${theme === 'dark' ? 'bg-zinc-950/50 border-zinc-800' : 'bg-zinc-100 border-zinc-200'}`}>
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
            const isHighlighted = insp.id === 'insp-1'
            return (
              <div
                key={insp.id}
                onClick={() => {
                  setInputText(insp.prompt)
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
                {renderInspirationIcon(insp.iconType)}

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
  )
}
