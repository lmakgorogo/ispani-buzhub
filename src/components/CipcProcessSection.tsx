import React, { useState } from 'react';
import { CIPC_STEPS, CIPC_FAST_TRACK_LINKS } from '../data/businessData';
import { 
  Building2, CheckCircle2, ChevronRight, AlertTriangle, 
  ExternalLink, Calculator, FileText, Clock, CreditCard, 
  Sparkles, CheckSquare, Square, ArrowUpRight, Zap 
} from 'lucide-react';

export const CipcProcessSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [imageError, setImageError] = useState(false);
  
  // Interactive "CIPC Made Easy" 4-point Pre-Flight checklist
  const [readyItems, setReadyItems] = useState<{ [key: string]: boolean }>({
    id: true,
    phone: true,
    fee: false,
    address: false
  });

  const toggleReadyItem = (key: string) => {
    setReadyItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const isAllReady = Object.values(readyItems).every(Boolean);

  // Interactive CIPC Fee & Annual Return Calculator state
  const [includeNameReservation, setIncludeNameReservation] = useState(true);
  const [turnoverBracket, setTurnoverBracket] = useState<'tier1' | 'tier2' | 'tier3' | 'tier4'>('tier1');
  const [isLateFiling, setIsLateFiling] = useState(false);

  // Fee calculation logic
  const registrationFee = 125;
  const nameReservationFee = includeNameReservation ? 50 : 0;
  const initialSetupCost = registrationFee + nameReservationFee;

  const annualReturnFees = {
    tier1: { onTime: 100, late: 150, label: 'Under R1 Million' },
    tier2: { onTime: 450, late: 600, label: 'R1M - R10 Million' },
    tier3: { onTime: 2000, late: 2500, label: 'R10M - R25 Million' },
    tier4: { onTime: 3000, late: 4000, label: 'Over R25 Million' },
  };

  const selectedAnnualFee = isLateFiling 
    ? annualReturnFees[turnoverBracket].late 
    : annualReturnFees[turnoverBracket].onTime;

  const currentStepData = CIPC_STEPS.find(s => s.step === activeStep) || CIPC_STEPS[0];

  return (
    <section id="cipc" className="py-12 lg:py-16 bg-slate-50/70 dark:bg-slate-950/50 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
              Government Incorporation · BizPortal Gateway
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              CIPC Registration Made Easy
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
              South African company registration is 100% paperless on BizPortal. You do not need third-party agents: follow this simplified 15-minute guide.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto text-xs">
            <span className="text-slate-500 dark:text-slate-400">Direct Gateway:</span>
            <a
              href="https://bizportal.gov.za"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold shadow-xs transition-colors"
            >
              <span>Launch BizPortal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Highlight Banner: "CIPC Made Easy" 4-Point Quick Pre-Flight Check */}
        <div className="mb-10 p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <Zap className="w-4 h-4" />
                <span>15-Minute Pre-Flight Check</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                Everything You Need Before Clicking Register
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xl">
                Have these 4 items ready so you can breeze through BizPortal in a single sitting without timeouts.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href="https://bizportal.gov.za/company_registration.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs text-white transition-all shadow-sm ${
                  isAllReady 
                    ? 'bg-emerald-600 hover:bg-emerald-700 ring-2 ring-emerald-400 ring-offset-2 dark:ring-offset-slate-900' 
                    : 'bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800'
                }`}
              >
                <span>{isAllReady ? 'You Are Ready! Start on BizPortal' : 'Open BizPortal Registration'}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
            <button
              onClick={() => toggleReadyItem('id')}
              className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-colors ${
                readyItems.id 
                  ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800 text-slate-900 dark:text-white' 
                  : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
              }`}
            >
              {readyItems.id ? <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> : <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />}
              <div>
                <span className="font-semibold block">1. Valid 13-Digit SA ID</span>
                <span className="text-[11px] text-slate-500">Verified against Home Affairs</span>
              </div>
            </button>

            <button
              onClick={() => toggleReadyItem('phone')}
              className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-colors ${
                readyItems.phone 
                  ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800 text-slate-900 dark:text-white' 
                  : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
              }`}
            >
              {readyItems.phone ? <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> : <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />}
              <div>
                <span className="font-semibold block">2. Cell Phone for OTP</span>
                <span className="text-[11px] text-slate-500">Receives instant SMS login PIN</span>
              </div>
            </button>

            <button
              onClick={() => toggleReadyItem('fee')}
              className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-colors ${
                readyItems.fee 
                  ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800 text-slate-900 dark:text-white' 
                  : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
              }`}
            >
              {readyItems.fee ? <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> : <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />}
              <div>
                <span className="font-semibold block">3. Card with R175</span>
                <span className="text-[11px] text-slate-500">R50 Name + R125 Registration</span>
              </div>
            </button>

            <button
              onClick={() => toggleReadyItem('address')}
              className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-colors ${
                readyItems.address 
                  ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800 text-slate-900 dark:text-white' 
                  : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
              }`}
            >
              {readyItems.address ? <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> : <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />}
              <div>
                <span className="font-semibold block">4. Physical Address</span>
                <span className="text-[11px] text-slate-500">Registered South African address</span>
              </div>
            </button>
          </div>
        </div>

        {/* Quick Launchpad: All Official CIPC Portals at a Glance */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Official CIPC Portal Directory · Direct Links
            </h3>
            <span className="text-[11px] text-slate-500">Verified official government URLs</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {CIPC_FAST_TRACK_LINKS.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-4 rounded-xl border text-left transition-all hover:border-slate-400 dark:hover:border-slate-600 flex flex-col justify-between group ${
                  link.isPrimary
                    ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                      {link.title}
                    </h4>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 shrink-0" />
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                    {link.desc}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  {link.label} &rarr;
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* 2-Column Split: Step-by-Step Walkthrough with Direct Links + Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Step Selector & Step Details */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step navigation tabs */}
            <div className="flex gap-1.5 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800">
              {CIPC_STEPS.map((s) => (
                <button
                  key={s.step}
                  onClick={() => setActiveStep(s.step)}
                  className={`px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                    activeStep === s.step
                      ? 'bg-slate-900 text-white dark:bg-emerald-600 shadow-xs'
                      : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-black/20 dark:bg-white/20 flex items-center justify-center text-[10px] font-bold">
                    {s.step}
                  </span>
                  <span>Step {s.step}</span>
                </button>
              ))}
            </div>

            {/* Current Step Active Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    Step {currentStepData.step} of 6
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                    {currentStepData.title}
                  </h3>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs text-slate-500 dark:text-slate-400">Statutory Fee</div>
                  <div className="text-sm font-bold font-mono text-slate-900 dark:text-white tabular-nums">
                    {currentStepData.fee}
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mt-4">
                {currentStepData.description}
              </p>

              {/* Direct Link Action Button for this Specific Step */}
              {currentStepData.officialUrl && (
                <div className="mt-4 p-3 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-between">
                  <div className="text-xs text-emerald-900 dark:text-emerald-200">
                    <span className="font-semibold">Ready for Step {currentStepData.step}? </span>
                    <span className="text-[11px] text-emerald-800/80 dark:text-emerald-300/80">Proceed directly on the official portal</span>
                  </div>
                  <a
                    href={currentStepData.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors shrink-0"
                  >
                    <span>{currentStepData.actionText || 'Open Official Link'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              {/* Requirements */}
              <div className="mt-5 space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200">
                  Required Inputs & Documents
                </h4>
                <div className="space-y-1.5">
                  {currentStepData.requirements.map((req, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tip callout */}
              <div className="mt-5 p-3.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/50 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
                  <strong>Practical Tip:</strong> {currentStepData.tips}
                </div>
              </div>

              {/* Next step controls */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <button
                  disabled={activeStep <= 1}
                  onClick={() => setActiveStep(prev => Math.max(1, prev - 1))}
                  className="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                >
                  &larr; Previous Step
                </button>
                <button
                  disabled={activeStep >= 6}
                  onClick={() => setActiveStep(prev => Math.min(6, prev + 1))}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-500 rounded-lg shadow-xs disabled:opacity-30 disabled:pointer-events-none transition-colors"
                >
                  <span>Next Step</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Beneficial Ownership Alert & Link */}
            <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="text-xs font-semibold text-slate-900 dark:text-white">
                      Mandatory Beneficial Ownership Register
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      Every registered SA company must declare natural persons holding 5%+ effective interest on CIPC e-Services.
                    </p>
                  </div>
                </div>
                <a
                  href="https://eservices.cipc.co.za"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline shrink-0"
                >
                  <span>File on e-Services</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Photo + Interactive Fee & Annual Returns Calculator */}
          <div className="lg:col-span-5 space-y-6">
            {/* Visual Photo Slot */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm bg-slate-100 dark:bg-slate-800 aspect-[4/3]">
              {!imageError ? (
                <img
                  src="/src/assets/images/cipc_business_registration_1794134851518.jpg"
                  alt="Official CIPC BizPortal registration and CoR14.3 certificate"
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-slate-100 dark:bg-slate-800">
                  <Building2 className="w-10 h-10 text-emerald-600 mb-2" />
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">BizPortal Official CIPC Registration</p>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                <div className="text-white text-xs">
                  <div className="font-semibold">BizPortal Fast-Track Processing</div>
                  <div className="text-[11px] text-slate-300">CoR14.3 issued electronically with barcode</div>
                </div>
              </div>
            </div>

            {/* Interactive Fee Estimator Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                <Calculator className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  CIPC Fee & Annual Return Calculator
                </h3>
              </div>

              {/* Part 1: Initial Registration */}
              <div className="mt-4 space-y-3">
                <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Initial Incorporation Costs
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 dark:text-slate-400">BizPortal Standard MOI (CoR15.1A)</span>
                  <span className="font-mono tabular-nums text-slate-900 dark:text-white font-medium">R125</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center gap-2 text-slate-600 dark:text-slate-400 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeNameReservation}
                      onChange={(e) => setIncludeNameReservation(e.target.checked)}
                      className="rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>Reserve Custom Name (CoR9.4)</span>
                  </label>
                  <span className="font-mono tabular-nums text-slate-900 dark:text-white font-medium">
                    {includeNameReservation ? 'R50' : 'R0 (Enterprise No.)'}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-900 dark:text-white">Total CIPC Registration</span>
                  <span className="font-mono tabular-nums text-emerald-600 dark:text-emerald-400 text-sm">
                    R{initialSetupCost}
                  </span>
                </div>
              </div>

              {/* Part 2: Annual Returns Fee Estimator */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Mandatory Annual Return Fee
                  </span>
                  <a
                    href="https://annualreturns.cipc.co.za"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-0.5"
                  >
                    <span>Filing Portal</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-slate-500 dark:text-slate-400">Company Annual Turnover Bracket</label>
                  <select
                    value={turnoverBracket}
                    onChange={(e) => setTurnoverBracket(e.target.value as any)}
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="tier1">Under R1 Million (Micro / Early-stage)</option>
                    <option value="tier2">R1 Million to R10 Million (Small Business)</option>
                    <option value="tier3">R10 Million to R25 Million (Medium Business)</option>
                    <option value="tier4">Over R25 Million (Large Business)</option>
                  </select>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 text-slate-600 dark:text-slate-400 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isLateFiling}
                      onChange={(e) => setIsLateFiling(e.target.checked)}
                      className="rounded text-rose-600 focus:ring-rose-500"
                    />
                    <span className="text-[11px]">Late Filing (&gt;30 business days overdue)</span>
                  </label>
                  <span className="text-[11px] text-rose-600 dark:text-rose-400 font-medium">
                    {isLateFiling ? '+ Penalty applied' : 'On-time'}
                  </span>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex items-center justify-between">
                  <div className="text-xs text-slate-600 dark:text-slate-300">
                    <span>Statutory CIPC Annual Fee</span>
                    <div className="text-[10px] text-slate-400">
                      {annualReturnFees[turnoverBracket].label}
                    </div>
                  </div>
                  <div className="text-base font-bold font-mono tabular-nums text-slate-900 dark:text-white">
                    R{selectedAnnualFee}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
