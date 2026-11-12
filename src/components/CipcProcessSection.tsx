import React, { useState } from 'react';
import { CIPC_STEPS, CIPC_FAST_TRACK_LINKS } from '../data/businessData';
import { 
  Building2, CheckCircle2, ChevronRight, ChevronLeft, AlertTriangle, 
  ExternalLink, Calculator, FileText, CheckSquare, Square, 
  ArrowUpRight, Zap, ChevronDown, Sparkles 
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

export const CipcProcessSection: React.FC = () => {
  const { formatMoney } = useCurrency();
  const [activeStep, setActiveStep] = useState(1);
  const [showDetails, setShowDetails] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [showPreflight, setShowPreflight] = useState(false);
  
  // Interactive "CIPC Made Easy" 4-point Pre-Flight checklist
  const [readyItems, setReadyItems] = useState<{ [key: string]: boolean }>({
    id: false,
    phone: false,
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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
              Government Incorporation · BizPortal Gateway
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              CIPC Registration Stepper
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
              South African company registration is 100% paperless on BizPortal. Follow the 6-step interactive workflow below.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto text-xs">
            <span className="text-slate-500 dark:text-slate-400">Direct Gateway:</span>
            <a
              href="https://www.bizportal.gov.za/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <span>Launch BizPortal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 1. Collapsible Pre-Flight Checklist Banner (Progressive Disclosure) */}
        <div className="mb-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
          <div 
            onClick={() => setShowPreflight(!showPreflight)}
            className="p-4 sm:p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  15-Minute Pre-Flight Readiness Check
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {isAllReady ? 'All 4 requirements verified' : 'Verify ID, cell OTP, card fee, and physical address before starting'}
                </p>
              </div>
            </div>
            <button className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <span>{showPreflight ? 'Hide Checklist' : 'Check Requirements'}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showPreflight ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {showPreflight && (
            <div className="px-5 pb-5 pt-1 border-t border-slate-100 dark:border-slate-800 animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-3 text-xs">
                <button
                  onClick={() => toggleReadyItem('id')}
                  className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-colors cursor-pointer ${
                    readyItems.id 
                      ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800 text-slate-900 dark:text-white' 
                      : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {readyItems.id ? <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> : <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />}
                  <div>
                    <span className="font-semibold block">1. 13-Digit SA ID</span>
                    <span className="text-[11px] text-slate-500">Verified at Home Affairs</span>
                  </div>
                </button>

                <button
                  onClick={() => toggleReadyItem('phone')}
                  className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-colors cursor-pointer ${
                    readyItems.phone 
                      ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800 text-slate-900 dark:text-white' 
                      : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {readyItems.phone ? <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> : <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />}
                  <div>
                    <span className="font-semibold block">2. Cell Phone for OTP</span>
                    <span className="text-[11px] text-slate-500">Instant SMS login PIN</span>
                  </div>
                </button>

                <button
                  onClick={() => toggleReadyItem('fee')}
                  className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-colors cursor-pointer ${
                    readyItems.fee 
                      ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800 text-slate-900 dark:text-white' 
                      : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {readyItems.fee ? <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> : <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />}
                  <div>
                    <span className="font-semibold block">3. Card with {formatMoney(175)}</span>
                    <span className="text-[11px] text-slate-500">Name + registration fee</span>
                  </div>
                </button>

                <button
                  onClick={() => toggleReadyItem('address')}
                  className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-colors cursor-pointer ${
                    readyItems.address 
                      ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800 text-slate-900 dark:text-white' 
                      : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {readyItems.address ? <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> : <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />}
                  <div>
                    <span className="font-semibold block">4. Physical Address</span>
                    <span className="text-[11px] text-slate-500">South African business address</span>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 2. Interactive Horizontal Stepper (Step 1 to Step 6) */}
        <div className="mb-8">
          {/* Progress bar line */}
          <div className="hidden md:flex items-center justify-between mb-4 relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 dark:bg-slate-800 -translate-y-1/2 z-0" />
            <div 
              className="absolute top-1/2 left-0 h-0.5 bg-emerald-600 transition-all duration-300 -translate-y-1/2 z-0"
              style={{ width: `${((activeStep - 1) / 5) * 100}%` }}
            />
            {CIPC_STEPS.map((s) => {
              const isPassed = s.step < activeStep;
              const isCurrent = s.step === activeStep;
              return (
                <button
                  key={s.step}
                  onClick={() => {
                    setActiveStep(s.step);
                    setShowDetails(false);
                  }}
                  className={`relative z-10 flex flex-col items-center group cursor-pointer focus:outline-none`}
                >
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                    isCurrent
                      ? 'bg-emerald-600 text-white ring-4 ring-emerald-100 dark:ring-emerald-950 shadow-sm scale-110'
                      : isPassed
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 text-slate-500 group-hover:border-slate-400'
                  }`}>
                    {isPassed ? <CheckCircle2 className="w-4 h-4" /> : s.step}
                  </div>
                  <span className={`text-[11px] font-semibold mt-1.5 whitespace-nowrap ${
                    isCurrent ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400'
                  }`}>
                    Step {s.step}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Mobile Stepper Pills */}
          <div className="flex md:hidden items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar">
            {CIPC_STEPS.map((s) => (
              <button
                key={s.step}
                onClick={() => {
                  setActiveStep(s.step);
                  setShowDetails(false);
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors flex items-center gap-1 shrink-0 ${
                  activeStep === s.step
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                <span>Step {s.step}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 3. Single Active Step Card (Strict 3-Second Scan Rule) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-5">
              
              {/* Data Point 1: Title & Step Tracker */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    Step {currentStepData.step} of 6
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
                    {currentStepData.title}
                  </h3>
                </div>

                {/* Data Point 2: Cost / Funding Badge */}
                <div className="text-right shrink-0">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Statutory Fee</div>
                  <span className="inline-block mt-0.5 px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 font-bold text-xs font-mono">
                    {currentStepData.fee}
                  </span>
                </div>
              </div>

              {/* Data Point 3: Clean 1-Sentence Summary */}
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {currentStepData.description}
              </p>

              {/* Progressive Disclosure Toggle */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowDetails(!showDetails)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors cursor-pointer py-1"
                >
                  <span>{showDetails ? '− Hide Required Documents & Tips' : '+ View Required Documents & Tips'}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showDetails ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* Expanded Details: Requirements + Practical Tips */}
              {showDetails && (
                <div className="space-y-4 pt-3 border-t border-slate-100 dark:border-slate-800 animate-fade-in text-xs">
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] mb-2">
                      Required Documents & Inputs:
                    </h4>
                    <div className="space-y-1.5">
                      {currentStepData.requirements.map((req, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {currentStepData.tips && (
                    <div className="p-3.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/50 flex items-start gap-2.5">
                      <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                      <div className="text-amber-900 dark:text-amber-200 leading-relaxed text-xs">
                        <strong>Practical Tip:</strong> {currentStepData.tips}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Action Button: Free Official Portal Gateway */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center">
                {currentStepData.officialUrl && (
                  <a
                    href={currentStepData.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
                  >
                    <span>{currentStepData.actionText || 'Open Official BizPortal Gateway'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              {/* Stepper Navigation: Previous / Next Step */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <button
                  disabled={activeStep <= 1}
                  onClick={() => {
                    setActiveStep(prev => Math.max(1, prev - 1));
                    setShowDetails(false);
                  }}
                  className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous Step</span>
                </button>

                <span className="text-[11px] text-slate-400 font-medium">
                  {activeStep} of 6
                </span>

                <button
                  disabled={activeStep >= 6}
                  onClick={() => {
                    setActiveStep(prev => Math.min(6, prev + 1));
                    setShowDetails(false);
                  }}
                  className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                >
                  <span>Next Step</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>

          {/* Right Column: Visual Photo & Fee Calculator */}
          <div className="lg:col-span-5 space-y-6">
            {/* Visual Photo Card */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm bg-slate-100 dark:bg-slate-800 aspect-[16/10]">
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
                  <Building2 className="w-8 h-8 text-emerald-600 mb-2" />
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">BizPortal CIPC Integration</p>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                <div className="text-white text-xs">
                  <div className="font-semibold">CoR14.3 Electronic Certificate</div>
                  <div className="text-[11px] text-slate-300">Issued directly with SARS Tax Number</div>
                </div>
              </div>
            </div>

            {/* Compact CIPC Fee & Annual Return Calculator */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-xs">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                <Calculator className="w-4 h-4 text-emerald-600" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  CIPC Fee & Annual Return Calculator
                </h3>
              </div>

              <div className="mt-4 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">BizPortal Standard MOI (CoR15.1A)</span>
                  <span className="font-mono font-medium text-slate-900 dark:text-white">
                    {formatMoney(125)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-slate-600 dark:text-slate-400 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeNameReservation}
                      onChange={(e) => setIncludeNameReservation(e.target.checked)}
                      className="rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>Custom Name Reservation (CoR9.4)</span>
                  </label>
                  <span className="font-mono font-medium text-slate-900 dark:text-white">
                    {includeNameReservation ? formatMoney(50) : 'R0'}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between font-bold">
                  <span className="text-slate-900 dark:text-white">Total Statutory Registration:</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 text-sm">
                    {formatMoney(initialSetupCost)}
                  </span>
                </div>

                {/* Annual Return Tier Selector */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
                  <label className="text-[11px] text-slate-500 font-medium">Turnover Bracket for Annual Return:</label>
                  <select
                    value={turnoverBracket}
                    onChange={(e) => setTurnoverBracket(e.target.value as any)}
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="tier1">Under R1M (Micro Startup) – {formatMoney(100)}/yr</option>
                    <option value="tier2">R1M - R10M (Small Business) – {formatMoney(450)}/yr</option>
                    <option value="tier3">R10M - R25M (Medium Business) – {formatMoney(2000)}/yr</option>
                    <option value="tier4">Over R25M (Large Business) – {formatMoney(3000)}/yr</option>
                  </select>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
