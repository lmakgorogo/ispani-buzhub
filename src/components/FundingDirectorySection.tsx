import React, { useState } from 'react';
import { FUNDING_PROGRAMS, TECH_HUBS_LIST } from '../data/businessData';
import { FundingProgram } from '../types';
import { 
  Coins, Sparkles, GraduationCap, Building, 
  Check, ArrowRight, ExternalLink, Filter, 
  MapPin, Clock, Award, ShieldAlert, ArrowUpRight 
} from 'lucide-react';

interface FundingDirectorySectionProps {
  searchQuery?: string;
}

export const FundingDirectorySection: React.FC<FundingDirectorySectionProps> = ({ searchQuery = '' }) => {
  const [imageError, setImageError] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Youth' | 'Tech' | 'Cost-Sharing' | 'Learnership'>('All');
  const [selectedProgram, setSelectedProgram] = useState<FundingProgram | null>(null);

  // Filter programs
  const filteredPrograms = FUNDING_PROGRAMS.filter((prog) => {
    // Query search match
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = prog.name.toLowerCase().includes(q);
      const matchAgency = prog.agency.toLowerCase().includes(q);
      const matchTarget = prog.targetAudience.toLowerCase().includes(q);
      if (!matchName && !matchAgency && !matchTarget) return false;
    }

    if (categoryFilter === 'Youth') return prog.isYouthTargeted;
    if (categoryFilter === 'Tech') return prog.isTechInnovation;
    if (categoryFilter === 'Cost-Sharing') return prog.category === 'Cost-Sharing';
    if (categoryFilter === 'Learnership') return prog.category === 'Learnership';
    return true;
  });

  return (
    <section id="funding" className="py-12 lg:py-16 bg-slate-50/70 dark:bg-slate-950/50 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-4 mb-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
              Government Grants & Incubators · DSBD / dtic / DSI
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Startup Grants, Capital & Incubator Cohorts
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
              South Africa offers substantial public-sector support for early-stage and high-impact ventures, spanning non-repayable grants, blended finance, and corporate B-BBEE learnerships.
            </p>
          </div>

          {/* Category Filter Buttons (Clean flex-wrap, zero scrollbar) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-200/80 dark:bg-slate-800 rounded-xl text-xs font-medium no-scrollbar max-w-fit">
            <button
              onClick={() => setCategoryFilter('All')}
              className={`px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                categoryFilter === 'All'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All Programs
            </button>
            <button
              onClick={() => setCategoryFilter('Youth')}
              className={`px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                categoryFilter === 'Youth'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Youth Owned (18-35)
            </button>
            <button
              onClick={() => setCategoryFilter('Tech')}
              className={`px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                categoryFilter === 'Tech'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Tech & Innovation
            </button>
            <button
              onClick={() => setCategoryFilter('Cost-Sharing')}
              className={`px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                categoryFilter === 'Cost-Sharing'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Cost-Sharing (dtic)
            </button>
            <button
              onClick={() => setCategoryFilter('Learnership')}
              className={`px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                categoryFilter === 'Learnership'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              SETA & YES
            </button>
          </div>
        </div>

        {/* Highlight 1: The Merged SEDFA Entity Spotlight */}
        <div className="mb-10 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <span>Key Institutional Milestone</span>
                <span aria-hidden="true">·</span>
                <span>Operational October 2024</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                SEDFA: The Merged Entity (SEDA + SEFA + CBDA)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                The Department of Small Business Development consolidated the <strong>Small Enterprise Development Agency (SEDA)</strong>, the <strong>Small Enterprise Finance Agency (SEFA)</strong>, and the <strong>Co-operative Banks Development Agency (CBDA)</strong> into the unified <strong>Small Enterprise and Development Finance Agency (SEDFA)</strong>. This creates a one-stop portal providing both non-financial incubation and direct financial instruments (Youth Fund, Asset Finance, and TREP).
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                  <div className="font-semibold text-slate-900 dark:text-white">Asset & Equipment Finance</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Capital expenditure loans below prime</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                  <div className="font-semibold text-slate-900 dark:text-white">TREP Micro-Grants</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Township & Rural entrepreneur relief</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                  <div className="font-semibold text-slate-900 dark:text-white">National Incubation Network</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Free mentorship, testing & co-working</div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="https://sedfa.org.za"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
                >
                  <span>Visit Unified SEDFA Portal (sedfa.org.za)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm aspect-[4/3] bg-slate-100 dark:bg-slate-800">
                {!imageError ? (
                  <img
                    src="/src/assets/images/grants_funding_growth_1794134852229.jpg"
                    alt="South African entrepreneurs presenting to grant evaluators"
                    referrerPolicy="no-referrer"
                    onError={() => setImageError(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-slate-100 dark:bg-slate-800">
                    <Coins className="w-10 h-10 text-emerald-600 mb-1" />
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">SEDFA & Grant Capital</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3.5">
                  <span className="text-white text-xs font-medium">Public Capital & Mentorship Pipeline</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Startup Grants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.map((prog) => (
            <div
              key={prog.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-all"
            >
              <div>
                {/* Agency & Category Kicker (Unboxed metadata, anti-pill) */}
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                  <div className="flex items-center gap-1.5 font-semibold text-emerald-600 dark:text-emerald-400">
                    <span>{prog.agency}</span>
                    <span aria-hidden="true">·</span>
                    <span>{prog.category}</span>
                  </div>
                  <span className="text-[11px] font-mono tabular-nums">{prog.turnaroundTime}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {prog.name}
                </h3>

                {/* Funding Quantum */}
                <div className="mt-3 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
                  <div className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">
                    Funding Amount / Support
                  </div>
                  <div className="text-base font-bold font-mono tabular-nums text-slate-900 dark:text-white mt-0.5">
                    {prog.fundingRange}
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
                  <strong className="text-slate-800 dark:text-slate-200">Target:</strong> {prog.targetAudience}
                </p>

                {/* Key Eligibility bullet points */}
                <div className="mt-4 space-y-1.5">
                  <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block">
                    Core Prerequisites:
                  </span>
                  {prog.eligibility.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action footer with Direct Official Application Link */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedProgram(prog)}
                  className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white underline shrink-0"
                >
                  Full Criteria
                </button>
                <a
                  href={prog.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors shrink-0"
                >
                  <span>Apply on {prog.agency}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* SETA & YES Program Special Spotlight */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* SETA Learnerships */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <GraduationCap className="w-4 h-4 text-emerald-600" />
                <span className="font-semibold text-slate-900 dark:text-white">SETA Learnerships (21 Sector Authorities)</span>
              </div>
              <a
                href="https://www.dhet.gov.za"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
              >
                <span>DHET Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              12-Month Work-Based Training (70% Practical / 30% Theory)
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              SETA learnerships are fully funded training schemes targeting unemployed youth aged 18 to 35. The SETA covers 100% of the training tuition and pays monthly learner stipends (typically R3,500 - R6,000/month).
            </p>
            <div className="p-3 bg-emerald-50/60 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-800/60 text-xs text-emerald-900 dark:text-emerald-200 space-y-1">
              <div className="font-semibold">Section 12H Tax Incentive:</div>
              <div>Employers can claim an additional tax deduction of up to <strong>R40,000 upon commencement</strong> and an additional <strong>R40,000 upon completion</strong> per learner (up to R120,000 for disabled learners).</div>
            </div>
          </div>

          {/* YES Initiative */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Award className="w-4 h-4 text-emerald-600" />
                <span className="font-semibold text-slate-900 dark:text-white">Youth Employment Service (YES)</span>
              </div>
              <a
                href="https://yes4youth.co.za"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
              >
                <span>yes4youth.co.za</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              B-BBEE Scorecard Boost (Move 1 to 2 Contributor Levels Up)
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              The YES initiative allows qualifying South African businesses to sponsor 12-month work experiences for unemployed youth. By meeting statutory headcount targets, businesses gain an automatic <strong>1 to 2 level advancement</strong> on their B-BBEE contributor status, giving a decisive edge in government and corporate tenders.
            </p>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300">
              <strong>Implementation Options:</strong> Host youth within your company operations, or sponsor youth into third-party non-profits, township clinics, or conservation hubs.
            </div>
          </div>
        </div>

        {/* Tech Hubs & Accelerators Section with Direct Links */}
        <div className="mt-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                South African Tech Hubs & Startup Incubators
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Direct portals to specialist incubation programs taking software, hardware, and mobile innovations from concept to commercialization.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {TECH_HUBS_LIST.map((hub, idx) => (
              <a
                key={idx}
                href={hub.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-2 hover:border-slate-400 dark:hover:border-slate-600 transition-all group block"
              >
                <div className="flex items-start justify-between">
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                    {hub.name}
                  </h4>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500">
                    <MapPin className="w-3 h-3 text-emerald-600" />
                    <span>{hub.location}</span>
                  </div>
                </div>
                <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
                  Focus: {hub.focus}
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  {hub.offerings}
                </p>
                <div className="pt-2 flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  <span>Visit {hub.name}</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Modal / Dialog for Detailed Program View */}
        {selectedProgram && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-xl w-full p-6 shadow-xl space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div>
                  <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    {selectedProgram.agency} · {selectedProgram.category}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                    {selectedProgram.name}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedProgram(null)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1"
                >
                  ✕
                </button>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-between text-xs">
                <span className="text-slate-600 dark:text-slate-300">Grant / Facility Value:</span>
                <span className="font-bold font-mono text-slate-900 dark:text-white">
                  {selectedProgram.fundingRange}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <h4 className="font-semibold text-slate-900 dark:text-white">Eligibility Criteria:</h4>
                <ul className="space-y-1.5">
                  {selectedProgram.eligibility.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2 text-xs">
                <h4 className="font-semibold text-slate-900 dark:text-white">Key Benefits:</h4>
                <ul className="space-y-1.5">
                  {selectedProgram.keyBenefits.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs space-y-1">
                <div className="font-semibold text-slate-900 dark:text-white">How to Apply:</div>
                <div className="text-slate-600 dark:text-slate-400">{selectedProgram.applicationMethod}</div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <a
                  href={selectedProgram.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-xs"
                >
                  <span>Launch Official Application Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => setSelectedProgram(null)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700"
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
