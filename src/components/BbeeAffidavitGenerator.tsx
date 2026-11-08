import React, { useState } from 'react';
import { Award, Printer, Shield, FileText, Info, ExternalLink, CheckCircle2, Download } from 'lucide-react';

export const BbeeAffidavitGenerator: React.FC = () => {
  const [selectedTier, setSelectedTier] = useState<'level1' | 'level2' | 'level4'>('level1');

  const tierDetails = {
    level1: {
      title: '100% Black Owned',
      level: 'B-BBEE Level 1 Contributor',
      recognition: '135% Procurement Recognition',
      desc: 'Qualifies for maximum preferential procurement points in tenders and enterprise supplier development (ESD).'
    },
    level2: {
      title: 'At least 51% Black Owned',
      level: 'B-BBEE Level 2 Contributor',
      recognition: '125% Procurement Recognition',
      desc: 'Strong procurement recognition score for government bids and corporate supply chains.'
    },
    level4: {
      title: 'Less than 51% Black Owned',
      level: 'B-BBEE Level 4 Contributor',
      recognition: '100% Procurement Recognition',
      desc: 'Baseline contributor level for Exempted Micro Enterprises with under R10m turnover.'
    }
  };

  const currentTier = tierDetails[selectedTier];

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="affidavit" className="py-12 lg:py-16 bg-slate-50/70 dark:bg-slate-950/50 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
              Broad-Based Black Economic Empowerment · DTIC Codes of Good Practice
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              B-BBEE EME Compliance Guide & Statutory Template
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
              South African businesses with annual revenue under R10 million (Exempted Micro Enterprises) do not need to submit personal data online or pay verification agencies. A standard sworn affidavit signed before a Commissioner of Oaths is legally sufficient.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <a
              href="https://www.thedtic.gov.za/economic-empowerment/b-bbee/b-bbee-templates/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg shadow-xs hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors whitespace-nowrap"
            >
              <span>Download DTIC Template</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-500 rounded-lg shadow-xs transition-colors whitespace-nowrap"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Blank Template</span>
            </button>
          </div>
        </div>

        {/* 2-Column Split: Explanatory Matrix & Rules + Standard Blank Affidavit Template */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: EME Rules & Tier Explanations (Zero inputs) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800 text-sm font-bold text-slate-900 dark:text-white">
                <Shield className="w-4 h-4 text-emerald-600" />
                <span>The R10 Million EME Exemption Rule</span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Under the gazetted B-BBEE Codes of Good Practice, any South African business with annual turnover equal to or below <strong>R10,000,000 (Ten Million Rand)</strong> is automatically classified as an <strong>Exempted Micro Enterprise (EME)</strong>.
              </p>

              <div className="p-3.5 bg-emerald-50/60 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 space-y-1.5">
                <div className="font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>No Verification Agency Fees Required</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  You are not legally required to pay verification agencies R5,000–R15,000 for a certificate. Simply download the official template, fill in your details offline by hand, and have it stamped by a Commissioner of Oaths at any police station for free.
                </p>
              </div>

              {/* Contributor Tier Selector */}
              <div className="pt-2 space-y-2">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                  Select Ownership Bracket to Inspect Recognition:
                </span>
                
                <div className="grid grid-cols-1 gap-2">
                  <button
                    onClick={() => setSelectedTier('level1')}
                    className={`p-3 rounded-xl border text-left text-xs transition-colors ${
                      selectedTier === 'level1'
                        ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 text-slate-900 dark:text-white'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <div className="font-bold text-emerald-700 dark:text-emerald-400">100% Black Owned &rarr; Level 1</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">135% Procurement Recognition Level</div>
                  </button>

                  <button
                    onClick={() => setSelectedTier('level2')}
                    className={`p-3 rounded-xl border text-left text-xs transition-colors ${
                      selectedTier === 'level2'
                        ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/20 text-slate-900 dark:text-white'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <div className="font-bold text-blue-700 dark:text-blue-400">At least 51% Black Owned &rarr; Level 2</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">125% Procurement Recognition Level</div>
                  </button>

                  <button
                    onClick={() => setSelectedTier('level4')}
                    className={`p-3 rounded-xl border text-left text-xs transition-colors ${
                      selectedTier === 'level4'
                        ? 'border-slate-500 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <div className="font-bold text-slate-800 dark:text-slate-200">Less than 51% Black Owned &rarr; Level 4</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">100% Procurement Recognition Level</div>
                  </button>
                </div>
              </div>

              {/* Active Tier Summary */}
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-1 text-xs">
                <div className="font-semibold text-slate-900 dark:text-white">{currentTier.level}</div>
                <div className="text-slate-600 dark:text-slate-400">{currentTier.desc}</div>
              </div>
            </div>

            {/* How to Certify Offline Box */}
            <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Info className="w-4 h-4 text-emerald-600" />
                <span>3-Step Offline Certification Process</span>
              </h4>
              <ol className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 list-decimal pl-4">
                <li>Print the standard blank statutory template shown on the right.</li>
                <li>Fill in your company registration number, director name, and ownership percentage with a pen.</li>
                <li>Bring your original South African ID and CoR14.3 to any SAPS Police Station or Post Office. A Commissioner of Oaths will stamp and sign it at zero cost.</li>
              </ol>
            </div>
          </div>

          {/* Right Column: Standard Blank Statutory Template Preview */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs font-sans text-slate-900 dark:text-slate-100 space-y-4 print:border-none print:shadow-none print:p-0">
            <div className="text-center pb-4 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-base font-bold uppercase tracking-wider font-sans">
                Sworn Affidavit - B-BBEE Exempted Micro Enterprise (EME)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-sans mt-0.5">
                Issued in accordance with the Amended Codes of Good Practice gazetted under Section 9(1) of the B-BBEE Act No. 53 of 2003
              </p>
            </div>

            <div className="text-xs sm:text-sm leading-relaxed space-y-3 font-sans">
              <p>
                I, the undersigned, __________________________________________________ [Full Legal Name of Deponent], Identity Number _______________________________, hereby declare under oath as follows:
              </p>
              
              <ol className="list-decimal pl-5 space-y-2.5">
                <li>
                  The contents of this statement are to the best of my knowledge a true reflection of the facts.
                </li>
                <li>
                  I am a Director / Member of the enterprise: <br />
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Enterprise Name:</span> __________________________________________________ <br />
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Registration Number:</span> _______________________________________________ <br />
                  and am duly authorized to act on its behalf.
                </li>
                <li>
                  The annual turnover of the aforementioned enterprise was equal to or less than <strong>R10,000,000.00 (Ten Million Rand)</strong> based on the financial statements for the financial year ending: ___________________________ [e.g. 28 February 2026].
                </li>
                <li>
                  The enterprise is <strong>_______%</strong> Black Owned as per the Broad-Based Black Economic Empowerment Act.
                </li>
                <li>
                  The enterprise is <strong>_______%</strong> Black Female Owned as per the Broad-Based Black Economic Empowerment Act.
                </li>
                <li>
                  Based on the above ownership, the enterprise qualifies as a:
                  <ul className="list-disc pl-5 mt-1 space-y-1 text-slate-600 dark:text-slate-400 text-xs">
                    <li>100% Black Owned &rarr; Level 1 Contributor (135% B-BBEE procurement recognition)</li>
                    <li>At least 51% Black Owned &rarr; Level 2 Contributor (125% B-BBEE procurement recognition)</li>
                    <li>Less than 51% Black Owned &rarr; Level 4 Contributor (100% B-BBEE procurement recognition)</li>
                  </ul>
                </li>
                <li>
                  The enterprise is an Empowering Supplier in terms of the dtic Codes of Good Practice.
                </li>
              </ol>

              {/* Signature Blocks */}
              <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-8 font-sans text-xs">
                <div>
                  <div className="h-12 border-b border-dashed border-slate-400 dark:border-slate-600"></div>
                  <div className="mt-1 font-semibold">Deponent Signature</div>
                  <div className="text-[11px] text-slate-500">Date: ________________________</div>
                </div>

                <div>
                  <div className="h-12 border-b border-dashed border-slate-400 dark:border-slate-600"></div>
                  <div className="mt-1 font-semibold">Commissioner of Oaths Stamp</div>
                  <div className="text-[11px] text-slate-500">Free at SAPS Police Station or Post Office</div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl font-sans text-xs text-slate-500 flex items-start gap-2">
              <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Statutory Notice:</strong> This sworn affidavit is valid for exactly 12 months from the date of commissioner stamping. You do not need an electronic submission or external certificate.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
