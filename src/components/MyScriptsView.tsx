import type React from 'react'
import type { Script } from '../types'

interface MyScriptsViewProps {
  theme: 'dark' | 'light'
  scripts: Script[]
  setScripts: React.Dispatch<React.SetStateAction<Script[]>>
  startPractice: (script: Script) => void
  setEditingScript: (script: Script | null) => void
  startNewScript: () => void
}

export default function MyScriptsView({
  theme,
  scripts,
  setScripts,
  startPractice,
  setEditingScript,
  startNewScript
}: MyScriptsViewProps) {
  
  const deleteScript = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (confirm('Are you sure you want to delete this script?')) {
      setScripts(scripts.filter(s => s.id !== id))
    }
  }

  return (
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
  )
}
