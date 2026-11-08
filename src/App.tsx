import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BusinessStructuresSection } from './components/BusinessStructuresSection';
import { CipcProcessSection } from './components/CipcProcessSection';
import { TaxComplianceSection } from './components/TaxComplianceSection';
import { FundingDirectorySection } from './components/FundingDirectorySection';
import { FundingReadinessAudit } from './components/FundingReadinessAudit';
import { BusinessProfileGuideSection } from './components/BusinessProfileGuideSection';
import { ExternalResourceLinksSection } from './components/ExternalResourceLinksSection';
import { FaqSection } from './components/FaqSection';
import { BbeeAffidavitGenerator } from './components/BbeeAffidavitGenerator';
import { Footer } from './components/Footer';
import { ArrowUp } from 'lucide-react';

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [activeSection, setActiveSection] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      // Simple spy
      const sections = ['overview', 'structures', 'cipc', 'tax', 'funding', 'audit', 'business-profile', 'external-links', 'faq', 'affidavit'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'overview') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans selection:bg-emerald-500 selection:text-white transition-colors">
      {/* Top Bar Navigation */}
      <Header
        isDark={isDark}
        onToggleTheme={() => setIsDark(prev => !prev)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      <main>
        {/* Hero Section */}
        <div id="overview">
          <Hero
            onNavigate={handleNavigate}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>

        {/* Section 1: Types of Business Structures */}
        <BusinessStructuresSection />

        {/* Section 2: CIPC Registration Process & Fee Calculator */}
        <CipcProcessSection />

        {/* Section 3: SARS and Tax Compliance + Multi-Calculator */}
        <TaxComplianceSection />

        {/* Section 4: Startup Grants, SEDFA & Incubators Directory */}
        <FundingDirectorySection searchQuery={searchQuery} />

        {/* Section 5: Government Funding & Tender Readiness Audit */}
        <FundingReadinessAudit />

        {/* Section 6: Creating a Professional Business Profile */}
        <BusinessProfileGuideSection />

        {/* Section 7: External Resource Links (Official SA Portals) */}
        <ExternalResourceLinksSection />

        {/* Section 8: Frequently Asked Questions (FAQ) */}
        <FaqSection />

        {/* Section 9: B-BBEE EME Compliance Guide & Template */}
        <BbeeAffidavitGenerator />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Scroll-to-Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-40 p-3 bg-slate-900 dark:bg-emerald-600 text-white rounded-full shadow-lg hover:bg-slate-800 dark:hover:bg-emerald-500 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
