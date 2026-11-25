import React, { useState, useMemo, useEffect } from 'react';
import {
  ShieldCheck,
  MapPin,
  Calendar,
  GraduationCap,
  Search,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Mail,
  Copy,
  Check,
  Banknote,
  Share2
} from 'lucide-react';

export interface Vacancy {
  id: string;
  title: string;
  company: string;
  division?: string;
  location: string;
  nqfLevel: string;
  contractType: string;
  salary?: string;
  closingDate: string; // YYYY-MM-DD
  summary: string;
  responsibilities: string[];
  requirements: string[];
  applyEmail: string;
  subjectLine: string;
  specialInstructions?: string;
  trustScore: number;
  verificationNotes: string;
  category:
    | 'Learnerships & Trades (Mining)'
    | 'Learnerships & Trades (Forestry)'
    | 'Entry-Level & Hospitality'
    | 'Creative & Media'
    | 'Construction & Engineering'
    | 'Finance & Executive';
}

export const VACANCIES: Vacancy[] = [
  {
    id: 'safcol-forestry-learnership-2026',
    title: 'Forestry Learnership',
    company: 'SAFCOL',
    division: 'Silviculture & Forestry Programme',
    location: 'Sabie, Mpumalanga',
    nqfLevel: 'Grade 12 (Age 18–35, Unemployed)',
    contractType: '10-Month Learnership',
    salary: '10-Month Monthly Stipend',
    closingDate: '2026-11-27',
    summary:
      'SAFCOL is offering a 10-month Forestry (Silviculture) Learnership in Sabie, Mpumalanga with a monthly stipend for unemployed youth aged 18–35 who hold a Grade 12 certificate and are willing to work outdoors.',
    responsibilities: [
      'Complete 10-month structured theoretical and practical outdoor forestry training in Sabie, Mpumalanga',
      'Assist with silviculture, plantation establishment, maintenance, and environmental safety practices',
      'Meet all practical and classroom assessment milestones required for qualification completion'
    ],
    requirements: [
      'Age 18–35 and currently unemployed',
      'Grade 12 (Matric)',
      'Willing to work outdoors in a forestry environment',
      '10-month monthly stipend provided'
    ],
    applyEmail: 'Silviculturelearnership@safcol.co.za',
    subjectLine: 'Your Full Name + ID Number – Forestry Learnership',
    specialInstructions:
      'Replace "Your Full Name + ID Number" in the email subject line with your actual Full Name and SA ID Number before sending to Silviculturelearnership@safcol.co.za. Verify details on official SAFCOL channels; never pay any fees.',
    trustScore: 99,
    verificationNotes:
      'Official SAFCOL corporate domain (@safcol.co.za) confirmed. Verify details on official SAFCOL channels; never pay any fees.',
    category: 'Learnerships & Trades (Forestry)'
  },
  {
    id: 'northam-zondereinde-learnership-2026',
    title: 'Learnership + Trade',
    company: 'Northam Zondereinde Mine',
    division: 'Mining Learnership & Artisan Trade Development',
    location: 'Northam, Limpopo',
    nqfLevel: 'Grade 12 (Matric)',
    contractType: 'Learnership + Trade',
    closingDate: '2026-12-04',
    summary:
      'Northam Zondereinde Mine invites applications for its Learnership + Trade programme in Northam, Limpopo. Open to Grade 12 holders who are medically fit for mining operations.',
    responsibilities: [
      'Undergo structured occupational and artisan trade training at Northam Zondereinde Mine',
      'Comply with all Mine Health and Safety standards and operational procedures',
      'Complete institutional and on-the-job practical modules toward trade qualification'
    ],
    requirements: [
      'Grade 12 (Matric)',
      'Certified ID copy + comprehensive CV + certified qualifications',
      'Medically fit for mining operations'
    ],
    applyEmail: 'hrapplicationsze@norplats.co.za',
    subjectLine: 'Application – Learnership + Trade',
    specialInstructions:
      'Attach your comprehensive CV, certified copy of your ID, and certified copies of your qualifications when emailing hrapplicationsze@norplats.co.za. Verify details on official Northam channels; never pay any application, medical, or placement fees.',
    trustScore: 98,
    verificationNotes:
      'Official Northam Platinum / Zondereinde corporate domain (@norplats.co.za) confirmed. Verify details on official Northam channels; never pay any application, medical, or placement fees.',
    category: 'Learnerships & Trades (Mining)'
  },
  {
    id: 'phakisa-sasolburg-2026-11',
    title: 'Piping & Welding Industry Professionals (8 Roles)',
    company: 'Phakisa Holdings',
    division: 'Engineering, Construction & Safety',
    location: 'Sasolburg, Free State',
    nqfLevel: 'Relevant Trade / Professional Qualifications (SACPCMP for Safety Officer)',
    contractType: 'Contract / Project-Based',
    closingDate: '2026-12-05',
    summary:
      'Phakisa Holdings is recruiting experienced Piping & Welding Industry Professionals across 8 project and site roles in Sasolburg, Free State. Applicants must have relevant industry experience and trade/professional qualifications.',
    responsibilities: [
      'Welding Superintendent',
      'Construction Manager',
      'Safety Officer (SACPCMP Registered)',
      'QC Level 2 Inspector',
      'Quantity Surveyor',
      'Planner',
      'Project Manager',
      'Site Manager'
    ],
    requirements: [
      'Relevant experience in the piping or welding industry',
      'Relevant trade/professional qualifications',
      'SACPCMP registration mandatory for Safety Officer applicants'
    ],
    applyEmail: 'louisa@phakisahldg.co.za',
    subjectLine: 'Application: Piping & Welding Professional (Specify Role) - Sasolburg',
    specialInstructions:
      'Submit your CV and qualifications to louisa@phakisahldg.co.za (Contact: +27 (0) 11 916 1737) and state the exact role you are applying for in the subject line. Anti-Fraud Hotline: 0800 016 017 / 0800 014 800.',
    trustScore: 99,
    verificationNotes:
      'Verified Legitimate via Phakisa Holdings (https://www.phakisaholdings.co.za). Official corporate email (louisa@phakisahldg.co.za), telephone (+27 (0) 11 916 1737), and toll-free Anti-Fraud Hotlines (0800 016 017 / 0800 014 800) confirmed.',
    category: 'Construction & Engineering'
  },
  {
    id: 'pcs-qs-estimator-2026',
    title: 'Quantity Surveyor / Estimator',
    company: 'Professional Career Services (PCS)',
    division: 'Building & Construction Division',
    location: 'Centurion, Gauteng',
    nqfLevel: 'Relevant QS Qualification (BTech or BSc)',
    contractType: 'Permanent',
    salary: 'R45,000 per month',
    closingDate: '2026-12-03',
    summary:
      'Established specialist construction and engineering recruitment agency PCS is hiring an experienced Quantity Surveyor / Estimator in Centurion with strong estimating, measurement, and cost control skills within a construction company.',
    responsibilities: [
      'Perform accurate construction estimating, measurement, and cost control across projects',
      'Utilize QS and estimating software (Candy, CCS, WinQS, Excel) for tender and project pricing',
      'Manage construction contracts and coordinate with multiple project stakeholders in a fast-paced environment',
      'Monitor project costs and support financial control throughout the project lifecycle'
    ],
    requirements: [
      'Relevant Quantity Surveying qualification (BTech or BSc)',
      "3–5 years' experience in estimating within a construction company",
      'Strong estimating, measurement, and cost control skills',
      'Proficiency in QS and estimating software (Candy, CCS, WinQS, Excel)',
      'Solid understanding of construction contracts and strong analytical skills'
    ],
    applyEmail: 'candicecv@pcs-sa.co.za',
    subjectLine: 'Application: Quantity Surveyor / Estimator (Centurion - Ref 18826)',
    specialInstructions:
      'Submit your CV directly to Specialist Consultant Candice at candicecv@pcs-sa.co.za.',
    trustScore: 96,
    verificationNotes:
      'Verified specialist built-environment agency listed on pcs-sa.co.za (Ref 18826) and endorsed by the Association of South African Quantity Surveyors (ASAQS).',
    category: 'Construction & Engineering'
  },
  {
    id: 'alexforbes-botswana-fm-2026',
    title: 'Finance Manager – Pension Fund Accounts',
    company: 'Alexforbes Botswana',
    division: 'Pension Fund Accounts Team (SADC Regional)',
    location: 'Gaborone, Botswana (SADC Region)',
    nqfLevel: 'Accounting Degree / ACCA / CIMA + BICA Member',
    contractType: 'Permanent (Full-Time)',
    closingDate: '2026-11-26',
    summary:
      'Reporting to the Chief Financial Officer at Alexforbes Botswana, the Finance Manager will lead the Pension Fund Accounts team, oversee financial and statutory reporting (NBFIRA, Auditors, Actuaries), and manage strategic stakeholder relationships.',
    responsibilities: [
      'Lead the Pension Fund (PF) Accounts team and oversee monthly, quarterly, and annual statutory reporting',
      'Ensure timely and accurate submission of Trustee Reports, cashflow statements, and Annual Returns to Actuaries, Auditors, and NBFIRA',
      'Oversee PF tax processes, monthly bank and Imprest Account reconciliations, and execution of investment mandates',
      'Manage internal and external audits and ensure audit queries are resolved before the next cycle',
      'Lead, mentor, and manage staff performance, succession planning, and compliance'
    ],
    requirements: [
      'AAT qualified or Accounting Degree; Fully Qualified ACCA / CIMA',
      'Certificate of Proficiency (COP) and Registered member of BICA (Botswana Institute of Chartered Accountants)',
      'Minimum 7 years accounting experience with 3–5 years managerial experience',
      'Advanced Excel proficiency and knowledge of accounting packages (e.g., SmartStream)',
      'Strong knowledge of pension fund accounting and Botswana financial services legislation'
    ],
    applyEmail: 'recruitment@alexforbes.com',
    subjectLine: 'Application for the position of Finance Manager - Pension Fund Accounts',
    specialInstructions:
      'IMPORTANT: Email your CV, application letter, and copies of academic certificates inside a ZIPPED FOLDER labeled with your Name & Surname using the exact subject line.',
    trustScore: 95,
    verificationNotes:
      'Verified corporate role at Alexforbes Botswana (@alexforbes.com). Note: Based in Gaborone, Botswana and requires BICA accreditation.',
    category: 'Finance & Executive'
  }
];

interface VerifiedVacanciesTabProps {
  focusedVacancyId?: string | null;
}

export function VerifiedVacanciesTab({ focusedVacancyId }: VerifiedVacanciesTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>(focusedVacancyId || null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [sharedLinkCopied, setSharedLinkCopied] = useState(false);
  const [copiedJobShareId, setCopiedJobShareId] = useState<string | null>(null);

  const categories = [
    'All',
    'Learnerships & Trades',
    'Construction & Engineering',
    'Finance & Executive',
    'Entry-Level & Hospitality',
    'Creative & Media'
  ];

  const getDaysRemaining = (closingDate: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const [year, month, day] = closingDate.split('-').map(Number);
    const close = new Date(year, month - 1, day);
    return Math.ceil((close.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  };

  useEffect(() => {
    if (!focusedVacancyId) return;
    const exists = VACANCIES.some(
      (v) => v.id === focusedVacancyId && getDaysRemaining(v.closingDate) >= 0
    );
    if (!exists) return;

    setSelectedCategory('All');
    setSearchQuery('');
    setExpandedId(focusedVacancyId);

    const timer = setTimeout(() => {
      const el = document.getElementById(`vacancy-${focusedVacancyId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 120);

    return () => clearTimeout(timer);
  }, [focusedVacancyId]);

  const filteredVacancies = useMemo(() => {
    return VACANCIES.filter((v) => {
      // Automatically remove closed vacancies from the site
      if (getDaysRemaining(v.closingDate) < 0) {
        return false;
      }

      const matchesCategory =
        selectedCategory === 'All' ||
        v.category === selectedCategory ||
        (selectedCategory === 'Learnerships & Trades' &&
          v.category.startsWith('Learnerships & Trades'));
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        v.title.toLowerCase().includes(q) ||
        v.company.toLowerCase().includes(q) ||
        v.location.toLowerCase().includes(q) ||
        v.nqfLevel.toLowerCase().includes(q) ||
        v.category.toLowerCase().includes(q) ||
        v.responsibilities.some((item) => item.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const copyTextToClipboard = async (text: string): Promise<boolean> => {
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch {
        // Fallback below for iframe contexts
      }
    }
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.top = '-9999px';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(textarea);
      return ok;
    } catch {
      return false;
    }
  };

  const getAppOrigin = () => {
    return typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : 'https://sa-business-resource-guide.ai.studio';
  };

  const getVacancyShareUrl = (vacancyId: string) => {
    return `${getAppOrigin()}/?vacancy=${encodeURIComponent(vacancyId)}#vacancies`;
  };

  const copySubjectLine = async (id: string, subject: string) => {
    await copyTextToClipboard(subject);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const shareBoard = async () => {
    await copyTextToClipboard(`${getAppOrigin()}/#vacancies`);
    setSharedLinkCopied(true);
    setTimeout(() => setSharedLinkCopied(false), 2500);
  };

  const copyJobShareLink = async (job: Vacancy) => {
    await copyTextToClipboard(getVacancyShareUrl(job.id));
    setCopiedJobShareId(job.id);
    setTimeout(() => setCopiedJobShareId(null), 2500);
  };

  return (
    <div id="vacancies" className="min-h-screen bg-[#070B28] text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#15806B]/50 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAB308]/15 border border-[#EAB308]/40 text-[#EAB308] text-xs font-semibold mb-3">
              <ShieldCheck className="w-4 h-4" />
              Vetted by the iSpani BizHub Team
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Verified Vacancies &amp; Contracts
            </h1>
            <p className="text-slate-300 text-sm mt-1">
              Every job poster on this board has passed our 5-Point Verification Check for official company footprint, corporate email domain, and zero-fee compliance.
            </p>
          </div>

          <button
            type="button"
            onClick={shareBoard}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#EAB308] hover:bg-[#facc15] text-[#070B28] font-bold text-xs transition shadow-lg self-start md:self-center cursor-pointer"
          >
            {sharedLinkCopied ? (
              <>
                <Check className="w-4 h-4" /> Link Copied!
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" /> Share Verified Job Board
              </>
            )}
          </button>
        </div>

        {/* Anti-Scam Safety Banner */}
        <div className="bg-[#0D133D] border border-slate-800 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-[#EAB308] shrink-0 mt-0.5" />
          <div className="text-xs text-slate-200 leading-relaxed">
            <span className="font-semibold text-white">iSpani Golden Rule:</span> Legitimate employers do not charge money for job applications, background checks, or uniforms. Always use the exact email subject line specified below when applying.
          </div>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 justify-between no-print">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by job title, Grade 12, degree, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#0D133D] border border-slate-800 text-sm text-white focus:border-[#EAB308] outline-none"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#EAB308] text-[#070B28] font-bold'
                    : 'bg-[#0D133D] text-slate-200 border border-slate-800 hover:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Vacancy Cards */}
        <div className="space-y-4">
          {filteredVacancies.map((job) => {
            const daysLeft = getDaysRemaining(job.closingDate);
            const isExpanded = expandedId === job.id;
            const isFocused = focusedVacancyId === job.id;

            return (
              <div
                key={job.id}
                id={`vacancy-${job.id}`}
                className={`scroll-mt-24 bg-[#0D133D] rounded-xl p-5 transition shadow-lg ${
                  isFocused
                    ? 'border-2 border-[#EAB308] ring-2 ring-[#EAB308]/30'
                    : 'border border-slate-800 hover:border-[#EAB308]/60'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#15806B]/25 text-emerald-300 border border-[#15806B]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        iSpani Verified ({job.trustScore}% Trust)
                      </span>
                      {isFocused && (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#EAB308] text-[#070B28]">
                          Shared Vacancy
                        </span>
                      )}
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#070B28] border border-slate-800 text-slate-200">
                        {job.category}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          daysLeft <= 3
                            ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                            : 'bg-[#EAB308]/15 text-[#EAB308] border border-[#EAB308]/30'
                        }`}
                      >
                        <Clock className="w-3 h-3" />
                        {daysLeft === 0
                          ? 'Closes Today!'
                          : `Closes in ${daysLeft} days (${job.closingDate})`}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white pt-1">{job.title}</h3>
                    <p className="text-sm text-[#EAB308] font-medium">
                      {job.company} {job.division ? `• ${job.division}` : ''}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setExpandedId(isExpanded ? null : job.id)}
                      className="px-3.5 py-2 rounded-lg bg-[#070B28] hover:bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-200 transition cursor-pointer"
                    >
                      {isExpanded ? 'Hide Details' : 'View Full Spec'}
                    </button>
                    <button
                      type="button"
                      onClick={() => copyJobShareLink(job)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#070B28] hover:bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-200 transition cursor-pointer"
                      title="Copy direct link to this vacancy"
                    >
                      {copiedJobShareId === job.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-300" />
                          <span className="text-emerald-300">Link Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[#EAB308]" />
                          <span>Copy Link</span>
                        </>
                      )}
                    </button>
                    <a
                      href={`mailto:${job.applyEmail}?subject=${encodeURIComponent(
                        job.subjectLine
                      )}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#EAB308] hover:bg-[#facc15] text-[#070B28] font-bold text-xs transition"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      Apply via Email
                    </a>
                  </div>
                </div>

                {/* Quick Metadata Bar */}
                <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-[#15806B]/30 text-xs text-slate-200">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-slate-400" />
                    {job.nqfLevel}
                  </span>
                  {job.salary && (
                    <span className="flex items-center gap-1.5 text-emerald-300 font-semibold">
                      <Banknote className="w-4 h-4" />
                      {job.salary}
                    </span>
                  )}
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    Deadline: {job.closingDate}
                  </span>
                </div>

                {/* Expanded Spec */}
                {isExpanded && (
                  <div className="mt-5 pt-5 border-t border-slate-800 space-y-4 text-sm text-slate-200">
                    <div className="p-3 rounded-lg bg-[#15806B]/20 border border-[#15806B] text-xs text-emerald-200">
                      <strong>iSpani Vetting Report:</strong> {job.verificationNotes}
                    </div>

                    <p className="leading-relaxed">{job.summary}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2 text-xs uppercase tracking-wider text-[#EAB308]">
                          Key Responsibilities / Roles
                        </h4>
                        <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-200">
                          {job.responsibilities.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2 text-xs uppercase tracking-wider text-[#EAB308]">
                          Minimum Requirements
                        </h4>
                        <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-200">
                          {job.requirements.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Application Instructions Box */}
                    <div className="bg-[#070B28] border border-slate-800 rounded-lg p-4 space-y-2">
                      {job.specialInstructions && (
                        <p className="text-xs text-[#EAB308] font-medium">
                          📌 {job.specialInstructions}
                        </p>
                      )}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                        <div className="space-y-1 text-xs">
                          <p className="text-slate-300">
                            Official Application Email:{' '}
                            <span className="text-white font-mono">{job.applyEmail}</span>
                          </p>
                          <p className="text-slate-300">
                            Recommended Subject Line:{' '}
                            <span className="text-[#EAB308] font-mono font-semibold">
                              {job.subjectLine}
                            </span>
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => copySubjectLine(job.id, job.subjectLine)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#0D133D] hover:bg-slate-800 border border-slate-700 text-xs text-white font-medium self-start sm:self-center cursor-pointer"
                        >
                          {copiedId === job.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-300" /> Subject Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-[#EAB308]" /> Copy Subject Line
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default VerifiedVacanciesTab;
