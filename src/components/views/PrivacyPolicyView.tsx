import { DEVELOPER_CONFIG } from "../../config/developer";
import { Eye, ShieldCheck, Database, Mail, Info, FileText } from "lucide-react";

export default function PrivacyPolicyView() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fadeIn space-y-8 text-text-primary">
      <div className="text-center space-y-3 py-6">
        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-accent/10 text-accent mb-2">
          <Eye className="w-8 h-8" />
        </div>
        <h1 className="text-3xl md:text-4xl font-display font-extrabold tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-text-secondary max-w-xl mx-auto text-sm md:text-base">
          This policy describes how we collect, use, and protect your information when using SpeakFlow.
        </p>
        <p className="text-xs text-text-muted">Last updated: July 2026</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1 space-y-2.5 md:sticky md:top-24 h-fit">
          <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block px-3">
            Core Policies
          </span>
          <nav className="flex flex-col gap-1 text-xs font-semibold text-text-secondary">
            <a href="#intro" className="px-3 py-2 rounded-lg hover:bg-surface-secondary/60 hover:text-text-primary transition-all">
              1. Introduction
            </a>
            <a href="#collection" className="px-3 py-2 rounded-lg hover:bg-surface-secondary/60 hover:text-text-primary transition-all">
              2. Information We Collect
            </a>
            <a href="#storage" className="px-3 py-2 rounded-lg hover:bg-surface-secondary/60 hover:text-text-primary transition-all">
              3. Local Storage & Cookies
            </a>
            <a href="#ai-processing" className="px-3 py-2 rounded-lg hover:bg-surface-secondary/60 hover:text-text-primary transition-all">
              4. AI Data Processing
            </a>
            <a href="#security" className="px-3 py-2 rounded-lg hover:bg-surface-secondary/60 hover:text-text-primary transition-all">
              5. Security & Retention
            </a>
            <a href="#rights" className="px-3 py-2 rounded-lg hover:bg-surface-secondary/60 hover:text-text-primary transition-all">
              6. User Rights & Third-Parties
            </a>
            <a href="#contact" className="px-3 py-2 rounded-lg hover:bg-accent/10 hover:text-accent transition-all">
              7. Privacy Inquiries
            </a>
          </nav>
        </div>

        <div className="md:col-span-3 space-y-10 bg-surface-primary/25 border border-border-subtle/50 backdrop-blur-md p-6 md:p-8 rounded-3xl shadow-xl">
          
          <section id="intro" className="space-y-3">
            <h3 className="text-lg font-bold flex items-center gap-2 border-b border-border-subtle/40 pb-2">
              <ShieldCheck className="w-4 h-4 text-accent" />
              <span>1. Introduction</span>
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              At <strong>{DEVELOPER_CONFIG.productName}</strong>, developed by <strong>{DEVELOPER_CONFIG.developerName}</strong>, your data privacy is our absolute priority. We design our platform to operate with a privacy-first mindset, ensuring that your scripts, templates, and speech metrics remain secure and under your absolute control.
            </p>
            <p className="text-sm text-text-secondary leading-relaxed">
              This Privacy Policy details the types of information we collect, how that data is stored locally or processed via external services, and your rights concerning your personal information.
            </p>
          </section>

          <section id="collection" className="space-y-3">
            <h3 className="text-lg font-bold flex items-center gap-2 border-b border-border-subtle/40 pb-2">
              <Database className="w-4 h-4 text-accent" />
              <span>2. Information We Collect</span>
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              We collect information in two main ways to offer our teleprompter services:
            </p>
            <div className="space-y-4">
              <div className="space-y-1">
                <h4 className="text-xs font-extrabold uppercase tracking-wide text-text-muted">A. Information You Provide</h4>
                <p className="text-sm text-text-secondary leading-relaxed">
                  <strong>User Compositions:</strong> Any speech scripts, draft templates, category tags, or practice text logs you directly type, edit, or import into the application.
                </p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  <strong>Support Communications:</strong> Name, email address, message subjects, and inquiries you provide when submitting a support ticket or requesting assistance.
                </p>
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-extrabold uppercase tracking-wide text-text-muted">B. Automatically Collected Information</h4>
                <p className="text-sm text-text-secondary leading-relaxed">
                  <strong>Interface Configuration:</strong> Local preferences such as font size choices, scroll velocity parameters, mirror configuration toggles, and light/dark theme choices are stored to maintain application state.
                </p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  <strong>Speech Volume Metrics:</strong> Standard microphone decibel levels and visual sound waves are processed locally in real-time. We do not store, record, or transmit audio files.
                </p>
              </div>
            </div>
          </section>

          <section id="storage" className="space-y-3">
            <h3 className="text-lg font-bold flex items-center gap-2 border-b border-border-subtle/40 pb-2">
              <Database className="w-4 h-4 text-accent" />
              <span>3. Local Storage & Cookies</span>
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              We leverage HTML5 Local Storage (such as `localStorage`) instead of tracking cookies to save your configurations, logs, and speech files directly inside your own web browser's storage sandbox.
            </p>
            <div className="p-4 rounded-2xl bg-surface-secondary/50 border border-border-subtle/80 space-y-2">
              <div className="flex items-center gap-2 text-accent">
                <Info className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Browser Control</span>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                Because all files reside in your local browser sandbox, clearing your browser cache or deleting application storage will clear your saved scripts. We do not use third-party tracking or advertising cookies.
              </p>
            </div>
          </section>

          <section id="ai-processing" className="space-y-3 bg-accent/5 p-4.5 rounded-2xl border border-accent/15">
            <h3 className="text-base font-extrabold text-accent flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span>4. AI Data Processing</span>
            </h3>
            <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
              When using the **AI Suggestion** or **AI Generation** utilities, your prompt keywords are sent to secure external artificial intelligence API services to produce speech drafts. 
            </p>
            <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
              <strong>Data Separation:</strong> These services do not store your prompts or recycle your custom drafts to train their models. Your AI-generated teleprompter templates belong entirely to you.
            </p>
          </section>

          <section id="security" className="space-y-3">
            <h3 className="text-lg font-bold flex items-center gap-2 border-b border-border-subtle/40 pb-2">
              <ShieldCheck className="w-4 h-4 text-accent" />
              <span>5. Security & Data Retention</span>
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              We employ SSL/TLS encryption protocols during any API data transmissions (such as contacting AI generator endpoints).
            </p>
            <p className="text-sm text-text-secondary leading-relaxed">
              <strong>Retention Policy:</strong> Because we do not store your scripts on centralized database servers, we retain zero copies of your private speaking materials. They are retained in your browser cache indefinitely until you choose to delete them or clear your web browser data.
            </p>
          </section>

          <section id="rights" className="space-y-3">
            <h3 className="text-lg font-bold flex items-center gap-2 border-b border-border-subtle/40 pb-2">
              <FileText className="w-4 h-4 text-accent" />
              <span>6. User Rights, Children, & Third-Parties</span>
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              <strong>Your Control:</strong> You have absolute authority over your templates. You can edit, export, or permanently delete any scripts directly from the Dashboard or by clearing your browser cache.
            </p>
            <p className="text-sm text-text-secondary leading-relaxed">
              <strong>Children's Privacy:</strong> SpeakFlow is not designed to target or log data from children under the age of 13.
            </p>
            <p className="text-sm text-text-secondary leading-relaxed">
              <strong>International Data Transfers:</strong> Any AI prompt requests are processed in secure environments and in compliance with standard international data transmission principles.
            </p>
          </section>

          <section id="contact" className="space-y-4 pt-4 border-t border-border-subtle">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Mail className="w-4 h-4 text-accent" />
              <span>7. Privacy Inquiries</span>
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              If you have queries or complaints regarding our data and local storage parameters, contact the developer at:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-surface-secondary/40 rounded-xl border border-border-subtle/50 space-y-1">
                <span className="font-bold text-text-muted">Support Email</span>
                <a href={`mailto:${DEVELOPER_CONFIG.supportEmail}`} className="block text-accent hover:underline">
                  {DEVELOPER_CONFIG.supportEmail}
                </a>
              </div>
              <div className="p-3 bg-surface-secondary/40 rounded-xl border border-border-subtle/50 space-y-1">
                <span className="font-bold text-text-muted">Business Inquiries</span>
                <a href={`mailto:${DEVELOPER_CONFIG.businessEmail}`} className="block text-accent hover:underline">
                  {DEVELOPER_CONFIG.businessEmail}
                </a>
              </div>
              <div className="p-3 bg-surface-secondary/40 rounded-xl border border-border-subtle/50 space-y-1 sm:col-span-2">
                <span className="font-bold text-text-muted">Developer Details</span>
                <a href={DEVELOPER_CONFIG.portfolioUrl} target="_blank" rel="noreferrer" className="block text-accent hover:underline">
                  {DEVELOPER_CONFIG.developerName} Portfolio ({DEVELOPER_CONFIG.portfolioUrl})
                </a>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
