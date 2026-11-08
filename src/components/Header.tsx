import React from 'react';
import { ShieldCheck, Moon, Sun, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  isDark,
  onToggleTheme,
  activeSection,
  onNavigate
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element wordmark, no secondary badges) */}
        <button
          onClick={() => onNavigate('overview')}
          className="flex items-center gap-2 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-md shrink-0"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
            ZA
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
            SA Business Resource Guide
          </span>
        </button>

        {/* Zone 2: 4-5 concise single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <button
            onClick={() => onNavigate('overview')}
            className={`whitespace-nowrap transition-colors hover:text-emerald-600 dark:hover:text-emerald-400 ${
              activeSection === 'overview' ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : ''
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => onNavigate('structures')}
            className={`whitespace-nowrap transition-colors hover:text-emerald-600 dark:hover:text-emerald-400 ${
              activeSection === 'structures' ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : ''
            }`}
          >
            Structures
          </button>
          <button
            onClick={() => onNavigate('cipc')}
            className={`whitespace-nowrap transition-colors hover:text-emerald-600 dark:hover:text-emerald-400 ${
              activeSection === 'cipc' ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : ''
            }`}
          >
            CIPC Registration
          </button>
          <button
            onClick={() => onNavigate('tax')}
            className={`whitespace-nowrap transition-colors hover:text-emerald-600 dark:hover:text-emerald-400 ${
              activeSection === 'tax' ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : ''
            }`}
          >
            SARS & Tax
          </button>
          <button
            onClick={() => onNavigate('funding')}
            className={`whitespace-nowrap transition-colors hover:text-emerald-600 dark:hover:text-emerald-400 ${
              activeSection === 'funding' ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : ''
            }`}
          >
            Grants & Capital
          </button>
          <button
            onClick={() => onNavigate('audit')}
            className={`whitespace-nowrap transition-colors hover:text-emerald-600 dark:hover:text-emerald-400 ${
              activeSection === 'audit' ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : ''
            }`}
          >
            Readiness Audit
          </button>
          <button
            onClick={() => onNavigate('business-profile')}
            className={`whitespace-nowrap transition-colors hover:text-emerald-600 dark:hover:text-emerald-400 ${
              activeSection === 'business-profile' ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : ''
            }`}
          >
            Business Profile
          </button>
          <button
            onClick={() => onNavigate('external-links')}
            className={`whitespace-nowrap transition-colors hover:text-emerald-600 dark:hover:text-emerald-400 ${
              activeSection === 'external-links' ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : ''
            }`}
          >
            External Links
          </button>
          <button
            onClick={() => onNavigate('faq')}
            className={`whitespace-nowrap transition-colors hover:text-emerald-600 dark:hover:text-emerald-400 ${
              activeSection === 'faq' ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : ''
            }`}
          >
            FAQ
          </button>
          <button
            onClick={() => onNavigate('affidavit')}
            className={`whitespace-nowrap transition-colors hover:text-emerald-600 dark:hover:text-emerald-400 ${
              activeSection === 'affidavit' ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : ''
            }`}
          >
            B-BBEE Guide
          </button>
        </nav>

        {/* Zone 3: 1 primary action + Theme Switcher */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleTheme}
            aria-label="Toggle dark mode"
            className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => onNavigate('audit')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Audit Readiness</span>
          </button>
        </div>
      </div>
    </header>
  );
};
