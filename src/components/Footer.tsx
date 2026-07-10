interface FooterProps {
  theme: 'dark' | 'light'
}

export default function Footer({ theme }: FooterProps) {
  return (
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
  )
}
