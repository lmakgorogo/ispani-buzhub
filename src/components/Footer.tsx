import React from 'react';
import { TabId, IspaniLogoMark } from './Header';

interface FooterProps {
  setActiveTab: (tab: TabId) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-[#070B28] text-slate-200 text-xs py-10 pb-24 lg:pb-10 border-t-2 border-[#15806B] transition-colors no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            {/* Brand Lockup on crisp white plate so #070B28 navy & #1E293B tagline match the official logo exactly */}
            <button
              type="button"
              onClick={() => setActiveTab('home')}
              className="inline-flex items-center gap-3 bg-[#FFFFFF] px-4 py-2.5 rounded-xl border border-[#15806B]/40 shadow-sm text-left cursor-pointer group"
            >
              <IspaniLogoMark className="w-10 h-10 shrink-0" />
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-black tracking-tight text-[#070B28] group-hover:text-[#0D133D] whitespace-nowrap leading-none flex items-baseline">
                  ISPANI BIZHUB
                  <span className="text-[#15806B] font-black ml-0.5">.</span>
                </span>
                <span
                  className="h-[2px] w-full bg-[#15806B] my-1 rounded-full"
                  aria-hidden="true"
                />
                <span className="text-[9px] sm:text-[10px] text-[#1E293B] font-semibold tracking-[0.14em] uppercase block leading-none">
                  IGNITING SOCIAL POTENTIAL
                </span>
              </div>
            </button>

            <div className="text-xs text-slate-200 pt-1">
              South African Business Resource &amp; Compliance Portal ·{' '}
              <span className="text-[#EAB308] font-semibold">Powered by MaruB Creations</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('home');
              }}
              className="text-slate-200 hover:text-[#EAB308] transition-colors cursor-pointer"
            >
              Overview
            </a>
            <span className="text-[#15806B]">·</span>
            <a
              href="#register"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('register');
              }}
              className="text-slate-200 hover:text-[#EAB308] transition-colors cursor-pointer"
            >
              Start &amp; CIPC
            </a>
            <span className="text-[#15806B]">·</span>
            <a
              href="#compliance"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('compliance');
              }}
              className="text-slate-200 hover:text-[#EAB308] transition-colors cursor-pointer"
            >
              Tax &amp; B-BBEE
            </a>
            <span className="text-[#15806B]">·</span>
            <a
              href="#funding"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('funding');
              }}
              className="text-slate-200 hover:text-[#EAB308] transition-colors cursor-pointer"
            >
              Funding &amp; Grants
            </a>
            <span className="text-[#15806B]">·</span>
            <a
              href="#toolkits"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('toolkits');
              }}
              className="text-slate-200 hover:text-[#EAB308] transition-colors cursor-pointer"
            >
              Templates &amp; Guides
            </a>
            <span className="text-[#15806B]">·</span>
            <a
              href="#directory"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('directory');
              }}
              className="text-slate-200 hover:text-[#EAB308] transition-colors cursor-pointer"
            >
              Business Directory
            </a>
            <span className="text-[#15806B]">·</span>
            <a
              href="#vacancies"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('vacancies');
              }}
              className="text-slate-200 hover:text-[#EAB308] transition-colors cursor-pointer"
            >
              Verified Vacancies
            </a>
            <span className="text-[#15806B]">·</span>
            <a
              href="#privacy"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('privacy');
              }}
              className="text-slate-200 hover:text-[#EAB308] transition-colors cursor-pointer"
            >
              Privacy Policy
            </a>
          </div>
        </div>

        <div className="pt-4 border-t border-[#15806B]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] text-slate-300">
          <span>© {new Date().getFullYear()} ISPANI BIZHUB · All Rights Reserved.</span>
          <p className="max-w-md text-left sm:text-right">
            Disclaimer: Educational portal. Always verify statutory obligations with CIPC, SARS, or a registered Chartered Accountant.
          </p>
        </div>
      </div>
    </footer>
  );
};
