import type React from 'react'
import type { Script } from '../types'
import { CATEGORIES } from '../types'

interface EditorViewProps {
  theme: 'dark' | 'light'
  editingScript: Script
  setEditingScript: React.Dispatch<React.SetStateAction<Script | null>>
  saveEditedScript: () => void
}

export default function EditorView({
  theme,
  editingScript,
  setEditingScript,
  saveEditedScript
}: EditorViewProps) {
  return (
    <div className="animate-fadeIn">
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={() => setEditingScript(null)}
          className={`flex items-center space-x-2 text-sm font-medium ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'} hover:text-indigo-500 transition-colors`}
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
          <div className="text-xs text-zinc-400 font-mono">
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
  )
}
