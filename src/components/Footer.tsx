import React from 'react';
import { ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigatePage?: (page: 'home' | 'privacy') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigatePage }) => {
  return (
    <footer className="bg-[#1E1E24] text-slate-400 text-xs py-10 border-t border-[#64748B]/30 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <div className="w-6 h-6 rounded bg-[#D4AF37] text-slate-950 flex items-center justify-center text-xs font-black">
                IB
              </div>
              <span className="text-base font-extrabold text-white">Ispani Biz Hub</span>
            </div>
            <div className="text-xs text-slate-400">
              South African Business Resource & Compliance Portal
            </div>
            <div className="text-xs text-[#D4AF37] font-semibold">
              Powered by MaruB Creations
            </div>
          </div>

          {onNavigatePage && (
            <div className="flex items-center gap-4 text-xs font-semibold">
              <button
                onClick={() => onNavigatePage('home')}
                className="text-slate-300 hover:text-[#D4AF37] transition-colors cursor-pointer"
              >
                Home
              </button>
              <span className="text-slate-600">·</span>
              <button
                onClick={() => onNavigatePage('privacy')}
                className="text-slate-300 hover:text-[#D4AF37] transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
            </div>
          )}
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
