import React, { useState } from 'react';
import { BUSINESS_STRUCTURES } from '../data/businessData';
import { BusinessStructure, BusinessStructureType } from '../types';
import { Check, X, HelpCircle, Shield, Building2, Briefcase, HeartHandshake, Scale } from 'lucide-react';

export const BusinessStructuresSection: React.FC = () => {
  const [selectedId, setSelectedId] = useState<BusinessStructureType>('pty_ltd');
  const [viewMode, setViewMode] = useState<'cards' | 'matrix'>('cards');
  
  // Interactive Quiz state
  const [needsFunding, setNeedsFunding] = useState<boolean | null>(null);
  const [hasLiability, setHasLiability] = useState<boolean | null>(null);
  const [isNonProfit, setIsNonProfit] = useState<boolean | null>(null);

  const selectedStructure = BUSINESS_STRUCTURES.find(s => s.id === selectedId) || BUSINESS_STRUCTURES[1];

  // Helper to determine quiz recommendation
  const getRecommendation = () => {
    if (isNonProfit === true) return 'npc';
    if (needsFunding === true || hasLiability === true) return 'pty_ltd';
    if (needsFunding === false && hasLiability === false && isNonProfit === false) return 'sole_proprietorship';
    return null;
  };

  const recommendedId = getRecommendation();

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
              Choosing the right legal structure determines your personal liability, taxation treatment, CIPC compliance burden, and fundraising eligibility.
            </p>
          </div>

          {/* View toggle (Segmented control) */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg self-start md:self-auto">
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                viewMode === 'cards'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Detailed View
            </button>
            <button
              onClick={() => setViewMode('matrix')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                viewMode === 'matrix'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Comparison Matrix
            </button>
          </div>
        </div>

        {viewMode === 'cards' ? (
          <div>
            {/* Horizontal Structure Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
              {BUSINESS_STRUCTURES.map((struct) => {
                const isSelected = struct.id === selectedId;
                return (
                  <button
                    key={struct.id}
                    onClick={() => setSelectedId(struct.id)}
                    className={`p-3.5 text-left rounded-xl border transition-all text-xs ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/20 text-slate-900 dark:text-white shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="font-semibold text-sm">{struct.name}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                      {struct.liability}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Structure Deep-Dive Display */}
            <div className="bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-700">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
                    <span>{selectedStructure.cipcRequired ? 'CIPC Registered Entity' : 'Unregistered Trading Name'}</span>
                    <span aria-hidden="true">·</span>
                    <span>{selectedStructure.legalEntity ? 'Separate Legal Persona' : 'Personal Tax Entity'}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    {selectedStructure.fullName}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-3xl">
                    <strong className="text-slate-900 dark:text-white">Best suited for:</strong> {selectedStructure.bestFor}
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 shrink-0">
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">Liability</span>
                    <span className="text-xs font-semibold text-slate-900 dark:text-white mt-0.5 block">
                      {selectedStructure.liability}
                    </span>
                  </div>
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">Standard Cost</span>
                    <span className="text-xs font-semibold text-slate-900 dark:text-white mt-0.5 block font-mono tabular-nums">
                      {selectedStructure.costRange}
                    </span>
                  </div>
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3 col-span-2 sm:col-span-1">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">Setup Speed</span>
                    <span className="text-xs font-semibold text-slate-900 dark:text-white mt-0.5 block">
                      {selectedStructure.setupTime}
                    </span>
                  </div>
                </div>
              </div>

              {/* Pros & Cons Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Key Advantages</span>
                  </h4>
                  <ul className="space-y-2">
                    {selectedStructure.pros.map((pro, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                        <span className="text-emerald-600 dark:text-emerald-400 mt-0.5 font-bold">•</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                    <X className="w-4 h-4 text-rose-600" />
                    <span>Drawbacks & Statutory Risks</span>
                  </h4>
                  <ul className="space-y-2">
                    {selectedStructure.cons.map((con, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                        <span className="text-rose-600 dark:text-rose-400 mt-0.5 font-bold">•</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Taxation & Statutory Note */}
              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-400">
                <div>
                  <strong className="text-slate-900 dark:text-white">Tax Treatment: </strong>
                  {selectedStructure.taxTreatment}
                </div>
                <div className="text-[11px] text-slate-500">
                  {selectedStructure.keyRegulation}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Comparison Matrix Table */
          <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="p-3.5">Feature</th>
                    <th className="p-3.5">Sole Proprietor</th>
                    <th className="p-3.5 bg-emerald-50/60 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200">
                      Private Co (Pty Ltd)
                    </th>
                    <th className="p-3.5">Non-Profit (NPC)</th>
                    <th className="p-3.5">Personal Liability (Inc)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                  <tr>
                    <td className="p-3.5 font-medium text-slate-900 dark:text-white">Separate Legal Entity</td>
                    <td className="p-3.5 text-rose-600">No (Owner = Business)</td>
                    <td className="p-3.5 bg-emerald-50/30 dark:bg-emerald-950/10 text-emerald-600 font-medium">Yes</td>
                    <td className="p-3.5 text-emerald-600 font-medium">Yes</td>
                    <td className="p-3.5 text-emerald-600 font-medium">Yes</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-medium text-slate-900 dark:text-white">Director/Owner Liability</td>
                    <td className="p-3.5 font-medium text-rose-600">Unlimited Personal</td>
                    <td className="p-3.5 bg-emerald-50/30 dark:bg-emerald-950/10 text-slate-900 dark:text-white">Limited to unpaid shares</td>
                    <td className="p-3.5">Limited to fiduciary duties</td>
                    <td className="p-3.5 text-amber-600 font-medium">Joint & Several for debts</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-medium text-slate-900 dark:text-white">CIPC Registration Fee</td>
                    <td className="p-3.5 font-mono tabular-nums">R0</td>
                    <td className="p-3.5 bg-emerald-50/30 dark:bg-emerald-950/10 font-mono tabular-nums font-semibold text-slate-900 dark:text-white">R175 (R50 + R125)</td>
                    <td className="p-3.5 font-mono tabular-nums">R175 - R475</td>
                    <td className="p-3.5 font-mono tabular-nums">R175 - R475</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-medium text-slate-900 dark:text-white">Annual CIPC Returns</td>
                    <td className="p-3.5 text-slate-400">None</td>
                    <td className="p-3.5 bg-emerald-50/30 dark:bg-emerald-950/10 text-slate-900 dark:text-white">Mandatory annually</td>
                    <td className="p-3.5">Mandatory annually</td>
                    <td className="p-3.5">Mandatory annually</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-medium text-slate-900 dark:text-white">Tax Regime</td>
                    <td className="p-3.5">Personal Rates (18% - 45%)</td>
                    <td className="p-3.5 bg-emerald-50/30 dark:bg-emerald-950/10 text-slate-900 dark:text-white">CIT (27%) or SBC (0-27%)</td>
                    <td className="p-3.5">Tax Exempt (with PBO)</td>
                    <td className="p-3.5">CIT (27%)</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-medium text-slate-900 dark:text-white">Equity & Outside Capital</td>
                    <td className="p-3.5 text-rose-600">Cannot issue shares</td>
                    <td className="p-3.5 bg-emerald-50/30 dark:bg-emerald-950/10 text-emerald-600 font-medium">Full share classes & equity</td>
                    <td className="p-3.5 text-slate-400">No equity (donor grants)</td>
                    <td className="p-3.5 text-slate-400">Restricted to practitioners</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Interactive Helper Widget: Structure Matcher */}
        <div className="mt-8 p-5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200 mb-3">
            <HelpCircle className="w-4 h-4 text-emerald-600" />
            <span>Interactive Guide: Which structure fits your current situation?</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-slate-600 dark:text-slate-400 block font-medium">
                1. Will you raise equity or grant funding?
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setNeedsFunding(true)}
                  className={`px-3 py-1.5 rounded-lg border transition-colors ${
                    needsFunding === true
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => setNeedsFunding(false)}
                  className={`px-3 py-1.5 rounded-lg border transition-colors ${
                    needsFunding === false
                      ? 'bg-slate-800 text-white border-slate-800 dark:bg-slate-700'
                      : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  No
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-600 dark:text-slate-400 block font-medium">
                2. Do you have business debt or employees?
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setHasLiability(true)}
                  className={`px-3 py-1.5 rounded-lg border transition-colors ${
                    hasLiability === true
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => setHasLiability(false)}
                  className={`px-3 py-1.5 rounded-lg border transition-colors ${
                    hasLiability === false
                      ? 'bg-slate-800 text-white border-slate-800 dark:bg-slate-700'
                      : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  No
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-600 dark:text-slate-400 block font-medium">
                3. Is this a charity or public benefit mission?
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsNonProfit(true)}
                  className={`px-3 py-1.5 rounded-lg border transition-colors ${
                    isNonProfit === true
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => setIsNonProfit(false)}
                  className={`px-3 py-1.5 rounded-lg border transition-colors ${
                    isNonProfit === false
                      ? 'bg-slate-800 text-white border-slate-800 dark:bg-slate-700'
                      : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  No
                </button>
              </div>
            </div>
          </div>

          {recommendedId && (
            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div className="text-xs text-slate-700 dark:text-slate-300">
                <span className="font-semibold text-emerald-700 dark:text-emerald-400">Recommendation: </span>
                {recommendedId === 'pty_ltd' && 'Private Company (Pty Ltd) is the safest choice to shield personal assets and unlock outside funding.'}
                {recommendedId === 'npc' && 'Non-Profit Company (NPC) aligns with your public benefit mission and Section 18A donor receipts.'}
                {recommendedId === 'sole_proprietorship' && 'Sole Proprietorship is acceptable for early low-risk testing, though consider converting to a Pty Ltd once hiring or borrowing.'}
              </div>
              <button
                onClick={() => {
                  setSelectedId(recommendedId as BusinessStructureType);
                  setViewMode('cards');
                }}
                className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline shrink-0"
              >
                Inspect structure &rarr;
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
