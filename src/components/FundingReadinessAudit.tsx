import React, { useState } from 'react';
import { PREREQUISITES } from '../data/businessData';
import { PrerequisiteItem } from '../types';
import { 
  ShieldCheck, CheckSquare, Square, AlertCircle, 
  Printer, ArrowRight, Clock, FileText, CheckCircle2, 
  ExternalLink, RotateCcw 
} from 'lucide-react';

export const FundingReadinessAudit: React.FC = () => {
  // Default to having basic items checked to give immediate engagement
  const [checkedIds, setCheckedIds] = useState<string[]>(['cor14_3', 'director_fica']);
  const [filterView, setFilterView] = useState<'all' | 'pending' | 'completed'>('all');

  const toggleItem = (id: string) => {
    setCheckedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    setCheckedIds(PREREQUISITES.map(p => p.id));
  };

  const resetAll = () => {
    setCheckedIds([]);
  };

  // Readiness calculation
  const totalItems = PREREQUISITES.length;
  const completedCount = checkedIds.length;
  const percentage = Math.round((completedCount / totalItems) * 100);

  // Critical item count
  const criticalItems = PREREQUISITES.filter(p => p.importance === 'Critical');
  const criticalCompleted = criticalItems.filter(p => checkedIds.includes(p.id)).length;
  const criticalMissing = criticalItems.filter(p => !checkedIds.includes(p.id));

  // Determine readiness status tier
  const getReadinessTier = () => {
    if (criticalMissing.length > 0) {
      return {
        label: 'Action Required (Critical Gaps)',
        desc: `${criticalMissing.length} critical requirement(s) missing before government funds or tenders will review your file.`,
        color: 'text-amber-600 dark:text-amber-400',
        barColor: 'bg-amber-500'
      };
    }
    if (percentage >= 80) {
      return {
        label: 'Institutional & Tender Ready',
        desc: 'Your compliance dossier meets standard procurement and grant evaluation thresholds.',
        color: 'text-emerald-600 dark:text-emerald-400',
        barColor: 'bg-emerald-500'
      };
    }
    return {
      label: 'Core Foundation In Place',
      desc: 'All critical legal requirements met. Complete supplementary items to maximize your application score.',
      color: 'text-blue-600 dark:text-blue-400',
      barColor: 'bg-blue-500'
    };
  };

  const status = getReadinessTier();

  const displayedPrerequisites = PREREQUISITES.filter(item => {
    const isCompleted = checkedIds.includes(item.id);
    if (filterView === 'completed') return isCompleted;
    if (filterView === 'pending') return !isCompleted;
    return true;
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="audit" className="py-12 lg:py-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
              Due Diligence & Compliance Scorecard
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Government Funding & Tender Readiness Audit
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
              Audit your business against the mandatory checklist required by DSBD, SEDFA, NYDA, TIA, and commercial banks before submitting funding proposals.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors whitespace-nowrap"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Checklist</span>
            </button>
          </div>
        </div>

        {/* Readiness Meter Banner */}
        <div className="mb-8 p-6 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>Compliance Assessment</span>
                <span aria-hidden="true">·</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {completedCount} of {totalItems} items completed
                </span>
              </div>
              <h3 className={`text-xl font-bold ${status.color}`}>
                {status.label}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xl">
                {status.desc}
              </p>
            </div>

            {/* Score Ring / Bar */}
            <div className="flex items-center gap-4 shrink-0">
              <div className="text-right">
                <div className="text-3xl font-extrabold font-mono tabular-nums text-slate-900 dark:text-white">
                  {percentage}%
                </div>
                <div className="text-[11px] text-slate-500 font-medium">Readiness Index</div>
              </div>
              <div className="w-24 sm:w-32 bg-slate-200 dark:bg-slate-700 h-3 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${status.barColor}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Critical Missing Warning Strip */}
          {criticalMissing.length > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 flex flex-wrap items-center gap-2 text-xs">
              <span className="font-semibold text-amber-600 dark:text-amber-400">Critical missing:</span>
              {criticalMissing.map(item => (
                <span
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className="cursor-pointer text-slate-700 dark:text-slate-300 hover:text-emerald-600 underline"
                >
                  {item.title}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Action Controls & Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-2 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-medium">
            <button
              onClick={() => setFilterView('all')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                filterView === 'all'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              All Requirements ({totalItems})
            </button>
            <button
              onClick={() => setFilterView('pending')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                filterView === 'pending'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Pending ({totalItems - completedCount})
            </button>
            <button
              onClick={() => setFilterView('completed')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                filterView === 'completed'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Completed ({completedCount})
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={selectAll}
              className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            >
              Check All
            </button>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <button
              onClick={resetAll}
              className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Interactive Checklist Cards with Direct Portal Links */}
        <div className="space-y-3">
          {displayedPrerequisites.map((item) => {
            const isChecked = checkedIds.includes(item.id);
            return (
              <div
                key={item.id}
                className={`p-4 sm:p-5 rounded-xl border transition-all ${
                  isChecked
                    ? 'bg-emerald-50/30 dark:bg-emerald-950/10 border-emerald-200 dark:border-emerald-900/50'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <button
                    onClick={() => toggleItem(item.id)}
                    aria-label={`Toggle ${item.title}`}
                    className="mt-0.5 text-emerald-600 dark:text-emerald-400 focus:outline-none shrink-0"
                  >
                    {isChecked ? (
                      <CheckSquare className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-300 dark:text-slate-600 hover:text-slate-400" />
                    )}
                  </button>

                  <div className="flex-1 space-y-1.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <h4 className={`text-sm font-bold ${
                          isChecked 
                            ? 'line-through text-slate-500 dark:text-slate-400' 
                            : 'text-slate-900 dark:text-white'
                        }`}>
                          {item.title}
                        </h4>
                        <span className={`text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                          item.importance === 'Critical'
                            ? 'bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
                            : item.importance === 'High'
                            ? 'bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}>
                          {item.importance}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-[11px] text-slate-500">
                        <span>Issuer: {item.issuer}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono tabular-nums">{item.turnaroundTime}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs border-t border-slate-100 dark:border-slate-800">
                      <div className="text-slate-700 dark:text-slate-300">
                        <strong className="text-slate-900 dark:text-white">How to obtain: </strong>
                        {item.howToObtain}
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <div className="text-[11px] font-mono text-slate-500">
                          Cost: {item.estimatedCost}
                        </div>
                        {item.officialUrl && (
                          <a
                            href={item.officialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                          >
                            <span>{item.linkText || 'Open Portal'}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
