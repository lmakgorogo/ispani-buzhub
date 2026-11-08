import React, { useState } from 'react';
import { 
  HelpCircle, ChevronDown, ChevronUp, Search, 
  AlertTriangle, Calendar, Building2, Receipt, 
  Coins, ExternalLink, ArrowRight 
} from 'lucide-react';

interface FaqItem {
  id: string;
  category: 'Registration' | 'Tax & Timelines' | 'Pitfalls & Compliance' | 'Funding';
  question: string;
  summary: string;
  answer: string;
  pitfallWarning?: string;
  deadlines?: string[];
  officialUrl?: string;
  actionText?: string;
}

const FAQ_DATA: FaqItem[] = [
  // --- Business Registration ---
  {
    id: 'reg-timeframe',
    category: 'Registration',
    question: 'How long does CIPC registration take and what does it actually cost?',
    summary: 'Standard electronic registration takes between 24 and 72 hours and costs exactly R175 via BizPortal.',
    answer: 'When registering through the official CIPC BizPortal (bizportal.gov.za), standard registration costs R125 for the Memorandum of Incorporation (CoR15.1A) and an optional R50 for custom name reservation (total R175). If you opt to register immediately using your enterprise registration number (e.g., 2026/123456/07) without reserving a custom name, the cost is only R125. The official CoR14.3 registration certificate and 10-digit SARS income tax number are generated electronically upon card payment.',
    officialUrl: 'https://bizportal.gov.za',
    actionText: 'Register on BizPortal'
  },
  {
    id: 'reg-name-reservation',
    category: 'Registration',
    question: 'Do I need to reserve a company name before trading?',
    summary: 'No. You can trade under an Enterprise Number or reserve up to 4 name options.',
    answer: 'You do not have to wait for name approval to start. You can incorporate immediately using your automatic enterprise number (e.g., 2026/987654/07) and file a name amendment later. If you do submit names, BizPortal allows you to propose up to 4 names in order of preference for R50. Avoid generic words like "Logistics" or "Holdings" alone, and ensure words like "National" or "State" are not used, as these trigger manual legal reviews.',
    officialUrl: 'https://bizportal.gov.za/company_registration.aspx',
    actionText: 'Search Name Availability'
  },
  {
    id: 'reg-bank-integration',
    category: 'Registration',
    question: 'Can I open a business bank account through BizPortal during registration?',
    summary: 'Yes, BizPortal integrates directly with major South African retail and commercial banks.',
    answer: 'During Step 5 of the BizPortal workflow, you can choose to send your verified incorporation data directly to FNB, Standard Bank, Nedbank, Absa, or Capitec Business. Once incorporated, the bank will reach out to the primary director to finalize FICA and issue digital banking credentials without needing to re-upload company certificates manually.',
    officialUrl: 'https://bizportal.gov.za',
    actionText: 'View Banking Integration'
  },

  // --- Tax Timelines & SARS ---
  {
    id: 'tax-public-officer',
    category: 'Tax & Timelines',
    question: 'What is a Public Officer and why must I appoint one within 21 days?',
    summary: 'A Public Officer is the primary individual legally accountable to SARS for the company’s tax affairs.',
    answer: 'Under Section 246 of the Tax Administration Act, every registered South African company must appoint a registered Public Officer who is a resident of the Republic within 21 days of commencing business or opening an office. Without this appointment, SARS eFiling locks out your company profile, preventing you from generating a Tax Compliance Status (TCS) PIN, filing VAT returns, or bidding for tenders.',
    deadlines: [
      'Within 21 days of incorporation: Appoint Public Officer on SARS eFiling',
      'Requires: Resolution letter, certified ID, and proof of residential address'
    ],
    officialUrl: 'https://www.sars.gov.za/businesses-and-employers/my-business-and-tax/appoint-a-registered-representative-or-public-officer/',
    actionText: 'SARS Public Officer Guide'
  },
  {
    id: 'tax-deadlines-calendar',
    category: 'Tax & Timelines',
    question: 'What are the critical statutory tax submission dates throughout the year?',
    summary: 'Corporate provisional tax occurs twice yearly, employer taxes monthly, and VAT bi-monthly.',
    answer: 'Failing to meet SARS calendar deadlines attracts automatic 10% late penalties plus compound interest calculated monthly. Key dates include:',
    deadlines: [
      '7th of Every Month: EMP201 payroll submission & payment (PAYE, UIF, SDL)',
      'Last Business Day of Month (Bi-monthly): VAT201 return and payment (e.g. Category A/B)',
      '6 Months into Financial Year: First Provisional Tax Return (IRP6) payment',
      'Financial Year-End (Month 12): Second Provisional Tax Return (IRP6) payment',
      'Within 12 Months of Year-End: Annual Corporate Income Tax Return (ITR14)',
      'May & October: Bi-annual EMP501 employer reconciliation (interim and final tax certificates)'
    ],
    officialUrl: 'https://sarsefiling.co.za',
    actionText: 'Log into SARS eFiling'
  },
  {
    id: 'tax-vat-threshold',
    category: 'Tax & Timelines',
    question: 'When is VAT registration compulsory versus voluntary in South Africa?',
    summary: 'Compulsory when turnover exceeds R1 million in any consecutive 12-month period.',
    answer: 'Registration is compulsory if the total value of taxable goods or services exceeds R1,000,000 in a consecutive 12-month period, or if there is a contractual obligation to exceed R1m. Voluntary registration is permitted once turnover has reached R50,000 in the past 12 months. Voluntary registration allows you to claim back 15% input VAT on equipment and supplies, but requires strict bi-monthly VAT201 reporting.',
    officialUrl: 'https://www.sars.gov.za/types-of-tax/value-added-tax/',
    actionText: 'SARS VAT Regulations'
  },

  // --- Common Pitfalls & Compliance ---
  {
    id: 'pitfall-cipc-annual-returns',
    category: 'Pitfalls & Compliance',
    question: 'What happens if I forget to file CIPC Annual Returns?',
    summary: 'CIPC will place your company in deregistration, freezing corporate bank accounts.',
    answer: 'This is the single most common pitfall for new entrepreneurs. A CIPC Annual Return is NOT a tax return; it is a statutory fee (R100 to R4,000) paid to CIPC annually within 30 business days after your company’s incorporation anniversary. If you miss consecutive returns, CIPC initiates automated deregistration. Once deregistered, your company ceases to exist as a legal entity, all bank accounts are instantly frozen, and title in company property vests in the National Treasury as bona vacantia.',
    pitfallWarning: 'Never assume zero turnover means zero filing. Even dormant companies must file a R100 annual return with the Financial Accountability Supplement.',
    officialUrl: 'https://annualreturns.cipc.co.za',
    actionText: 'Check CIPC Annual Return Status'
  },
  {
    id: 'pitfall-beneficial-ownership',
    category: 'Pitfalls & Compliance',
    question: 'Is the CIPC Beneficial Ownership Register really mandatory for small businesses?',
    summary: 'Yes. Mandatory under South African anti-money laundering law for all Pty Ltd entities.',
    answer: 'Following South Africa’s FATF greylisting, the General Laws (Anti-Money Laundering) Amendment Act made filing a Beneficial Ownership Register compulsory for every private company, regardless of size. You must disclose every natural person who holds 5% or more direct or indirect beneficial ownership or control. CIPC now blocks companies from filing annual returns or updating directors if the beneficial ownership register is overdue.',
    pitfallWarning: 'Failure to file can lead to formal compliance notices, administrative fines up to R1,000,000, or criminal referral for directors.',
    officialUrl: 'https://eservices.cipc.co.za',
    actionText: 'File Beneficial Ownership'
  },
  {
    id: 'pitfall-bbee-certificate-scam',
    category: 'Pitfalls & Compliance',
    question: 'Do I need to pay an agency thousands of Rands for a B-BBEE Certificate?',
    summary: 'No! If your turnover is under R10 million, you only need a free Sworn Affidavit.',
    answer: 'Under the B-BBEE Codes of Good Practice gazetted by the Department of Trade, Industry and Competition (dtic), any enterprise with annual revenue under R10 million qualifies as an Exempted Micro Enterprise (EME). EMEs DO NOT require SANAS-accredited verification agencies or expensive audits. You only need a completed DTIC Sworn Affidavit signed before a Commissioner of Oaths (such as at any SAPS police station, Post Office, or bank).',
    pitfallWarning: 'Do not pay consultants R3,000 - R10,000 for an EME B-BBEE certificate. Use the free generator tool built into this guide.',
    officialUrl: 'https://www.thedtic.gov.za/economic-empowerment/b-bbee/b-bbee-templates/',
    actionText: 'DTIC Affidavit Templates'
  },
  {
    id: 'pitfall-commingling-funds',
    category: 'Pitfalls & Compliance',
    question: 'Why should I never use my personal bank account for company transactions?',
    summary: 'Commingling funds pierces the corporate veil and complicates SARS tax audits.',
    answer: 'Using a personal bank account for corporate trading ruins limited liability protection. If a legal dispute arises, creditors can argue the company is an alter-ego, exposing your personal house, car, and savings. Additionally, SARS audits will scrutinize every personal transfer as taxable revenue unless strict, burdensome reconciliations are provided. Always open a dedicated business cheque or transactional account in the exact legal name shown on your CoR14.3.',
    pitfallWarning: 'Government grants and commercial loans will reject applications immediately if bank statements are in an individual’s personal name.'
  },

  // --- Funding & Grants ---
  {
    id: 'funding-rejection-reasons',
    category: 'Funding',
    question: 'What are the top reasons government grant applications (NYDA, SEDFA, TIA) get rejected?',
    summary: 'Administrative disqualification due to missing compliance documents or unverified bank statements.',
    answer: 'Over 70% of government grant rejections in South Africa happen during the initial compliance phase before evaluators even read the business plan. The most frequent disqualifications are: an expired SARS Tax Compliance Status (TCS) PIN; bank statements downloaded as uncertified screenshots rather than official bank-stamped PDFs; lack of 3-month certification on director IDs; or failure to register on the National Treasury Central Supplier Database (CSD).',
    officialUrl: 'https://erp.nyda.gov.za',
    actionText: 'Verify NYDA Grant Rules'
  },
  {
    id: 'funding-youth-criteria',
    category: 'Funding',
    question: 'Who qualifies as a "Youth" for South African startup funding?',
    summary: 'South African citizens aged between 18 and 35 years old on the date of application.',
    answer: 'Under the National Youth Development Agency Act, youth is defined as any South African citizen aged 18 to 35. For the NYDA Grant Programme, the enterprise must be 100% youth-owned with founders working full-time in the business. For the DSBD Youth Challenge Fund (up to R1.5M), minimum youth ownership is 51%, and the business must operate in priority sectors such as ICT, manufacturing, agro-processing, or green technologies.',
    officialUrl: 'https://www.dsbd.gov.za',
    actionText: 'View Youth Challenge Fund'
  }
];

export const FaqSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>('reg-timeframe');

  const categories = [
    'All',
    'Registration',
    'Tax & Timelines',
    'Pitfalls & Compliance',
    'Funding'
  ];

  const filteredFaqs = FAQ_DATA.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q ||
      item.question.toLowerCase().includes(q) ||
      item.summary.toLowerCase().includes(q) ||
      item.answer.toLowerCase().includes(q) ||
      (item.pitfallWarning && item.pitfallWarning.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <section id="faq" className="py-12 lg:py-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
              Entrepreneur Knowledge Base · Frequently Asked Questions
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
              Practical answers to everyday questions about CIPC BizPortal registration, SARS tax deadlines, common pitfalls to avoid, and grant funding rules for South African entrepreneurs.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto text-xs text-slate-500">
            <HelpCircle className="w-4 h-4 text-emerald-600" />
            <span>Updated with 2025/2026 statutory regulations</span>
          </div>
        </div>

        {/* Filter Controls: Category Tabs & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-8">
          {/* Category Tabs (Segmented control) */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-x-auto text-xs font-medium">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative max-w-xs w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions or keywords..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 shadow-xs"
            />
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3 max-w-4xl mx-auto">
          {filteredFaqs.map((faq) => {
            const isExpanded = expandedId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all ${
                  isExpanded
                    ? 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-300 dark:border-slate-700 shadow-xs'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggleExpand(faq.id)}
                  className="w-full p-5 text-left flex items-start justify-between gap-4 focus:outline-none"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                      <span>{faq.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-slate-400 font-normal">{faq.summary}</span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug">
                      {faq.question}
                    </h3>
                  </div>

                  <div className="p-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 shrink-0 mt-1">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {/* Accordion Body */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 border-t border-slate-200/60 dark:border-slate-700/60">
                    <p className="leading-relaxed">
                      {faq.answer}
                    </p>

                    {/* Statutory Deadlines List if present */}
                    {faq.deadlines && (
                      <div className="p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white">
                          <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Statutory Due Dates & Requirements:</span>
                        </div>
                        <ul className="space-y-1 pl-5 list-disc text-xs text-slate-600 dark:text-slate-400">
                          {faq.deadlines.map((dl, idx) => (
                            <li key={idx}>{dl}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Pitfall Warning Box if present */}
                    {faq.pitfallWarning && (
                      <div className="p-3.5 bg-rose-50/70 dark:bg-rose-950/20 rounded-xl border border-rose-200 dark:border-rose-900/50 flex items-start gap-2.5 text-xs text-rose-900 dark:text-rose-200">
                        <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="block font-semibold">Critical Pitfall Warning:</strong>
                          <span>{faq.pitfallWarning}</span>
                        </div>
                      </div>
                    )}

                    {/* Official Link Button if present */}
                    {faq.officialUrl && (
                      <div className="pt-2 flex items-center justify-between">
                        <span className="text-[11px] text-slate-400">Official Government Guidance</span>
                        <a
                          href={faq.officialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                        >
                          <span>{faq.actionText || 'Open Official Portal'}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredFaqs.length === 0 && (
          <div className="text-center py-10 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 max-w-xl mx-auto">
            <Search className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">No matching questions found</h4>
            <p className="text-xs text-slate-500 mt-1">Try another search term or click on "All" to browse all queries.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="mt-3 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-medium rounded-lg text-slate-700 dark:text-slate-300"
            >
              Clear Search Filter
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
