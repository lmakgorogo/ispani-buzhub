import React, { useState } from 'react';
import { TAX_OBLIGATIONS } from '../data/businessData';
import { 
  Receipt, Calculator, ShieldCheck, AlertCircle, 
  Clock, DollarSign, Percent, ArrowRight, FileCheck, 
  ExternalLink, ChevronRight, X, Briefcase, AlertTriangle, 
  CheckCircle2, Sparkles 
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

interface IndustryLicence {
  id: string;
  title: string;
  badge: string;
  summary: string;
  cost: string;
  forms: string;
  authority: string;
  penalties: string;
  officialUrl: string;
  actionText: string;
}

const INDUSTRY_LICENCES: IndustryLicence[] = [
  {
    id: 'food_spaza',
    title: 'Food, Catering & Spaza Shops',
    badge: 'Certificate of Acceptability (COA) · Reg R638',
    summary: 'Mandatory municipal health inspection certificate required before storing, preparing, or retailing food to the public.',
    cost: 'R0 - R500 (Municipal fee)',
    forms: 'Regulation R638 Application Form + Municipal Business Trading Permit',
    authority: 'Local Municipality Environmental Health Services & Dept of Health',
    penalties: 'Immediate health shutdown order, stock confiscation, and statutory fines under Foodstuffs, Cosmetics and Disinfectants Act 54 of 1972.',
    officialUrl: 'https://www.gov.za/services/certificates-licences-permits/certificate-acceptability-food-premises',
    actionText: 'Municipal COA Guidelines'
  },
  {
    id: 'hair_beauty',
    title: 'Hair Salons, Barbers & Nail Studios',
    badge: 'HCSBC Registration · Bargaining Council',
    summary: 'Statutory bargaining council registration governing minimum wage compliance, chair-rental agreements, and sanitary standards.',
    cost: 'R150 - R350/mo council levies',
    forms: 'HCSBC Annexure A Establishment Registration + Trade Qualifications',
    authority: 'National Bargaining Council for Hairdressing & Cosmetology (HCSBC)',
    penalties: 'Compliance orders, sheriff asset attachment, and Labour Court default awards under Labour Relations Act 66 of 1995.',
    officialUrl: 'https://www.hcsbc.co.za',
    actionText: 'Register on HCSBC Portal'
  },
  {
    id: 'construction',
    title: 'Construction & Civil Contractors',
    badge: 'CIDB Grading 1-9 · NHBRC · COIDA',
    summary: 'Compulsory contractor grading to bid on state/municipal tenders, plus NHBRC home warranty and workers compensation.',
    cost: 'R450 to R5,000+ (Grades 1 to 9)',
    forms: 'CIDB Form 1-B, NHBRC Registration, Compensation Fund W.As.8 Return',
    authority: 'Construction Industry Development Board (CIDB) & NHBRC',
    penalties: 'Disqualification from public tenders; criminal fines up to R25,000 or 1 year jail under Housing Consumers Protection Measures Act.',
    officialUrl: 'https://www.cidb.org.za',
    actionText: 'Apply for CIDB Grade'
  },
  {
    id: 'auto_mechanic',
    title: 'Auto Mechanics, Workshops & Panel Beaters',
    badge: 'MIBCO · Environmental Waste Oil (ROSE)',
    summary: 'Mandatory motor industry bargaining council compliance and hazardous used-oil disposal tracking.',
    cost: 'Council levies + Free ROSE oil registration',
    forms: 'MIBCO ER1 Form, Hazardous Waste Consignment Notes, Fire Safety Permit',
    authority: 'Motor Industry Bargaining Council (MIBCO) & ROSE Foundation',
    penalties: 'Statutory compliance orders; up to R10,000,000 environmental fines under NEMWA for improper engine oil disposal.',
    officialUrl: 'https://www.mibco.org.za',
    actionText: 'MIBCO Registration Guide'
  },
  {
    id: 'carpentry',
    title: 'Carpentry, Joinery & Furniture Makers',
    badge: 'FP&M SETA · OHSA Workplace Safety',
    summary: 'Wood and paper sector skills compliance, industrial zoning consent, and machine operator safety standards.',
    cost: 'Free SETA accreditation; municipal zoning permit',
    forms: 'FP&M SETA Workplace Skills Plan (WSP), OHSA Saw Safety Protocol',
    authority: 'Fibre Processing and Manufacturing SETA (FP&M SETA) & Dept of Labour',
    penalties: 'Department of Labour stop-work prohibition notices for unguarded machinery or lack of dust extraction systems.',
    officialUrl: 'https://fpmseta.org.za',
    actionText: 'FP&M SETA Portal'
  },
  {
    id: 'influencer',
    title: 'Social Media Influencers & Content Creators',
    badge: 'ARB #Ad Rules · SARS Barter & AdSense Tax',
    summary: 'Mandatory commercial disclosure on paid promotions (#Ad) and declaring gifted merchandise, free travel, and YouTube revenue.',
    cost: 'R0 (Statutory compliance requirement)',
    forms: 'SARS IRP6 Provisional Tax (Barter goods valued at Fair Market Value)',
    authority: 'Advertising Regulatory Board (ARB) & SARS',
    penalties: 'ARB consumer censure, plus up to 200% SARS understatement penalty and back-interest for undeclared commercial gifts.',
    officialUrl: 'https://arb.org.za',
    actionText: 'ARB Social Media Code'
  },
  {
    id: 'ai_digital',
    title: 'AI Agencies, SaaS & Digital Consultancies',
    badge: 'POPIA Information Officer · PAIA Manual',
    summary: 'Compulsory registration of an appointed Information Officer with the Information Regulator before processing client personal data.',
    cost: 'Free registration with Information Regulator',
    forms: 'Form 1 IO Registration, Section 51 PAIA Manual, Cloud Transfer Addendum',
    authority: 'The Information Regulator of South Africa',
    penalties: 'Administrative fines up to R10,000,000 or up to 10 years imprisonment for severe data privacy violations under POPIA.',
    officialUrl: 'https://inforegulator.org.za',
    actionText: 'Register Information Officer'
  },
  {
    id: 'network_marketing',
    title: 'Direct Selling & Network Marketing',
    badge: 'Consumer Protection Act (Sec 43) · DSA Code',
    summary: 'Statutory requirements separating legitimate retail network marketing from criminal pyramid schemes.',
    cost: 'R0 (Compliance with CPA)',
    forms: 'DSA Member Code of Conduct, Mandatory 14-day 100% Product Buyback Policy',
    authority: 'National Consumer Commission (NCC) & Direct Selling Association',
    penalties: 'Pyramid schemes are strictly illegal under CPA Section 43 with criminal prosecution and asset seizure.',
    officialUrl: 'https://www.dsasa.co.za',
    actionText: 'DSA Code of Ethics'
  }
];

export const TaxComplianceSection: React.FC = () => {
  const { formatMoney } = useCurrency();
  const [sectionMode, setSectionMode] = useState<'tax' | 'licences'>('tax');
  const [selectedTax, setSelectedTax] = useState<any | null>(null);
  const [selectedLicence, setSelectedLicence] = useState<IndustryLicence | null>(null);
  const [calcTab, setCalcTab] = useState<'vat' | 'sbc' | 'turnover' | 'uif'>('vat');

  // VAT Calculator states
  const [vatInput, setVatInput] = useState<number>(10000);
  const [vatMode, setVatMode] = useState<'exclusive' | 'inclusive'>('exclusive');
  const vatRate = 0.15;
  const vatAmount = vatMode === 'exclusive' 
    ? vatInput * vatRate 
    : vatInput - (vatInput / (1 + vatRate));
  const vatTotal = vatMode === 'exclusive' 
    ? vatInput + vatAmount 
    : vatInput;
  const vatNet = vatMode === 'exclusive' 
    ? vatInput 
    : vatInput - vatAmount;

  // SBC vs CIT Calculator states
  const [sbcTaxableProfit, setSbcTaxableProfit] = useState<number>(450000);

  const calculateSbcTax = (profit: number) => {
    if (profit <= 0) return 0;
    if (profit <= 95750) return 0;
    if (profit <= 365000) return (profit - 95750) * 0.07;
    if (profit <= 550000) return 18848 + (profit - 365000) * 0.21;
    return 57698 + (profit - 550000) * 0.27;
  };

  const standardCitTax = Math.max(0, sbcTaxableProfit * 0.27);
  const sbcTax = calculateSbcTax(sbcTaxableProfit);
  const sbcSavings = Math.max(0, standardCitTax - sbcTax);

  // Turnover Tax Calculator states
  const [microTurnover, setMicroTurnover] = useState<number>(600000);
  const calculateTurnoverTax = (turnover: number) => {
    if (turnover <= 335000) return 0;
    if (turnover <= 500000) return (turnover - 335000) * 0.01;
    if (turnover <= 750000) return 1650 + (turnover - 500000) * 0.02;
    if (turnover <= 1000000) return 6650 + (turnover - 750000) * 0.03;
    return 6650 + 250000 * 0.03;
  };
  const turnoverTaxAmount = calculateTurnoverTax(microTurnover);

  // UIF states
  const [grossSalary, setGrossSalary] = useState<number>(15000);
  const uifCeiling = 17712;
  const uifBase = Math.min(grossSalary, uifCeiling);
  const employeeUif = Math.round(uifBase * 0.01 * 100) / 100;
  const employerUif = Math.round(uifBase * 0.01 * 100) / 100;
  const totalUif = employeeUif + employerUif;

  return (
    <section id="tax" className="py-12 lg:py-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
              Statutory Compliance & Licences
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              SARS Tax Obligations & Industry Licences
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
              Understand mandatory tax filing thresholds, SARS TCS verification PINs, and industry-specific commercial operating permits.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto text-xs">
            <span className="text-slate-500 dark:text-slate-400">SARS eFiling:</span>
            <a
              href="https://sarsefiling.co.za"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
            >
              <span>sarsefiling.co.za</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Toggle Switch between "SARS Tax Obligations" and "Industry & Hustle Licences" */}
        <div className="flex items-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-xl max-w-fit mb-8 text-xs font-semibold">
          <button
            onClick={() => setSectionMode('tax')}
            className={`px-4 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              sectionMode === 'tax'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Receipt className="w-4 h-4 text-emerald-600" />
            <span>SARS Tax Obligations ({TAX_OBLIGATIONS.length})</span>
          </button>

          <button
            onClick={() => setSectionMode('licences')}
            className={`px-4 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              sectionMode === 'licences'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Briefcase className="w-4 h-4 text-emerald-600" />
            <span>Industry & Hustle Licences ({INDUSTRY_LICENCES.length})</span>
          </button>
        </div>

        {/* VIEW A: SARS Tax Obligations (Compact Cards) */}
        {sectionMode === 'tax' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
            {/* Left 6-col: 4 Core Tax Cards (Strict 3-Second Scan Rule) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {TAX_OBLIGATIONS.map((tax) => (
                  <div
                    key={tax.id}
                    className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between hover:shadow-xs group"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                          {tax.name}
                        </h4>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold shrink-0">
                          {tax.rate.split('(')[0].trim()}
                        </span>
                      </div>

                      <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                        {tax.frequency}
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                        {tax.description}
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setSelectedTax(tax)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 cursor-pointer"
                      >
                        <span>View Forms & Penalties</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 5-col: Interactive SARS Multi-Calculator */}
            <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
                <div className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-emerald-600" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                    SARS Multi-Tax Calculator
                  </h3>
                </div>
              </div>

              {/* Calculator Tab Switcher */}
              <div className="grid grid-cols-4 gap-1 p-1 bg-slate-200/80 dark:bg-slate-700/60 rounded-xl text-xs font-medium">
                <button
                  onClick={() => setCalcTab('vat')}
                  className={`py-1 rounded-lg text-center transition-colors ${
                    calcTab === 'vat' ? 'bg-white dark:bg-slate-900 font-bold text-slate-900 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  VAT (15%)
                </button>
                <button
                  onClick={() => setCalcTab('sbc')}
                  className={`py-1 rounded-lg text-center transition-colors ${
                    calcTab === 'sbc' ? 'bg-white dark:bg-slate-900 font-bold text-slate-900 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  SBC Relief
                </button>
                <button
                  onClick={() => setCalcTab('turnover')}
                  className={`py-1 rounded-lg text-center transition-colors ${
                    calcTab === 'turnover' ? 'bg-white dark:bg-slate-900 font-bold text-slate-900 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Turnover
                </button>
                <button
                  onClick={() => setCalcTab('uif')}
                  className={`py-1 rounded-lg text-center transition-colors ${
                    calcTab === 'uif' ? 'bg-white dark:bg-slate-900 font-bold text-slate-900 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  UIF (2%)
                </button>
              </div>

              {/* Calculator Sub-Views */}
              {calcTab === 'vat' && (
                <div className="space-y-3 pt-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 dark:text-slate-400 font-medium">Amount to Calculate</span>
                    <div className="flex gap-2 text-[11px]">
                      <button
                        onClick={() => setVatMode('exclusive')}
                        className={`px-2 py-0.5 rounded cursor-pointer ${vatMode === 'exclusive' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-500'}`}
                      >
                        Excl. VAT
                      </button>
                      <button
                        onClick={() => setVatMode('inclusive')}
                        className={`px-2 py-0.5 rounded cursor-pointer ${vatMode === 'inclusive' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-500'}`}
                      >
                        Incl. VAT
                      </button>
                    </div>
                  </div>
                  <input
                    type="number"
                    value={vatInput}
                    onChange={(e) => setVatInput(Number(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-xs font-mono bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl"
                  />
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5 font-mono">
                    <div className="flex justify-between text-slate-600 dark:text-slate-400">
                      <span>Net Amount:</span>
                      <span>{formatMoney(vatNet, 2)}</span>
                    </div>
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>VAT @ 15%:</span>
                      <span>{formatMoney(vatAmount, 2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-slate-900 dark:text-white pt-1 border-t border-slate-100 dark:border-slate-800">
                      <span>Gross Total:</span>
                      <span>{formatMoney(vatTotal, 2)}</span>
                    </div>
                  </div>
                </div>
              )}

              {calcTab === 'sbc' && (
                <div className="space-y-3 pt-2 text-xs">
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Taxable Annual Profit:</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">{formatMoney(sbcTaxableProfit)}</span>
                  </div>
                  <input
                    type="range"
                    min="50000"
                    max="1000000"
                    step="25000"
                    value={sbcTaxableProfit}
                    onChange={(e) => setSbcTaxableProfit(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5 font-mono">
                    <div className="flex justify-between text-slate-600 dark:text-slate-400">
                      <span>Standard CIT (27%):</span>
                      <span>{formatMoney(standardCitTax)}</span>
                    </div>
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>SBC Relief Tax:</span>
                      <span>{formatMoney(sbcTax)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-emerald-700 dark:text-emerald-400 pt-1 border-t border-slate-100 dark:border-slate-800">
                      <span>Estimated Annual Tax Savings:</span>
                      <span>{formatMoney(sbcSavings)}</span>
                    </div>
                  </div>
                </div>
              )}

              {calcTab === 'turnover' && (
                <div className="space-y-3 pt-2 text-xs">
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Gross Annual Turnover (Max R1M):</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">{formatMoney(microTurnover)}</span>
                  </div>
                  <input
                    type="range"
                    min="100000"
                    max="1000000"
                    step="20000"
                    value={microTurnover}
                    onChange={(e) => setMicroTurnover(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5 font-mono">
                    <div className="flex justify-between text-slate-600 dark:text-slate-400">
                      <span>Exempt Threshold:</span>
                      <span>First {formatMoney(335000)} = R0 Tax</span>
                    </div>
                    <div className="flex justify-between font-bold text-emerald-700 dark:text-emerald-400 pt-1 border-t border-slate-100 dark:border-slate-800">
                      <span>Total Turnover Tax:</span>
                      <span>{formatMoney(turnoverTaxAmount)}</span>
                    </div>
                  </div>
                </div>
              )}

              {calcTab === 'uif' && (
                <div className="space-y-3 pt-2 text-xs">
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Gross Monthly Worker Salary:</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">{formatMoney(grossSalary)}</span>
                  </div>
                  <input
                    type="range"
                    min="4000"
                    max="30000"
                    step="1000"
                    value={grossSalary}
                    onChange={(e) => setGrossSalary(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5 font-mono">
                    <div className="flex justify-between text-slate-600 dark:text-slate-400">
                      <span>Employee Deduction (1%):</span>
                      <span>{formatMoney(employeeUif, 2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-600 dark:text-slate-400">
                      <span>Employer Contribution (1%):</span>
                      <span>{formatMoney(employerUif, 2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-emerald-700 dark:text-emerald-400 pt-1 border-t border-slate-100 dark:border-slate-800">
                      <span>Total Monthly UIF Remittance:</span>
                      <span>{formatMoney(totalUif, 2)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW B: Industry & Hustle Licences (8 Categories) */}
        {sectionMode === 'licences' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
            {INDUSTRY_LICENCES.map((licence) => (
              <div
                key={licence.id}
                className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-all hover:shadow-xs group cursor-pointer"
                onClick={() => setSelectedLicence(licence)}
              >
                <div className="space-y-2">
                  {/* Data Point 1: Title */}
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                    {licence.title}
                  </h3>

                  {/* Data Point 2: Cost / Compliance Badge */}
                  <span className="inline-block px-2 py-0.5 rounded-md bg-emerald-100/70 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-semibold text-[10px]">
                    {licence.badge}
                  </span>

                  {/* Data Point 3: 1-Sentence Summary */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {licence.summary}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400 font-medium">{licence.cost}</span>
                  <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                    <span>View Rules</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Detail Modal for Tax Obligations */}
        {selectedTax && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs transition-opacity animate-fade-in">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative space-y-4">
              <button
                onClick={() => setSelectedTax(null)}
                className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  SARS Statutory Filing
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {selectedTax.name}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  {selectedTax.description}
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Tax Threshold:</span>
                  <span className="text-slate-900 dark:text-white">{selectedTax.threshold}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Statutory Form:</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{selectedTax.formName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Filing Schedule:</span>
                  <span className="text-slate-900 dark:text-white">{selectedTax.frequency}</span>
                </div>
              </div>

              <div className="p-3 bg-rose-50/80 dark:bg-rose-950/20 rounded-xl border border-rose-200 dark:border-rose-900/50 text-xs text-rose-900 dark:text-rose-200">
                <strong>Statutory Penalties: </strong> {selectedTax.penalties}
              </div>

              <div className="pt-2 flex items-center justify-between">
                <a
                  href={selectedTax.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold"
                >
                  <span>Official SARS Page</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => setSelectedTax(null)}
                  className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Detail Modal for Industry Licences */}
        {selectedLicence && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs transition-opacity animate-fade-in">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative space-y-4">
              <button
                onClick={() => setSelectedLicence(null)}
                className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  {selectedLicence.badge}
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {selectedLicence.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  {selectedLicence.summary}
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                <div>
                  <span className="font-semibold text-slate-700 dark:text-slate-300 block">Regulatory Authority:</span>
                  <span className="text-slate-900 dark:text-white">{selectedLicence.authority}</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-700 dark:text-slate-300 block">Required Statutory Forms:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">{selectedLicence.forms}</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-700 dark:text-slate-300 block">Permit / Compliance Cost:</span>
                  <span className="text-slate-900 dark:text-white">{selectedLicence.cost}</span>
                </div>
              </div>

              <div className="p-3 bg-amber-50/80 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-900/50 text-xs text-amber-900 dark:text-amber-200">
                <strong>Non-Compliance Penalty: </strong> {selectedLicence.penalties}
              </div>

              <div className="pt-2 flex items-center justify-between">
                <a
                  href={selectedLicence.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold"
                >
                  <span>{selectedLicence.actionText}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => setSelectedLicence(null)}
                  className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
