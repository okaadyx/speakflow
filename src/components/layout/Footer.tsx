interface FooterProps {
  theme: "dark" | "light";
}

export default function Footer({ theme }: FooterProps) {
  void theme;
  return (
    <footer className="py-8 text-center text-xs mt-20 border-t border-border-subtle text-text-muted bg-surface-primary/10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} SpeakFlow Studio. Elevate your delivery with AI assistance.</p>
        <div className="flex space-x-6 font-semibold">
          <a href="#" className="hover:text-accent transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-accent transition-colors">
            Terms of Service
          </a>
          <a href="#" className="hover:text-accent transition-colors">
            Support Desk
          </a>
        </div>
      </div>
    </footer>
  );
}
