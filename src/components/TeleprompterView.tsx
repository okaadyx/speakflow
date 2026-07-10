import React, { useState } from 'react'
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
  toggleFullscreen: () => void
  isFullscreen: boolean
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
  setIsPlaying,
  toggleFullscreen,
  isFullscreen
}: TeleprompterViewProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [activeParagraphIndex, setActiveParagraphIndex] = useState(0)

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget
    const containerCenter = container.scrollTop + container.clientHeight / 2

    const paragraphs = container.getElementsByTagName('p')
    let closestIndex = 0
    let closestDistance = Infinity

    for (let i = 0; i < paragraphs.length; i++) {
      const p = paragraphs[i]
      if (!p) continue
      const pTop = p.offsetTop
      const pHeight = p.clientHeight
      const pCenter = pTop + pHeight / 2
      const distance = Math.abs(containerCenter - pCenter)

      if (distance < closestDistance) {
        closestDistance = distance
        closestIndex = i
      }
    }

    setActiveParagraphIndex(closestIndex)
  }

  return (
    <div className={`animate-fadeIn transition-all duration-300 ${
      isFullscreen 
        ? 'max-w-full w-full h-[100vh] p-6 flex flex-col justify-between' 
        : 'max-w-4xl mx-auto space-y-6'
    }`}>
      {/* Immersive Top Navigation Bar */}
      <div className="flex items-center justify-between gap-4 mb-6">
        {/* Left: Exit/Back Button */}
        <button
          onClick={() => setIsPracticing(false)}
          className={`flex items-center space-x-1 text-sm font-medium opacity-65 hover:opacity-100 transition-opacity cursor-pointer ${
            theme === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-zinc-950'
          }`}
          title="Exit Session"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <span className="sr-only md:not-sr-only">Exit</span>
        </button>

        {/* Right: Fullscreen + Settings Drawer Icon buttons */}
        <div className="flex items-center space-x-3">
          {/* Fullscreen Toggle Button */}
          <button
            onClick={toggleFullscreen}
            className={`p-2.5 rounded-xl border cursor-pointer transition-colors shadow-xs ${
              isFullscreen 
                ? 'bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/10'
                : (theme === 'dark' 
                    ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800' 
                    : 'bg-white border-zinc-200 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50')
            }`}
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 9L4 4m0 0h4M4 4v4m11 1l5-5m0 0h-4m4 0v4M9 15l-5 5m0 0h4m-4 0v-4m11-1l5 5m0 0h-4m4 0v-4" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            )}
          </button>

          {/* Settings Drawer Button */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className={`p-2.5 rounded-xl border cursor-pointer transition-colors shadow-xs ${
              theme === 'dark' 
                ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800' 
                : 'bg-white border-zinc-200 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50'
            }`}
            title="Adjust settings"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Scrolling Teleprompter Box */}
      <div className={`relative flex flex-col rounded-2xl border shadow-lg overflow-hidden transition-all duration-300 ${
        isFullscreen 
          ? 'flex-1 border-none shadow-none rounded-none bg-zinc-950/20' 
          : (theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200')
      }`}>
        {/* Spotify-style scrolling container (static guide line removed) */}
        <div
          ref={teleprompterRef}
          onScroll={handleScroll}
          className={`overflow-y-auto px-8 md:px-12 py-[200px] text-center select-none leading-relaxed transition-all duration-300 font-medium relative ${fontSize} ${
            isFullscreen ? 'flex-1 h-full' : 'h-[420px]'
          } ${
            theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
          }`}
          style={{ scrollBehavior: 'smooth' }}
        >
          {practiceScript.content.split(/\n+/).map((p) => p.trim()).filter(Boolean).map((paragraph, pIdx) => {
            const isActive = pIdx === activeParagraphIndex
            return (
              <p 
                key={pIdx} 
                className={`mb-10 transition-all duration-350 transform origin-center ${
                  isActive 
                    ? 'text-zinc-900 dark:text-white font-bold opacity-100 scale-[1.05]' 
                    : 'text-zinc-400 dark:text-zinc-600 opacity-25 scale-95 blur-[0.5px]'
                }`}
              >
                {paragraph}
              </p>
            )
          })}
          
          <div className="h-[200px]" /> {/* Extra scroll padding */}
        </div>
      </div>

      {/* Footer Teleprompter Actions */}
      <div className="flex justify-center items-center space-x-6 mt-8">
        {/* Mic Record Toggle */}
        <button
          onClick={() => setIsRecording(!isRecording)}
          className={`p-4 rounded-full shadow-lg transition-all duration-300 border cursor-pointer ${
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
          className="p-6 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-600/30 hover:scale-105 transition-all cursor-pointer"
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
          className={`p-4 rounded-full border transition-all cursor-pointer ${
            theme === 'dark' ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700' : 'bg-white hover:bg-zinc-100 text-zinc-700 border-zinc-300'
          }`}
          title="Reset scroll position"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H12M4 9h8" />
          </svg>
        </button>
      </div>

      {/* Settings Drawer overlay */}
      {isDrawerOpen && (
        <>
          {/* Backdrop overlay */}
          <div 
            onClick={() => setIsDrawerOpen(false)}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
          />

          {/* Sliding settings drawer */}
          <div className={`fixed top-0 right-0 h-full w-80 shadow-2xl p-6 z-50 flex flex-col border-l transition-all duration-300 ${
            theme === 'dark' ? 'bg-zinc-900 border-zinc-800 text-zinc-100' : 'bg-white border-zinc-200 text-zinc-900'
          }`}>
            <div className="flex items-center justify-between border-b pb-4 mb-6 border-zinc-800/10 dark:border-zinc-850">
              <div>
                <span className="text-[10px] uppercase font-bold text-zinc-450 tracking-wider">Practice Session</span>
                <h3 className="font-display font-bold text-lg flex items-center space-x-2 text-indigo-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Prompter Settings</span>
                </h3>
              </div>
              <button 
                onClick={() => setIsDrawerOpen(false)}
                className={`p-1.5 rounded-lg hover:bg-zinc-500/10 transition-colors cursor-pointer ${
                  theme === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-zinc-500 hover:text-zinc-950'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Scrollable configs */}
            <div className="flex-1 overflow-y-auto space-y-8 pr-1">
              
              {/* Script Info */}
              <div className="space-y-1">
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">Active Script</span>
                <p className="text-sm font-semibold truncate">{practiceScript.title}</p>
                <p className="text-xs text-zinc-500">{practiceScript.category} • {practiceScript.readTime}</p>
              </div>

              {/* Font Size Selector */}
              <div className="space-y-3 border-t pt-4 border-zinc-800/10 dark:border-zinc-850">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">Font Size</label>
                <div className="grid grid-cols-3 gap-2 p-1 rounded-xl border bg-zinc-950/10 border-zinc-800/10 dark:border-zinc-800/50">
                  <button
                    onClick={() => setFontSize('text-lg md:text-2xl')}
                    className={`py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                      fontSize === 'text-lg md:text-2xl' 
                        ? 'bg-indigo-600 text-white shadow-sm' 
                        : (theme === 'dark' ? 'text-zinc-400 hover:text-white hover:bg-zinc-800/30' : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100')
                    }`}
                  >
                    Small
                  </button>
                  <button
                    onClick={() => setFontSize('text-xl md:text-3xl')}
                    className={`py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                      fontSize === 'text-xl md:text-3xl' 
                        ? 'bg-indigo-600 text-white shadow-sm' 
                        : (theme === 'dark' ? 'text-zinc-400 hover:text-white hover:bg-zinc-800/30' : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100')
                    }`}
                  >
                    Medium
                  </button>
                  <button
                    onClick={() => setFontSize('text-2xl md:text-4xl')}
                    className={`py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                      fontSize === 'text-2xl md:text-4xl' 
                        ? 'bg-indigo-600 text-white shadow-sm' 
                        : (theme === 'dark' ? 'text-zinc-400 hover:text-white hover:bg-zinc-800/30' : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100')
                    }`}
                  >
                    Large
                  </button>
                </div>
              </div>

              {/* Scroll Speed Adjustment */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">Scroll Speed</label>
                  <span className="text-xs font-semibold font-mono px-2 py-0.5 rounded text-indigo-400 border border-indigo-500/20 bg-indigo-500/5">
                    {scrollSpeed}x
                  </span>
                </div>
                <div className="p-4 rounded-xl border bg-zinc-950/10 border-zinc-800/10 dark:border-zinc-800/50 flex items-center">
                  <input
                    type="range"
                    min="0.5"
                    max="4"
                    step="0.1"
                    value={scrollSpeed}
                    onChange={(e) => setScrollSpeed(Number(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                </div>
              </div>

              {/* Display Mode Settings */}
              <div className="space-y-3">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">Display Mode</label>
                <button
                  onClick={toggleFullscreen}
                  className={`w-full py-3 rounded-xl border font-semibold text-sm transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                    isFullscreen 
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/10'
                      : (theme === 'dark' 
                          ? 'bg-zinc-950/20 border-zinc-800 hover:text-white hover:bg-zinc-800' 
                          : 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100')
                  }`}
                >
                  {isFullscreen ? (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9L4 4m0 0h4M4 4v4m11 1l5-5m0 0h-4m4 0v4M9 15l-5 5m0 0h4m-4 0v-4m11-1l5 5m0 0h-4m4 0v-4" />
                      </svg>
                      <span>Exit Fullscreen</span>
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                      <span>Enter Fullscreen</span>
                    </>
                  )}
                </button>
              </div>

              {/* Practice Stats/Mic Details */}
              <div className="space-y-3 border-t pt-6 border-zinc-800/10 dark:border-zinc-850">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">Recording Stats</label>
                <div className="p-4 rounded-xl border bg-zinc-950/10 border-zinc-800/10 dark:border-zinc-800/50 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-zinc-400">Duration:</span>
                    <span className="text-sm font-semibold font-mono text-indigo-400">
                      {Math.floor(recordingSeconds / 60)}:{(recordingSeconds % 60).toString().padStart(2, '0')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-zinc-400">Status:</span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${
                      isRecording ? 'bg-red-500/10 text-red-400 border border-red-500/20 animate-pulse' : 'bg-zinc-800 text-zinc-400'
                    }`}>
                      {isRecording ? 'Recording' : 'Idle'}
                    </span>
                  </div>

                  {isRecording && (
                    <div className="pt-2">
                      <div className="flex items-end justify-center space-x-1.5 h-10 text-indigo-500">
                        {soundBars.map((level, i) => (
                          <span
                            key={i}
                            className="wave-bar w-1.5 bg-indigo-500 rounded-sm"
                            style={{
                              height: level === 1 ? '6px' : level === 2 ? '18px' : '30px',
                              animationName: level === 1 ? 'quiet' : level === 2 ? 'normal-wave' : 'loud-wave'
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Quick Actions at the bottom */}
            <div className="border-t pt-4 mt-6 border-zinc-800/10 dark:border-zinc-850 space-y-3">
              <button
                onClick={() => {
                  setIsDrawerOpen(false)
                  finishPractice()
                }}
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold rounded-xl text-sm shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                </svg>
                <span>Save Practice Session</span>
              </button>

              <button
                onClick={() => setIsPracticing(false)}
                className={`w-full py-2.5 rounded-xl border text-sm font-semibold transition-all cursor-pointer text-center ${
                  theme === 'dark'
                    ? 'border-zinc-800 hover:bg-zinc-800 text-zinc-400 hover:text-white'
                    : 'border-zinc-200 hover:bg-zinc-50 text-zinc-600 hover:text-zinc-950'
                }`}
              >
                Exit Session without Saving
              </button>
            </div>

          </div>
        </>
      )}
    </div>
  )
}
