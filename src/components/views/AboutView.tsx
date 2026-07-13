import { DEVELOPER_CONFIG } from "../../config/developer";
import { Info, Award, User, Code, Heart, MessageSquare } from "lucide-react";

export default function AboutView() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fadeIn space-y-10 text-text-primary">
      {/* Hero Section */}
      <div className="text-center space-y-3 py-6">
        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-accent/10 text-accent mb-2">
          <Info className="w-8 h-8" />
        </div>
        <h1 className="text-3xl md:text-4xl font-display font-extrabold tracking-tight">
          About SpeakFlow
        </h1>
        <p className="text-text-secondary max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
          Practice. Improve. Speak with Confidence. SpeakFlow is built to make public speaking and narration practice accessible, intelligent, and distraction-free.
        </p>
      </div>

      {/* About Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-surface-primary/25 border border-border-subtle/50 rounded-3xl shadow-md space-y-3">
          <div className="flex items-center gap-2.5 text-accent">
            <Award className="w-5 h-5" />
            <h3 className="font-display font-bold text-base md:text-lg">The Mission</h3>
          </div>
          <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
            SpeakFlow is a modern AI-powered teleprompter designed to help users practice English speaking, storytelling, presentations, interviews, speeches, and content creation with confidence. It combines intelligent script generation with a distraction-free teleprompter experience to make speaking practice more effective and enjoyable.
          </p>
        </div>

        <div className="p-6 bg-surface-primary/25 border border-border-subtle/50 rounded-3xl shadow-md space-y-3">
          <div className="flex items-center gap-2.5 text-accent">
            <Code className="w-5 h-5" />
            <h3 className="font-display font-bold text-base md:text-lg">Core Features</h3>
          </div>
          <ul className="text-xs md:text-sm text-text-secondary space-y-2 list-none">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>Fluid, jitter-free scroll velocity controls.</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>Glassmorphism focus guidelines & Mirror Mode.</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>Intelligent prompt-to-speech script templates.</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>Persistent browser history practice logs.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Developer Spotlight */}
      <div className="bg-surface-primary/25 border border-border-subtle/50 p-6 md:p-8 rounded-3xl shadow-lg space-y-6">
        <h3 className="text-lg font-bold flex items-center gap-2 border-b border-border-subtle/40 pb-2.5">
          <User className="w-5 h-5 text-accent" />
          <span>Meet the Creator</span>
        </h3>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="w-20 h-20 rounded-2xl bg-accent shadow-md shadow-accent/20 flex items-center justify-center text-white text-3xl font-extrabold flex-shrink-0">
            AY
          </div>
          <div className="space-y-4 text-center md:text-left flex-1">
            <div className="space-y-0.5">
              <h4 className="text-base font-bold">{DEVELOPER_CONFIG.developerName}</h4>
              <p className="text-xs text-text-secondary">Full-Stack Software Engineer & SaaS Builder</p>
            </div>

            <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
              Aajad Yadav is a software engineer passionate about building high-performance, user-centric interfaces. SpeakFlow was conceived as a distraction-free, privacy-first studio dashboard for public speakers, content creators, and learners to review their vocal delivery, timing, and cadence.
            </p>

            {/* Social Pill Buttons */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 pt-2">
              <a
                href={DEVELOPER_CONFIG.portfolioUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-surface-secondary/80 hover:bg-hover-surface/80 border border-border-subtle transition-all cursor-pointer"
              >
                <Heart className="w-3.5 h-3.5 text-error" />
                <span>Developer Portfolio</span>
              </a>

              <a
                href={DEVELOPER_CONFIG.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-surface-secondary/80 hover:bg-hover-surface/80 border border-border-subtle transition-all cursor-pointer"
              >
                <Code className="w-3.5 h-3.5" />
                <span>GitHub Profile</span>
              </a>

              <a
                href={DEVELOPER_CONFIG.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-surface-secondary/80 hover:bg-hover-surface/80 border border-border-subtle transition-all cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-accent" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
