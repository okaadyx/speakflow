interface HeaderProps {
  activeTab: 'home' | 'my-scripts' | 'practice-history'
  setActiveTab: (tab: 'home' | 'my-scripts' | 'practice-history') => void
  theme: 'dark' | 'light'
  setTheme: (theme: 'dark' | 'light') => void
  showSettings: boolean
  setShowSettings: (show: boolean) => void
  toggleFullscreen: () => void
  isFullscreen: boolean
  isPracticing: boolean
  editingScript: any
  setEditingScript: (val: any) => void
  setIsPracticing: (val: boolean) => void
}

export default function Header({
  activeTab,
  setActiveTab,
  theme,
  setTheme,
  showSettings,
  setShowSettings,
  toggleFullscreen,
  isFullscreen,
  isPracticing,
  editingScript,
  setEditingScript,
  setIsPracticing
}: HeaderProps) {
  const navigateTo = (tab: 'home' | 'my-scripts' | 'practice-history') => {
    setActiveTab(tab)
    setIsPracticing(false)
    setEditingScript(null)
  }

  return (
    <header className={`sticky top-0 z-30 px-6 py-4 flex items-center justify-between border-b ${theme === 'dark' ? 'bg-zinc-950/80 border-zinc-800/80 backdrop-blur-md' : 'bg-white/80 border-zinc-200/80 backdrop-blur-md'}`}>
      <div className="flex items-center space-x-8">
        <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => navigateTo('home')}>
          <svg viewBox="0 0 100 100" className="w-8 h-8 text-indigo-500 dark:text-indigo-400 transform -translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="7.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M 25 43 C 27 43, 29 33, 34 33 C 39 33, 37 57, 40 57 C 43 57, 40 70, 43 70 C 46 70, 48 25, 55 25 C 62 25, 73 25, 74 27 C 76 29, 73 35, 71 41 C 69 47, 67 49, 64 49 C 61 49, 58 38, 55 38 C 52 38, 52 45, 54 49 C 56 53, 59 53, 61 53 C 63 53, 65 47, 67 43" />
          </svg>
          <span className="font-display font-extrabold text-2.5xl tracking-tight text-zinc-900 dark:text-white hover:opacity-90 transition-opacity">
            SpeakFlow
          </span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-1">
          <button
            onClick={() => navigateTo('home')}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
              activeTab === 'home' && !isPracticing && !editingScript
                ? (theme === 'dark' ? 'bg-zinc-800 text-white' : 'bg-zinc-100 text-zinc-900')
                : (theme === 'dark' ? 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900' : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100')
            }`}
          >
            Home
          </button>
          <button
            onClick={() => navigateTo('my-scripts')}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
              activeTab === 'my-scripts' || editingScript
                ? (theme === 'dark' ? 'bg-zinc-800 text-white' : 'bg-zinc-100 text-zinc-900')
                : (theme === 'dark' ? 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900' : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100')
            }`}
          >
            My Scripts
          </button>
          <button
            onClick={() => navigateTo('practice-history')}
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
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          ) : (
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
  )
}
