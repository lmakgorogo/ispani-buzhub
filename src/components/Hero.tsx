import React, { useState } from 'react';
import { Search, ArrowRight, CheckCircle2, ShieldAlert, Sparkles, Building2 } from 'lucide-react';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, searchQuery, onSearchChange }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="border-b border-slate-200 dark:border-slate-800 bg-gradient-to-b from-slate-50/60 to-white dark:from-slate-950 dark:to-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        {/* Split Grid Hero: Text Column + High-Fidelity Editorial Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            {/* Unboxed Metadata Kicker (Anti-pill) */}
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
              <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Republic of South Africa</span>
              <span aria-hidden="true">·</span>
              <span>Companies Act 71 of 2008</span>
              <span aria-hidden="true">·</span>
              <span>MaruB Creations</span>
              <span aria-hidden="true">·</span>
              <span>Updated 2025/2026</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-[1.15]" style={{ textWrap: 'balance' }}>
              Ispani Biz Hub: SA Business Resource Guide
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              An authoritative platform by <strong>MaruB Creations</strong> empowering startups and SMEs to navigate CIPC BizPortal registration, SARS tax compliance, merged SEDFA initiatives, SETA learnerships, and capital grants.
            </p>

            {/* Live Search Bar */}
            <div className="relative max-w-xl">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search CIPC fees, VAT thresholds, NYDA grants, B-BBEE affidavits, SEDFA..."
                className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Official Portal Shortcuts */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Fast Links:</span>
              <a
                href="https://bizportal.gov.za"
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

            {/* Direct Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('cipc')}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-500 text-xs font-semibold rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0"
              >
                <span>CIPC 15-Min Fast-Track</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onNavigate('funding')}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60 text-xs font-semibold rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0"
              >
                <span>Explore Grants (NYDA, TIA, SEDFA)</span>
              </button>
              <button
                onClick={() => onNavigate('tax')}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60 text-xs font-semibold rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0"
              >
                <span>SARS Tax Calculator</span>
              </button>
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
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-emerald-900/20 to-slate-900/40">
                  <Building2 className="w-12 h-12 text-emerald-600 mb-2" />
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">South African Business Resource Guide</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">CIPC, SARS Tax & Funding Portal</p>
                </div>
              )}
              {/* Measured Scrim for Text Legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-5">
                <span className="text-xs font-medium text-emerald-300">Empowering Local Innovation</span>
                <p className="text-sm font-semibold text-white mt-0.5">From Idea to CIPC CoR14.3 & Beyond</p>
                <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-300">
                  <span>BizPortal</span>
                  <span aria-hidden="true">·</span>
                  <span>SARS eFiling</span>
                  <span aria-hidden="true">·</span>
                  <span>SEDFA & NYDA</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Metric Strip (Section 1.C Spatial Math & Tabular Figures) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Standard CIPC Setup</div>
            <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white mt-1">
              R175
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">R50 Name + R125 BizPortal MOI</div>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Compulsory VAT Threshold</div>
            <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white mt-1">
              R1,000,000
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Annual turnover (Voluntary from R50k)</div>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Youth Challenge Fund</div>
            <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white mt-1">
              Up to R1.5M
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Blended capital for tech & agro</div>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">SARS Record Retention</div>
            <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white mt-1">
              7 Years
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Mandated under Tax Admin Act</div>
          </div>
        </div>
      </div>
    </section>
  );
};
