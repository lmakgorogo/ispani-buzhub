import React, { useState } from 'react';
import { FUNDING_PROGRAMS, TECH_HUBS_LIST } from '../data/businessData';
import { FundingProgram } from '../types';
import { 
  Coins, Sparkles, GraduationCap, Building, 
  Check, ArrowRight, ExternalLink, Filter, 
  MapPin, Clock, Award, ShieldAlert, ArrowUpRight, 
  ChevronDown, CheckCircle2 
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

interface FundingDirectorySectionProps {
  searchQuery?: string;
}

export const FundingDirectorySection: React.FC<FundingDirectorySectionProps> = ({ 
  searchQuery = ''
}) => {
  const { formatMoney } = useCurrency();
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Youth' | 'Tech' | 'Cost-Sharing' | 'Learnership'>('All');
  const [expandedProgramId, setExpandedProgramId] = useState<string | null>(null);

  // Filter programs
  const filteredPrograms = FUNDING_PROGRAMS.filter((prog) => {
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

  const toggleExpand = (id: string) => {
    setExpandedProgramId(expandedProgramId === id ? null : id);
  };

  return (
    <section id="funding" className="py-12 lg:py-16 bg-slate-50/70 dark:bg-slate-950/50 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
              Government Grants & Incubators · DSBD / dtic / DSI
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Grants, Capital & Funding Directory
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Explore public sector capital, blended finance, and corporate B-BBEE learnerships across South Africa.
            </p>
          </div>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-200/80 dark:bg-slate-800 rounded-xl text-xs font-semibold no-scrollbar max-w-fit mb-8">
          <button
            onClick={() => setCategoryFilter('All')}
            className={`px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              categoryFilter === 'All'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All Programs ({FUNDING_PROGRAMS.length})
          </button>
          <button
            onClick={() => setCategoryFilter('Youth')}
            className={`px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              categoryFilter === 'Youth'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Youth Owned (18-35)
          </button>
          <button
            onClick={() => setCategoryFilter('Tech')}
            className={`px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              categoryFilter === 'Tech'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Tech & Innovation
          </button>
          <button
            onClick={() => setCategoryFilter('Cost-Sharing')}
            className={`px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              categoryFilter === 'Cost-Sharing'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Cost-Sharing (dtic)
          </button>
          <button
            onClick={() => setCategoryFilter('Learnership')}
            className={`px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              categoryFilter === 'Learnership'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Learnership & YES
          </button>
        </div>

        {/* Compact Funding Cards Grid (Strict 3-Second Scan Rule) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {filteredPrograms.map((prog) => {
            const isExpanded = expandedProgramId === prog.id;
            return (
              <div
                key={prog.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-all hover:shadow-xs group"
              >
                <div className="space-y-2.5">
                  {/* Data Point 1: Title & Agency Badge */}
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                        {prog.agency}
                      </span>
                      <span>{prog.category}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                      {prog.name}
                    </h3>
                  </div>

                  {/* Data Point 2: Funding Range / Cost Badge */}
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 font-bold text-xs font-mono">
                      {prog.fundingRange}
                    </span>
                  </div>

                  {/* Data Point 3: Target Audience 1-Sentence Summary */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    <span className="font-semibold text-slate-900 dark:text-white">Target: </span>
                    {prog.targetAudience}
                  </p>
                </div>

                {/* Progressive Disclosure Toggle */}
                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                  <button
                    type="button"
                    onClick={() => toggleExpand(prog.id)}
                    className="w-full flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 transition-colors cursor-pointer py-1"
                  >
                    <span>{isExpanded ? '− Hide Eligibility & Portal' : '+ View Eligibility & Apply'}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Expanded Section with Eligibility, Benefits & Actions */}
                  {isExpanded && (
                    <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800 animate-fade-in text-xs">
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white text-[11px] uppercase tracking-wider mb-1.5">
                          Key Benefits:
                        </h4>
                        <ul className="space-y-1 text-slate-600 dark:text-slate-400">
                          {prog.keyBenefits.map((b, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white text-[11px] uppercase tracking-wider mb-1.5">
                          Eligibility Criteria:
                        </h4>
                        <ul className="space-y-1 text-slate-600 dark:text-slate-400">
                          {prog.eligibility.map((e, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-emerald-600 font-bold">•</span>
                              <span>{e}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Direct Action: Official Application Portal */}
                      {prog.officialUrl && (
                        <div className="pt-2">
                          <a
                            href={prog.officialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-1.5 w-full px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
                          >
                            <span>Open Official Application Portal</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Tech Incubators & Innovation Hubs Directory */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <Building className="w-4 h-4" />
                <span>Ecosystem Infrastructure</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                Accredited Startup Hubs & Tech Incubators
              </h3>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Co-working spaces, grant matchmaking, and venture mentoring
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TECH_HUBS_LIST.map((hub, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{hub.location}</span>
                    </span>
                    <span className="text-emerald-600 font-semibold">{hub.focus}</span>
                  </div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white">
                    {hub.name}
                  </h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                    {hub.offerings}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400">Accredited Hub</span>
                  <a
                    href={hub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-0.5 font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                  >
                    <span>Website</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
