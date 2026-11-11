import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BusinessStructuresSection } from './components/BusinessStructuresSection';
import { CipcProcessSection } from './components/CipcProcessSection';
import { TaxComplianceSection } from './components/TaxComplianceSection';
import { FundingDirectorySection } from './components/FundingDirectorySection';
import { FundingReadinessAudit } from './components/FundingReadinessAudit';
import { BusinessProfileGuideSection } from './components/BusinessProfileGuideSection';
import { SampleBusinessPlanSection } from './components/SampleBusinessPlanSection';
import { ExternalResourceLinksSection } from './components/ExternalResourceLinksSection';
import { FaqSection } from './components/FaqSection';
import { BbeeAffidavitGenerator } from './components/BbeeAffidavitGenerator';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { Footer } from './components/Footer';
import { ArrowUp } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'privacy'>('home');
  const [activeSection, setActiveSection] = useState('structures');
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

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 350);

      if (currentPage !== 'home') return;

      const sections = [
        'overview',
        'structures',
        'cipc',
        'tax',
        'funding',
        'audit',
        'business-profile',
        'business-plan',
        'external-links',
        'faq',
        'affidavit'
      ];

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  const handleNavigatePage = (page: 'home' | 'privacy') => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateSection = (sectionId: string) => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 100);
    } else {
      scrollToSection(sectionId);
    }
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'overview') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans selection:bg-emerald-500 selection:text-white transition-colors">
      {/* Sticky Top Navigation Bar with Jump Links, Active Highlight & Theme Switcher */}
      <Header
        isDark={isDark}
        onToggleTheme={toggleTheme}
        currentPage={currentPage}
        onNavigatePage={handleNavigatePage}
        activeSection={activeSection}
        onNavigateSection={handleNavigateSection}
      />

      <main>
        {/* VIEW 1: HOME PAGE (All Comprehensive Sections & Tools) */}
        {currentPage === 'home' && (
          <div>
            {/* Overview & Live Search */}
            <div id="overview">
              <Hero
                onNavigate={handleNavigateSection}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            </div>

            {/* Section 01: Business Structures & Comparative Matrix */}
            <BusinessStructuresSection />

            {/* Section 02: CIPC 15-Minute BizPortal Step-by-Step & Fee Calculator */}
            <CipcProcessSection />

            {/* Section 03: SARS Tax Compliance, SBC 12E & Multi-Tax Calculator */}
            <TaxComplianceSection />

            {/* Section 04: Funding Directory (NYDA, SEDFA, SETA, Tech Grants) */}
            <FundingDirectorySection searchQuery={searchQuery} />

            {/* Section 05: 60-Second Funding & Tender Readiness Audit */}
            <FundingReadinessAudit />

            {/* Section 06: South African Business Profile Blueprint */}
            <BusinessProfileGuideSection />

            {/* Section 07: Sample Business Plan with 3-Year Audited Financials */}
            <SampleBusinessPlanSection />

            {/* Section 08: Verified Government & Statutory External Links */}
            <ExternalResourceLinksSection />

            {/* Section 09: Frequently Asked Questions & Accordions */}
            <FaqSection onNavigateSection={handleNavigateSection} />

            {/* Section 10: B-BBEE Level Calculator & Sworn Affidavit Generator */}
            <BbeeAffidavitGenerator />
          </div>
        )}

        {/* VIEW 2: PRIVACY POLICY PAGE (POPIA Compliant) */}
        {currentPage === 'privacy' && (
          <PrivacyPolicyPage
            onNavigateHome={() => handleNavigatePage('home')}
          />
        )}
      </main>

      {/* Footer with statutory links and "Powered by MaruB Creations" */}
      <Footer onNavigatePage={handleNavigatePage} />

      {/* Floating Back to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Back to Top"
          className="fixed bottom-6 right-6 z-40 p-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg transition-all duration-200 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500 flex items-center justify-center border border-white/20"
        >
          <ArrowUp className="w-5 h-5 stroke-[2.5]" />
        </button>
      )}
    </div>
  );
}
