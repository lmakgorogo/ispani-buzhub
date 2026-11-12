import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Search, FileText } from 'lucide-react';

interface FaqSectionProps {
  onNavigateSection?: (sectionId: string) => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onNavigateSection }) => {
  const [filterQuery, setFilterQuery] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How much does it cost to register a Pty Ltd on CIPC BizPortal in 2025/2026?',
      a: 'The official CIPC fee is exactly R175 (R50 to reserve a unique company name, plus R125 for standard incorporation). If you opt to use your enterprise number as the company name, the cost is only R125. Avoid agents charging upwards of R800 for the exact same online process.'
    },
    {
      q: 'Do I need to pay for a B-BBEE SANAS audit certificate?',
      a: 'No. If your enterprise turns over under R10 Million per year, it qualifies as an Exempted Micro Enterprise (EME). By law under DTI Codes, you only require a sworn affidavit signed before a Commissioner of Oaths, which is 100% free at any police station or post office.'
    },
    {
      q: 'What is the Small Business Corporation (SBC) tax benefit?',
      a: 'SBC allows qualifying small businesses to pay 0% income tax on their first R95,750 of taxable profit, and graduated tiers up to 27%. In contrast, standard non-qualifying companies pay a flat 27% on every single Rand of profit from day one.'
    },
    {
      q: 'When is VAT registration mandatory for South African businesses?',
      a: 'VAT registration is legally compulsory within 21 days once your taxable sales exceed R1 Million in any consecutive 12-month period. You may register voluntarily once you have generated at least R50,000 in taxable supplies.'
    },
    {
      q: 'Can foreign nationals register a company in South Africa?',
      a: 'Yes. Foreign nationals holding a valid passport can register a South African Private Company (Pty Ltd) on CIPC. At least one director must have a South African residential or operational address for formal statutory service.'
    },
    {
      q: 'What is a Tax Compliance Status (TCS) PIN and why do I need it?',
      a: 'A TCS PIN is an electronic verification code issued via SARS eFiling that proves your company has no overdue tax returns or unmanaged tax debts. Banks, grant agencies, and tender committees require an active TCS PIN before releasing funds.'
    },
    {
      q: 'What is the deadline for filing CIPC Annual Returns?',
      a: 'Annual returns must be submitted within 30 business days following the month of your company’s registration anniversary. Missing this deadline incurs a late filing fee penalty and eventually triggers administrative company deregistration by CIPC.'
    },
    {
      q: 'How do I apply for the NYDA Youth Grant?',
      a: 'Apply online at erp.nyda.gov.za. All shareholders must be aged 18 to 35, and applicants must attend an NYDA entrepreneurship orientation course. Approved grants (R1,000 to R250,000) are paid directly to your equipment suppliers.'
    }
  ];

  const filteredFaqs = faqs.filter(item => 
    item.q.toLowerCase().includes(filterQuery.toLowerCase()) || 
    item.a.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <section id="faq" className="py-12 lg:py-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" />
              <span>Statutory Knowledge Base</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
              Clear statutory answers to South Africa’s most common company registration, tax, B-BBEE, and grant queries.
            </p>
          </div>

          {/* Quick FAQ Search */}
          <div className="relative max-w-xs w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Search questions..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Accordions for FAQs */}
        <div className="space-y-3 max-w-4xl mx-auto">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                className="bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between cursor-pointer text-left select-none hover:bg-slate-100/70 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="flex items-center gap-3 pr-2">
                    <span className="w-6 h-6 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">
                      Q
                    </span>
                    <h3 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
                      {faq.q}
                    </h3>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="p-5 pt-2 border-t border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-white/50 dark:bg-slate-900/40">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Business Plan Call-to-Action Card */}
        <div className="p-6 sm:p-8 bg-emerald-50/70 dark:bg-emerald-950/20 rounded-2xl border border-emerald-200 dark:border-emerald-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 max-w-4xl mx-auto">
          <div className="space-y-1">
            <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Need a bankable business plan with audited 3-year financials?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl">
              Access the pre-calculated 3-year P&L, 12-month cash flow schedule, and Capex model tailored for South African commercial banks and SEDFA.
            </p>
          </div>
          <a
            href="#toolkits"
            onClick={(e) => {
              if (onNavigateSection) {
                e.preventDefault();
                onNavigateSection('toolkits');
              }
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#D4AF37] hover:bg-[#e3be42] text-[#0F172A] text-xs font-extrabold rounded-xl shadow-xs transition-colors shrink-0 cursor-pointer no-print"
          >
            <FileText className="w-4 h-4" />
            <span>Open Business Plan &amp; Templates</span>
          </a>
        </div>

      </div>
    </section>
  );
};
