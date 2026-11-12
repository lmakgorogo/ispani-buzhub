import React, { useState } from 'react';
import { 
  Building2, ShieldCheck, Scale, Users, Globe2, 
  Check, X, ChevronRight, HelpCircle, ArrowUpRight, 
  ExternalLink, Layers, Sparkles 
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

interface StructureItem {
  id: string;
  category: 'cipc' | 'coops_trusts' | 'foreign';
  name: string;
  badge: string;
  summary: string;
  cost: string;
  setupTime: string;
  liability: string;
  taxTreatment: string;
  bestFor: string;
  pros: string[];
  cons: string[];
  legislation: string;
}

const EXTENDED_STRUCTURES: StructureItem[] = [
  // 1. CIPC Companies
  {
    id: 'pty_ltd',
    category: 'cipc',
    name: 'Private Company (Pty Ltd)',
    badge: 'Limited Liability · CIPC CoR14.3',
    summary: 'The standard commercial entity in South Africa with separate legal personality and shareholder protection.',
    cost: 'R125 - R175 via BizPortal',
    setupTime: '24 to 72 hours',
    liability: 'Limited to unpaid share capital',
    taxTreatment: '27% Corporate Income Tax (CIT) or SBC relief (0% - 27%)',
    bestFor: 'Startups, scaling SMEs, retail ventures, commercial suppliers, and companies seeking outside venture capital.',
    pros: [
      'Strict legal separation between company assets and shareholder assets',
      'Perpetual succession (enterprise survives changes in directorship)',
      'Eligible for government tenders, grants, bank financing, and equity investment',
      'Can register for Small Business Corporation (SBC) tax rates'
    ],
    cons: [
      'Mandatory annual CIPC return filings and statutory fees',
      'Compulsory Beneficial Ownership transparency declaration',
      'Requires a registered Public Officer for SARS compliance'
    ],
    legislation: 'Companies Act 71 of 2008 & CIPC Regulations'
  },
  {
    id: 'npc',
    category: 'cipc',
    name: 'Non-Profit Company (NPC)',
    badge: 'Public Benefit · Section 10(1)(cN)',
    summary: 'Incorporated for public benefit, educational, or cultural purposes with no profit distribution to directors.',
    cost: 'R175 (standard) to R475 (custom MOI)',
    setupTime: '3 to 7 working days',
    liability: 'Limited / Fiduciary board governance',
    taxTreatment: 'Exempt from CIT if accredited as a SARS PBO (Section 18A tax-deductible donor status)',
    bestFor: 'Charities, educational initiatives, social impact enterprises, community trusts, and donor-funded NGOs.',
    pros: [
      'Eligible for Section 18A tax certificates (donors deduct donations from income tax)',
      'Access to National Lottery (NLC), corporate CSI funding, and international grants',
      'Enhances governance credibility and public donor trust'
    ],
    cons: [
      'Assets and profits cannot be distributed as dividends to founders or directors',
      'Upon dissolution, all remaining assets must transfer to another registered PBO/NPC',
      'Minimum 3 directors required by law'
    ],
    legislation: 'Companies Act 71 of 2008 (Schedule 1) & NPO Act 71 of 1997'
  },
  {
    id: 'inc',
    category: 'cipc',
    name: 'Personal Liability Company (Inc)',
    badge: 'Joint & Several Liability · Professional Councils',
    summary: 'Corporate structure tailored for regulated professionals whose statutory councils prohibit limited liability.',
    cost: 'R175 - R475',
    setupTime: '3 to 5 working days',
    liability: 'Directors jointly and severally liable for company debts',
    taxTreatment: 'Corporate Income Tax at 27% + statutory professional council rules',
    bestFor: 'Attorneys, advocates, medical doctors, auditors, accountants, and professional consulting engineers.',
    pros: [
      'Allows corporate contracting, shared overheads, and multi-partner equity',
      'Recognized by professional statutory bodies (LPC, HPCSA, IRBA, ECSA)',
      'Perpetual succession and corporate banking capabilities'
    ],
    cons: [
      'Past and present directors remain personally liable for contractual debts incurred during their tenure',
      'Strict council oversight and specialized MOI provisions required'
    ],
    legislation: 'Section 8(2)(c) & Section 19(3) Companies Act 71 of 2008'
  },
  {
    id: 'public_co',
    category: 'cipc',
    name: 'Public Company (Ltd)',
    badge: 'JSE Listed / Public Share Capital',
    summary: 'Large corporate entity capable of issuing shares to the general public with comprehensive governance oversight.',
    cost: 'R475+ (CIPC filing) + statutory prospectus costs',
    setupTime: '10 to 30 working days',
    liability: 'Limited to shares',
    taxTreatment: 'Standard Corporate Income Tax (27%) + Dividends Withholding Tax (20%)',
    bestFor: 'Large enterprises planning JSE / A2X exchange listings, syndicated infrastructure projects, and public capital calls.',
    pros: [
      'Ability to raise capital from institutional and retail public markets',
      'Freely transferable shares without pre-emptive restriction',
      'High institutional credibility and prestige'
    ],
    cons: [
      'Mandatory annual independent audits and Audit Committee',
      'Strict King IV corporate governance and Social & Ethics Committee mandates',
      'Extensive financial disclosure and regulatory reporting overhead'
    ],
    legislation: 'Companies Act 71 of 2008 & Financial Markets Act 19 of 2012'
  },

  // 2. Co-ops, Trusts & Partnerships
  {
    id: 'sole_proprietorship',
    category: 'coops_trusts',
    name: 'Sole Proprietorship',
    badge: 'No CIPC Registration · Zero Filing Fees',
    summary: 'Immediate informal setup where the business and owner are legally and financially identical.',
    cost: 'R0 (No registration fee)',
    setupTime: 'Immediate',
    liability: 'Unlimited personal liability',
    taxTreatment: 'Taxed at personal income tax sliding rates (18% - 45%) on net profits',
    bestFor: 'Freelancers, consultants, side hustlers, solo artisans, and micro-traders testing a concept before formalizing.',
    pros: [
      'Zero registration cost and zero annual CIPC filing requirements',
      'Total unilateral control with simple single-entry bookkeeping',
      'All business profits belong directly to the individual proprietor'
    ],
    cons: [
      'Personal house, car, and bank accounts are directly at risk for commercial debts',
      'Cannot issue equity, sell shares, or take outside venture capital',
      'Excluded from most government tenders and large corporate supply chains'
    ],
    legislation: 'South African Common Law & Income Tax Act'
  },
  {
    id: 'partnership',
    category: 'coops_trusts',
    name: 'General Partnership',
    badge: 'Contractual Agreement · 2 to 20 Partners',
    summary: 'Unincorporated commercial alliance formed by mutual partnership agreement without separate legal personality.',
    cost: 'R0 (Agreement legal drafting fee recommended)',
    setupTime: '1 to 3 days',
    liability: 'Joint and several unlimited personal liability',
    taxTreatment: 'Partners taxed individually on their respective profit shares',
    bestFor: 'Small joint trade ventures, trade alliances, and family ventures pooling shared equipment or premises.',
    pros: [
      'No formal CIPC incorporation filings or annual return fees',
      'Combined capital, skills, and industry credit of all partners',
      'Flexible internal governance governed by partnership contract'
    ],
    cons: [
      'Every partner can bind the partnership to debts and obligations',
      'Personal assets of all partners are exposed to creditor claims',
      'Partnership dissolves automatically upon death, bankruptcy, or departure of any partner'
    ],
    legislation: 'South African Partnership Common Law'
  },
  {
    id: 'cooperative',
    category: 'coops_trusts',
    name: 'Primary Co-operative',
    badge: 'Democratically Governed · Co-operatives Act',
    summary: 'Member-owned enterprise operating on mutual aid principles (one member, one vote) to serve shared economic goals.',
    cost: 'R175 (CIPC Co-ops Registry)',
    setupTime: '5 to 14 working days',
    liability: 'Limited to member contributions',
    taxTreatment: 'CIT at 27% with tax deductions for member bonuses/patronage dividends',
    bestFor: 'Agricultural farming syndicates, township worker collectives, community transport, and consumer buying co-ops.',
    pros: [
      'Priority access to Department of Small Business Development (DSBD) Co-op grants (CIS)',
      'Democratic member control and equitable distribution of patronage surplus',
      'Pooled purchasing power reduces wholesale supply costs for members'
    ],
    cons: [
      'Requires minimum 5 members to incorporate',
      'Consensus-driven decision-making can be slower than private enterprise',
      'Specific statutory reporting under the Co-operatives Act No. 14 of 2005'
    ],
    legislation: 'Co-operatives Amendment Act No. 6 of 2013'
  },
  {
    id: 'business_trust',
    category: 'coops_trusts',
    name: 'Business / Family Trust',
    badge: 'Master of High Court · Asset Protection',
    summary: 'Legal arrangement where trustees manage commercial assets for designated beneficiaries with distinct estate shielding.',
    cost: 'R250 Master of High Court fee + trust deed attorney fees',
    setupTime: '7 to 21 working days',
    liability: 'Trustee liability limited if authorized by trust deed',
    taxTreatment: 'Flat 45% tax rate on retained trust income, or conduit principle to beneficiaries',
    bestFor: 'Commercial real estate holding, family wealth succession, IP protection, and safeguarding vulnerable beneficiaries.',
    pros: [
      'Superior asset protection against personal creditor claims and insolvency',
      'Avoids estate duty and executor fees upon founder demise (perpetual asset holding)',
      'Flexible income distribution to beneficiaries under the conduit principle'
    ],
    cons: [
      'Flat 45% tax rate on income retained within the trust',
      'High administrative setup costs and registration with the Master of the High Court',
      'Stringent scrutiny under Financial Intelligence Centre Act (FICA)'
    ],
    legislation: 'Trust Property Control Act No. 57 of 1988'
  },

  // 3. Foreign Investors (Non-SA)
  {
    id: 'external_branch',
    category: 'foreign',
    name: 'External Branch of Foreign Company',
    badge: 'Section 23 CIPC Registration · Overseas Parent',
    summary: 'Branch office of an offshore parent corporation authorized to operate commercial contracts in South Africa.',
    cost: 'R400 (CIPC Form CoR20.1)',
    setupTime: '10 to 20 working days',
    liability: 'Parent company holds full direct liability for SA operations',
    taxTreatment: 'Branch Profits Tax at flat 27% (Exempt from Dividends Withholding Tax on repatriation)',
    bestFor: 'Multinational corporations, overseas software firms, and foreign contractors executing specific SA infrastructure projects.',
    pros: [
      'No secondary Dividends Withholding Tax (20%) when repatriating profits to foreign headquarters',
      'Seamless brand continuity and shared balance sheet credit of global parent',
      'Simplified winding up once local project milestone concludes'
    ],
    cons: [
      'Foreign parent company is directly exposed to legal actions in South African courts',
      'Must maintain registered South African office and appointed resident local representative',
      'Annual submission of foreign parent financials to CIPC required'
    ],
    legislation: 'Section 23 of Companies Act 71 of 2008'
  },
  {
    id: 'foreign_subsidiary',
    category: 'foreign',
    name: 'Offshore Subsidiary (SA Pty Ltd)',
    badge: '100% Foreign Owned · Ring-Fenced Risk',
    summary: 'Standard South African (Pty) Ltd where all equity shares are owned by foreign individuals or offshore corporate entities.',
    cost: 'R175 via BizPortal',
    setupTime: '3 to 7 working days',
    liability: 'Limited liability (Foreign parent balance sheet insulated)',
    taxTreatment: '27% CIT + 20% Dividends Withholding Tax (reduced by Double Tax Agreements DTA)',
    bestFor: 'Foreign entrepreneurs, venture funds, and multinationals establishing permanent long-term African regional headquarters.',
    pros: [
      'Completely ring-fences operational risk away from the foreign parent entity',
      'Foreign directors are 100% permitted with valid passport (no SA citizenship required)',
      'Full eligibility to participate in local B-BBEE equity structures and tenders'
    ],
    cons: [
      'South African Reserve Bank (SARB) exchange control compliance for capital repatriation',
      'Bank account opening requires apostilled foreign corporate identity documents'
    ],
    legislation: 'Companies Act 71 of 2008 & SARB Exchange Control Regulations'
  },
  {
    id: 'sadc_investor',
    category: 'foreign',
    name: 'SADC Regional Cross-Border Entity',
    badge: 'SADC Protocol · Trade Facilitation',
    summary: 'Enterprise structured to leverage Southern African Development Community (SADC) preferential trade tariffs.',
    cost: 'R175 - R475',
    setupTime: '5 to 10 working days',
    liability: 'Limited to shares',
    taxTreatment: 'CIT at 27% with zero-rated customs tariffs under SADC Free Trade Agreement',
    bestFor: 'Import/export traders, logistics corridors, cross-border retail, and manufacturing between SA, Botswana, Namibia, and Mozambique.',
    pros: [
      'Zero customs duties on qualified qualifying goods produced within SADC member states',
      'Access to South Africa’s sophisticated ports, financial markets, and freight logistics',
      'Streamlined customs clearance via SARS e-Filing Customs client registration'
    ],
    cons: [
      'Strict Rules of Origin verification certificates required for tariff exemptions',
      'Cross-border currency clearing regulations'
    ],
    legislation: 'SADC Trade Protocol & Customs and Excise Act 91 of 1964'
  }
];

export const BusinessStructuresSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'cipc' | 'coops_trusts' | 'foreign'>('cipc');
  const [selectedStructure, setSelectedStructure] = useState<StructureItem | null>(null);

  const filteredStructures = EXTENDED_STRUCTURES.filter(s => s.category === activeTab);

  return (
    <section id="structures" className="py-12 lg:py-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
              Legal Formations · Companies Act 71 of 2008
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Types of Business Structures
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
              Choose the legal foundation tailored for your scale, funding goals, and personal risk profile.
            </p>
          </div>
        </div>

        {/* 3 Strict Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-xl max-w-fit mb-8 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('cipc')}
            className={`px-4 py-2 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'cipc'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            1. CIPC Companies (Pty Ltd, NPC, Inc)
          </button>
          <button
            onClick={() => setActiveTab('coops_trusts')}
            className={`px-4 py-2 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'coops_trusts'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            2. Co-ops, Trusts & Partnerships
          </button>
          <button
            onClick={() => setActiveTab('foreign')}
            className={`px-4 py-2 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'foreign'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            3. Foreign Investors (Non-SA)
          </button>
        </div>

        {/* Compact Summary Cards Grid (Strict 3-Second Scan Rule) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredStructures.map((struct) => (
            <div
              key={struct.id}
              className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-all hover:shadow-xs group"
            >
              <div className="space-y-2.5">
                {/* Data Point 1: Title */}
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {struct.name}
                </h3>

                {/* Data Point 2: Cost / Compliance Badge */}
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-emerald-100/70 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-semibold text-[11px]">
                    {struct.cost}
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    {struct.liability}
                  </span>
                </div>

                {/* Data Point 3: 1-Sentence Summary */}
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {struct.summary}
                </p>
              </div>

              {/* Progressive Disclosure CTA */}
              <div className="pt-4 mt-4 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setSelectedStructure(struct)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  <span>Compare Pros, Cons & Tax Rules</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Clean Detail Modal / Drawer with Full Breakdown */}
        {selectedStructure && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs transition-opacity animate-fade-in">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto space-y-6">
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedStructure(null)}
                className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
                  {selectedStructure.badge}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {selectedStructure.name}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  {selectedStructure.summary}
                </p>
              </div>

              {/* Statutory Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Registration Cost</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{selectedStructure.cost}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Setup Timeline</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{selectedStructure.setupTime}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Liability Risk</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{selectedStructure.liability}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Governing Law</span>
                  <span className="font-semibold text-slate-900 dark:text-white truncate block">{selectedStructure.legislation}</span>
                </div>
              </div>

              {/* Best For Callout */}
              <div className="text-xs text-slate-700 dark:text-slate-300">
                <span className="font-bold text-slate-900 dark:text-white">Best Suited For: </span>
                <span>{selectedStructure.bestFor}</span>
              </div>

              {/* Tax Treatment */}
              <div className="p-3.5 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-800/50 text-xs text-slate-800 dark:text-slate-200">
                <span className="font-bold text-emerald-900 dark:text-emerald-300">Tax Treatment & SARS Rules: </span>
                <span>{selectedStructure.taxTreatment}</span>
              </div>

              {/* Pros and Cons 2-Column Split */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
                <div className="space-y-2 p-4 bg-white dark:bg-slate-800/30 rounded-xl border border-slate-200 dark:border-slate-700">
                  <h4 className="font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <Check className="w-4 h-4 stroke-[2.5]" />
                    <span>Commercial Advantages</span>
                  </h4>
                  <ul className="space-y-1.5 text-slate-600 dark:text-slate-300">
                    {selectedStructure.pros.map((pro, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2 p-4 bg-white dark:bg-slate-800/30 rounded-xl border border-slate-200 dark:border-slate-700">
                  <h4 className="font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <X className="w-4 h-4 stroke-[2.5]" />
                    <span>Statutory Obligations & Limits</span>
                  </h4>
                  <ul className="space-y-1.5 text-slate-600 dark:text-slate-300">
                    {selectedStructure.cons.map((con, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-rose-600 font-bold">✕</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  onClick={() => setSelectedStructure(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                >
                  Close Window
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
