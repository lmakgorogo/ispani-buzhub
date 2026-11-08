import React from 'react';
import { ShieldCheck, Moon, Sun, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  currentPage: 'home' | 'about' | 'contact' | 'privacy';
  onNavigatePage: (page: 'home' | 'about' | 'contact' | 'privacy') => void;
  activeSection: string;
  onNavigateSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  isDark,
  onToggleTheme,
  currentPage,
  onNavigatePage,
  activeSection,
  onNavigateSection
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark adhering to Top Bar Contract */}
        <button
          onClick={() => onNavigatePage('home')}
          className="flex items-center gap-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-md shrink-0"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-extrabold text-sm shadow-xs">
            IB
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
            Ispani Biz Hub
          </span>
        </button>

        {/* Zone 2: Primary Navigation Links (Home, About Us, Contact, Privacy Policy) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <button
            onClick={() => onNavigatePage('home')}
            className={`whitespace-nowrap transition-colors hover:text-emerald-600 dark:hover:text-emerald-400 ${
              currentPage === 'home' ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : ''
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigatePage('about')}
            className={`whitespace-nowrap transition-colors hover:text-emerald-600 dark:hover:text-emerald-400 ${
              currentPage === 'about' ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : ''
            }`}
          >
            About Us
          </button>
          <button
            onClick={() => onNavigatePage('contact')}
            className={`whitespace-nowrap transition-colors hover:text-emerald-600 dark:hover:text-emerald-400 ${
              currentPage === 'contact' ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : ''
            }`}
          >
            Contact
          </button>
          <button
            onClick={() => onNavigatePage('privacy')}
            className={`whitespace-nowrap transition-colors hover:text-emerald-600 dark:hover:text-emerald-400 ${
              currentPage === 'privacy' ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : ''
            }`}
          >
            Privacy Policy
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
            onClick={() => {
              if (currentPage !== 'home') onNavigatePage('home');
              setTimeout(() => onNavigateSection('audit'), 50);
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 rounded-lg shadow-xs transition-colors whitespace-nowrap shrink-0"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Audit Readiness</span>
          </button>
        </div>
      </div>

      {/* Sub-navigation bar when on Home: Quick Jump Bar */}
      {currentPage === 'home' && (
        <div className="border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-950/40 px-4 sm:px-6 lg:px-8 py-2 overflow-x-auto">
          <div className="max-w-7xl mx-auto flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">Guide Sections:</span>
            <button onClick={() => onNavigateSection('structures')} className="hover:text-emerald-600 dark:hover:text-emerald-400 whitespace-nowrap">
              Structures
            </button>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
            <button onClick={() => onNavigateSection('cipc')} className="hover:text-emerald-600 dark:hover:text-emerald-400 whitespace-nowrap">
              CIPC Portal
            </button>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
            <button onClick={() => onNavigateSection('tax')} className="hover:text-emerald-600 dark:hover:text-emerald-400 whitespace-nowrap">
              SARS & Tax
            </button>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
            <button onClick={() => onNavigateSection('funding')} className="hover:text-emerald-600 dark:hover:text-emerald-400 whitespace-nowrap">
              Grants & Capital
            </button>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
            <button onClick={() => onNavigateSection('audit')} className="hover:text-emerald-600 dark:hover:text-emerald-400 whitespace-nowrap">
              Readiness Audit
            </button>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
            <button onClick={() => onNavigateSection('business-profile')} className="hover:text-emerald-600 dark:hover:text-emerald-400 whitespace-nowrap">
              Business Profile
            </button>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
            <button onClick={() => onNavigateSection('external-links')} className="hover:text-emerald-600 dark:hover:text-emerald-400 whitespace-nowrap">
              External Links
            </button>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
            <button onClick={() => onNavigateSection('faq')} className="hover:text-emerald-600 dark:hover:text-emerald-400 whitespace-nowrap">
              FAQ
            </button>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
            <button onClick={() => onNavigateSection('affidavit')} className="hover:text-emerald-600 dark:hover:text-emerald-400 whitespace-nowrap">
              B-BBEE Guide
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
