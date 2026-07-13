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
          These terms govern your access to and usage of the SpeakFlow teleprompter platform.
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
              1. Acceptance & Eligibility
            </a>
            <a href="#conduct" className="px-3 py-2 rounded-lg hover:bg-surface-secondary/60 hover:text-text-primary transition-all">
              2. User Conduct & Acceptable Use
            </a>
            <a href="#ownership" className="px-3 py-2 rounded-lg hover:bg-surface-secondary/60 hover:text-text-primary transition-all">
              3. IP & Content Ownership
            </a>
            <a href="#ai-terms" className="px-3 py-2 rounded-lg hover:bg-surface-secondary/60 hover:text-text-primary transition-all">
              4. AI Output Disclaimer
            </a>
            <a href="#availability" className="px-3 py-2 rounded-lg hover:bg-surface-secondary/60 hover:text-text-primary transition-all">
              5. Service Uptime & Mods
            </a>
            <a href="#liability" className="px-3 py-2 rounded-lg hover:bg-surface-secondary/60 hover:text-text-primary transition-all">
              6. Warranties & Liability Caps
            </a>
            <a href="#legal" className="px-3 py-2 rounded-lg hover:bg-surface-secondary/60 hover:text-text-primary transition-all">
              7. Terminations & Governing Law
            </a>
            <a href="#contact" className="px-3 py-2 rounded-lg hover:bg-accent/10 hover:text-accent transition-all">
              8. Contact Support
            </a>
          </nav>
        </div>

        <div className="md:col-span-3 space-y-10 bg-surface-primary/25 border border-border-subtle/50 backdrop-blur-md p-6 md:p-8 rounded-3xl shadow-xl">
          
          <section id="intro" className="space-y-3">
            <h3 className="text-lg font-bold flex items-center gap-2 border-b border-border-subtle/40 pb-2">
              <FileText className="w-4 h-4 text-accent" />
              <span>1. Acceptance of Terms & Eligibility</span>
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              Welcome to <strong>{DEVELOPER_CONFIG.productName}</strong>. These Terms & Conditions form a binding legal agreement between you and the developer, <strong>{DEVELOPER_CONFIG.developerName}</strong>. By accessing or using the platform, you verify that you have read, understood, and agreed to these terms in full.
            </p>
            <p className="text-sm text-text-secondary leading-relaxed">
              <strong>Eligibility:</strong> You must be at least 13 years of age to access or utilize our teleprompter software. If you are under 18, you represent that you have parental or legal guardian consent to use this service.
            </p>
          </section>

          <section id="conduct" className="space-y-3">
            <h3 className="text-lg font-bold flex items-center gap-2 border-b border-border-subtle/40 pb-2">
              <Shield className="w-4 h-4 text-accent" />
              <span>2. User Conduct & Acceptable Use</span>
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              You agree to use SpeakFlow exclusively for lawful purposes and practice activities. You are solely responsible for all content written, pasted, or recorded during your sessions.
            </p>
            <div className="space-y-2">
              <p className="text-sm text-text-secondary leading-relaxed font-bold">
                Prohibited Activities:
              </p>
              <ul className="list-disc pl-5 text-sm text-text-secondary space-y-1.5">
                <li>Attempting to scrap, copy, reverse engineer, or extract code or layout interfaces from SpeakFlow.</li>
                <li>Using the AI generation interface to compose defamatory, harassing, threatening, or illegal speech outlines.</li>
                <li>Interfering with, disabling, or modifying configuration limits, rate limit locks, or visual stylesheets.</li>
                <li>Utilizing automated bots, scripts, or spiders to interact with the application.</li>
              </ul>
            </div>
          </section>

          <section id="ownership" className="space-y-3">
            <h3 className="text-lg font-bold flex items-center gap-2 border-b border-border-subtle/40 pb-2">
              <FileText className="w-4 h-4 text-accent" />
              <span>3. IP & Content Ownership</span>
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              <strong>Platform Property:</strong> SpeakFlow, its design architecture, layouts, gradients, stylesheets, dynamic logic models, animations, icons, branding, and assets belong exclusively to Aajad Yadav. You receive a limited, revocable license to access the application for speaking practices.
            </p>
            <p className="text-sm text-text-secondary leading-relaxed">
              <strong>User Content:</strong> You retain complete intellectual property ownership over any original templates, outlines, speech recordings, or customized drafts created inside the platform. SpeakFlow does not claim ownership or licensing rights over your private scripts.
            </p>
          </section>

          <section id="ai-terms" className="space-y-3 bg-accent/5 p-4.5 rounded-2xl border border-accent/15">
            <h3 className="text-base font-extrabold text-accent flex items-center gap-2">
              <Scale className="w-4 h-4" />
              <span>4. AI Output Disclaimer</span>
            </h3>
            <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
              The AI outline and drafting features utilize third-party generative intelligence models.
            </p>
            <p className="text-xs md:text-sm text-text-secondary leading-relaxed font-bold">
              We do not verify the legal accuracy, safety, copyright status, or factual reliability of AI outputs. You agree to assume all liability and legal responsibilities for auditing and editing AI outlines before sharing them or broadcasting recordings.
            </p>
          </section>

          <section id="availability" className="space-y-3">
            <h3 className="text-lg font-bold flex items-center gap-2 border-b border-border-subtle/40 pb-2">
              <Shield className="w-4 h-4 text-accent" />
              <span>5. Service Availability & Modifications</span>
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              We reserve the right to modify, updates, pause, or suspend any portion of SpeakFlow (including AI features, database hooks, and local styles) at any time without notice.
            </p>
            <p className="text-sm text-text-secondary leading-relaxed">
              We make no guarantee that your localStorage data will remain permanent. You are solely responsible for backing up critical script text on external storage files.
            </p>
          </section>

          <section id="liability" className="space-y-3">
            <h3 className="text-lg font-bold flex items-center gap-2 border-b border-border-subtle/40 pb-2">
              <Shield className="w-4 h-4 text-accent" />
              <span>6. Warranties & Liability Caps</span>
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed font-semibold">
              SpeakFlow is provided "AS IS" without warranties of any kind, either express or implied.
            </p>
            <p className="text-sm text-text-secondary leading-relaxed">
              To the maximum extent permitted by law, Aajad Yadav or any affiliates shall not be liable for any direct, indirect, special, punitive, or consequential damages (including lost profits, loss of data, or speech presentation failures) arising out of your use or inability to use the teleprompter.
            </p>
          </section>

          <section id="legal" className="space-y-3">
            <h3 className="text-lg font-bold flex items-center gap-2 border-b border-border-subtle/40 pb-2">
              <FileText className="w-4 h-4 text-accent" />
              <span>7. Terminations & Governing Law</span>
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              <strong>Termination:</strong> We reserve the right to block access or terminate service access if we detect abusive actions, bots, or terms violations.
            </p>
            <p className="text-sm text-text-secondary leading-relaxed">
              <strong>Governing Law:</strong> These terms are governed by and construed in accordance with the laws of India, without regard to conflict of law principles.
            </p>
          </section>

          <section id="contact" className="space-y-4 pt-4 border-t border-border-subtle">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-accent" />
              <span>8. Terms & Support Support</span>
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              For any clarification regarding user responsibilities or platform ownership, contact the support desk at:
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
