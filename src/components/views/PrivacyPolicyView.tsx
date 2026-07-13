import React from "react";
import { DEVELOPER_CONFIG } from "../../config/developer";
import { Eye, ShieldCheck, Database, Mail } from "lucide-react";

export default function PrivacyPolicyView() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fadeIn space-y-8 text-text-primary">
      {/* Hero Section */}
      <div className="text-center space-y-3 py-6">
        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-accent/10 text-accent mb-2">
          <Eye className="w-8 h-8" />
        </div>
        <h1 className="text-3xl md:text-4xl font-display font-extrabold tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-text-secondary max-w-xl mx-auto text-sm md:text-base">
          Your privacy is our core priority. Learn how we handle your templates, local storage, and AI prompts.
        </p>
        <p className="text-xs text-text-muted">Last updated: July 2026</p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Quick Nav */}
        <div className="md:col-span-1 space-y-2.5 md:sticky md:top-24 h-fit">
          <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block px-3">
            Core Policies
          </span>
          <nav className="flex flex-col gap-1 text-xs font-semibold text-text-secondary">
            <a href="#collection" className="px-3 py-2 rounded-lg hover:bg-surface-secondary/60 hover:text-text-primary transition-all">
              1. Information We Collect
            </a>
            <a href="#ai-storage" className="px-3 py-2 rounded-lg hover:bg-surface-secondary/60 hover:text-text-primary transition-all text-accent">
              2. Local Storage & AI
            </a>
            <a href="#retention" className="px-3 py-2 rounded-lg hover:bg-surface-secondary/60 hover:text-text-primary transition-all">
              3. Data Retention
            </a>
            <a href="#user-rights" className="px-3 py-2 rounded-lg hover:bg-surface-secondary/60 hover:text-text-primary transition-all">
              4. Your Rights & Ownership
            </a>
            <a href="#contact" className="px-3 py-2 rounded-lg hover:bg-accent/10 hover:text-accent transition-all">
              5. Support Inquiries
            </a>
          </nav>
        </div>

        {/* Policy Text */}
        <div className="md:col-span-3 space-y-10 bg-surface-primary/25 border border-border-subtle/50 backdrop-blur-md p-6 md:p-8 rounded-3xl shadow-xl">
          
          <section id="intro" className="space-y-3">
            <h3 className="text-lg font-bold flex items-center gap-2 border-b border-border-subtle/40 pb-2">
              <ShieldCheck className="w-4 h-4 text-accent" />
              <span>1. Introduction</span>
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              At <strong>{DEVELOPER_CONFIG.productName}</strong>, developed by <strong>{DEVELOPER_CONFIG.developerName}</strong>, we are committed to safeguarding your privacy. Our teleprompter platform is designed to respect your data ownership and handle script generation securely.
            </p>
            <p className="text-sm text-text-secondary leading-relaxed">
              We do not sell, rent, or distribute your practice templates or private drafts to third-party advertising companies.
            </p>
          </section>

          <section id="collection" className="space-y-3">
            <h3 className="text-lg font-bold flex items-center gap-2 border-b border-border-subtle/40 pb-2">
              <Database className="w-4 h-4 text-accent" />
              <span>2. Information We Collect</span>
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              We minimize data collection to the absolute necessity:
            </p>
            <ul className="list-disc pl-5 text-sm text-text-secondary space-y-1.5">
              <li><strong>Local Scripts & Templates:</strong> All scripts you compose, edit, or customize are saved in your web browser's local storage database.</li>
              <li><strong>Usage Analytics:</strong> Standard analytics might be logged to track feature clicks, load speeds, and generic system responsiveness.</li>
              <li><strong>Speech Synthesis/Mic Prompts:</strong> Standard microphone access is strictly used locally inside your browser tab to render practice volume levels and metrics. We do not store or transmit raw voice recordings.</li>
            </ul>
          </section>

          <section id="ai-storage" className="space-y-3 bg-accent/5 p-4.5 rounded-2xl border border-accent/15">
            <h3 className="text-base font-extrabold text-accent flex items-center gap-2">
              <Database className="w-4 h-4" />
              <span>3. AI Outlines & Local Storage</span>
            </h3>
            <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
              <strong>AI Script Prompts:</strong> To generate outlines and speech drafts, the platform sends prompt keywords to secure artificial intelligence processing nodes. This query structure is strictly used to shape the response template.
            </p>
            <p className="text-xs md:text-sm text-text-secondary leading-relaxed font-bold">
              <strong>100% User Ownership:</strong> Your outlines, composed prompts, and edited teleprompter content remain exclusively yours. We do not recycle your drafts to train AI models.
            </p>
          </section>

          <section id="retention" className="space-y-3">
            <h3 className="text-lg font-bold flex items-center gap-2 border-b border-border-subtle/40 pb-2">
              <ShieldCheck className="w-4 h-4 text-accent" />
              <span>4. Data Security & Retention</span>
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              Because your scripts are stored in your local browser cache, clearing your browser data or application storage will delete your local scripts. We recommend backing up critical scripts in external document files.
            </p>
            <p className="text-sm text-text-secondary leading-relaxed">
              We employ encryption standards on any configuration databases to protect system settings from unauthorized modification.
            </p>
          </section>

          <section id="user-rights" className="space-y-3">
            <h3 className="text-lg font-bold flex items-center gap-2 border-b border-border-subtle/40 pb-2">
              <Eye className="w-4 h-4 text-accent" />
              <span>5. Children's Privacy & Policy Updates</span>
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              We do not knowingly target or gather details from individuals under the age of 13. We reserve the right to modify this policy as layout and feature specs update.
            </p>
          </section>

          <section id="contact" className="space-y-4 pt-4 border-t border-border-subtle">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Mail className="w-4 h-4 text-accent" />
              <span>6. Privacy Inquiries</span>
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              If you have any questions about how your local storage parameters are handled, contact the developer at:
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
