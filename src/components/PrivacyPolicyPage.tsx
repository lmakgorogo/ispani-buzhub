import React from 'react';
import { Shield, Lock, Cookie, ExternalLink, ArrowRight } from 'lucide-react';

interface PrivacyPolicyPageProps {
  onNavigateHome: () => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onNavigateHome }) => {
  return (
    <div className="py-12 lg:py-16 bg-[#0F172A] text-white transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3 pb-8 border-b border-[#64748B]/30">
          <div className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
            Legal & Compliance · MaruB Creations
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-400">
            Last Updated: November 2026 · Compliant with POPIA (South Africa) & Web Standards
          </p>
        </div>

        {/* Section 1: Introduction */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="text-[#D4AF37]">1.</span>
            <span>Introduction</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            MaruB Creations ("we", "our", or "us") operates <strong>Ispani Biz Hub</strong>. We are committed to protecting your privacy and ensuring that any personal information is handled in accordance with the <strong>Protection of Personal Information Act, 2013 (POPIA)</strong> of South Africa and international data protection standards.
          </p>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            This Privacy Policy explains how our website operates, how we handle user interactions, and our commitment to user data privacy.
          </p>
        </div>

        {/* Section 2: Local Storage and Preferences */}
        <div className="p-6 bg-[#1E1E24] rounded-2xl border border-[#64748B]/30 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#D4AF37]">
            <Cookie className="w-4 h-4" />
            <span>Cookies & Local Storage</span>
          </div>
          <h2 className="text-lg font-bold text-white">
            2. Local Storage & Cookies
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Ispani Biz Hub does not deploy third-party advertising cookies or cross-site tracking pixels. We use local browser storage strictly for essential functional preferences:
          </p>
          <ul className="text-xs sm:text-sm text-slate-300 space-y-2 list-disc pl-5 leading-relaxed">
            <li>
              <strong>Client Cache:</strong> Standard browser caching for faster loading of static statutory information guides and calculators.
            </li>
          </ul>
        </div>

        {/* Section 3: Log Files & Analytics */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="text-[#D4AF37]">3.</span>
            <span>Log Files and Analytics</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Like most modern web services, our servers automatically log standard, non-personally identifiable information whenever you visit our website. This may include your device's Internet Protocol ("IP") address, browser type, operating system, referring URLs, date/time stamps, and pages accessed. This data is utilized solely for optimizing platform stability, performance, and user experience.
          </p>
        </div>

        {/* Section 4: POPIA and Personal Information */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="text-[#D4AF37]">4.</span>
            <span>Protection of Personal Information Act (POPIA)</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Ispani Biz Hub does NOT collect, capture, or store sensitive business credentials, banking details, or director identity documents. The portal operates strictly as an open educational guidance blueprint and statutory navigator without requiring user registration or data submission.
          </p>
        </div>

        {/* Section 5: External Links to Government Portals */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="text-[#D4AF37]">5.</span>
            <span>External Government Links</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Our platform provides direct hyperlinks to official South African statutory bodies including the CIPC, SARS, DSBD, NYDA, and the National Treasury. Please note that once you navigate away from our site to an external government or third-party website, you become subject to that respective site's terms and privacy policies.
          </p>
        </div>

        {/* Section 6: Governance and Statutory Inquiries */}
        <div className="p-6 bg-[#1E1E24] rounded-2xl border border-[#64748B]/30 space-y-2">
          <h2 className="text-base font-bold text-white">
            6. Regulatory Compliance & Inquiries
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Ispani Biz Hub is operated as a public-access educational and informative resource by MaruB Creations. In accordance with the Protection of Personal Information Act (POPIA), this portal does not request, collect, or store personal identifying records, banking details, or confidential commercial filings from visitors.
          </p>
        </div>

        <div className="pt-4 flex items-center justify-start border-t border-[#64748B]/30">
          <button
            onClick={onNavigateHome}
            className="text-xs font-bold text-[#D4AF37] hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <span>&larr; Return to Home Guide</span>
          </button>
        </div>
      </div>
    </div>
  );
};
