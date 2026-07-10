import type React from 'react'
import type { PracticeLog } from '../types'

interface PracticeHistoryViewProps {
  theme: 'dark' | 'light'
  logs: PracticeLog[]
  setLogs: React.Dispatch<React.SetStateAction<PracticeLog[]>>
}

export default function PracticeHistoryView({
  theme,
  logs,
  setLogs
}: PracticeHistoryViewProps) {
  return (
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
  )
}
