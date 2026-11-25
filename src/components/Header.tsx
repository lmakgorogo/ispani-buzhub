import React from 'react';
import {
  Home,
  Building2,
  ShieldCheck,
  Coins,
  FolderKanban,
  Moon,
  Sun,
  Printer,
  Scale,
  Store
} from 'lucide-react';

export type TabId =
  | 'home'
  | 'register'
  | 'compliance'
  | 'funding'
  | 'toolkits'
  | 'directory'
  | 'vacancies'
  | 'privacy';

interface HeaderProps {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
  isDark?: boolean;
  onToggleTheme?: () => void;
}

const HUB_ITEMS: {
  id: TabId;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: 'home', label: 'Overview', shortLabel: 'Overview', icon: Home },
  { id: 'register', label: 'Start & CIPC', shortLabel: 'CIPC', icon: Building2 },
  { id: 'compliance', label: 'Tax & B-BBEE', shortLabel: 'Tax & B-BBEE', icon: Scale },
  { id: 'funding', label: 'Funding & Grants', shortLabel: 'Funding', icon: Coins },
  { id: 'toolkits', label: 'Templates & Guides', shortLabel: 'Templates', icon: FolderKanban },
  { id: 'directory', label: 'Directory', shortLabel: 'Directory', icon: Store },
  { id: 'vacancies', label: 'Verified Vacancies', shortLabel: 'Vacancies', icon: ShieldCheck }
];

export const IspaniLogoMark: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Left 'i' top square dot in Signature Gold (#EAB308) */}
    <rect x="8" y="6" width="16" height="15" fill="#EAB308" />
    {/* Left 'i' vertical bar + center crossbar + right 'B' outer loops in Signature Gold (#EAB308) */}
    <path
      d="M8 27H24V43H66C73.5 43 78 38.5 78 32C78 25.5 73.5 21 66 21H50V6H67C83 6 94 16 94 31C94 40 89 46.5 81.5 49.5C90.5 52.5 96 60 96 70C96 85 84.5 94 67 94H56V79H66.5C74.5 79 80 74.5 80 68C80 61.5 74.5 57 66.5 57H24V94H8V27Z"
      fill="#EAB308"
    />
    {/* Inner split vertical bar (top segment) in Primary Deep Midnight Blue (#070B28) */}
    <rect x="34" y="6" width="16" height="35" fill="#070B28" />
    {/* Inner split vertical bar (bottom segment) in Primary Deep Midnight Blue (#070B28) */}
    <rect x="34" y="59" width="16" height="35" fill="#070B28" />
  </svg>
);

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
      <header className="sticky top-0 z-50 bg-[#FFFFFF] text-[#1E293B] border-b-2 border-[#15806B]/30 shadow-sm transition-colors no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-3">
          {/* Official Geometric iB Monogram + ISPANI BIZHUB. Lockup */}
          <button
            type="button"
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EAB308] rounded-xl py-1 shrink-0 cursor-pointer group"
          >
            <IspaniLogoMark className="w-10 h-10 sm:w-11 sm:h-11 shrink-0" />
            <div className="flex flex-col">
              <span className="text-base sm:text-xl font-black tracking-tight text-[#070B28] group-hover:text-[#0D133D] whitespace-nowrap leading-none flex items-baseline">
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

          {/* Desktop Hub Navigation Bar */}
          <nav
            aria-label="Main Hub Navigation"
            className="hidden lg:flex items-center gap-1 bg-[#070B28] p-1.5 rounded-xl border border-[#0D133D] overflow-x-auto no-scrollbar shadow-xs"
          >
            {HUB_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#EAB308] text-[#070B28] shadow-xs font-extrabold'
                      : 'text-slate-100 hover:text-white hover:bg-[#0D133D]'
                  }`}
                >
                  <Icon
                    className={`w-3.5 h-3.5 ${
                      isActive ? 'text-[#070B28]' : 'text-[#EAB308]'
                    }`}
                  />
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
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-extrabold text-[#070B28] bg-[#EAB308] hover:bg-[#facc15] rounded-lg shadow-xs transition-colors cursor-pointer whitespace-nowrap"
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
                className="p-2 text-[#070B28] hover:text-white rounded-lg bg-[#F8FAFC] hover:bg-[#0D133D] border border-slate-200 transition-colors cursor-pointer"
              >
                {isDark ? (
                  <Sun className="w-4 h-4 text-[#EAB308]" />
                ) : (
                  <Moon className="w-4 h-4 text-[#070B28]" />
                )}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Fixed Mobile / Tablet Bottom Navigation Bar */}
      <nav
        aria-label="Mobile Hub Navigation"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#070B28]/98 backdrop-blur-md border-t-2 border-[#15806B] px-1 py-1.5 no-print shadow-2xl"
      >
        <div className="grid grid-cols-7 gap-0.5 max-w-xl mx-auto">
          {HUB_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center py-1.5 px-0.5 rounded-lg transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#EAB308] text-[#070B28] font-extrabold shadow-xs'
                    : 'text-slate-200 hover:text-white hover:bg-[#0D133D] font-medium'
                }`}
              >
                <Icon
                  className={`w-4 h-4 mb-0.5 ${
                    isActive ? 'text-[#070B28]' : 'text-[#EAB308]'
                  }`}
                />
                <span className="text-[9px] sm:text-[10px] leading-tight tracking-tight truncate max-w-full">
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
