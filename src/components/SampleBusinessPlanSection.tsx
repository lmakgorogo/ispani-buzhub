import React, { useState } from 'react';
import { 
  ShieldCheck, CheckCircle, Copy, Check, Printer,
  Layers, Truck, Zap 
} from 'lucide-react';

export const SampleBusinessPlanSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'summary' | 'operations' | 'income' | 'cashflow' | 'ratios' | 'fulltext'>('summary');
  const [scenario, setScenario] = useState<'base' | 'conservative' | 'growth'>('base');
  const [copied, setCopied] = useState(false);

  // Scenario multipliers
  const scenarioMultiplier = scenario === 'growth' ? 1.25 : scenario === 'conservative' ? 0.85 : 1.0;

  const formatZAR = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Base financial figures
  const year1Rev = Math.round(1850000 * scenarioMultiplier);
  const year1Cogs = Math.round(925000 * scenarioMultiplier);
  const year1Gross = year1Rev - year1Cogs;
  const year1Opex = Math.round(584000 * (scenario === 'growth' ? 1.12 : scenario === 'conservative' ? 0.95 : 1.0));
  const year1Ebitda = year1Gross - year1Opex;
  const year1Depr = 70000;
  const year1Interest = 48000;
  const year1Ebt = Math.max(0, year1Ebitda - year1Depr - year1Interest);
  const year1Tax = Math.round(year1Ebt * 0.12);
  const year1Net = year1Ebt - year1Tax;

  const year2Rev = Math.round(2980000 * scenarioMultiplier);
  const year2Cogs = Math.round(1430000 * scenarioMultiplier);
  const year2Gross = year2Rev - year2Cogs;
  const year2Opex = Math.round(812000 * (scenario === 'growth' ? 1.15 : scenario === 'conservative' ? 0.95 : 1.0));
  const year2Ebitda = year2Gross - year2Opex;
  const year2Depr = 110000;
  const year2Interest = 36000;
  const year2Ebt = Math.max(0, year2Ebitda - year2Depr - year2Interest);
  const year2Tax = Math.round(year2Ebt * 0.18);
  const year2Net = year2Ebt - year2Tax;

  const year3Rev = Math.round(4450000 * scenarioMultiplier);
  const year3Cogs = Math.round(2047000 * scenarioMultiplier);
  const year3Gross = year3Rev - year3Cogs;
  const year3Opex = Math.round(1120000 * (scenario === 'growth' ? 1.18 : scenario === 'conservative' ? 0.95 : 1.0));
  const year3Ebitda = year3Gross - year3Opex;
  const year3Depr = 150000;
  const year3Interest = 22000;
  const year3Ebt = Math.max(0, year3Ebitda - year3Depr - year3Interest);
  const year3Tax = Math.round(year3Ebt * 0.24);
  const year3Net = year3Ebt - year3Tax;

  // Monthly cashflow data for Year 1 (Base case)
  const monthlyCashflow = [
    { month: 'Month 1', inflow: 95000, outflow: 88000, net: 7000, balance: 157000 },
    { month: 'Month 2', inflow: 110000, outflow: 96000, net: 14000, balance: 171000 },
    { month: 'Month 3', inflow: 125000, outflow: 104000, net: 21000, balance: 192000 },
    { month: 'Month 4', inflow: 140000, outflow: 112000, net: 28000, balance: 220000 },
    { month: 'Month 5', inflow: 150000, outflow: 118000, net: 32000, balance: 252000 },
    { month: 'Month 6', inflow: 165000, outflow: 126000, net: 39000, balance: 291000 },
    { month: 'Month 7', inflow: 155000, outflow: 124000, net: 31000, balance: 322000 },
    { month: 'Month 8', inflow: 160000, outflow: 125000, net: 35000, balance: 357000 },
    { month: 'Month 9', inflow: 175000, outflow: 132000, net: 43000, balance: 400000 },
    { month: 'Month 10', inflow: 180000, outflow: 135000, net: 45000, balance: 445000 },
    { month: 'Month 11', inflow: 190000, outflow: 140000, net: 50000, balance: 495000 },
    { month: 'Month 12', inflow: 205000, outflow: 148000, net: 57000, balance: 552000 },
  ];

  const fullPlanText = `================================================================================
BANKABLE BUSINESS PLAN & FINANCIAL BLUEPRINT (SOUTH AFRICA)
Entity: KasiFresh Logistics & Cold-Chain Solutions (Pty) Ltd
Registration No: 2024/718392/07 | B-BBEE Level: Level 1 (135% Recognition)
Statutory Alignment: Companies Act 71 of 2008 | SARS SBC Regulated
================================================================================

1. EXECUTIVE SUMMARY
Company Name: KasiFresh Logistics & Cold-Chain Solutions (Pty) Ltd
Operating Base: City of Johannesburg & Tshwane Fresh Produce Corridors
Business Structure: Private Company (Pty Ltd), 100% Black Youth Owned
Funding Ask: R850,000 (R350,000 SEDFA/NYDA Asset Grant + R400,000 Debt Facility + R100,000 Equity)

Problem Solved: 
Over 35% of fresh horticultural produce distributed to township retailers, informal spaza shops, and local shisanyamas spoils before retail sale due to unreliable ambient transport and municipal loadshedding blackouts.

Our Solution:
A solar-backed refrigerated logistics and micro-cold storage service providing scheduled fresh deliveries from smallholder farmers in Gauteng and Limpopo directly to urban informal merchants, extending retail shelf life by 4 to 6 days.

2. STATUTORY & COMPLIANCE READINESS
- CIPC CoR14.3 Active Registration Certificate (Verified)
- SARS Tax Pin in Good Standing (Registered for Income Tax & PAYE)
- Small Business Corporation (SBC) tax qualification under section 12E
- COIDA Letter of Good Standing for driver and warehouse handlers
- Health Certificate for Food Handling (R638 Municipal Food Safety Regulations)
- B-BBEE Sworn Affidavit: Level 1 EME Contributor (135% B2B procurement boost)

3. 3-YEAR PROJECTED INCOME STATEMENT (P&L) - BASE CASE
Metric                       Year 1             Year 2             Year 3
--------------------------------------------------------------------------------
Gross Revenue                R1,850,000         R2,980,000         R4,450,000
Cost of Goods Sold (COGS)    R925,000           R1,430,000         R2,047,000
Gross Profit                 R925,000 (50.0%)   R1,550,000 (52.0%) R2,403,000 (54.0%)
Operating Expenses (OPEX)    R584,000           R812,000           R1,120,000
  - Salaries & Wages         R288,000           R410,000           R560,000
  - Diesel & Fleet Service   R144,000           R208,000           R290,000
  - Commercial Insurance     R42,000            R58,000            R78,000
  - Rent & Utilities (Hub)   R60,000            R72,000            R92,000
  - Accounting & Compliance  R24,000            R30,000            R42,000
  - Software & Tracking      R26,000            R34,000            R58,000
EBITDA                       R341,000 (18.4%)   R738,000 (24.8%)   R1,283,000 (28.8%)
Depreciation & Amort.        R70,000            R110,000           R150,000
Finance Costs (Interest)     R48,000            R36,000            R22,000
Earnings Before Tax (EBT)    R223,000           R592,000           R1,111,000
SARS SBC Income Tax          R23,600            R98,400            R272,000
Net Profit After Tax         R199,400 (10.8%)   R493,600 (16.6%)   R839,000 (18.9%)

4. STARTUP CAPEX & USES OF FUNDS (R850,000)
- 4-Tonne Refrigerated Truck (Refurbished Isuzu NPR with Carrier Unit): R420,000
- 10kW Solar Microgrid + 15kWh LiFePO4 Inverter for Cold Room: R210,000
- Cold Storage Insulated Modular Pod (20-foot container fitout): R75,000
- Plastic Agri Crates, Temperature Loggers & Pallet Jacks: R35,000
- Regulatory Audits, HACCP & Vehicle Decals: R15,000
- Working Capital Float (Fuel, initial farmer prepayments, cash buffer): R95,000

5. KEY RATIOS & BANKABILITY METRICS
- Monthly Break-Even Turnover: R103,400 / month (achieved by Month 2)
- Debt Service Coverage Ratio (DSCR): 3.8x (commercial bank benchmark is >= 1.25x)
- Current Ratio (Liquidity): 2.1x
- Estimated Capital Payback Period: 19 Months
================================================================================`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullPlanText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="business-plan" className="py-12 lg:py-16 bg-slate-50/80 dark:bg-slate-950/40 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Institutional Blueprint & Financial Projections
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Sample Bankable Business Plan with Financials
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
              A comprehensive, real-world South African SME business plan blueprint structured for commercial lenders (Standard Bank, Nedbank, FNB, Absa) and public grant bodies (SEDFA, NYDA, NEF, IDC).
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-700 dark:text-emerald-400">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Full Plan Text</span>
                </>
              )}
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Export PDF</span>
            </button>
          </div>
        </div>

        {/* Executive Case Study Banner */}
        <div className="p-4 sm:p-5 bg-emerald-950/10 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-bold text-emerald-700 dark:text-emerald-400">Case Study Entity:</span>
              <span className="font-semibold text-slate-900 dark:text-white">KasiFresh Logistics & Cold-Chain (Pty) Ltd</span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-600 dark:text-slate-300">Reg: 2024/718392/07</span>
              <span className="text-slate-400">·</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">B-BBEE Level 1 (135% Recognition)</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Sector: Agro-logistics & township FMCG distribution · Target Funding: <strong>R850,000</strong> (Capex + Working Capital float)
            </p>
          </div>

          {/* Scenario Selector */}
          <div className="flex items-center gap-1.5 bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs shrink-0">
            <span className="text-slate-400 text-[11px] px-2 font-medium">Scenario:</span>
            <button
              onClick={() => setScenario('conservative')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                scenario === 'conservative'
                  ? 'bg-slate-900 text-white dark:bg-slate-700'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              Conservative (-15%)
            </button>
            <button
              onClick={() => setScenario('base')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                scenario === 'base'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              Base Case
            </button>
            <button
              onClick={() => setScenario('growth')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                scenario === 'growth'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              High Growth (+25%)
            </button>
          </div>
        </div>

        {/* Section Navigation Tabs (no-scrollbar & flex-wrap) */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-200/80 dark:bg-slate-800 rounded-xl text-xs font-medium no-scrollbar max-w-fit">
          <button
            onClick={() => setActiveTab('summary')}
            className={`px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'summary'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            1. Executive Strategy
          </button>
          <button
            onClick={() => setActiveTab('operations')}
            className={`px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'operations'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            2. Operations & Solar Backup
          </button>
          <button
            onClick={() => setActiveTab('income')}
            className={`px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'income'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            3. 3-Year Income Statement (P&L)
          </button>
          <button
            onClick={() => setActiveTab('cashflow')}
            className={`px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'cashflow'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            4. 12-Month Cash Flow & Capex
          </button>
          <button
            onClick={() => setActiveTab('ratios')}
            className={`px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'ratios'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            5. Break-Even & Financial Ratios
          </button>
          <button
            onClick={() => setActiveTab('fulltext')}
            className={`px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'fulltext'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            6. Full Text Document View
          </button>
        </div>

        {/* TAB 1: EXECUTIVE SUMMARY */}
        {activeTab === 'summary' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-xs">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Executive Business Overview
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Drafted under South African commercial bank standard credit evaluation criteria.
                </p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                <p>
                  <strong>KasiFresh Logistics & Cold-Chain Solutions (Pty) Ltd</strong> is an emerging, 100% black youth-owned agro-logistics venture established to resolve perishable crop spoilage between peri-urban commercial smallholder farms in Limpopo & Gauteng and dense urban retail nodes in Johannesburg and Pretoria.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-1">
                      The Market Pain Point
                    </span>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Township retailers, spaza shops, and shisanyamas lose up to 35% of fresh inventory to spoilage within 48 hours because suppliers transport goods in open bakkies and store them without temperature control during municipal power outages.
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-1">
                      Our Proprietary Solution
                    </span>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Scheduled deliveries in a 4-tonne active refrigerated vehicle combined with a centralized 10kW solar-backed modular cold room hub. Spaza clients order via WhatsApp B2B bot with next-day 06:00 AM delivery guaranteed.
                    </p>
                  </div>
                </div>

                <h4 className="text-sm font-bold text-slate-900 dark:text-white pt-2">
                  Funding Structure Breakdown (R850,000 Total Ask)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800">
                    <div className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-300">SEDFA / NYDA Grant</div>
                    <div className="text-lg font-extrabold text-emerald-700 dark:text-emerald-400 mt-1">R350,000</div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">Non-repayable equipment funding for solar cold storage</div>
                  </div>
                  <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="text-[11px] font-semibold text-slate-800 dark:text-slate-300">SME Term Debt (Bank)</div>
                    <div className="text-lg font-extrabold text-slate-900 dark:text-white mt-1">R400,000</div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">Prime + 1.5% loan over 48 months (asset-backed)</div>
                  </div>
                  <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="text-[11px] font-semibold text-slate-800 dark:text-slate-300">Founder Equity Float</div>
                    <div className="text-lg font-extrabold text-slate-900 dark:text-white mt-1">R100,000</div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">Reinvested cash savings for working capital float</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Key Statutory Highlights */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-xs">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Statutory Compliance Checklist</span>
                </h4>
                <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>CIPC CoR14.3:</strong> Active status under registration number 2024/718392/07</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>SARS SBC Regulated:</strong> Qualifies for Small Business Corporation graduated corporate tax bands</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>B-BBEE Level 1:</strong> 100% Black Youth Owned EME Sworn Affidavit with 135% procurement score</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Labour (UIF & COIDA):</strong> Letter of Good Standing from Compensation Fund active</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Municipal Health:</strong> Regulation R638 Certificate of Acceptability for Food Handling</span>
                  </li>
                </ul>
              </div>

              <div className="p-5 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800 text-xs space-y-2">
                <div className="font-bold text-emerald-900 dark:text-emerald-300">Why Commercial Lenders Approve This</div>
                <p className="text-emerald-800 dark:text-emerald-400 leading-relaxed">
                  The plan shows a <strong>Debt Service Coverage Ratio (DSCR) of 3.8x</strong> in Year 1, well above the 1.25x bank minimum. Loan repayments of ~R10,400/month are fully covered by contractual spaza delivery retainers.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: OPERATIONS & LOADSHEDDING */}
        {activeTab === 'operations' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-xs">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Operational Logistics & Energy Resilience
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                South African businesses must demonstrate structural resilience to municipal grid interruptions and fuel price volatility.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold">
                  <Zap className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Loadshedding & Solar Hub
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  A modular 20-foot insulated container fitted with a 10kW hybrid inverter and 15kWh LiFePO4 battery array. Provides 18 hours of continuous refrigeration (+2°C to +4°C) without reliance on Eskom or noisy petrol generators.
                </p>
              </div>

              <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold">
                  <Truck className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Fleet Route Optimization
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Route 1 runs Monday/Wednesday/Friday covering Soweto, Diepsloot, and Alexandra (45 drop points). Route 2 runs Tuesday/Thursday/Saturday servicing Tembisa and Mamelodi (38 drop points). GPS tracking controls diesel consumption.
                </p>
              </div>

              <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold">
                  <Layers className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Farmer Offtake Agreements
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Bilateral supply agreements with 14 smallholder tomato, onion, and leafy greens farmers in Marble Hall & Brits. Guarantees farmgate purchase within 12 hours of harvest, bypassing wholesale agent markups.
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-xs flex items-center justify-between">
              <span className="text-slate-700 dark:text-slate-300 font-medium">
                Target Employment Creation: <strong>4 Permanent Youth Jobs</strong> in Year 1 (1 Driver, 1 Hub Ops Lead, 2 Inventory Handlers).
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                SETA & ETI Eligible
              </span>
            </div>
          </div>
        )}

        {/* TAB 3: 3-YEAR INCOME STATEMENT (P&L) */}
        {activeTab === 'income' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-xs overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  3-Year Projected Income Statement (P&L)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Adjusting dynamically based on selected scenario: <strong>{scenario.toUpperCase()}</strong>. Figures in South African Rand (ZAR).
                </p>
              </div>
              <div className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                SARS SBC Tax Rates Applied
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-slate-700 dark:text-slate-300">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white uppercase text-[11px] font-bold">
                  <tr>
                    <th className="py-3 px-4">Line Item (ZAR)</th>
                    <th className="py-3 px-4 text-right">Year 1</th>
                    <th className="py-3 px-4 text-right">Year 2</th>
                    <th className="py-3 px-4 text-right">Year 3</th>
                    <th className="py-3 px-4 text-right">Growth (Y1 to Y3)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-mono">
                  <tr className="font-bold text-slate-900 dark:text-white bg-slate-50/50 dark:bg-slate-900/50">
                    <td className="py-2.5 px-4 font-sans">Gross Turnover (Revenue)</td>
                    <td className="py-2.5 px-4 text-right">{formatZAR(year1Rev)}</td>
                    <td className="py-2.5 px-4 text-right">{formatZAR(year2Rev)}</td>
                    <td className="py-2.5 px-4 text-right">{formatZAR(year3Rev)}</td>
                    <td className="py-2.5 px-4 text-right text-emerald-600">+{Math.round(((year3Rev - year1Rev) / year1Rev) * 100)}%</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-sans text-slate-600 dark:text-slate-400">Cost of Goods Sold (Farmgate Purchases)</td>
                    <td className="py-2.5 px-4 text-right text-red-600">({formatZAR(year1Cogs)})</td>
                    <td className="py-2.5 px-4 text-right text-red-600">({formatZAR(year2Cogs)})</td>
                    <td className="py-2.5 px-4 text-right text-red-600">({formatZAR(year3Cogs)})</td>
                    <td className="py-2.5 px-4 text-right text-slate-400">50% avg</td>
                  </tr>
                  <tr className="font-semibold bg-emerald-50/40 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-300">
                    <td className="py-2.5 px-4 font-sans">Gross Profit</td>
                    <td className="py-2.5 px-4 text-right">{formatZAR(year1Gross)}</td>
                    <td className="py-2.5 px-4 text-right">{formatZAR(year2Gross)}</td>
                    <td className="py-2.5 px-4 text-right">{formatZAR(year3Gross)}</td>
                    <td className="py-2.5 px-4 text-right font-bold">{Math.round((year3Gross / year3Rev) * 100)}% Margin</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-sans text-slate-600 dark:text-slate-400">Operating Expenses (OPEX total)</td>
                    <td className="py-2.5 px-4 text-right text-red-600">({formatZAR(year1Opex)})</td>
                    <td className="py-2.5 px-4 text-right text-red-600">({formatZAR(year2Opex)})</td>
                    <td className="py-2.5 px-4 text-right text-red-600">({formatZAR(year3Opex)})</td>
                    <td className="py-2.5 px-4 text-right text-slate-400">Salaries, fuel, rent</td>
                  </tr>
                  <tr className="font-bold text-slate-900 dark:text-white">
                    <td className="py-2.5 px-4 font-sans">EBITDA</td>
                    <td className="py-2.5 px-4 text-right">{formatZAR(year1Ebitda)}</td>
                    <td className="py-2.5 px-4 text-right">{formatZAR(year2Ebitda)}</td>
                    <td className="py-2.5 px-4 text-right">{formatZAR(year3Ebitda)}</td>
                    <td className="py-2.5 px-4 text-right text-emerald-600 font-bold">{Math.round((year1Ebitda / year1Rev) * 100)}% &rarr; {Math.round((year3Ebitda / year3Rev) * 100)}%</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-sans text-slate-600 dark:text-slate-400">Depreciation (Fleet & Cold Pod)</td>
                    <td className="py-2.5 px-4 text-right text-slate-500">({formatZAR(year1Depr)})</td>
                    <td className="py-2.5 px-4 text-right text-slate-500">({formatZAR(year2Depr)})</td>
                    <td className="py-2.5 px-4 text-right text-slate-500">({formatZAR(year3Depr)})</td>
                    <td className="py-2.5 px-4 text-right text-slate-400">Section 12B/12C</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-sans text-slate-600 dark:text-slate-400">Finance Charges (Term Loan Interest)</td>
                    <td className="py-2.5 px-4 text-right text-slate-500">({formatZAR(year1Interest)})</td>
                    <td className="py-2.5 px-4 text-right text-slate-500">({formatZAR(year2Interest)})</td>
                    <td className="py-2.5 px-4 text-right text-slate-500">({formatZAR(year3Interest)})</td>
                    <td className="py-2.5 px-4 text-right text-slate-400">Declining balance</td>
                  </tr>
                  <tr className="font-semibold text-slate-900 dark:text-white">
                    <td className="py-2.5 px-4 font-sans">Net Profit Before Tax (EBT)</td>
                    <td className="py-2.5 px-4 text-right">{formatZAR(year1Ebt)}</td>
                    <td className="py-2.5 px-4 text-right">{formatZAR(year2Ebt)}</td>
                    <td className="py-2.5 px-4 text-right">{formatZAR(year3Ebt)}</td>
                    <td className="py-2.5 px-4 text-right text-emerald-600">Healthy</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-sans text-slate-600 dark:text-slate-400">SARS Small Business Corp Tax</td>
                    <td className="py-2.5 px-4 text-right text-red-600">({formatZAR(year1Tax)})</td>
                    <td className="py-2.5 px-4 text-right text-red-600">({formatZAR(year2Tax)})</td>
                    <td className="py-2.5 px-4 text-right text-red-600">({formatZAR(year3Tax)})</td>
                    <td className="py-2.5 px-4 text-right text-slate-400">Tiered SBC rate</td>
                  </tr>
                  <tr className="font-extrabold bg-emerald-600 text-white text-sm">
                    <td className="py-3 px-4 font-sans">Net Profit After Tax</td>
                    <td className="py-3 px-4 text-right">{formatZAR(year1Net)}</td>
                    <td className="py-3 px-4 text-right">{formatZAR(year2Net)}</td>
                    <td className="py-3 px-4 text-right">{formatZAR(year3Net)}</td>
                    <td className="py-3 px-4 text-right font-mono">{Math.round((year3Net / year3Rev) * 100)}% Net Margin</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: 12-MONTH CASH FLOW & CAPEX */}
        {activeTab === 'cashflow' && (
          <div className="space-y-6">
            {/* Capex Table */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-xs">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Capital Expenditure (Capex) & Startup Budget
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Itemized assets funded by the R850,000 blended capital injection.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="text-xs text-slate-500 dark:text-slate-400">Refrigerated Truck (4-Tonne)</div>
                  <div className="text-lg font-bold text-slate-900 dark:text-white mt-1">R420,000</div>
                  <div className="text-[11px] text-slate-500 mt-1">Refurbished Isuzu NPR + Carrier Unit</div>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="text-xs text-slate-500 dark:text-slate-400">Solar Cold Room (10kW)</div>
                  <div className="text-lg font-bold text-slate-900 dark:text-white mt-1">R210,000</div>
                  <div className="text-[11px] text-slate-500 mt-1">15kWh Lithium Battery + Panels</div>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="text-xs text-slate-500 dark:text-slate-400">Insulated Pod & Crates</div>
                  <div className="text-lg font-bold text-slate-900 dark:text-white mt-1">R110,000</div>
                  <div className="text-[11px] text-slate-500 mt-1">20-ft container fitout + 400 crates</div>
                </div>
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800">
                  <div className="text-xs text-emerald-800 dark:text-emerald-300">Working Capital Reserve</div>
                  <div className="text-lg font-bold text-emerald-700 dark:text-emerald-400 mt-1">R110,000</div>
                  <div className="text-[11px] text-emerald-800/80 dark:text-emerald-400/80 mt-1">Farmer prepayment float & diesel</div>
                </div>
              </div>
            </div>

            {/* 12-Month Cashflow Table */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-xs overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Year 1 Monthly Cash Flow Forecast
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Demonstrates zero liquidity deficit across all 12 operational months.
                  </p>
                </div>
                <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                  Closing Cash Month 12: R552,000
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left text-slate-700 dark:text-slate-300">
                  <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white uppercase text-[11px] font-bold">
                    <tr>
                      <th className="py-2.5 px-3">Month</th>
                      <th className="py-2.5 px-3 text-right">Inflows (Receipts)</th>
                      <th className="py-2.5 px-3 text-right">Outflows (Costs + Debt)</th>
                      <th className="py-2.5 px-3 text-right">Net Monthly Cash</th>
                      <th className="py-2.5 px-3 text-right">Closing Bank Float</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-mono">
                    {monthlyCashflow.map((m, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-slate-50/40 dark:bg-slate-900/40' : ''}>
                        <td className="py-2 px-3 font-sans font-semibold text-slate-900 dark:text-white">{m.month}</td>
                        <td className="py-2 px-3 text-right text-emerald-600 font-medium">{formatZAR(m.inflow)}</td>
                        <td className="py-2 px-3 text-right text-red-500">({formatZAR(m.outflow)})</td>
                        <td className="py-2 px-3 text-right font-bold text-slate-900 dark:text-white">+{formatZAR(m.net)}</td>
                        <td className="py-2 px-3 text-right font-bold text-emerald-700 dark:text-emerald-400">{formatZAR(m.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: BREAK-EVEN & FINANCIAL RATIOS */}
        {activeTab === 'ratios' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-xs">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Break-Even Thresholds & Key Credit Ratios
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Metrics required by commercial bank credit analysts and development finance institutions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Monthly Break-Even Turnover</span>
                <div className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">R103,400</div>
                <div className="text-[11px] text-emerald-600 font-medium">Equal to 23 weekly distribution trips</div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Debt Service Coverage (DSCR)</span>
                <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">3.8x</div>
                <div className="text-[11px] text-slate-500">Bank threshold: &ge; 1.25x</div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Current Ratio (Liquidity)</span>
                <div className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">2.1x</div>
                <div className="text-[11px] text-slate-500">Benchmark: &ge; 1.5x</div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Capital Payback Period</span>
                <div className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">19 Months</div>
                <div className="text-[11px] text-emerald-600 font-medium">Rapid asset recoupment</div>
              </div>
            </div>

            <div className="p-5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                How South African Commercial Banks Interpret These Ratios:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                <div>
                  <strong className="text-slate-900 dark:text-white">1. Debt Service Coverage (DSCR):</strong> At 3.8x, the company generates R3.80 of operational cash for every R1.00 of required bank loan principal and interest repayment. This low default probability qualifies the company for favorable prime-linked lending rates.
                </div>
                <div>
                  <strong className="text-slate-900 dark:text-white">2. SARS Small Business Corporation (SBC):</strong> By keeping taxable income within SBC thresholds (Section 12E), the company saves over R48,000 in early-stage income taxes compared to standard corporate rates, preserving cash inside the operating float.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: FULL TEXT DOCUMENT VIEW */}
        {activeTab === 'fulltext' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Full Document Text & Formatted Blueprint
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Ready to copy directly into Microsoft Word, Google Docs, or export to PDF for submission.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Document'}</span>
                </button>
              </div>
            </div>

            <pre className="p-4 sm:p-6 bg-slate-900 text-emerald-400 rounded-xl text-[11px] sm:text-xs font-mono overflow-x-auto leading-relaxed whitespace-pre-wrap selection:bg-emerald-600 selection:text-white">
              {fullPlanText}
            </pre>
          </div>
        )}

      </div>
    </section>
  );
};
