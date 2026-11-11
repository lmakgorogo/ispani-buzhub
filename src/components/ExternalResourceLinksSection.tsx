import React, { useState } from 'react';
import { 
  Building2, Landmark, Coins, ShieldCheck, 
  ExternalLink, Search, FileText, Briefcase, 
  GraduationCap, Award, CheckCircle2, ArrowUpRight 
} from 'lucide-react';

interface PortalLink {
  id: string;
  name: string;
  department: string;
  category: 'Registration & CIPC' | 'SARS & Tax' | 'Grants & Funding' | 'Procurement & Labour';
  url: string;
  description: string;
  primaryAction: string;
  features: string[];
  icon: 'cipc' | 'sars' | 'funding' | 'procurement' | 'labour' | 'bbee';
}

const PORTALS: PortalLink[] = [
  {
    id: 'bizportal',
    name: 'CIPC BizPortal',
    department: 'Companies & Intellectual Property Commission',
    category: 'Registration & CIPC',
    url: 'https://bizportal.gov.za',
    description: 'The official digital gateway for registering a new Private Company (Pty Ltd) in South Africa with instant electronic issuance of the CoR14.3 registration certificate.',
    primaryAction: 'Launch BizPortal',
    features: ['Instant CoR14.3 Certificate', 'Integrated SARS Tax Number', 'Company Name Reservation (R50)'],
    icon: 'cipc'
  },
  {
    id: 'sars-efiling',
    name: 'SARS eFiling Portal',
    department: 'South African Revenue Service',
    category: 'SARS & Tax',
    url: 'https://sarsefiling.co.za',
    description: 'The national electronic tax platform for managing corporate income tax (CIT), VAT201 returns, monthly employee PAYE/UIF remittances, and appointing public officers.',
    primaryAction: 'Open SARS eFiling',
    features: ['File ITR14 & IRP6 Returns', 'Submit VAT201 & EMP201', 'Tax Compliance Status (TCS) PIN'],
    icon: 'sars'
  },
  {
    id: 'dsbd',
    name: 'DSBD Funding Portal',
    department: 'Department of Small Business Development',
    category: 'Grants & Funding',
    url: 'https://www.dsbd.gov.za',
    description: 'The custodian of South African SMME support policies, managing high-impact programs including the Youth Challenge Fund (YCF) and Township & Rural Enterprise Programme (TREP).',
    primaryAction: 'Visit DSBD Portal',
    features: ['Youth Challenge Fund (Up to R1.5M)', 'TREP Township Grants', 'Small Business Support Schemes'],
    icon: 'funding'
  },
  {
    id: 'sedfa',
    name: 'SEDFA Agency Portal',
    department: 'Small Enterprise & Development Finance Agency (SEDA + SEFA + CBDA)',
    category: 'Grants & Funding',
    url: 'https://sedfa.org.za',
    description: 'The consolidated enterprise finance entity operationalized in October 2024, providing asset finance, term loans below prime, and nationwide business incubation.',
    primaryAction: 'Open SEDFA Portal',
    features: ['Asset & Tooling Finance', 'Merged SEDA/SEFA Programs', 'National Business Incubator Network'],
    icon: 'funding'
  },
  {
    id: 'nyda-erp',
    name: 'NYDA ERP Grant Portal',
    department: 'National Youth Development Agency',
    category: 'Grants & Funding',
    url: 'https://erp.nyda.gov.za',
    description: 'Official application portal for 100% non-repayable youth enterprise grants (R1,000 to R200,000) for South African entrepreneurs aged 18 to 35.',
    primaryAction: 'Apply on NYDA ERP',
    features: ['Grants up to R200,000', 'No Equity or Repayment Required', 'Free Mentorship & Voucher Scheme'],
    icon: 'funding'
  },
  {
    id: 'tia',
    name: 'Technology Innovation Agency (TIA)',
    department: 'Department of Science and Innovation',
    category: 'Grants & Funding',
    url: 'https://www.tia.org.za',
    description: 'Seed and commercialization grant funding for novel technological innovations, IP patenting, laboratory prototyping, and pre-commercial pilot trials.',
    primaryAction: 'Visit TIA Portal',
    features: ['Seed Fund Grants up to R650,000', 'Technology Prototyping Support', 'Partner University Network'],
    icon: 'funding'
  },
  {
    id: 'cipc-eservices',
    name: 'CIPC e-Services Gateway',
    department: 'Companies & Intellectual Property Commission',
    category: 'Registration & CIPC',
    url: 'https://eservices.cipc.co.za',
    description: 'The core regulatory database for director changes (CoR39), company address updates, certified disclosures, and filing mandatory Beneficial Ownership registers.',
    primaryAction: 'Open CIPC e-Services',
    features: ['Beneficial Ownership Filing', 'Director & Address Amendments', 'Statutory Entity Disclosures'],
    icon: 'cipc'
  },
  {
    id: 'cipc-annual-returns',
    name: 'CIPC Annual Returns Portal',
    department: 'Companies & Intellectual Property Commission',
    category: 'Registration & CIPC',
    url: 'https://annualreturns.cipc.co.za',
    description: 'Dedicated statutory portal for filing mandatory annual returns to keep your company in active legal standing and prevent administrative deregistration.',
    primaryAction: 'File Annual Returns',
    features: ['Turnover-based Fee Calculator', 'Financial Accountability Supplement', 'Status Verification & Invoicing'],
    icon: 'cipc'
  },
  {
    id: 'csd-treasury',
    name: 'Treasury CSD Supplier Portal',
    department: 'National Treasury Republic of South Africa',
    category: 'Procurement & Labour',
    url: 'https://secure.csd.gov.za',
    description: 'Central Supplier Database (CSD) registration required to do business with any South African organ of state, municipality, state-owned enterprise, or public grant scheme.',
    primaryAction: 'Register on CSD',
    features: ['Unique Supplier (MAAA) Number', 'Automated CIPC & SARS Validation', 'Public Tender Eligibility'],
    icon: 'procurement'
  },
  {
    id: 'dtic-incentives',
    name: 'the dtic Financial Incentives',
    department: 'Department of Trade, Industry and Competition',
    category: 'Grants & Funding',
    url: 'https://www.thedtic.gov.za/financial-and-non-financial-support/incentives/',
    description: 'Industrial and small business cost-sharing grants (BBSDP, SPII, MCEP) covering 50% to 80% of eligible machinery, industrial equipment, and IT modernization costs.',
    primaryAction: 'View dtic Incentives',
    features: ['BBSDP Supplier Development', 'SPII Industrial Innovation', 'Export Marketing & Investment Grants'],
    icon: 'funding'
  },
  {
    id: 'compeasy-labour',
    name: 'CompEasy (COIDA Portal)',
    department: 'Department of Employment and Labour',
    category: 'Procurement & Labour',
    url: 'https://compeasy.labour.gov.za',
    description: 'Compensation for Occupational Injuries and Diseases Act portal for submitting annual Return of Earnings (W.As.8) and obtaining Letters of Good Standing.',
    primaryAction: 'Access CompEasy',
    features: ['Letters of Good Standing', 'Annual Return of Earnings', 'Workplace Injury Compensation'],
    icon: 'labour'
  },
  {
    id: 'yes-programme',
    name: 'YES 4 Youth Portal',
    department: 'Youth Employment Service Non-Profit Initiative',
    category: 'Procurement & Labour',
    url: 'https://yes4youth.co.za',
    description: 'Private-sector initiative enabling businesses to sponsor 12-month youth work experiences in exchange for moving up 1 to 2 full contributor levels on the B-BBEE scorecard.',
    primaryAction: 'Explore YES 4 Youth',
    features: ['Move 1-2 B-BBEE Levels Up', '12-Month Work Experience Model', 'Workplace Skills Validation'],
    icon: 'bbee'
  }
];

export const ExternalResourceLinksSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [filterQuery, setFilterQuery] = useState<string>('');

  const categories = [
    'All',
    'Registration & CIPC',
    'SARS & Tax',
    'Grants & Funding',
    'Procurement & Labour'
  ];

  const filteredPortals = PORTALS.filter((portal) => {
    const matchesCategory = selectedCategory === 'All' || portal.category === selectedCategory;
    const q = filterQuery.toLowerCase().trim();
    const matchesSearch = !q || 
      portal.name.toLowerCase().includes(q) ||
      portal.department.toLowerCase().includes(q) ||
      portal.description.toLowerCase().includes(q) ||
      portal.features.some(f => f.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  const getPortalIcon = (icon: PortalLink['icon']) => {
    switch (icon) {
      case 'cipc':
        return <Building2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'sars':
        return <Landmark className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'funding':
        return <Coins className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      case 'procurement':
        return <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case 'labour':
        return <Briefcase className="w-5 h-5 text-rose-600 dark:text-rose-400" />;
      case 'bbee':
        return <Award className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      default:
        return <ExternalLink className="w-5 h-5 text-slate-600" />;
    }
  };

  return (
    <section id="external-links" className="py-12 lg:py-16 bg-slate-50/70 dark:bg-slate-950/50 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
              Official South African Government & Regulatory Gateways
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              External Resource Links
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
              Direct, verified access points to official portals including CIPC BizPortal, SARS eFiling, the DSBD funding site, National Treasury CSD, and the merged SEDFA platform.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto text-xs text-slate-500 dark:text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>All links lead to official verified .gov.za and accredited org domains</span>
          </div>
        </div>

        {/* Filter Controls: Category Tabs & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-8">
          {/* Category Tabs (Segmented control) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-200/80 dark:bg-slate-800 rounded-xl text-xs font-medium no-scrollbar max-w-fit">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Quick Search Input */}
          <div className="relative max-w-xs w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Search portal or service..."
              className="w-full pl-9 pr-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 shadow-xs"
            />
          </div>
        </div>

        {/* Icon-Based Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPortals.map((portal) => (
            <div
              key={portal.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm transition-all group"
            >
              <div>
                {/* Header Lockup: Icon + Category and Department */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    {getPortalIcon(portal.icon)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 block truncate">
                      {portal.department}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5 truncate">
                      {portal.name}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                  {portal.description}
                </p>

                {/* Key Features / Services List */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
                  {portal.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-600 dark:text-slate-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400 truncate max-w-[150px]">
                  {portal.url.replace('https://', '')}
                </span>
                <a
                  href={portal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors shrink-0"
                >
                  <span>{portal.primaryAction}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredPortals.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
            <Search className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">No matching portals found</h4>
            <p className="text-xs text-slate-500 mt-1">Try clearing your search query or selecting "All".</p>
            <button
              onClick={() => { setFilterQuery(''); setSelectedCategory('All'); }}
              className="mt-3 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-xs font-medium rounded-lg text-slate-700 dark:text-slate-300"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
