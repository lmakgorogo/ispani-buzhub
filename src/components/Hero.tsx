import React, { useState } from 'react';
import { Search, ArrowRight, FileText, Building2, ShieldCheck, Coins } from 'lucide-react';
import { TabId } from './Header';

interface HeroProps {
  setActiveTab: (tab: TabId) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ setActiveTab, searchQuery, onSearchChange }) => {
  const [imageError, setImageError] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const q = searchQuery.toLowerCase();
    if (q.includes('cipc') || q.includes('pty') || q.includes('register') || q.includes('name')) {
      setActiveTab('register');
    } else if (q.includes('tax') || q.includes('sars') || q.includes('vat') || q.includes('b-bbee') || q.includes('bbee') || q.includes('affidavit')) {
      setActiveTab('compliance');
    } else if (q.includes('plan') || q.includes('profile') || q.includes('template') || q.includes('link')) {
      setActiveTab('toolkits');
    } else {
      setActiveTab('funding');
    }
  };

  return (
    <section className="border-b border-slate-200 dark:border-slate-800 bg-gradient-to-b from-slate-50/60 to-white dark:from-slate-950 dark:to-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        {/* Split Grid Hero: Text Column + High-Fidelity Editorial Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            {/* Unboxed Metadata Kicker */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
              <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Republic of South Africa</span>
              <span aria-hidden="true">·</span>
              <span>Companies Act 71 of 2008</span>
            </div>

            <div className="space-y-1.5">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-[1.12]" style={{ textWrap: 'balance' }}>
                Ispani Biz Hub
              </h1>
              <p className="text-base sm:text-lg font-bold text-emerald-600 dark:text-emerald-400 tracking-tight">
                South African Business Resource & Compliance Guide
              </p>
            </div>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              Your step-by-step workspace for CIPC BizPortal registration, SARS tax &amp; B-BBEE compliance, NYDA &amp; SEDFA funding grants, and bankable business templates.
            </p>

            {/* Live Search Bar */}
            <form onSubmit={handleSearchSubmit} className="relative max-w-xl no-print">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search CIPC fees, VAT thresholds, NYDA grants, B-BBEE affidavits, SEDFA..."
                className="w-full pl-11 pr-20 py-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
              />
              {searchQuery ? (
                <div className="absolute inset-y-0 right-0 pr-2 flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => onSearchChange('')}
                    className="px-2 py-1 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                  >
                    Clear
                  </button>
                  <button
                    type="submit"
                    className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg text-xs font-semibold cursor-pointer"
                  >
                    Go
                  </button>
                </div>
              ) : null}
            </form>

            {/* Quick Official Portal Shortcuts */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Fast Links:</span>
              <a
                href="https://www.bizportal.gov.za/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-600 dark:hover:text-emerald-400 underline font-medium"
              >
                CIPC BizPortal
              </a>
              <span aria-hidden="true">·</span>
              <a
                href="https://sarsefiling.co.za"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-600 dark:hover:text-emerald-400 underline font-medium"
              >
                SARS eFiling
              </a>
              <span aria-hidden="true">·</span>
              <a
                href="https://sedfa.org.za"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-600 dark:hover:text-emerald-400 underline font-medium"
              >
                SEDFA
              </a>
              <span aria-hidden="true">·</span>
              <a
                href="https://erp.nyda.gov.za"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-600 dark:hover:text-emerald-400 underline font-medium"
              >
                NYDA Grants
              </a>
              <span aria-hidden="true">·</span>
              <a
                href="https://secure.csd.gov.za"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-600 dark:hover:text-emerald-400 underline font-medium"
              >
                Treasury CSD
              </a>
            </div>

            {/* Direct View Switch CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2 no-print">
              <a
                href="#register"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab('register');
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#D4AF37] hover:bg-[#e3be42] text-[#0F172A] text-xs font-extrabold rounded-xl shadow-xs transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Building2 className="w-4 h-4" />
                <span>Start &amp; CIPC Registration</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="#toolkits"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab('toolkits');
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0F172A] dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-[#D4AF37] dark:text-white" />
                <span>Business Plan &amp; Templates</span>
              </a>
              <a
                href="#compliance"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab('compliance');
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60 text-xs font-semibold rounded-xl shadow-xs transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>SARS Tax &amp; B-BBEE</span>
              </a>
              <a
                href="#funding"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab('funding');
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60 text-xs font-semibold rounded-xl shadow-xs transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Coins className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Explore Grants (NYDA, SEDFA)</span>
              </a>
            </div>
          </div>

          {/* High-Fidelity Image Hero Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg bg-slate-100 dark:bg-slate-800 aspect-[16/10] lg:aspect-[4/3]">
              {!imageError ? (
                <img
                  src="/src/assets/images/hero_sa_entrepreneur_1794134851358.jpg"
                  alt="South African entrepreneurs collaborating in an innovation hub"
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-emerald-500/10 to-teal-500/10">
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Ispani Biz Hub</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">CIPC, SARS Tax &amp; Funding Portal</p>
                </div>
              )}
              {/* Measured Scrim for Text Legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-5">
                <div className="flex items-center text-xs">
                  <span className="font-medium text-emerald-300">Empowering Local Innovation</span>
                </div>
                <p className="text-sm font-semibold text-white mt-0.5">From Idea to CIPC CoR14.3 &amp; Beyond</p>
                <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-300">
                  <span>BizPortal</span>
                  <span aria-hidden="true">·</span>
                  <span>SARS eFiling</span>
                  <span aria-hidden="true">·</span>
                  <span>SEDFA &amp; NYDA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
