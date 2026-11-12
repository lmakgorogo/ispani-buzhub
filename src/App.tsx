import React, { useState, useEffect, Suspense } from 'react';
import { CurrencyProvider } from './context/CurrencyContext';
import { Header, TabId } from './components/Header';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';
import { 
  ArrowUp, ArrowRight, Building2, ShieldCheck, Coins, 
  FolderKanban, FileText, Briefcase, ExternalLink, Compass 
} from 'lucide-react';

// Lazy-loaded view modules
const BusinessStructuresSection = React.lazy(() =>
  import('./components/BusinessStructuresSection').then((m) => ({ default: m.BusinessStructuresSection }))
);
const CipcProcessSection = React.lazy(() =>
  import('./components/CipcProcessSection').then((m) => ({ default: m.CipcProcessSection }))
);
const TaxComplianceSection = React.lazy(() =>
  import('./components/TaxComplianceSection').then((m) => ({ default: m.TaxComplianceSection }))
);
const FundingDirectorySection = React.lazy(() =>
  import('./components/FundingDirectorySection').then((m) => ({ default: m.FundingDirectorySection }))
);
const FundingReadinessAudit = React.lazy(() =>
  import('./components/FundingReadinessAudit').then((m) => ({ default: m.FundingReadinessAudit }))
);
const BusinessProfileGuideSection = React.lazy(() =>
  import('./components/BusinessProfileGuideSection').then((m) => ({ default: m.BusinessProfileGuideSection }))
);
const SampleBusinessPlanSection = React.lazy(() =>
  import('./components/SampleBusinessPlanSection').then((m) => ({ default: m.SampleBusinessPlanSection }))
);
const ExternalResourceLinksSection = React.lazy(() =>
  import('./components/ExternalResourceLinksSection').then((m) => ({ default: m.ExternalResourceLinksSection }))
);
const FaqSection = React.lazy(() =>
  import('./components/FaqSection').then((m) => ({ default: m.FaqSection }))
);
const BbeeAffidavitGenerator = React.lazy(() =>
  import('./components/BbeeAffidavitGenerator').then((m) => ({ default: m.BbeeAffidavitGenerator }))
);
const PrivacyPolicyPage = React.lazy(() =>
  import('./components/PrivacyPolicyPage').then((m) => ({ default: m.PrivacyPolicyPage }))
);

const VALID_TABS: TabId[] = ['home', 'register', 'compliance', 'funding', 'toolkits', 'privacy'];

type ToolkitSubTab = 'plan' | 'profile' | 'links';

function parseHashToTab(hash: string): { tab: TabId; subTab?: ToolkitSubTab } {
  const clean = hash.replace(/^#/, '').trim().toLowerCase();
  if (VALID_TABS.includes(clean as TabId)) {
    return { tab: clean as TabId };
  }
  if (clean === 'structures' || clean === 'cipc') {
    return { tab: 'register' };
  }
  if (clean === 'tax' || clean === 'affidavit') {
    return { tab: 'compliance' };
  }
  if (clean === 'audit') {
    return { tab: 'funding' };
  }
  if (clean === 'business-plan') {
    return { tab: 'toolkits', subTab: 'plan' };
  }
  if (clean === 'business-profile') {
    return { tab: 'toolkits', subTab: 'profile' };
  }
  if (clean === 'external-links') {
    return { tab: 'toolkits', subTab: 'links' };
  }
  return { tab: 'home' };
}

export default function App() {
  const [activeTab, setActiveTabState] = useState<TabId>(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      return parseHashToTab(window.location.hash).tab;
    }
    return 'home';
  });

  const [toolkitSubTab, setToolkitSubTab] = useState<ToolkitSubTab>(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      return parseHashToTab(window.location.hash).subTab || 'plan';
    }
    return 'plan';
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // Synchronize activeTab with URL hash and scroll to top on view switch
  const setActiveTab = (tab: TabId) => {
    setActiveTabState(tab);
    if (typeof window !== 'undefined') {
      if (window.location.hash !== `#${tab}`) {
        window.history.pushState(null, '', `#${tab}`);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleHashChange = () => {
      const parsed = parseHashToTab(window.location.hash);
      setActiveTabState(parsed.tab);
      if (parsed.subTab) {
        setToolkitSubTab(parsed.subTab);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 350);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFaqNavigate = (sectionOrTab: string) => {
    const parsed = parseHashToTab(sectionOrTab);
    if (parsed.subTab) {
      setToolkitSubTab(parsed.subTab);
    }
    setActiveTab(parsed.tab);
  };

  const journeyCards: {
    id: TabId;
    step: string;
    title: string;
    subtitle: string;
    badge: string;
    cta: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    {
      id: 'register',
      step: 'Stage 01',
      title: 'Start & Register (CIPC)',
      subtitle: 'Compare Pty Ltd, Co-ops & Trusts, calculate CIPC fees, and follow the 6-step BizPortal registration walkthrough.',
      badge: 'R175 Official Fee',
      cta: 'Open CIPC & Structures Hub',
      icon: Building2,
    },
    {
      id: 'compliance',
      step: 'Stage 02',
      title: 'Tax, Licences & B-BBEE',
      subtitle: 'Calculate SBC corporate tax savings, review 8 industry hustle licences, and print your free Sworn B-BBEE EME Affidavit.',
      badge: 'SARS + B-BBEE Level 1',
      cta: 'Open Tax & B-BBEE Hub',
      icon: ShieldCheck,
    },
    {
      id: 'funding',
      step: 'Stage 03',
      title: 'Funding, Grants & Audit',
      subtitle: 'Complete the 10-point Government Readiness Audit and filter NYDA, SEDFA, IDC, TIA, and SETA grants.',
      badge: 'R1k – R15M+ Grants',
      cta: 'Open Funding & Audit Hub',
      icon: Coins,
    },
    {
      id: 'toolkits',
      step: 'Stage 04',
      title: 'Templates & Official Portals',
      subtitle: 'Read or print our 6-chapter Sample Business Plan with 3-year financials, Company Profile Blueprint, and verified gov links.',
      badge: 'Print-Ready PDFs',
      cta: 'Open Templates & Guides',
      icon: FolderKanban,
    },
  ];

  return (
    <CurrencyProvider>
      <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans selection:bg-emerald-500 selection:text-white transition-colors">
        
        {/* Top Desktop & Mobile Sticky Navigation */}
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isDark={isDark}
          onToggleTheme={toggleTheme}
        />

        <main className="flex-1">
          <Suspense
            fallback={
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300">
                  <div className="w-4 h-4 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
                  <span>Loading workspace module...</span>
                </div>
              </div>
            }
          >
            {/* VIEW 1: HOME (Overview + 4-Card Journey Grid + FAQs) */}
            {activeTab === 'home' && (
              <div>
                <Hero
                  setActiveTab={setActiveTab}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                />

                {/* 4-Card "Where are you in your business journey?" Interactive Grid */}
                <section className="py-12 lg:py-16 bg-[#0F172A] text-white border-b border-slate-800">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                      <div>
                        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-1">
                          <Compass className="w-4 h-4" />
                          <span>Interactive Business Roadmap</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                          Where are you in your business journey?
                        </h2>
                        <p className="text-sm text-slate-300 mt-1 max-w-2xl">
                          Select your current stage below to open a focused workspace with calculators, step-by-step checklists, and printable templates.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                      {journeyCards.map((card) => {
                        const Icon = card.icon;
                        return (
                          <div
                            key={card.id}
                            onClick={() => setActiveTab(card.id)}
                            className="group bg-[#1E1E24] hover:bg-slate-800/90 border border-slate-700/80 hover:border-[#D4AF37] rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 cursor-pointer shadow-md"
                          >
                            <div className="space-y-3">
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#D4AF37]">
                                  {card.step}
                                </span>
                                <span className="px-2 py-0.5 rounded bg-slate-800 text-emerald-400 font-mono text-[10px] font-semibold border border-slate-700">
                                  {card.badge}
                                </span>
                              </div>

                              <div className="w-10 h-10 rounded-xl bg-[#0F172A] border border-slate-700 flex items-center justify-center text-[#D4AF37] group-hover:scale-105 transition-transform">
                                <Icon className="w-5 h-5" />
                              </div>

                              <h3 className="text-base font-extrabold text-white group-hover:text-[#D4AF37] transition-colors">
                                {card.title}
                              </h3>

                              <p className="text-xs text-slate-300 leading-relaxed">
                                {card.subtitle}
                              </p>
                            </div>

                            <div className="pt-5 mt-4 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-[#D4AF37]">
                              <span>{card.cta}</span>
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </section>

                <FaqSection onNavigateSection={handleFaqNavigate} />
              </div>
            )}

            {/* VIEW 2: REGISTER (Module Banner + BusinessStructuresSection + CipcProcessSection + Next Step CTA) */}
            {activeTab === 'register' && (
              <div>
                {/* Module Banner */}
                <div className="bg-[#0F172A] text-white py-8 sm:py-10 border-b border-slate-800 no-print">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                        <Building2 className="w-4 h-4" />
                        <span>Module 01 · Formalization &amp; CIPC Incorporation</span>
                      </div>
                      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                        Start &amp; CIPC Registration Hub
                      </h1>
                      <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
                        Choose the right legal entity structure and follow the 6-step CIPC BizPortal registration process (R175 standard fee).
                      </p>
                    </div>
                    <a
                      href="https://www.bizportal.gov.za/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#D4AF37] hover:bg-[#e3be42] text-[#0F172A] text-xs font-extrabold rounded-xl shadow-xs transition-colors shrink-0 self-start md:self-auto"
                    >
                      <span>Open Official BizPortal.gov.za</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <BusinessStructuresSection />
                <CipcProcessSection />

                {/* Bottom Next Step CTA Card */}
                <div className="bg-[#0F172A] text-white py-10 border-t border-slate-800 no-print">
                  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="p-6 sm:p-8 rounded-2xl bg-[#1E1E24] border border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                      <div className="space-y-1">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                          Completed Company Registration?
                        </span>
                        <h3 className="text-lg sm:text-xl font-extrabold text-white">
                          Next Step: Tax &amp; B-BBEE Compliance
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                          Calculate your Small Business Corporation (SBC) tax savings, check industry hustle licences, and download your free Sworn B-BBEE EME Affidavit.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveTab('compliance')}
                        className="inline-flex items-center gap-2 px-5 py-3 bg-[#D4AF37] hover:bg-[#e3be42] text-[#0F172A] text-xs font-extrabold rounded-xl shadow-xs transition-colors shrink-0 cursor-pointer"
                      >
                        <span>Next Step: Tax &amp; B-BBEE</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 3: COMPLIANCE (Module Banner + TaxComplianceSection + BbeeAffidavitGenerator + Next Step CTA) */}
            {activeTab === 'compliance' && (
              <div>
                {/* Module Banner */}
                <div className="bg-[#0F172A] text-white py-8 sm:py-10 border-b border-slate-800 no-print">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Module 02 · Statutory &amp; Sector Compliance</span>
                      </div>
                      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                        SARS Tax, Industry Licences &amp; B-BBEE Hub
                      </h1>
                      <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
                        Stay compliant with SARS eFiling, verify mandatory sector permits, and generate your B-BBEE Exempted Micro Enterprise (EME) sworn affidavit.
                      </p>
                    </div>
                    <a
                      href="https://www.cipc.co.za/wp-content/uploads/2023/01/Affidavit-EME-Gen.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#D4AF37] hover:bg-[#e3be42] text-[#0F172A] text-xs font-extrabold rounded-xl shadow-xs transition-colors shrink-0 self-start md:self-auto"
                    >
                      <span>Download Official CIPC B-BBEE PDF</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <TaxComplianceSection />
                <BbeeAffidavitGenerator />

                {/* Bottom Next Step CTA Card */}
                <div className="bg-[#0F172A] text-white py-10 border-t border-slate-800 no-print">
                  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="p-6 sm:p-8 rounded-2xl bg-[#1E1E24] border border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                      <div className="space-y-1">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                          Tax PIN &amp; B-BBEE Affidavit Ready?
                        </span>
                        <h3 className="text-lg sm:text-xl font-extrabold text-white">
                          Next Step: Funding &amp; Grants
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                          Audit your compliance dossier in 60 seconds and unlock NYDA youth grants, merged SEDFA funds, IDC industrial financing, and SETA stipends.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveTab('funding')}
                        className="inline-flex items-center gap-2 px-5 py-3 bg-[#D4AF37] hover:bg-[#e3be42] text-[#0F172A] text-xs font-extrabold rounded-xl shadow-xs transition-colors shrink-0 cursor-pointer"
                      >
                        <span>Next Step: Funding &amp; Grants</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 4: FUNDING (Module Banner + FundingReadinessAudit + FundingDirectorySection + Next Step CTA) */}
            {activeTab === 'funding' && (
              <div>
                {/* Module Banner */}
                <div className="bg-[#0F172A] text-white py-8 sm:py-10 border-b border-slate-800 no-print">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                        <Coins className="w-4 h-4" />
                        <span>Module 03 · Capital Readiness &amp; Grant Directory</span>
                      </div>
                      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                        Funding Readiness Audit &amp; Grants Directory
                      </h1>
                      <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
                        Verify your mandatory compliance documents first, then apply directly to verified South African development finance institutions and incubators.
                      </p>
                    </div>
                  </div>
                </div>

                <FundingReadinessAudit />
                <FundingDirectorySection searchQuery={searchQuery} />

                {/* Bottom Next Step CTA Card */}
                <div className="bg-[#0F172A] text-white py-10 border-t border-slate-800 no-print">
                  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="p-6 sm:p-8 rounded-2xl bg-[#1E1E24] border border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                      <div className="space-y-1">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                          Preparing Your Grant or Bank Application?
                        </span>
                        <h3 className="text-lg sm:text-xl font-extrabold text-white">
                          Next Step: Templates &amp; Guides
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                          Use our bankable 6-chapter Sample Business Plan (with 3-year P&amp;L and 12-month cash flows), Company Profile Guide, and Official Portal Directory.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveTab('toolkits')}
                        className="inline-flex items-center gap-2 px-5 py-3 bg-[#D4AF37] hover:bg-[#e3be42] text-[#0F172A] text-xs font-extrabold rounded-xl shadow-xs transition-colors shrink-0 cursor-pointer"
                      >
                        <span>Next Step: Templates &amp; Guides</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 5: TOOLKITS (Module Banner with 3 Sub-Tab Pill Buttons -> Renders 1 Tool at a time) */}
            {activeTab === 'toolkits' && (
              <div>
                {/* Module Banner + 3 Sub-Tab Pill Switcher */}
                <div className="bg-[#0F172A] text-white py-8 sm:py-10 border-b border-slate-800 no-print">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                        <FolderKanban className="w-4 h-4" />
                        <span>Module 04 · Printable Blueprints &amp; Official Portals</span>
                      </div>
                      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                        Templates, Financial Models &amp; Official Links
                      </h1>
                      <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
                        Select a resource below. Clicking &ldquo;Print / Save PDF&rdquo; exports only the currently open template cleanly onto A4 pages.
                      </p>
                    </div>

                    {/* 3 Sub-Tab Pill Buttons */}
                    <div className="flex flex-wrap items-center gap-2 pt-1 no-print" role="tablist" aria-label="Toolkit Sub-Navigation">
                      <button
                        type="button"
                        role="tab"
                        aria-selected={toolkitSubTab === 'plan'}
                        onClick={() => setToolkitSubTab('plan')}
                        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                          toolkitSubTab === 'plan'
                            ? 'bg-[#D4AF37] text-[#0F172A] shadow-sm'
                            : 'bg-[#1E1E24] text-slate-300 hover:text-white border border-slate-700'
                        }`}
                      >
                        <FileText className="w-4 h-4" />
                        <span>Sample Business Plan</span>
                      </button>

                      <button
                        type="button"
                        role="tab"
                        aria-selected={toolkitSubTab === 'profile'}
                        onClick={() => setToolkitSubTab('profile')}
                        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                          toolkitSubTab === 'profile'
                            ? 'bg-[#D4AF37] text-[#0F172A] shadow-sm'
                            : 'bg-[#1E1E24] text-slate-300 hover:text-white border border-slate-700'
                        }`}
                      >
                        <Briefcase className="w-4 h-4" />
                        <span>Company Profile Guide</span>
                      </button>

                      <button
                        type="button"
                        role="tab"
                        aria-selected={toolkitSubTab === 'links'}
                        onClick={() => setToolkitSubTab('links')}
                        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                          toolkitSubTab === 'links'
                            ? 'bg-[#D4AF37] text-[#0F172A] shadow-sm'
                            : 'bg-[#1E1E24] text-slate-300 hover:text-white border border-slate-700'
                        }`}
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Official Portals &amp; Links</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Render strictly the active sub-tab */}
                {toolkitSubTab === 'plan' && <SampleBusinessPlanSection />}
                {toolkitSubTab === 'profile' && <BusinessProfileGuideSection />}
                {toolkitSubTab === 'links' && <ExternalResourceLinksSection />}
              </div>
            )}

            {/* VIEW 6: PRIVACY POLICY PAGE */}
            {activeTab === 'privacy' && (
              <PrivacyPolicyPage onNavigateHome={() => setActiveTab('home')} />
            )}
          </Suspense>
        </main>

        {/* Footer */}
        <Footer setActiveTab={setActiveTab} />

        {/* Floating Back to Top Button (Positioned above mobile bottom bar on small screens) */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            aria-label="Back to Top"
            className="fixed bottom-20 md:bottom-6 right-5 z-40 p-3 bg-[#D4AF37] hover:bg-[#e3be42] text-[#0F172A] rounded-full shadow-lg transition-all duration-200 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D4AF37] flex items-center justify-center border border-[#0F172A]/20 no-print"
          >
            <ArrowUp className="w-5 h-5 stroke-[2.5]" />
          </button>
        )}

      </div>
    </CurrencyProvider>
  );
}
