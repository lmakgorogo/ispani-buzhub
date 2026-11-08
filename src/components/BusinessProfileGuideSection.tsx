import React, { useState } from 'react';
import { 
  Briefcase, FileText, CheckCircle2, AlertTriangle, 
  Download, Printer, Eye, Layers, ShieldCheck, 
  Building2, Users, Trophy, ExternalLink, Copy, Check 
} from 'lucide-react';

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

const COMMON_PROFILE_PITFALLS = [
  {
    title: 'Omitting the CSD MAAA Number',
    desc: 'Government supply chain officers will not register your bid if your Treasury Central Supplier Database (CSD) number is missing from the cover page.'
  },
  {
    title: 'Using Unprofessional Email Addresses',
    desc: 'Using generic free emails (e.g., mybusiness@gmail.com or @yahoo.com) reduces institutional credibility. Invest in a custom domain email (info@yourcompany.co.za).'
  },
  {
    title: 'Vague Capabilities Without Proof',
    desc: 'Listing "we do all kinds of construction, consulting, and catering" reads as inexperienced. Focus on 2–3 clearly defined core services backed by tangible capabilities.'
  },
  {
    title: 'Outdated Tax Status PINs',
    desc: 'SARS TCS PINs are valid for 12 months. Printing an expired PIN in your profile guarantees immediate gatekeeper disqualification in tender reviews.'
  },
  {
    title: 'Missing Contactable Reference Letters',
    desc: 'Naming a past client without providing a contact person, telephone number, and official completion certificate costs you valuable functionality points.'
  }
];

export const BusinessProfileGuideSection: React.FC = () => {
  const [activeSectionId, setActiveSectionId] = useState<string>('executive-summary');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeSection = PROFILE_SECTIONS.find(s => s.id === activeSectionId) || PROFILE_SECTIONS[0];

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="business-profile" className="py-12 lg:py-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
              Procurement & Tender Readiness · Corporate Positioning
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Creating a Professional Business Profile
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
              An authoritative structural guide to building a winning South African company profile for government tenders, corporate Enterprise Supplier Development (ESD) programs, and institutional grant evaluators.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg shadow-xs transition-colors whitespace-nowrap"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Profile Blueprint</span>
            </button>
          </div>
        </div>

        {/* 6 Essential Pillars Overview Strip */}
        <div className="mb-10 p-6 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
            <Layers className="w-4 h-4" />
            <span>The 6 Mandatory Pillars of a South African Business Profile</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed mb-4">
            A winning South African profile is not a generic marketing brochure; it is a legal and technical dossier that supply chain officers evaluate against strict procurement criteria.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {PROFILE_SECTIONS.map((sec) => (
              <button
                key={sec.id}
                onClick={() => setActiveSectionId(sec.id)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  activeSectionId === sec.id
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <div className={`text-[10px] font-mono font-bold ${activeSectionId === sec.id ? 'text-emerald-200' : 'text-emerald-600 dark:text-emerald-400'}`}>
                  {sec.number}
                </div>
                <div className="text-xs font-bold mt-0.5 line-clamp-1">{sec.title.split('&')[0]}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Split: Deep Dive on Selected Section + Boilerplate Copy Helper */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Left Column: Comprehensive Structure Breakdown */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <div className="text-xs font-bold font-mono text-emerald-600 dark:text-emerald-400">
                  Section {activeSection.number} of 06
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                  {activeSection.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {activeSection.subtitle}
                </p>
              </div>
            </div>

            {/* Purpose */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                Strategic Purpose
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {activeSection.purpose}
              </p>
            </div>

            {/* Mandatory Content Checklist */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                What Must Be Included
              </h4>
              <div className="space-y-2">
                {activeSection.whatToInclude.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Procurement Evaluator Focus Callout */}
            <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
                <strong className="block font-semibold mb-0.5">What Tender Evaluators Look For:</strong>
                <span>{activeSection.evaluatorFocus}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Sample Wording & Boilerplate Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  <span>Sample Boilerplate Wording</span>
                </div>
                <button
                  onClick={() => handleCopyText(activeSection.id, activeSection.sampleText)}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  {copiedId === activeSection.id ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Text</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700/80 font-mono text-xs text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                {activeSection.sampleText}
              </div>

              <p className="text-[11px] text-slate-500 leading-relaxed">
                Adapt this sample boilerplate with your registered details when assembling your company profile document in Microsoft Word, Google Docs, or Canva.
              </p>
            </div>

            {/* Profile Design & Format Guidelines */}
            <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Recommended Document Specifications
              </h4>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-slate-900 dark:text-white">Length:</span>
                  <span>4 to 8 pages maximum (evaluators prefer concise, scannable files).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-slate-900 dark:text-white">Format:</span>
                  <span>Export as a single, high-resolution PDF under 5MB to avoid email gateway bouncebacks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-slate-900 dark:text-white">Cover Page:</span>
                  <span>Must display Logo, Registered Legal Name, CIPC Reg No, CSD MAAA No, and B-BBEE Level.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Common Pitfalls in South African Business Profiles */}
        <div className="p-6 sm:p-8 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-rose-600" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              5 Critical Profile Pitfalls to Avoid in South Africa
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {COMMON_PROFILE_PITFALLS.map((pitfall, idx) => (
              <div
                key={idx}
                className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700/80 space-y-1.5"
              >
                <div className="text-xs font-bold text-rose-700 dark:text-rose-400">
                  {idx + 1}. {pitfall.title}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {pitfall.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
