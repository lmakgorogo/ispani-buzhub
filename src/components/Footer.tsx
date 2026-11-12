import React from 'react';
import { TabId } from './Header';

interface FooterProps {
  setActiveTab: (tab: TabId) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-[#1E1E24] text-slate-400 text-xs py-10 pb-24 md:pb-10 border-t border-[#64748B]/30 transition-colors no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <div className="w-6 h-6 rounded bg-[#D4AF37] text-[#0F172A] flex items-center justify-center text-xs font-black">
                IB
              </div>
              <span className="text-base font-extrabold text-white">Ispani Biz Hub</span>
            </div>
            <div className="text-xs text-slate-400">
              South African Business Resource &amp; Compliance Portal
            </div>
            <div className="text-xs text-[#D4AF37] font-semibold">
              Powered by MaruB Creations
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('home');
              }}
              className="text-slate-300 hover:text-[#D4AF37] transition-colors cursor-pointer"
            >
              Overview
            </a>
            <span className="text-slate-600">·</span>
            <a
              href="#register"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('register');
              }}
              className="text-slate-300 hover:text-[#D4AF37] transition-colors cursor-pointer"
            >
              Start &amp; CIPC
            </a>
            <span className="text-slate-600">·</span>
            <a
              href="#compliance"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('compliance');
              }}
              className="text-slate-300 hover:text-[#D4AF37] transition-colors cursor-pointer"
            >
              Tax &amp; B-BBEE
            </a>
            <span className="text-slate-600">·</span>
            <a
              href="#funding"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('funding');
              }}
              className="text-slate-300 hover:text-[#D4AF37] transition-colors cursor-pointer"
            >
              Funding &amp; Grants
            </a>
            <span className="text-slate-600">·</span>
            <a
              href="#toolkits"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('toolkits');
              }}
              className="text-slate-300 hover:text-[#D4AF37] transition-colors cursor-pointer"
            >
              Templates &amp; Guides
            </a>
            <span className="text-slate-600">·</span>
            <a
              href="#privacy"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('privacy');
              }}
              className="text-slate-300 hover:text-[#D4AF37] transition-colors cursor-pointer"
            >
              Privacy Policy
            </a>
          </div>
        </div>

        <div className="pt-4 border-t border-[#64748B]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] text-slate-500">
          <span>© {new Date().getFullYear()} Ispani Biz Hub · All Rights Reserved.</span>
          <p className="max-w-md text-left sm:text-right">
            Disclaimer: Educational portal. Always verify statutory obligations with CIPC, SARS, or a registered Chartered Accountant.
          </p>
        </div>
      </div>
    </footer>
  );
};
