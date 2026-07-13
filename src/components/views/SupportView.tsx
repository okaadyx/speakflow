import React, { useState } from "react";
import { DEVELOPER_CONFIG } from "../../config/developer";
import { Button } from "../ui/button";
import {
  HelpCircle,
  Mail,
  Bug,
  Lightbulb,
  MessageSquare,
  FileText,
  ChevronDown,
  ChevronUp,
  Send,
  CheckCircle,
  ExternalLink,
  BookOpen,
} from "lucide-react";

// FAQ type definition
interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "How do I use the teleprompter?",
    answer:
      "Select any script card from your Dashboard or composed templates. This loads the Teleprompter Studio layout. Click the circular Play button at the bottom center to start auto-scrolling. You can adjust the speaking speed, change text size, enable mirror format (for glass rigs), and use microphone testing on-the-fly.",
  },
  {
    question: "How does AI script generation work?",
    answer:
      "When composing a script, you can enter general outline concepts or topic ideas. The generator connects to artificial intelligence models to organize thoughts, pacing structures, and speech drafts. SpeakFlow leaves full creative control and ownership to you: always review and edit your script before presentation.",
  },
  {
    question: "How do I change scroll speed?",
    answer:
      "During an active teleprompter session, look at the settings drawer (gear icon at the top right, or bottom left of options) and drag the Scroll Speed slider. You can cycle from a slow 0.5x pacing to a fast 4.0x presentation speed, custom tailored to your target Words Per Minute (WPM) settings.",
  },
  {
    question: "How do I enable fullscreen?",
    answer:
      "Click the Maximize window button (box layout icon) located at the top navigation bar or inside the settings drawer to toggle fullscreen presentation mode. Fullscreen locks the page and disables standard page scroll scrollbars to create a focus-intensive, distraction-free screen layout.",
  },
  {
    question: "Can I save scripts?",
    answer:
      "Yes. All scripts you write or generate are saved automatically in your browser's persistent localStorage database. They are safely kept on your local machine. However, if you clear your browser cookies/data, these templates will be cleared, so make sure to keep local backup drafts.",
  },
  {
    question: "How do I report a bug?",
    answer:
      "If you experience rendering jitter, scroll misalignment, or layout issues, please check the 'Report a Bug' card below. You can submit bug reports via GitHub Issues or email us directly at support@speakflow.app with steps to reproduce the issue.",
  },
  {
    question: "How do I request a feature?",
    answer:
      "We love to implement tools that improve your speaking confidence! Submit feature ideas using the dedicated 'Feature Requests' outline card below, or drop a line to our developer via LinkedIn/GitHub or email.",
  },
  {
    question: "Is my data private?",
    answer:
      "Yes, absolutely. SpeakFlow doesn't copy, upload, or reuse your presentation content or practice scripts on remote databases. All composing and history logs are kept inside your local browser cache database. AI prompts are securely processed and never sold to third parties.",
  },
];

export default function SupportView() {
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formSubject, setFormSubject] = useState("");
  const [formCategory, setFormCategory] = useState("support");
  const [formMessage, setFormMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Accordion state for FAQs
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaqIndex = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMessage) return;

    setIsSubmitting(true);
    // Simulate a premium network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormName("");
      setFormEmail("");
      setFormSubject("");
      setFormMessage("");
      // Reset success status after 6 seconds
      setTimeout(() => setIsSubmitted(false), 6000);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fadeIn space-y-12 text-text-primary">
      {/* Hero section */}
      <div className="text-center space-y-3 py-8">
        <div className="inline-flex items-center justify-center p-3.5 rounded-3xl bg-accent/10 text-accent mb-2">
          <HelpCircle className="w-10 h-10" />
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight">
          Need Help?
        </h1>
        <p className="text-text-secondary max-w-xl mx-auto text-sm md:text-base">
          We're here to help you get the most out of SpeakFlow. Explore common questions or contact support.
        </p>
      </div>

      {/* Main Grid: FAQs & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* FAQs Accordion Section (Left/Top) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl md:text-2xl font-display font-bold">Frequently Asked Questions</h2>
            <p className="text-xs text-text-secondary">
              Find quick answers to common support topics and teleprompter setup guides.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className={`border rounded-2xl transition-all duration-300 ${
                    isOpen
                      ? "bg-surface-primary/45 border-accent/20 shadow-md"
                      : "bg-surface-primary/15 border-border-subtle/50 hover:bg-surface-primary/25"
                  }`}
                >
                  <button
                    onClick={() => toggleFaqIndex(idx)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left font-bold text-sm md:text-base cursor-pointer"
                  >
                    <span className={isOpen ? "text-accent" : "text-text-primary"}>
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-accent" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-text-muted" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs md:text-sm text-text-secondary leading-relaxed border-t border-border-subtle/25 animate-fadeIn">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Support Request Form & Contact Card (Right/Bottom) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Contact Card */}
          <div className="bg-surface-primary/25 border border-border-subtle/50 backdrop-blur-md p-6 rounded-3xl space-y-4 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center font-bold">
                AY
              </div>
              <div>
                <h4 className="text-sm font-bold text-text-primary">Aajad Yadav</h4>
                <p className="text-[10px] text-text-muted font-bold uppercase tracking-wider">
                  Developer & Creator
                </p>
              </div>
            </div>

            <p className="text-xs text-text-secondary leading-relaxed">
              Have technical support queries, business partnership proposals, or localized configuration questions? Reach out directly.
            </p>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center py-1.5 border-b border-border-subtle/20">
                <span className="text-text-muted font-semibold">Email support:</span>
                <a href={`mailto:${DEVELOPER_CONFIG.supportEmail}`} className="text-accent hover:underline font-bold">
                  {DEVELOPER_CONFIG.supportEmail}
                </a>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-border-subtle/20">
                <span className="text-text-muted font-semibold">Portfolio URL:</span>
                <a
                  href={DEVELOPER_CONFIG.portfolioUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent hover:underline font-bold flex items-center gap-1"
                >
                  <span>okaadyx</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-surface-primary/25 border border-border-subtle/50 backdrop-blur-md p-6 rounded-3xl shadow-lg space-y-4">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider">
                Send a Message
              </h3>
              <p className="text-xs text-text-secondary">
                We'll respond to your support request within 24 business hours.
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-start gap-3 animate-fadeIn text-emerald-500">
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <p className="font-bold">Message Sent Successfully!</p>
                  <p className="text-emerald-500/80">
                    Thank you for contacting SpeakFlow. We have received your inquiry.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-3.5">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="Aajad"
                      className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-border-subtle bg-surface-secondary/40 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/15 focus:border-accent/40"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="name@domain.com"
                      className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-border-subtle bg-surface-secondary/40 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/15 focus:border-accent/40"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formSubject}
                    onChange={(e) => setFormSubject(e.target.value)}
                    placeholder="Brief description"
                    className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-border-subtle bg-surface-secondary/40 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/15 focus:border-accent/40"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider">
                    Category
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-border-subtle bg-surface-secondary/40 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/15 focus:border-accent/40 cursor-pointer"
                  >
                    <option value="support">General Support</option>
                    <option value="bug">Report a Bug</option>
                    <option value="feature">Feature Idea</option>
                    <option value="business">Business Inquiries</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    placeholder="Describe how we can help you..."
                    className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-border-subtle bg-surface-secondary/40 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/15 focus:border-accent/40 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="default"
                  size="md"
                  disabled={isSubmitting}
                  className="w-full justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                </Button>
              </form>
            )}
          </div>
        </div>

      </div>

      {/* Grid: Bug Report & Feature Request Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-border-subtle/40 pt-10">
        
        {/* Report a Bug Card */}
        <div className="bg-surface-primary/15 border border-border-subtle/50 p-6 rounded-3xl space-y-4 hover:border-accent/25 transition-all">
          <div className="flex items-center gap-3 text-accent">
            <Bug className="w-6 h-6" />
            <h3 className="text-lg font-bold font-display">Report a Bug</h3>
          </div>
          <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
            Spotted a glitch, scrolling lag, or formatting misalignment? We appreciate reproducible bug submissions. File logs, screenshots, and details to make SpeakFlow smoother for everyone.
          </p>
          <a
            href={`${DEVELOPER_CONFIG.githubUrl}/speakflow/issues`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline"
          >
            <span>Submit a Bug on GitHub</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Feature Requests Card */}
        <div className="bg-surface-primary/15 border border-border-subtle/50 p-6 rounded-3xl space-y-4 hover:border-accent/25 transition-all">
          <div className="flex items-center gap-3 text-accent">
            <Lightbulb className="w-6 h-6" />
            <h3 className="text-lg font-bold font-display">Feature Requests</h3>
          </div>
          <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
            Have ideas for speaking pacing gauges, customizable overlay cards, analytics reporting, or speech practice tools? Share your workflow needs and help build the future versions of SpeakFlow!
          </p>
          <a
            href={`mailto:${DEVELOPER_CONFIG.supportEmail}?subject=Feature Request - SpeakFlow`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline"
          >
            <span>Email Feature Suggestions</span>
            <Mail className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>

      {/* Community Channels (5 links) */}
      <div className="border-t border-border-subtle/40 pt-10 space-y-6">
        <div className="text-center space-y-1">
          <h3 className="text-xl font-display font-bold">Community & Links</h3>
          <p className="text-xs text-text-secondary">
            Connect with our developer, view source guides, and follow product releases.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <a
            href={DEVELOPER_CONFIG.portfolioUrl}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center justify-center p-5 rounded-2xl bg-surface-primary/20 border border-border-subtle/40 hover:border-accent/30 transition-all text-center group"
          >
            <ExternalLink className="w-6 h-6 text-text-muted group-hover:text-accent group-hover:scale-110 transition-all mb-2" />
            <span className="text-xs font-bold">Portfolio</span>
            <span className="text-[10px] text-text-muted truncate w-full mt-0.5">okaadyx.vercel.app</span>
          </a>

          <a
            href={DEVELOPER_CONFIG.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center justify-center p-5 rounded-2xl bg-surface-primary/20 border border-border-subtle/40 hover:border-accent/30 transition-all text-center group"
          >
            <BookOpen className="w-6 h-6 text-text-muted group-hover:text-accent group-hover:scale-110 transition-all mb-2" />
            <span className="text-xs font-bold">GitHub Code</span>
            <span className="text-[10px] text-text-muted truncate w-full mt-0.5">github.com/okaadyx</span>
          </a>

          <a
            href={DEVELOPER_CONFIG.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center justify-center p-5 rounded-2xl bg-surface-primary/20 border border-border-subtle/40 hover:border-accent/30 transition-all text-center group"
          >
            <MessageSquare className="w-6 h-6 text-text-muted group-hover:text-accent group-hover:scale-110 transition-all mb-2" />
            <span className="text-xs font-bold">LinkedIn</span>
            <span className="text-[10px] text-text-muted truncate w-full mt-0.5">Connect on LinkedIn</span>
          </a>

          <div
            className="flex flex-col items-center justify-center p-5 rounded-2xl bg-surface-primary/5 border border-border-subtle/20 text-center opacity-70 cursor-not-allowed"
            title="Future community Discord coming soon!"
          >
            <MessageSquare className="w-6 h-6 text-text-muted mb-2" />
            <span className="text-xs font-bold">Discord</span>
            <span className="text-[10px] text-text-muted mt-0.5">Coming Soon</span>
          </div>

          <div
            className="flex flex-col items-center justify-center p-5 rounded-2xl bg-surface-primary/5 border border-border-subtle/20 text-center opacity-70 cursor-not-allowed"
            title="SaaS User Guides under development"
          >
            <FileText className="w-6 h-6 text-text-muted mb-2" />
            <span className="text-xs font-bold">Documentation</span>
            <span className="text-[10px] text-text-muted mt-0.5">Planned Release</span>
          </div>
        </div>
      </div>
    </div>
  );
}
