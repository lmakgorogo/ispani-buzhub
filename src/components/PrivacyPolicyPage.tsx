import React from 'react';
import { Shield, Lock, Cookie, ExternalLink, ArrowRight } from 'lucide-react';

interface PrivacyPolicyPageProps {
  onNavigateHome: () => void;
  onNavigateContact: () => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onNavigateHome, onNavigateContact }) => {
  return (
    <div className="py-12 lg:py-16 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3 pb-8 border-b border-slate-200 dark:border-slate-800">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Legal & Compliance · MaruB Creations
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Last Updated: November 2026 · Compliant with Google AdSense Guidelines & POPIA (South Africa)
          </p>
        </div>

        {/* Section 1: Introduction */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="text-emerald-600 dark:text-emerald-400">1.</span>
            <span>Introduction</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            MaruB Creations ("we", "our", or "us") operates <strong>Ispani Biz Hub</strong>. We are committed to protecting your privacy and ensuring that any personal information is handled in accordance with the <strong>Protection of Personal Information Act, 2013 (POPIA)</strong> of South Africa and international data protection standards.
          </p>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            This Privacy Policy explains how our website operates, how we handle user interactions, and our use of third-party advertising partners such as Google AdSense.
          </p>
        </div>

        {/* Section 2: Google AdSense and Third-Party Advertising (Critical for AdSense) */}
        <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
            <Cookie className="w-4 h-4" />
            <span>Third-Party Advertising & Cookies</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            2. Google AdSense & DoubleClick DART Cookies
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            We use <strong>Google AdSense</strong> to display advertisements to visitors of this website. As a third-party vendor, Google uses cookies to serve advertisements on our site based on users' prior visits to our site and other websites across the Internet:
          </p>
          <ul className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-2 list-disc pl-5 leading-relaxed">
            <li>
              Google's use of advertising cookies enables it and its certified advertising partners to serve ads to users based on their visits to our site and other sites on the Internet.
            </li>
            <li>
              Users may opt out of personalized advertising by visiting the <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 font-semibold underline">Google Ads Settings</a> page.
            </li>
            <li>
              Alternatively, users can opt out of a third-party vendor's use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 font-semibold underline">aboutads.info</a>.
            </li>
          </ul>
        </div>

        {/* Section 3: Log Files & Analytics */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="text-emerald-600 dark:text-emerald-400">3.</span>
            <span>Log Files and Analytics</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            Like most modern web services, our servers automatically log standard, non-personally identifiable information whenever you visit our website. This may include your device's Internet Protocol ("IP") address, browser type, operating system, referring URLs, date/time stamps, and pages accessed. This data is utilized solely for optimizing platform stability, performance, and user experience.
          </p>
        </div>

        {/* Section 4: POPIA and Personal Information */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="text-emerald-600 dark:text-emerald-400">4.</span>
            <span>Protection of Personal Information Act (POPIA)</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            Ispani Biz Hub does NOT collect or store sensitive business credentials, banking details, or director identity documents. Any information voluntarily sent to us via our Contact form is processed solely for responding to your inquiry and is never shared, leased, or sold to commercial third parties.
          </p>
        </div>

        {/* Section 5: External Links to Government Portals */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="text-emerald-600 dark:text-emerald-400">5.</span>
            <span>External Government Links</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            Our platform provides direct hyperlinks to official South African statutory bodies including the CIPC, SARS, DSBD, NYDA, and the National Treasury. Please note that once you navigate away from our site to an external government or third-party website, you become subject to that respective site's terms and privacy policies.
          </p>
        </div>

        {/* Section 6: Contact Information */}
        <div className="p-6 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            6. Contacting the Information Officer
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            If you have questions regarding this Privacy Policy, your rights under POPIA, or our advertising practices, please contact MaruB Creations directly at:
          </p>
          <div className="pt-2 text-xs font-semibold text-slate-800 dark:text-slate-200">
            Email: <a href="mailto:marubcreations@gmail.com" className="text-emerald-600 dark:text-emerald-400 underline">marubcreations@gmail.com</a>
          </div>
        </div>

        <div className="pt-4 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={onNavigateHome}
            className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
          >
            <span>&larr; Return to Home</span>
          </button>
          <button
            onClick={onNavigateContact}
            className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white inline-flex items-center gap-1"
          >
            <span>Contact Us &rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
};
