import { DEVELOPER_CONFIG } from "../../config/developer";

interface FooterProps {
  theme: "dark" | "light";
  activeTab: string;
  setActiveTab: (tab: any) => void;
  setIsPracticing?: (val: boolean) => void;
  setEditingScript?: (val: any) => void;
}

// ─── Custom Inline SVG Social Icons for maximum safety and compatibility ─────
function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

export default function Footer({
  theme,
  activeTab,
  setActiveTab,
  setIsPracticing,
  setEditingScript,
}: FooterProps) {
  void theme;

  const navigateTo = (tab: string) => {
    setActiveTab(tab);
    if (setIsPracticing) setIsPracticing(false);
    if (setEditingScript) setEditingScript(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 border-t border-border-subtle bg-surface-primary/10 text-text-muted mt-24">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Brand Column */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center space-x-2.5 cursor-pointer group" onClick={() => navigateTo("home")}>
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-accent shadow-md shadow-accent/15 group-hover:scale-105 transition-transform duration-300">
              <svg
                viewBox="0 0 100 100"
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M 25 43 C 27 43, 29 33, 34 33 C 39 33, 37 57, 40 57 C 43 57, 40 70, 43 70 C 46 70, 48 25, 55 25 C 62 25, 73 25, 74 27 C 76 29, 73 35, 71 41 C 69 47, 67 49, 64 49 C 61 49, 58 38, 55 38 C 52 38, 52 45, 54 49 C 56 53, 59 53, 61 53 C 63 53, 65 47, 67 43" />
              </svg>
            </div>
            <span className="font-display font-extrabold text-lg tracking-tight text-text-primary">
              {DEVELOPER_CONFIG.productName}
            </span>
          </div>

          <p className="text-xs text-text-secondary leading-relaxed max-w-sm">
            SpeakFlow is a modern AI-powered teleprompter designed to help users practice English speaking, storytelling, presentations, interviews, speeches, and content creation with confidence.
          </p>

          {/* Social Icons */}
          <div className="flex items-center space-x-3">
            <a
              href={DEVELOPER_CONFIG.portfolioUrl}
              target="_blank"
              rel="noreferrer"
              title="Portfolio"
              className="p-2 rounded-lg bg-surface-secondary border border-border-subtle/50 text-text-secondary hover:text-accent hover:border-accent/30 hover:scale-105 transition-all"
            >
              <GlobeIcon className="w-4 h-4" />
            </a>
            <a
              href={DEVELOPER_CONFIG.githubUrl}
              target="_blank"
              rel="noreferrer"
              title="GitHub"
              className="p-2 rounded-lg bg-surface-secondary border border-border-subtle/50 text-text-secondary hover:text-accent hover:border-accent/30 hover:scale-105 transition-all"
            >
              <GitHubIcon className="w-4 h-4" />
            </a>
            <a
              href={DEVELOPER_CONFIG.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              title="LinkedIn"
              className="p-2 rounded-lg bg-surface-secondary border border-border-subtle/50 text-text-secondary hover:text-accent hover:border-accent/30 hover:scale-105 transition-all"
            >
              <LinkedInIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Space Spacer */}
        <div className="hidden md:block md:col-span-1" />

        {/* Navigation Links Column */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="text-xs font-bold text-text-primary uppercase tracking-wider">
            Explore
          </h4>
          <nav className="flex flex-col gap-2.5 text-xs font-medium text-text-secondary">
            <button
              onClick={() => navigateTo("home")}
              className={`text-left hover:text-accent transition-colors cursor-pointer ${
                activeTab === "home" ? "text-accent font-bold" : ""
              }`}
            >
              Home View
            </button>
            <button
              onClick={() => navigateTo("my-scripts")}
              className={`text-left hover:text-accent transition-colors cursor-pointer ${
                activeTab === "my-scripts" ? "text-accent font-bold" : ""
              }`}
            >
              My Scripts
            </button>
            <button
              onClick={() => navigateTo("support")}
              className={`text-left hover:text-accent transition-colors cursor-pointer ${
                activeTab === "support" ? "text-accent font-bold" : ""
              }`}
            >
              Support Desk
            </button>
            <button
              onClick={() => navigateTo("about")}
              className={`text-left hover:text-accent transition-colors cursor-pointer ${
                activeTab === "about" ? "text-accent font-bold" : ""
              }`}
            >
              About SpeakFlow
            </button>
          </nav>
        </div>

        {/* Legal Column */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="text-xs font-bold text-text-primary uppercase tracking-wider">
            Privacy & Trust
          </h4>
          <nav className="flex flex-col gap-2.5 text-xs font-medium text-text-secondary">
            <button
              onClick={() => navigateTo("privacy-policy")}
              className={`text-left hover:text-accent transition-colors cursor-pointer ${
                activeTab === "privacy-policy" ? "text-accent font-bold" : ""
              }`}
            >
              Privacy Policy
            </button>
            <button
              onClick={() => navigateTo("terms-conditions")}
              className={`text-left hover:text-accent transition-colors cursor-pointer ${
                activeTab === "terms-conditions" ? "text-accent font-bold" : ""
              }`}
            >
              Terms & Conditions
            </button>
          </nav>
        </div>

      </div>

      {/* Copyright line */}
      <div className="max-w-7xl mx-auto px-6 border-t border-border-subtle/25 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-text-muted">
        <p>© {new Date().getFullYear()} {DEVELOPER_CONFIG.productName}. All rights reserved.</p>
        <div className="flex items-center gap-1">
          <span>Built and maintained with</span>
          <HeartIcon className="w-3 h-3 text-error fill-error animate-pulse" />
          <span>by</span>
          <a
            href={DEVELOPER_CONFIG.portfolioUrl}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-text-secondary hover:text-accent hover:underline"
          >
            {DEVELOPER_CONFIG.developerName}
          </a>
        </div>
      </div>
    </footer>
  );
}
