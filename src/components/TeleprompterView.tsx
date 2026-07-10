import type React from 'react'
import type { Script } from '../types'

interface TeleprompterViewProps {
  theme: 'dark' | 'light'
  practiceScript: Script
  setIsPracticing: (val: boolean) => void
  finishPractice: () => void
  teleprompterRef: React.RefObject<HTMLDivElement | null>
  fontSize: string
  setFontSize: (size: string) => void
  scrollSpeed: number
  setScrollSpeed: (speed: number) => void
  isRecording: boolean
  setIsRecording: (rec: boolean) => void
  recordingSeconds: number
  soundBars: number[]
  isPlaying: boolean
  setIsPlaying: (play: boolean) => void
}

export default function TeleprompterView({
  theme,
  practiceScript,
  setIsPracticing,
  finishPractice,
  teleprompterRef,
  fontSize,
  setFontSize,
  scrollSpeed,
  setScrollSpeed,
  isRecording,
  setIsRecording,
  recordingSeconds,
  soundBars,
  isPlaying,
  setIsPlaying
}: TeleprompterViewProps) {
  return (
    <div className="animate-fadeIn max-w-4xl mx-auto">
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <button
          onClick={() => setIsPracticing(false)}
          className={`flex items-center space-x-2 text-sm font-medium ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'} hover:text-indigo-500 transition-colors`}
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
            <p key={pIdx} className="mb-10 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors duration-200">
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
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
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
  )
}
