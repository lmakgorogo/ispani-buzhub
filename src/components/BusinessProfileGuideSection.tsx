import React, { useState } from 'react';
import { 
  Briefcase, FileText, CheckCircle2, AlertTriangle, 
  Printer, ChevronDown, Copy, Check, Sparkles, Building2, 
  ShieldCheck, Layers 
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

interface ProfileSection {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  purpose: string;
  whatToInclude: string[];
  evaluatorFocus: string;
  sampleText: string;
}

const PROFILE_SECTIONS: ProfileSection[] = [
  {
    id: 'executive-summary',
    number: '01',
    title: 'Company Overview & Statutory Credentials',
    subtitle: 'The foundational snapshot required by tender committees and procurement officers.',
    purpose: 'Provides procurement committees with an immediate verification of legal standing, ownership structure, and statutory compliance within the first 30 seconds of evaluation.',
    whatToInclude: [
      'Official registered company name (matching CIPC CoR14.3 exactly)',
      'Enterprise Registration Number (e.g., 2026/123456/07)',
      'Central Supplier Database (CSD) MAAA Number',
      'SARS Tax Compliance Status (TCS) PIN and Income Tax Number',
      'B-BBEE Contributor Level (e.g., Level 1 EME - 135% Recognition)',
      'Registered physical address and principal place of business',
      'Corporate contact details (custom domain email, landline/mobile, website)'
    ],
    evaluatorFocus: 'Supply Chain Management (SCM) officers immediately cross-check the CSD number and tax PIN against National Treasury records before reading any further.',
    sampleText: 'Acme Solutions (Pty) Ltd is an 100% black-owned (50% black-female owned) South African engineering and facilities management company incorporated under the Companies Act 71 of 2008 (Reg: 2026/012345/07). Operating from Sandton, Gauteng, the company is an accredited Level 1 B-BBEE Contributor (135% procurement recognition) and holds an active verified registration on the National Treasury Central Supplier Database (CSD: MAAA0123456).'
  },
  {
    id: 'vision-mission',
    number: '02',
    title: 'Vision, Mission & Core Values',
    subtitle: 'Demonstrating organizational stability and corporate ethics.',
    purpose: 'Articulates your company’s long-term purpose, operational standards, and commitment to local socio-economic development and quality delivery.',
    whatToInclude: [
      'Concise Vision statement (aspirational 5–10 year horizon)',
      'Actionable Mission statement (what you do, who you serve, how you deliver value)',
      'Core values (e.g., Safety First, Integrity, Empowerment, Innovation, Customer Commitment)'
    ],
    evaluatorFocus: 'Corporate ESD managers review this to ensure alignment with their corporate social responsibility and safety standards.',
    sampleText: 'Vision: To be South Africa’s benchmark provider of sustainable technical services, championing local community empowerment and engineering excellence.\n\nMission: To deliver cost-effective, high-integrity solutions that optimize our clients\' operational uptime while upholding the highest occupational health, safety, and environmental standards.'
  },
  {
    id: 'capabilities',
    number: '03',
    title: 'Products, Services & Core Capabilities',
    subtitle: 'Clearly defined commercial offerings with relevant industry classifications.',
    purpose: 'Itemizes specific services and technical capabilities so buyers can readily determine whether your business satisfies their scope of work.',
    whatToInclude: [
      'Primary service lines grouped into distinct logical categories',
      'Technical capabilities, specialized machinery, or proprietary methodologies',
      'Applicable industry codes (UNSPSC or Standard Industrial Classification SIC codes)',
      'Geographic footprint (e.g., Provincial coverage or national reach)'
    ],
    evaluatorFocus: 'Evaluators verify whether your company possesses the specific equipment, tooling, and operational capacity necessary to fulfill the tender volume.',
    sampleText: 'Core Capabilities:\n1. Infrastructure & Civils Maintenance: Preventative plant servicing, structural repairs, and specialized asset refurbishment.\n2. Renewable Power Systems: Commercial solar PV installation, backup inverter infrastructure, and loadshedding mitigation.\n3. Supply Chain Logistics: Direct route distribution, temperature-controlled warehousing, and inventory management across Gauteng, Limpopo, and Mpumalanga.'
  },
  {
    id: 'management',
    number: '04',
    title: 'Management, Key Personnel & Organogram',
    subtitle: 'The qualifications, experience, and leadership behind the business.',
    purpose: 'Proves the operational capacity and professional competence of your leadership team to successfully deliver on contracts.',
    whatToInclude: [
      'High-level organizational chart (Organogram: Executive, Operations, Finance, Safety)',
      'Short executive bios of directors and senior project managers (1 paragraph each)',
      'Professional registrations and qualifications (e.g., ECSA, SAICA, SACPCMP, PMI)',
      'Equity distribution and black ownership representation at board level'
    ],
    evaluatorFocus: 'Tenders often allocate up to 20–30 technical points strictly for the CVs, certifications, and years of experience of key personnel.',
    sampleText: 'Managing Director: Holds an Honours Degree in Electrical Engineering (Wits) with 14 years of commercial infrastructure experience; registered with ECSA (Pr.Eng).\nOperations Lead: 10 years managing turnkey industrial contracts; certified Project Management Professional (PMP) and certified SAMTRAC safety auditor.'
  },
  {
    id: 'compliance-pack',
    number: '05',
    title: 'Statutory Compliance & Accreditations Pack',
    subtitle: 'Mandatory returnable documents required for all procurement files.',
    purpose: 'Acts as the definitive index of your compliance documentation, ensuring evaluators can verify legal standing without searching across loose pages.',
    whatToInclude: [
      'CIPC Certificate of Incorporation (CoR14.3)',
      'SARS Tax Compliance Status (TCS) PIN certificate',
      'B-BBEE Sworn EME Affidavit or SANAS verification certificate',
      'COIDA Letter of Good Standing (Compensation Fund)',
      'Public Liability Insurance certificate (e.g., R5M or R10M cover)',
      'Industry council memberships (e.g., CIDB grading for construction, PSIRA for security, NHBRC for building)'
    ],
    evaluatorFocus: 'A single missing mandatory compliance document causes automatic gatekeeper disqualification in government procurement.',
    sampleText: 'Compliance Dossier Checklist:\n• CIPC CoR14.3: Valid (Incorporated 2026)\n• SARS TCS PIN: Active / Verified\n• B-BBEE Status: Level 1 Contributor (Sworn EME Affidavit)\n• COIDA: Letter of Good Standing Available\n• Insurance: R10,000,000 Public Liability Policy (Mutual & Federal / Santam)'
  },
  {
    id: 'track-record',
    number: '06',
    title: 'Track Record, Past Projects & Client References',
    subtitle: 'Demonstrable proof of prior successful deliveries and performance.',
    purpose: 'Demonstrates reliability, quality, and past performance through concrete case examples and contactable references.',
    whatToInclude: [
      '3 to 5 notable completed contracts or supply agreements',
      'Project scope, client name, approximate contract value (or range), and delivery date',
      'Contactable client references (Name, Job Title, Organization, Phone, Email)',
      'Attached signed client testimonial or completion certificates'
    ],
    evaluatorFocus: 'Reference letters must be on official client letterheads with contact numbers that evaluators can call to confirm performance.',
    sampleText: 'Project: Solar Micro-Grid Backup System\nClient: Gauteng Logistics Distribution Hub\nScope: Turnkey engineering, procurement, and commissioning of a 120kW rooftop solar system with 200kWh battery storage.\nValue: R2.4 Million | Completed: November 2025\nReference: J. Sithole, Head of Operations (jsithole@clienthub.co.za | +27 11 555 0192)'
  }
];

export const BusinessProfileGuideSection: React.FC = () => {
  const [openChapterId, setOpenChapterId] = useState<string | null>('executive-summary');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleChapter = (id: string) => {
    // Only 1 chapter open at a time
    setOpenChapterId(openChapterId === id ? null : id);
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handlePrintSection = () => {
    document.body.classList.add('print-section-business-profile');
    window.print();
    setTimeout(() => {
      document.body.classList.remove('print-section-business-profile');
    }, 1500);
  };

  return (
    <section id="business-profile" className="py-12 lg:py-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
              Procurement & Tender Readiness · SCM Blueprint
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Company Profile Guide (6 Chapters)
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Step-by-step structural architecture for compiling a bankable corporate profile and winning public/private tenders.
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

        {/* Numbered Accordion Chapters (Strictly 1 Open at a Time on Screen, All Visible in Print) */}
        <div className="space-y-3 max-w-4xl mx-auto mb-10">
          {PROFILE_SECTIONS.map((sec) => {
            const isOpen = openChapterId === sec.id;
            return (
              <div
                key={sec.id}
                className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-all duration-200"
              >
                {/* Accordion Chapter Header (3-Second Scan Rule) */}
                <button
                  type="button"
                  onClick={() => toggleChapter(sec.id)}
                  className="print-keep w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer hover:bg-slate-100/60 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="flex items-center gap-3.5 pr-2">
                    <span className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0 font-mono">
                      {sec.number}
                    </span>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                        {sec.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                        {sec.subtitle}
                      </p>
                    </div>
                  </div>
                  <ChevronDown className={`chevron-indicator w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Expanded Chapter Content (Visible when active, all expanded for print) */}
                <div
                  className={`p-5 pt-1 border-t border-slate-200 dark:border-slate-700 space-y-4 text-xs bg-white/50 dark:bg-slate-900/40 ${
                    isOpen ? 'block animate-fade-in' : 'hidden print-show print:block'
                  }`}
                >
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block mb-1">Strategic Objective:</span>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {sec.purpose}
                    </p>
                  </div>

                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block mb-2 uppercase tracking-wider text-[11px]">
                      What to Include:
                    </span>
                    <ul className="space-y-1.5 text-slate-600 dark:text-slate-300">
                      {sec.whatToInclude.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 bg-amber-50/80 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-800/50">
                    <span className="font-bold text-amber-900 dark:text-amber-200 block mb-0.5">Tender Evaluator Focus:</span>
                    <p className="text-amber-800 dark:text-amber-300 leading-relaxed">
                      {sec.evaluatorFocus}
                    </p>
                  </div>

                  {/* Copyable Sample Project Text */}
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
                        Sample Fill-In Template Text:
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopyText(sec.id, sec.sampleText)}
                        className="print-hide inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 cursor-pointer"
                      >
                        {copiedId === sec.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Copied to Clipboard!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Sample Text</span>
                          </>
                        )}
                      </button>
                    </div>

                    <pre className="p-3.5 bg-slate-900 text-slate-200 rounded-xl text-xs font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto">
                      {sec.sampleText}
                    </pre>
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
