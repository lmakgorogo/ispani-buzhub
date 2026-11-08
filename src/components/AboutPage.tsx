import React from 'react';
import { Building2, Target, HeartHandshake, Award, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

interface AboutPageProps {
  onNavigateHome: () => void;
  onNavigateContact: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigateHome, onNavigateContact }) => {
  return (
    <div className="py-12 lg:py-16 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 pb-8 border-b border-slate-200 dark:border-slate-800">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            About Ispani Biz Hub · MaruB Creations
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Empowering South African Entrepreneurs
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Ispani Biz Hub is an open digital platform developed and operated by <strong>MaruB Creations</strong>. Our mission is to make business formation, compliance, and funding accessible to every South African.
          </p>
        </div>

        {/* Mission Statement Card */}
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
            <Target className="w-4 h-4" />
            <span>Our Core Purpose</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Demystifying South African Business Regulations
          </h2>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            Navigating company registration with the CIPC, tax compliance with SARS, and government funding through SEDFA and NYDA can often feel daunting, slow, and expensive. Emerging business founders often fall victim to predatory consultants charging exorbitant fees for services that are legally free or nominal.
          </p>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            At <strong>MaruB Creations</strong>, we built Ispani Biz Hub to consolidate verified, up-to-date statutory information into a centralized, transparent roadmap. We believe that economic freedom starts with accessible regulatory knowledge.
          </p>
        </div>

        {/* 3 Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Zero Information Barriers
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              We do not harvest or gatekeep personal data. All guides, fee calculators, checklists, and statutory links are 100% free and publicly accessible.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Direct Official Linkage
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Every process routes directly to accredited .gov.za platforms—CIPC BizPortal, SARS eFiling, SEDFA, National Treasury CSD, and the DTIC.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Local Economic Empowerment
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Designed specifically for South African townships, cities, and rural hubs to prepare youth and SME founders for enterprise supply chains and tenders.
            </p>
          </div>
        </div>

        {/* Operating Body Section */}
        <div className="p-6 sm:p-8 bg-slate-900 text-white rounded-2xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
            <Sparkles className="w-4 h-4" />
            <span>Behind the Platform</span>
          </div>
          <h2 className="text-xl font-bold">MaruB Creations</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
            MaruB Creations is a South African creative technology and digital solutions initiative dedicated to building practical tools that solve grassroots challenges across education, economic development, and digital inclusion.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition-colors"
            >
              <span>Explore the Business Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onNavigateContact}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition-colors border border-slate-700"
            >
              <span>Contact MaruB Creations</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
