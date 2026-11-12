import React from 'react';
import { ShieldCheck, Moon, Sun, Printer, ChevronRight } from 'lucide-react';

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  currentPage: 'home' | 'privacy';
  onNavigatePage: (page: 'home' | 'privacy') => void;
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
  const sections = [
    { id: 'structures', label: 'Structures' },
    { id: 'cipc', label: 'CIPC Stepper' },
    { id: 'tax', label: 'SARS & Licences' },
    { id: 'funding', label: 'Grants & Capital' },
    { id: 'audit', label: 'Readiness Audit' },
    { id: 'business-profile', label: 'Business Profile' },
    { id: 'business-plan', label: 'Business Plan' },
    { id: 'external-links', label: 'External Links' },
    { id: 'faq', label: 'FAQ' },
    { id: 'affidavit', label: 'B-BBEE Guide' },
  ];

  const currentSectionObj = sections.find(s => s.id === activeSection);
  const activeLabel = currentSectionObj ? currentSectionObj.label : 'Overview';

  const handlePrint = () => {
    if (activeSection === 'business-plan') {
      document.body.classList.add('print-section-business-plan');
      window.print();
      setTimeout(() => document.body.classList.remove('print-section-business-plan'), 1500);
    } else if (activeSection === 'business-profile') {
      document.body.classList.add('print-section-business-profile');
      window.print();
      setTimeout(() => document.body.classList.remove('print-section-business-profile'), 1500);
    } else if (activeSection === 'audit') {
      document.body.classList.add('print-section-audit');
      window.print();
      setTimeout(() => document.body.classList.remove('print-section-audit'), 1500);
    } else if (activeSection === 'affidavit') {
      document.body.classList.add('print-section-affidavit');
      window.print();
      setTimeout(() => document.body.classList.remove('print-section-affidavit'), 1500);
    } else {
      window.print();
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Zone 1: Wordmark & Live Section Breadcrumb */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigatePage('home')}
            className="flex items-center gap-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-md shrink-0 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-extrabold text-sm shadow-xs">
              IB
            </div>
            <div>
              <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap block leading-tight">
                Ispani Biz Hub
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-wider uppercase block">
                South Africa Business Guide
              </span>
            </div>
          </button>

          {/* Section Breadcrumb on Desktop */}
          {currentPage === 'home' && (
            <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-400 pl-2 border-l border-slate-200 dark:border-slate-800">
              <span>Home</span>
              <ChevronRight className="w-3 h-3 text-slate-400" />
              <span className="font-semibold text-emerald-600 dark:text-emerald-400 truncate max-w-[140px]">
                {activeLabel}
              </span>
            </div>
          )}
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-5 text-xs font-semibold text-slate-600 dark:text-slate-300">
          <button
            onClick={() => onNavigatePage('home')}
            className={`whitespace-nowrap transition-colors hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer ${
              currentPage === 'home' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : ''
            }`}
          >
            Guide
          </button>
          <button
            onClick={() => onNavigatePage('privacy')}
            className={`whitespace-nowrap transition-colors hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer ${
              currentPage === 'privacy' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : ''
            }`}
          >
            Privacy Policy
          </button>
        </nav>

        {/* Zone 3: Actions + Print + Theme Switcher + Audit Readiness */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Single-Section Print Button */}
          <button
            onClick={handlePrint}
            title="Print Current Section / Save as PDF"
            className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
          </button>

          {/* Theme Switcher */}
          <button
            onClick={onToggleTheme}
            aria-label="Toggle dark mode"
            className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Audit Readiness CTA */}
          <button
            onClick={() => {
              if (currentPage !== 'home') onNavigatePage('home');
              setTimeout(() => onNavigateSection('audit'), 50);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 rounded-lg shadow-xs transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Audit Readiness</span>
          </button>
        </div>
      </div>

      {/* Sub-navigation bar with dynamic active-tab highlighting */}
      {currentPage === 'home' && (
        <div className="border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-950/40 px-4 sm:px-6 lg:px-8 py-2 overflow-x-auto no-scrollbar">
          <div className="max-w-7xl mx-auto flex items-center gap-1.5 text-xs">
            <span className="font-semibold text-slate-600 dark:text-slate-400 whitespace-nowrap mr-1 shrink-0">
              Guide:
            </span>
            {sections.map((section) => {
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => onNavigateSection(section.id)}
                  className={`px-2.5 py-1 rounded-lg whitespace-nowrap transition-all text-xs cursor-pointer ${
                    isActive
                      ? 'bg-emerald-600 text-white font-bold shadow-xs dark:bg-emerald-500'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/60 font-medium'
                  }`}
                >
                  {section.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
