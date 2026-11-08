import React, { useState } from 'react';
import { TAX_OBLIGATIONS } from '../data/businessData';
import { 
  Receipt, Calculator, ShieldCheck, AlertCircle, 
  Clock, DollarSign, Percent, ArrowRight, FileCheck 
} from 'lucide-react';

export const TaxComplianceSection: React.FC = () => {
  const [imageError, setImageError] = useState(false);
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
    return 6650 + 250000 * 0.03; // over 1m disqualification
  };
  const turnoverTaxAmount = calculateTurnoverTax(microTurnover);

  // UIF & Employer Deductions states
  const [grossSalary, setGrossSalary] = useState<number>(15000);
  const uifCeiling = 17712; // statutory monthly salary ceiling for UIF
  const uifBase = Math.min(grossSalary, uifCeiling);
  const employeeUif = Math.round(uifBase * 0.01 * 100) / 100;
  const employerUif = Math.round(uifBase * 0.01 * 100) / 100;
  const totalUif = employeeUif + employerUif;

  return (
    <section id="tax" className="py-12 lg:py-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
              South African Revenue Service (SARS) · Tax Administration Act
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              SARS and Tax Compliance
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
              Fulfilling your tax obligations protects your business against compounding penalties and unlocks essential SARS Tax Compliance Status (TCS) PINs.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto text-xs">
            <span className="text-slate-500 dark:text-slate-400">SARS Portal:</span>
            <a
              href="https://sarsefiling.co.za"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              <span>sarsefiling.co.za</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 2-Column Split: Editorial Photo & Core Cards + Interactive Tax Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Editorial Photo & 4 Core Obligation Cards */}
          <div className="lg:col-span-6 space-y-6">
            {/* Visual Photo Slot */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm bg-slate-100 dark:bg-slate-800 aspect-[16/10]">
              {!imageError ? (
                <img
                  src="/src/assets/images/sars_tax_compliance_1794134851949.jpg"
                  alt="SARS tax compliance records, invoices, and accounting desk in South Africa"
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-slate-100 dark:bg-slate-800">
                  <Receipt className="w-10 h-10 text-emerald-600 mb-2" />
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">SARS Compliance Management</p>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                <div className="text-white text-xs">
                  <div className="font-semibold">7-Year Statutory Record Keeping Mandate</div>
                  <div className="text-[11px] text-slate-300">Section 29 of Tax Administration Act No. 28 of 2011</div>
                </div>
              </div>
            </div>

            {/* Core Tax Obligations Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {TAX_OBLIGATIONS.slice(0, 4).map((tax) => (
                <div
                  key={tax.id}
                  className="p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-xs text-slate-900 dark:text-white">
                        {tax.name}
                      </h3>
                      <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                        {tax.formName}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-3">
                      {tax.description}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 space-y-1.5 text-[11px]">
                    <div className="text-slate-500">
                      <strong className="text-slate-700 dark:text-slate-300">Threshold:</strong> {tax.threshold}
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-slate-500">
                        <strong className="text-slate-700 dark:text-slate-300">Rate:</strong> {tax.rate}
                      </span>
                      {tax.officialUrl && (
                        <a
                          href={tax.officialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-emerald-600 dark:text-emerald-400 hover:underline font-semibold"
                        >
                          SARS Guide &rarr;
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Statutory Record Keeping Callout (Clean, hairline border, no thick left border) */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
              <FileCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                <strong className="text-slate-900 dark:text-white block mb-0.5">SARS 7-Year Record Keeping Rule</strong>
                Under the Tax Administration Act, you must retain all invoices, ledgers, bank statements, asset registers, and payroll records in their original form (or tamper-proof digital format) for a minimum of <strong>7 years</strong> from the date of return submission.
              </div>
            </div>
          </div>

          {/* Right Column: Interactive South African Tax Calculator */}
          <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  South African Tax & Deductions Calculator
                </h3>
              </div>
              <span className="text-[11px] text-slate-500 font-mono tabular-nums">SARS 2025/2026</span>
            </div>

            {/* Segmented Control for Calculator Modes */}
            <div className="flex items-center gap-1 p-1 bg-slate-200/80 dark:bg-slate-800 rounded-lg mt-4 text-xs font-medium">
              <button
                onClick={() => setCalcTab('vat')}
                className={`flex-1 py-1.5 px-2 rounded-md transition-colors text-center whitespace-nowrap ${
                  calcTab === 'vat'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                VAT (15%)
              </button>
              <button
                onClick={() => setCalcTab('sbc')}
                className={`flex-1 py-1.5 px-2 rounded-md transition-colors text-center whitespace-nowrap ${
                  calcTab === 'sbc'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                SBC vs CIT (27%)
              </button>
              <button
                onClick={() => setCalcTab('turnover')}
                className={`flex-1 py-1.5 px-2 rounded-md transition-colors text-center whitespace-nowrap ${
                  calcTab === 'turnover'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                Turnover Tax
              </button>
              <button
                onClick={() => setCalcTab('uif')}
                className={`flex-1 py-1.5 px-2 rounded-md transition-colors text-center whitespace-nowrap ${
                  calcTab === 'uif'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                UIF / Employer
              </button>
            </div>

            {/* Tab 1: VAT Calculator */}
            {calcTab === 'vat' && (
              <div className="mt-5 space-y-4 text-xs">
                <div className="flex gap-2">
                  <button
                    onClick={() => setVatMode('exclusive')}
                    className={`flex-1 py-2 rounded-lg border text-xs font-medium transition-colors ${
                      vatMode === 'exclusive'
                        ? 'border-emerald-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                        : 'border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Add 15% VAT (Exclusive)
                  </button>
                  <button
                    onClick={() => setVatMode('inclusive')}
                    className={`flex-1 py-2 rounded-lg border text-xs font-medium transition-colors ${
                      vatMode === 'inclusive'
                        ? 'border-emerald-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                        : 'border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Extract 15% VAT (Inclusive)
                  </button>
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-600 dark:text-slate-400 block font-medium">
                    {vatMode === 'exclusive' ? 'Amount (Excluding VAT)' : 'Total Invoice Amount (Including VAT)'}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-slate-400 font-mono">R</span>
                    <input
                      type="number"
                      value={vatInput}
                      onChange={(e) => setVatInput(Number(e.target.value) || 0)}
                      className="w-full pl-8 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono tabular-nums text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* Calculation breakdown */}
                <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2.5">
                  <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                    <span>Net Amount (Excl. VAT):</span>
                    <span className="font-mono tabular-nums text-slate-900 dark:text-white font-medium">
                      R{vatNet.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-emerald-600 dark:text-emerald-400 font-semibold">
                    <span>15% VAT Output/Input:</span>
                    <span className="font-mono tabular-nums">
                      R{vatAmount.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-slate-900 dark:text-white font-bold text-sm">
                    <span>Gross Total (Incl. VAT):</span>
                    <span className="font-mono tabular-nums">
                      R{vatTotal.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 leading-relaxed">
                  <strong>Threshold Note:</strong> Registration is compulsory if turnover exceeds R1,000,000 in 12 months. Voluntary registration is permitted once turnover exceeds R50,000.
                </div>
              </div>
            )}

            {/* Tab 2: SBC vs CIT Calculator */}
            {calcTab === 'sbc' && (
              <div className="mt-5 space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="text-slate-600 dark:text-slate-400 block font-medium">
                    Projected Annual Taxable Profit (After deductions)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-slate-400 font-mono">R</span>
                    <input
                      type="number"
                      value={sbcTaxableProfit}
                      onChange={(e) => setSbcTaxableProfit(Number(e.target.value) || 0)}
                      className="w-full pl-8 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono tabular-nums text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1">
                    <span className="text-[11px] text-slate-500 block">Standard 27% CIT</span>
                    <span className="text-sm font-bold font-mono tabular-nums text-slate-900 dark:text-white block">
                      R{Math.round(standardCitTax).toLocaleString('en-ZA')}
                    </span>
                    <span className="text-[10px] text-slate-400 block">Flat corporate tax rate</span>
                  </div>

                  <div className="p-3.5 bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-xl space-y-1">
                    <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium block">SBC Relief Tax</span>
                    <span className="text-sm font-bold font-mono tabular-nums text-emerald-700 dark:text-emerald-300 block">
                      R{Math.round(sbcTax).toLocaleString('en-ZA')}
                    </span>
                    <span className="text-[10px] text-emerald-600/80 block">0% up to R95,750</span>
                  </div>
                </div>

                <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between">
                  <span className="font-semibold text-slate-900 dark:text-white">Annual Tax Savings with SBC:</span>
                  <span className="text-sm font-bold font-mono tabular-nums text-emerald-600 dark:text-emerald-400">
                    R{Math.round(sbcSavings).toLocaleString('en-ZA')}
                  </span>
                </div>

                <div className="text-[11px] text-slate-500 leading-relaxed">
                  <strong>SBC Qualification Criteria:</strong> Gross turnover must not exceed R20 million; shareholders must be natural persons holding no shares in other private companies; investment income & professional services must not exceed 20% of total receipts.
                </div>
              </div>
            )}

            {/* Tab 3: Turnover Tax */}
            {calcTab === 'turnover' && (
              <div className="mt-5 space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="text-slate-600 dark:text-slate-400 block font-medium">
                    Annual Gross Turnover (Under R1,000,000)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-slate-400 font-mono">R</span>
                    <input
                      type="number"
                      max={1000000}
                      value={microTurnover}
                      onChange={(e) => setMicroTurnover(Number(e.target.value) || 0)}
                      className="w-full pl-8 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono tabular-nums text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
                  <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                    <span>Applicable Bracket:</span>
                    <span className="font-medium text-slate-900 dark:text-white">
                      {microTurnover <= 335000 && 'R0 - R335,000 (0% Rate)'}
                      {microTurnover > 335000 && microTurnover <= 500000 && 'R335k - R500k (1% on excess)'}
                      {microTurnover > 500000 && microTurnover <= 750000 && 'R500k - R750k (R1,650 + 2%)'}
                      {microTurnover > 750000 && microTurnover <= 1000000 && 'R750k - R1M (R6,650 + 3%)'}
                      {microTurnover > 1000000 && 'Exceeds R1,000,000 limit'}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-slate-900 dark:text-white font-bold text-sm">
                    <span>Estimated Turnover Tax:</span>
                    <span className="font-mono tabular-nums text-emerald-600 dark:text-emerald-400">
                      R{Math.round(turnoverTaxAmount).toLocaleString('en-ZA')}
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Turnover Tax replaces Income Tax, VAT, Provisional Tax, Capital Gains Tax, and Dividends Tax for micro-businesses, simplifying compliance to two interim TT02 payments and one annual TT03 return.
                </p>
              </div>
            )}

            {/* Tab 4: UIF & Employer Deductions */}
            {calcTab === 'uif' && (
              <div className="mt-5 space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="text-slate-600 dark:text-slate-400 block font-medium">
                    Employee Monthly Gross Remuneration
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-slate-400 font-mono">R</span>
                    <input
                      type="number"
                      value={grossSalary}
                      onChange={(e) => setGrossSalary(Number(e.target.value) || 0)}
                      className="w-full pl-8 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono tabular-nums text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
                  <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                    <span>1% Employee UIF Withholding (Capped):</span>
                    <span className="font-mono tabular-nums text-slate-900 dark:text-white font-medium">
                      R{employeeUif.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                    <span>1% Employer UIF Contribution (Capped):</span>
                    <span className="font-mono tabular-nums text-slate-900 dark:text-white font-medium">
                      R{employerUif.toFixed(2)}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-slate-900 dark:text-white font-bold text-sm">
                    <span>Total Monthly UIF Remittance (EMP201):</span>
                    <span className="font-mono tabular-nums text-emerald-600 dark:text-emerald-400">
                      R{totalUif.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 leading-relaxed space-y-1">
                  <div><strong>UIF Ceiling:</strong> Monthly remuneration is capped at R17,712 for UIF calculations (max R177.12 per party).</div>
                  <div><strong>Payment Due Date:</strong> Remitted to SARS via monthly EMP201 return by the 7th of the following month.</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
