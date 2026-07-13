import { DEVELOPER_CONFIG } from "../../config/developer";
import { Shield, FileText, Scale, HelpCircle } from "lucide-react";

export default function TermsConditionsView() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fadeIn space-y-8 text-text-primary">
      <div className="text-center space-y-3 py-6">
        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-accent/10 text-accent mb-2">
          <Scale className="w-8 h-8" />
        </div>
        <h1 className="text-3xl md:text-4xl font-display font-extrabold tracking-tight">
          Terms & Conditions
        </h1>
        <p className="text-text-secondary max-w-xl mx-auto text-sm md:text-base">
          Please read these terms carefully before using SpeakFlow. By accessing the platform, you agree to be bound by them.
        </p>
        <p className="text-xs text-text-muted">Last updated: July 2026</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1 space-y-2.5 md:sticky md:top-24 h-fit">
          <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block px-3">
            Quick Navigation
          </span>
          <nav className="flex flex-col gap-1 text-xs font-semibold text-text-secondary">
            <a href="#intro" className="px-3 py-2 rounded-lg hover:bg-surface-secondary/60 hover:text-text-primary transition-all">
              1. Introduction
            </a>
            <a href="#responsibilities" className="px-3 py-2 rounded-lg hover:bg-surface-secondary/60 hover:text-text-primary transition-all">
              2. User Conduct
            </a>
            <a href="#ai-disclaimer" className="px-3 py-2 rounded-lg hover:bg-surface-secondary/60 hover:text-text-primary transition-all">
              3. AI Disclaimer
            </a>
            <a href="#intellectual-property" className="px-3 py-2 rounded-lg hover:bg-surface-secondary/60 hover:text-text-primary transition-all">
              4. IP Rights & Ownership
            </a>
            <a href="#liability" className="px-3 py-2 rounded-lg hover:bg-surface-secondary/60 hover:text-text-primary transition-all">
              5. Service Availability
            </a>
            <a href="#contact" className="px-3 py-2 rounded-lg hover:bg-accent/10 hover:text-accent transition-all">
              6. Contact Support
            </a>
          </nav>
        </div>

        <div className="md:col-span-3 space-y-10 bg-surface-primary/25 border border-border-subtle/50 backdrop-blur-md p-6 md:p-8 rounded-3xl shadow-xl">
          
          <section id="intro" className="space-y-3">
            <h3 className="text-lg font-bold flex items-center gap-2 border-b border-border-subtle/40 pb-2">
              <FileText className="w-4 h-4 text-accent" />
              <span>1. Introduction & Acceptance</span>
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              Welcome to <strong>{DEVELOPER_CONFIG.productName}</strong>. These Terms & Conditions govern your access to and use of {DEVELOPER_CONFIG.productName}, a web-based teleprompter application designed and developed by <strong>{DEVELOPER_CONFIG.developerName}</strong>.
            </p>
            <p className="text-sm text-text-secondary leading-relaxed">
              By using SpeakFlow, you represent that you are at least 13 years of age and agree to comply with all guidelines outlined in this document. If you do not agree, please discontinue using the service immediately.
            </p>
          </section>

          <section id="responsibilities" className="space-y-3">
            <h3 className="text-lg font-bold flex items-center gap-2 border-b border-border-subtle/40 pb-2">
              <Shield className="w-4 h-4 text-accent" />
              <span>2. Eligibility & User Conduct</span>
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              You are responsible for safeguarding your practice sessions, saved templates, and browser localStorage data. You agree not to abuse, disrupt, or bypass any application features, including rate limits or service configurations.
            </p>
            <p className="text-sm text-text-secondary leading-relaxed font-bold">
              Acceptable Use Policy:
            </p>
            <ul className="list-disc pl-5 text-sm text-text-secondary space-y-1.5">
              <li>No automated data scraping or extraction from our teleprompter page.</li>
              <li>No usage of script generators for fraudulent or abusive messaging.</li>
              <li>Compliance with all applicable local, regional, and international speaking or broadcasting laws.</li>
            </ul>
          </section>

          <section id="ai-disclaimer" className="space-y-3 bg-accent/5 p-4.5 rounded-2xl border border-accent/15">
            <h3 className="text-base font-extrabold text-accent flex items-center gap-2">
              <Scale className="w-4 h-4" />
              <span>3. AI-Generated Content Disclaimer</span>
            </h3>
            <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
              SpeakFlow incorporates intelligent third-party artificial intelligence engines to help generate speech outlines, scripts, and practice guides. All AI outputs are generated based on user prompts.
            </p>
            <p className="text-xs md:text-sm text-text-secondary leading-relaxed font-bold">
              We make no representations or warranties regarding the accuracy, legal safety, completeness, or appropriateness of AI outlines. Users must carefully review and edit any AI script before public presentation, commercial publication, or recording.
            </p>
          </section>

          <section id="intellectual-property" className="space-y-3">
            <h3 className="text-lg font-bold flex items-center gap-2 border-b border-border-subtle/40 pb-2">
              <FileText className="w-4 h-4 text-accent" />
              <span>4. Intellectual Property & Ownership</span>
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              The application layout, design systems, graphical assets, styling parameters, and unique code (excluding standard library dependencies) are the absolute intellectual property of <strong>{DEVELOPER_CONFIG.developerName}</strong>.
            </p>
            <p className="text-sm text-text-secondary leading-relaxed">
              <strong>User Content Ownership:</strong> Any scripts, presentation drafts, or recordings created or uploaded by you inside SpeakFlow remain 100% under your intellectual ownership. SpeakFlow does not claim rights to your raw creative materials.
            </p>
          </section>

          <section id="liability" className="space-y-3">
            <h3 className="text-lg font-bold flex items-center gap-2 border-b border-border-subtle/40 pb-2">
              <Shield className="w-4 h-4 text-accent" />
              <span>5. Availability, Warranties & Liability</span>
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              {DEVELOPER_CONFIG.productName} is provided on an "AS IS" and "AS AVAILABLE" basis. We make no guarantees of continuous uptime or bug-free operations.
            </p>
            <p className="text-sm text-text-secondary leading-relaxed">
              To the maximum extent permitted by law, the developer (Aajad Yadav) shall not be liable for any direct, indirect, incidental, or consequential damages resulting from browser local storage clearing, lost scripts, or script delivery issues.
            </p>
          </section>

          <section id="contact" className="space-y-4 pt-4 border-t border-border-subtle">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-accent" />
              <span>6. Contact Information</span>
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              For any clarification regarding these terms, contact the developer at:
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
                <span className="font-bold text-text-muted">Portfolio & Developer Details</span>
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
