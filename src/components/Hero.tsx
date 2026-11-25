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
    } else if (
      q.includes('tax') ||
      q.includes('sars') ||
      q.includes('vat') ||
      q.includes('b-bbee') ||
      q.includes('bbee') ||
      q.includes('affidavit')
    ) {
      setActiveTab('compliance');
    } else if (q.includes('plan') || q.includes('profile') || q.includes('template') || q.includes('link')) {
      setActiveTab('toolkits');
    } else {
      setActiveTab('funding');
    }
  };

  return (
    <section className="border-b-2 border-[#15806B]/25 bg-gradient-to-b from-[#F8FAFC] to-[#FFFFFF] dark:from-[#070B28] dark:to-[#0D133D] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        {/* Split Grid Hero: Text Column + High-Fidelity Editorial Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            {/* Unboxed Metadata Kicker */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#1E293B] dark:text-slate-200">
              <span className="px-2.5 py-0.5 rounded-md bg-[#15806B]/10 text-[#15806B] dark:bg-[#15806B]/30 dark:text-emerald-200 font-bold border border-[#15806B]/30">
                Republic of South Africa
              </span>
              <span aria-hidden="true" className="text-[#15806B]">
                ·
              </span>
              <span>Companies Act 71 of 2008</span>
              <span aria-hidden="true" className="text-[#15806B]">
                ·
              </span>
              <span className="text-[#070B28] dark:text-[#EAB308] font-bold tracking-wider uppercase">
                IGNITING SOCIAL POTENTIAL
              </span>
            </div>

            <div className="space-y-2">
              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#070B28] dark:text-white leading-[1.12]"
                style={{ textWrap: 'balance' }}
              >
                ISPANI BIZHUB<span className="text-[#15806B]">.</span>
              </h1>
              <div className="h-1 w-28 bg-[#15806B] rounded-full" aria-hidden="true" />
              <p className="text-base sm:text-lg font-bold text-[#15806B] dark:text-[#EAB308] tracking-tight pt-0.5">
                South African Business Resource &amp; Compliance Guide
              </p>
            </div>

            <p className="text-base sm:text-lg text-[#1E293B] dark:text-slate-200 leading-relaxed max-w-2xl">
              Your step-by-step workspace for CIPC BizPortal registration, SARS tax &amp; B-BBEE compliance, NYDA &amp; SEDFA funding grants, verified SMME directory listings, and bankable business templates.
            </p>

            {/* Live Search Bar */}
            <form onSubmit={handleSearchSubmit} className="relative max-w-xl no-print">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#070B28] dark:text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search CIPC fees, VAT thresholds, NYDA grants, B-BBEE affidavits, SEDFA..."
                className="w-full pl-11 pr-20 py-3 bg-[#FFFFFF] dark:bg-[#070B28] border-2 border-[#070B28]/20 dark:border-slate-700 focus:border-[#15806B] rounded-xl text-sm text-[#1E293B] dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#15806B] shadow-xs"
              />
              {searchQuery ? (
                <div className="absolute inset-y-0 right-0 pr-2 flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => onSearchChange('')}
                    className="px-2 py-1 text-xs text-slate-500 hover:text-[#070B28] dark:hover:text-slate-200 cursor-pointer"
                  >
                    Clear
                  </button>
                  <button
                    type="submit"
                    className="px-2.5 py-1 bg-[#15806B] hover:bg-[#116957] text-white rounded-lg text-xs font-semibold cursor-pointer"
                  >
                    Go
                  </button>
                </div>
              ) : null}
            </form>

            {/* Quick Official Portal Shortcuts */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-[#1E293B] dark:text-slate-300">
              <span className="font-bold text-[#070B28] dark:text-[#EAB308]">Fast Links:</span>
              <a
                href="https://www.bizportal.gov.za/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#15806B] dark:hover:text-[#EAB308] underline font-semibold"
              >
                CIPC BizPortal
              </a>
              <span aria-hidden="true" className="text-[#15806B]">
                ·
              </span>
              <a
                href="https://sarsefiling.co.za"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#15806B] dark:hover:text-[#EAB308] underline font-semibold"
              >
                SARS eFiling
              </a>
              <span aria-hidden="true" className="text-[#15806B]">
                ·
              </span>
              <a
                href="https://sedfa.org.za"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#15806B] dark:hover:text-[#EAB308] underline font-semibold"
              >
                SEDFA
              </a>
              <span aria-hidden="true" className="text-[#15806B]">
                ·
              </span>
              <a
                href="https://erp.nyda.gov.za"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#15806B] dark:hover:text-[#EAB308] underline font-semibold"
              >
                NYDA Grants
              </a>
              <span aria-hidden="true" className="text-[#15806B]">
                ·
              </span>
              <a
                href="https://secure.csd.gov.za"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#15806B] dark:hover:text-[#EAB308] underline font-semibold"
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
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#EAB308] hover:bg-[#facc15] text-[#070B28] text-xs font-extrabold rounded-xl shadow-xs transition-colors whitespace-nowrap shrink-0 cursor-pointer"
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
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#070B28] hover:bg-[#0D133D] text-white text-xs font-bold rounded-xl shadow-xs transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-[#EAB308]" />
                <span>Business Plan &amp; Templates</span>
              </a>
              <a
                href="#compliance"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab('compliance');
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#FFFFFF] border-2 border-[#15806B]/40 text-[#070B28] hover:bg-[#F8FAFC] hover:border-[#15806B] text-xs font-bold rounded-xl shadow-xs transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#15806B]" />
                <span>SARS Tax &amp; B-BBEE</span>
              </a>
              <a
                href="#funding"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab('funding');
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#FFFFFF] border-2 border-[#070B28]/20 text-[#070B28] hover:bg-[#F8FAFC] hover:border-[#070B28] text-xs font-bold rounded-xl shadow-xs transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Coins className="w-3.5 h-3.5 text-[#EAB308]" />
                <span>Explore Grants (NYDA, SEDFA)</span>
              </a>
            </div>
          </div>

          {/* High-Fidelity Image Hero Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#070B28]/15 dark:border-[#15806B]/40 shadow-lg bg-[#F8FAFC] dark:bg-[#070B28] aspect-[16/10] lg:aspect-[4/3]">
              {!imageError ? (
                <img
                  src="/src/assets/images/hero_sa_entrepreneur_1794134851358.jpg"
                  alt="South African entrepreneurs collaborating in an innovation hub"
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#070B28] to-[#0D133D]">
                  <p className="text-sm font-extrabold text-[#EAB308]">ISPANI BIZHUB.</p>
                  <p className="text-xs text-white mt-1">IGNITING SOCIAL POTENTIAL</p>
                </div>
              )}
              {/* Measured Scrim for Text Legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#070B28]/90 via-[#070B28]/25 to-transparent flex flex-col justify-end p-5">
                <div className="flex items-center text-xs">
                  <span className="font-bold text-[#EAB308]">Empowering Local Innovation</span>
                </div>
                <p className="text-sm font-semibold text-white mt-0.5">
                  From Idea to CIPC CoR14.3 &amp; Beyond
                </p>
                <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-200">
                  <span>BizPortal</span>
                  <span aria-hidden="true" className="text-[#15806B]">
                    ·
                  </span>
                  <span>SARS eFiling</span>
                  <span aria-hidden="true" className="text-[#15806B]">
                    ·
                  </span>
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
