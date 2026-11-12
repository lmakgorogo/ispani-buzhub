import React from 'react';
import { 
  Home, Building2, ShieldCheck, Coins, FolderKanban, 
  Moon, Sun, Printer 
} from 'lucide-react';

export type TabId = 'home' | 'register' | 'compliance' | 'funding' | 'toolkits' | 'privacy';

interface HeaderProps {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
  isDark?: boolean;
  onToggleTheme?: () => void;
}

const HUB_ITEMS: { id: TabId; label: string; shortLabel: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'home', label: 'Overview', shortLabel: 'Overview', icon: Home },
  { id: 'register', label: 'Start & CIPC', shortLabel: 'CIPC', icon: Building2 },
  { id: 'compliance', label: 'Tax & B-BBEE', shortLabel: 'Tax & B-BBEE', icon: ShieldCheck },
  { id: 'funding', label: 'Funding & Grants', shortLabel: 'Funding', icon: Coins },
  { id: 'toolkits', label: 'Templates & Guides', shortLabel: 'Templates', icon: FolderKanban },
];

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isDark = false,
  onToggleTheme
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* Top Sticky Desktop & Mobile Brand Header */}
      <header className="sticky top-0 z-50 bg-[#0F172A] text-white border-b border-slate-800 shadow-md transition-colors no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          
          {/* Brand Wordmark */}
          <button
            type="button"
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded-lg shrink-0 cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-[#D4AF37] text-[#0F172A] flex items-center justify-center font-black text-sm shadow-xs">
              IB
            </div>
            <div>
              <span className="text-base sm:text-lg font-extrabold tracking-tight text-white whitespace-nowrap block leading-tight">
                Ispani Biz Hub
              </span>
              <span className="text-[10px] text-[#D4AF37] font-semibold tracking-wider uppercase block">
                SA Business & Compliance Portal
              </span>
            </div>
          </button>

          {/* Desktop 5-Hub Navigation Bar */}
          <nav aria-label="Main Hub Navigation" className="hidden md:flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800">
            {HUB_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#D4AF37] text-[#0F172A] shadow-xs'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#0F172A]' : 'text-[#D4AF37]'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Utilities: Print / Save PDF & Theme Switcher */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handlePrint}
              title="Print or Save Current View as PDF"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-[#0F172A] bg-[#D4AF37] hover:bg-[#e3be42] rounded-lg shadow-xs transition-colors cursor-pointer whitespace-nowrap"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print / Save PDF</span>
              <span className="sm:hidden">PDF</span>
            </button>

            {onToggleTheme && (
              <button
                type="button"
                onClick={onToggleTheme}
                aria-label="Toggle dark mode"
                className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                {isDark ? <Sun className="w-4 h-4 text-[#D4AF37]" /> : <Moon className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Fixed Mobile Bottom Navigation Bar */}
      <nav
        aria-label="Mobile Hub Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0F172A]/95 backdrop-blur-md border-t border-slate-800 px-1.5 py-1.5 no-print shadow-2xl"
      >
        <div className="grid grid-cols-5 gap-1 max-w-md mx-auto">
          {HUB_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-lg transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#D4AF37] text-[#0F172A] font-extrabold shadow-xs'
                    : 'text-slate-400 hover:text-white font-medium'
                }`}
              >
                <Icon className={`w-4 h-4 mb-0.5 ${isActive ? 'text-[#0F172A]' : 'text-[#D4AF37]'}`} />
                <span className="text-[10px] leading-tight tracking-tight truncate max-w-full">
                  {item.shortLabel}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
