import React, { useState } from 'react';
import { 
  ShieldCheck, CheckCircle, Copy, Check, Printer,
  Layers, Truck, Zap, ChevronDown, Sparkles, FileText, 
  TrendingUp, DollarSign, Calculator 
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

export const SampleBusinessPlanSection: React.FC = () => {
  const { formatMoney } = useCurrency();
  const [openChapter, setOpenChapter] = useState<number | null>(1); // Only 1 chapter open at a time
  const [scenario, setScenario] = useState<'base' | 'conservative' | 'growth'>('base');
  const [copied, setCopied] = useState(false);

  const toggleChapter = (chapterNum: number) => {
    setOpenChapter(openChapter === chapterNum ? null : chapterNum);
  };

  const handlePrintSection = () => {
    document.body.classList.add('print-section-business-plan');
    window.print();
    setTimeout(() => {
      document.body.classList.remove('print-section-business-plan');
    }, 1500);
  };

  // Scenario multipliers
  const scenarioMultiplier = scenario === 'growth' ? 1.25 : scenario === 'conservative' ? 0.85 : 1.0;

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

  const handleCopyFullPlan = () => {
    const fullPlanText = `
BANKABLE BUSINESS PLAN & FINANCIAL MODEL (SOUTH AFRICA)
VENTURE: KasiCourier Logistics & Last-Mile Solutions (Pty) Ltd
REGISTRATION NO: 2026/014920/07 | TAX PIN: 9021849201 | B-BBEE: Level 1 (135% Recognition)

1. EXECUTIVE SUMMARY
KasiCourier Logistics & Last-Mile Solutions (Pty) Ltd is a registered South African black-youth-owned courier logistics enterprise operating from Soweto, Gauteng. The enterprise bridges critical e-commerce fulfillment and pharmacy deliveries in high-density townships.

2. FINANCIAL HIGHLIGHTS (3-YEAR FORECAST)
• Year 1 Turnover: R1,850,000 | Net Profit: R212,080 | Gross Margin: 50.0%
• Year 2 Turnover: R2,980,000 | Net Profit: R493,640 | Gross Margin: 52.0%
• Year 3 Turnover: R4,450,000 | Net Profit: R860,320 | Gross Margin: 54.0%
• Initial Capital Required: R350,000 (R150,000 founder equity + R200,000 asset finance)
• Break-Even Run-Rate: 38.6 parcels/day at R85.00 average ticket size (R98,400 monthly revenue).
    `.trim();

    navigator.clipboard.writeText(fullPlanText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="business-plan" className="py-12 lg:py-16 bg-slate-50/80 dark:bg-slate-950/40 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
              Bankable Financials & Projections · Commercial Credit Standard
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Sample Business Plan & Financial Model
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Full bank-ready business plan formatted into 6 structured chapters with audited 3-year P&L, 12-month cash flows, and break-even calculations.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Print / Save Section PDF Button */}
            <button
              type="button"
              onClick={handlePrintSection}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save Section PDF</span>
            </button>
          </div>
        </div>

        {/* Global Scenario Selector Pill (Hidden in Print) */}
        <div className="print-hide flex items-center justify-between flex-wrap gap-3 mb-6 p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Financial Scenario:</span>
            <div className="flex gap-1">
              {(['conservative', 'base', 'growth'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setScenario(s)}
                  className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer capitalize ${
                    scenario === s
                      ? 'bg-emerald-600 text-white font-bold shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            Year 1 Net Profit: <span className="font-bold text-emerald-600 font-mono">{formatMoney(year1Net)}</span> ({formatMoney(year1Rev)} revenue)
          </div>
        </div>

        {/* Numbered Accordion Chapters (Strictly 1 Chapter Open at a Time on Screen, All Visible in Print) */}
        <div className="space-y-3 max-w-5xl mx-auto mb-10">
          
          {/* CHAPTER 1 */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-all duration-200 shadow-xs">
            <button
              type="button"
              onClick={() => toggleChapter(1)}
              className="print-keep w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <div className="flex items-center gap-3.5 pr-2">
                <span className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0 font-mono">
                  01
                </span>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    Executive Summary & Venture Profile
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                    KasiCourier Logistics (Pty) Ltd · Last-mile urban courier solving high-density delivery friction
                  </p>
                </div>
              </div>
              <ChevronDown className={`chevron-indicator print-hide w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${openChapter === 1 ? 'rotate-180' : ''}`} />
            </button>

            <div className={`p-5 pt-1 border-t border-slate-100 dark:border-slate-800 space-y-4 text-xs leading-relaxed text-slate-700 dark:text-slate-300 ${openChapter === 1 ? 'block animate-fade-in' : 'hidden print-show print:block'}`}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 font-mono">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block font-sans">Required Capital</span>
                  <span className="font-bold text-slate-900 dark:text-white text-sm">{formatMoney(350000)}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block font-sans">Yr 1 Projected Revenue</span>
                  <span className="font-bold text-emerald-600 text-sm">{formatMoney(year1Rev)}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block font-sans">Yr 1 Net Margin</span>
                  <span className="font-bold text-slate-900 dark:text-white text-sm">{Math.round((year1Net / year1Rev) * 100)}%</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block font-sans">Payback Period</span>
                  <span className="font-bold text-slate-900 dark:text-white text-sm">18.4 Months</span>
                </div>
              </div>

              <p>
                <strong>1.1 Opportunity:</strong> Mainstream couriers frequently reject township deliveries or drop parcels at perimeter depots due to informal address grids and driver safety concerns. KasiCourier employs local marshals and geo-pin tech to ensure guaranteed same-day delivery.
              </p>
              <p>
                <strong>1.2 Business Model:</strong> B2B merchant contracts (e-commerce retailers and pharmaceutical chains) at R75–R120 per parcel, supplemented by on-demand consumer peer-to-peer dropoffs at local spaza hubs.
              </p>
            </div>
          </div>

          {/* CHAPTER 2 */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-all duration-200 shadow-xs">
            <button
              type="button"
              onClick={() => toggleChapter(2)}
              className="print-keep w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <div className="flex items-center gap-3.5 pr-2">
                <span className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0 font-mono">
                  02
                </span>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    Market Analysis, Competitors & Pricing Strategy
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                    Total Addressable Market (TAM) of R1.2B in township delivery with 3 distinct price tiers
                  </p>
                </div>
              </div>
              <ChevronDown className={`chevron-indicator print-hide w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${openChapter === 2 ? 'rotate-180' : ''}`} />
            </button>

            <div className={`p-5 pt-1 border-t border-slate-100 dark:border-slate-800 space-y-3 text-xs leading-relaxed text-slate-700 dark:text-slate-300 ${openChapter === 2 ? 'block animate-fade-in' : 'hidden print-show print:block'}`}>
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
                  Pricing Architecture:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="font-bold text-slate-900 dark:text-white">Standard Delivery (24hr)</div>
                    <div className="text-emerald-600 font-mono font-bold text-sm mt-1">{formatMoney(65)}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Under 5kg within 15km radius</div>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="font-bold text-slate-900 dark:text-white">Express Same-Day (4hr)</div>
                    <div className="text-emerald-600 font-mono font-bold text-sm mt-1">{formatMoney(110)}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Priority pharmacy & grocery runs</div>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="font-bold text-slate-900 dark:text-white">Bulk Merchant Contract</div>
                    <div className="text-emerald-600 font-mono font-bold text-sm mt-1">{formatMoney(48)}/unit</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Minimum 250 deliveries per month</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CHAPTER 3 */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-all duration-200 shadow-xs">
            <button
              type="button"
              onClick={() => toggleChapter(3)}
              className="print-keep w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <div className="flex items-center gap-3.5 pr-2">
                <span className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0 font-mono">
                  03
                </span>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    Operations, Fleet & Capital Expenditure (Capex)
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                    Initial {formatMoney(350000)} deployment: 2 fuel-efficient delivery bakkies, 4 electric cargo bikes & staging micro-depot
                  </p>
                </div>
              </div>
              <ChevronDown className={`chevron-indicator print-hide w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${openChapter === 3 ? 'rotate-180' : ''}`} />
            </button>

            <div className={`p-5 pt-1 border-t border-slate-100 dark:border-slate-800 space-y-3 text-xs text-slate-700 dark:text-slate-300 ${openChapter === 3 ? 'block animate-fade-in' : 'hidden print-show print:block'}`}>
              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-400 uppercase text-[10px]">
                      <th className="py-2">Asset Item</th>
                      <th className="py-2">Quantity</th>
                      <th className="py-2">Financing Method</th>
                      <th className="py-2 text-right">Total Cost</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    <tr>
                      <td className="py-2 text-slate-900 dark:text-white font-sans font-medium">Used 1-Ton Half-ton Bakkie</td>
                      <td className="py-2">1 unit</td>
                      <td className="py-2 text-slate-500">Asset Finance (Wesbank)</td>
                      <td className="py-2 text-right">{formatMoney(160000)}</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-slate-900 dark:text-white font-sans font-medium">Commercial Cargo Scooters</td>
                      <td className="py-2">3 units</td>
                      <td className="py-2 text-slate-500">Cash (Founder Equity)</td>
                      <td className="py-2 text-right">{formatMoney(84000)}</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-slate-900 dark:text-white font-sans font-medium">GPS Dispatch & Mobile Barcode Scanners</td>
                      <td className="py-2">4 devices</td>
                      <td className="py-2 text-slate-500">Working Capital</td>
                      <td className="py-2 text-right">{formatMoney(26000)}</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-slate-900 dark:text-white font-sans font-medium">Depot Fit-Out & Security Inverter</td>
                      <td className="py-2">1 facility</td>
                      <td className="py-2 text-slate-500">Working Capital</td>
                      <td className="py-2 text-right">{formatMoney(40000)}</td>
                    </tr>
                    <tr className="font-bold text-slate-900 dark:text-white">
                      <td className="py-2 pt-3 font-sans">Total Capex + Working Reserve</td>
                      <td className="py-2 pt-3">—</td>
                      <td className="py-2 pt-3">—</td>
                      <td className="py-2 pt-3 text-right text-emerald-600">{formatMoney(350000)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* CHAPTER 4 */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-all duration-200 shadow-xs">
            <button
              type="button"
              onClick={() => toggleChapter(4)}
              className="print-keep w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <div className="flex items-center gap-3.5 pr-2">
                <span className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0 font-mono">
                  04
                </span>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    3-Year Projected Income Statement (P&L)
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                    Audited P&L: Year 1 {formatMoney(year1Rev)} &rarr; Year 2 {formatMoney(year2Rev)} &rarr; Year 3 {formatMoney(year3Rev)}
                  </p>
                </div>
              </div>
              <ChevronDown className={`chevron-indicator print-hide w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${openChapter === 4 ? 'rotate-180' : ''}`} />
            </button>

            <div className={`p-5 pt-1 border-t border-slate-100 dark:border-slate-800 space-y-3 text-xs ${openChapter === 4 ? 'block animate-fade-in' : 'hidden print-show print:block'}`}>
              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-400 uppercase text-[10px]">
                      <th className="py-2">Line Item</th>
                      <th className="py-2 text-right">Year 1</th>
                      <th className="py-2 text-right">Year 2</th>
                      <th className="py-2 text-right">Year 3</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                    <tr className="font-bold text-slate-900 dark:text-white">
                      <td className="py-2">Gross Revenue</td>
                      <td className="py-2 text-right text-emerald-600">{formatMoney(year1Rev)}</td>
                      <td className="py-2 text-right text-emerald-600">{formatMoney(year2Rev)}</td>
                      <td className="py-2 text-right text-emerald-600">{formatMoney(year3Rev)}</td>
                    </tr>
                    <tr>
                      <td className="py-2">Cost of Goods Sold (Fuel & Driver Share)</td>
                      <td className="py-2 text-right text-slate-500">({formatMoney(year1Cogs)})</td>
                      <td className="py-2 text-right text-slate-500">({formatMoney(year2Cogs)})</td>
                      <td className="py-2 text-right text-slate-500">({formatMoney(year3Cogs)})</td>
                    </tr>
                    <tr className="font-semibold text-slate-900 dark:text-white bg-slate-50/50 dark:bg-slate-800/30">
                      <td className="py-2">Gross Profit (Margin)</td>
                      <td className="py-2 text-right">{formatMoney(year1Gross)}</td>
                      <td className="py-2 text-right">{formatMoney(year2Gross)}</td>
                      <td className="py-2 text-right">{formatMoney(year3Gross)}</td>
                    </tr>
                    <tr>
                      <td className="py-2">Operating Expenses (Rent, Insurance, Telco)</td>
                      <td className="py-2 text-right text-slate-500">({formatMoney(year1Opex)})</td>
                      <td className="py-2 text-right text-slate-500">({formatMoney(year2Opex)})</td>
                      <td className="py-2 text-right text-slate-500">({formatMoney(year3Opex)})</td>
                    </tr>
                    <tr className="font-semibold text-slate-900 dark:text-white">
                      <td className="py-2">EBITDA</td>
                      <td className="py-2 text-right">{formatMoney(year1Ebitda)}</td>
                      <td className="py-2 text-right">{formatMoney(year2Ebitda)}</td>
                      <td className="py-2 text-right">{formatMoney(year3Ebitda)}</td>
                    </tr>
                    <tr>
                      <td className="py-2">Depreciation & Interest Expense</td>
                      <td className="py-2 text-right text-slate-500">({formatMoney(year1Depr + year1Interest)})</td>
                      <td className="py-2 text-right text-slate-500">({formatMoney(year2Depr + year2Interest)})</td>
                      <td className="py-2 text-right text-slate-500">({formatMoney(year3Depr + year3Interest)})</td>
                    </tr>
                    <tr>
                      <td className="py-2">Tax Provision (SBC Rates 12%)</td>
                      <td className="py-2 text-right text-slate-500">({formatMoney(year1Tax)})</td>
                      <td className="py-2 text-right text-slate-500">({formatMoney(year2Tax)})</td>
                      <td className="py-2 text-right text-slate-500">({formatMoney(year3Tax)})</td>
                    </tr>
                    <tr className="font-bold text-slate-900 dark:text-white bg-emerald-50/50 dark:bg-emerald-950/30">
                      <td className="py-2 text-emerald-800 dark:text-emerald-300">Net Profit After Tax</td>
                      <td className="py-2 text-right text-emerald-600">{formatMoney(year1Net)}</td>
                      <td className="py-2 text-right text-emerald-600">{formatMoney(year2Net)}</td>
                      <td className="py-2 text-right text-emerald-600">{formatMoney(year3Net)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* CHAPTER 5 */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-all duration-200 shadow-xs">
            <button
              type="button"
              onClick={() => toggleChapter(5)}
              className="print-keep w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <div className="flex items-center gap-3.5 pr-2">
                <span className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0 font-mono">
                  05
                </span>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    12-Month Cash Flow Statement (Year 1)
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                    Monthly cash inflows vs outflows proving zero liquidity shortfall across all 12 operational months
                  </p>
                </div>
              </div>
              <ChevronDown className={`chevron-indicator print-hide w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${openChapter === 5 ? 'rotate-180' : ''}`} />
            </button>

            <div className={`p-5 pt-1 border-t border-slate-100 dark:border-slate-800 space-y-3 text-xs ${openChapter === 5 ? 'block animate-fade-in' : 'hidden print-show print:block'}`}>
              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-400 uppercase text-[10px]">
                      <th className="py-2">Period</th>
                      <th className="py-2 text-right">Cash Inflows</th>
                      <th className="py-2 text-right">Cash Outflows</th>
                      <th className="py-2 text-right">Net Cash</th>
                      <th className="py-2 text-right">Closing Reserve</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                    {monthlyCashflow.map((m, idx) => (
                      <tr key={idx}>
                        <td className="py-1.5 font-sans font-medium">{m.month}</td>
                        <td className="py-1.5 text-right">{formatMoney(m.inflow)}</td>
                        <td className="py-1.5 text-right text-slate-500">{formatMoney(m.outflow)}</td>
                        <td className="py-1.5 text-right text-emerald-600 font-semibold">+{formatMoney(m.net)}</td>
                        <td className="py-1.5 text-right font-bold text-slate-900 dark:text-white">{formatMoney(m.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* CHAPTER 6 */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-all duration-200 shadow-xs">
            <button
              type="button"
              onClick={() => toggleChapter(6)}
              className="print-keep w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <div className="flex items-center gap-3.5 pr-2">
                <span className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0 font-mono">
                  06
                </span>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    Break-Even Analysis & Commercial Financial Ratios
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                    Monthly break-even volume of 1,157 deliveries (38.6/day) · Current ratio 2.1x · Debt service coverage 3.4x
                  </p>
                </div>
              </div>
              <ChevronDown className={`chevron-indicator print-hide w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${openChapter === 6 ? 'rotate-180' : ''}`} />
            </button>

            <div className={`p-5 pt-1 border-t border-slate-100 dark:border-slate-800 space-y-4 text-xs text-slate-700 dark:text-slate-300 ${openChapter === 6 ? 'block animate-fade-in' : 'hidden print-show print:block'}`}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Monthly Fixed Costs</span>
                  <span className="text-base font-bold font-mono text-slate-900 dark:text-white mt-1 block">{formatMoney(48666)}</span>
                  <span className="text-[11px] text-slate-500">Rent, basic salaries, insurance, comms</span>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Contribution Margin / Drop</span>
                  <span className="text-base font-bold font-mono text-slate-900 dark:text-white mt-1 block">{formatMoney(42.50, 2)}</span>
                  <span className="text-[11px] text-slate-500">R85 avg price minus R42.50 variable cost</span>
                </div>
                <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800/60">
                  <span className="text-[10px] text-emerald-800 dark:text-emerald-300 uppercase font-bold block">Daily Break-Even Runs</span>
                  <span className="text-base font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1 block">38.6 Drops/Day</span>
                  <span className="text-[11px] text-slate-500">Crossed by Month 3 of trading</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="font-semibold text-slate-900 dark:text-white">Bank Credit Metrics:</span>
                <button
                  onClick={handleCopyFullPlan}
                  className="print-hide inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied Full Model!' : 'Copy Key Model Summary'}</span>
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
