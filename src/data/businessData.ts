import { BusinessStructure, CipcStep, TaxObligation, FundingProgram, PrerequisiteItem } from '../types';

export const BUSINESS_STRUCTURES: BusinessStructure[] = [
  {
    id: 'sole_proprietorship',
    name: 'Sole Proprietorship',
    fullName: 'Sole Proprietorship / Informal Trader',
    bestFor: 'Freelancers, consultants, tradespeople, single-operator micro businesses testing an idea.',
    legalEntity: false,
    cipcRequired: false,
    liability: 'Unlimited Personal',
    costRange: 'R0 (No registration fees)',
    setupTime: 'Immediate',
    taxTreatment: 'Taxed at personal income tax sliding rates (18% - 45%) on net profits.',
    pros: [
      'No registration cost or annual CIPC filing requirements',
      'Minimal compliance overhead and simple accounting',
      'All business profits belong directly to the owner',
      'Full, unilateral control over all operational decisions'
    ],
    cons: [
      'Unlimited personal liability: personal assets at risk for business debts',
      'Cannot sell shares or issue equity to outside investors',
      'Excluded from most government tenders, grants, and enterprise supply chains',
      'Business dissolves upon personal insolvency or death of proprietor'
    ],
    keyRegulation: 'Common law of South Africa & Income Tax Act (Individual marginal tax tables).'
  },
  {
    id: 'pty_ltd',
    name: 'Private Company (Pty Ltd)',
    fullName: 'Private Company (Proprietary Limited)',
    bestFor: 'Startups, scaling SMEs, retail, tech platforms, and any venture seeking outside funding or corporate tenders.',
    legalEntity: true,
    cipcRequired: true,
    liability: 'Limited to Shares',
    costRange: 'R125 - R175 (via BizPortal)',
    setupTime: '24 to 72 hours',
    taxTreatment: 'Corporate Income Tax (CIT) flat 27%, or preferential SBC (Small Business Corporation) rates.',
    pros: [
      'Strict legal separation between company and shareholders/directors',
      'Shareholders only liable up to value of unpaid share capital',
      'Perpetual succession (continues existing if founders depart)',
      'Eligible for government grants, commercial bank loans, and equity investors'
    ],
    cons: [
      'Mandatory annual CIPC return filings and fees',
      'Obligation to maintain Beneficial Ownership register',
      'Corporate governance compliance under Companies Act 71 of 2008',
      'Appointing a registered Public Officer for SARS is compulsory'
    ],
    keyRegulation: 'Companies Act No. 71 of 2008 & CIPC Companies Regulations.'
  },
  {
    id: 'npc',
    name: 'Non-Profit Company (NPC)',
    fullName: 'Non-Profit Company',
    bestFor: 'Charities, educational initiatives, community development, social enterprises, and public benefit organisations.',
    legalEntity: true,
    cipcRequired: true,
    liability: 'Limited / Board Gov',
    costRange: 'R175 (standard MOI) to R475 (custom MOI)',
    setupTime: '3 to 7 working days',
    taxTreatment: 'Exempt from CIT if approved by SARS as a Public Benefit Organisation (PBO under Section 10(1)(cN)).',
    pros: [
      'Can apply for Section 18A tax-deductible donation status with SARS',
      'Eligible for donor funding, CSI corporate grants, and National Lottery funding',
      'Established governance structure with minimum 3 directors',
      'Enhances public trust and philanthropic credibility'
    ],
    cons: [
      'Income and assets cannot be distributed to members or directors',
      'Upon winding up, remaining assets must be transferred to another NPC/PBO',
      'Stringent annual reporting to CIPC and Department of Social Development',
      'Cannot issue equity or shares to founders'
    ],
    keyRegulation: 'Companies Act Schedule 1 & Non-Profit Organisations Act No. 71 of 1997.'
  },
  {
    id: 'inc',
    name: 'Personal Liability Company (Inc)',
    fullName: 'Personal Liability Company (Incorporated)',
    bestFor: 'Regulated professions such as attorneys, medical doctors, auditors, chartered accountants, and engineers.',
    legalEntity: true,
    cipcRequired: true,
    liability: 'Joint & Several (Directors)',
    costRange: 'R175 - R475',
    setupTime: '3 to 5 working days',
    taxTreatment: 'Corporate Income Tax at 27% + statutory professional council rules.',
    pros: [
      'Enables professional practitioners to form corporate operating structures',
      'Perpetual succession and corporate contracting power',
      'Allows shared overhead, brand building, and structured partner equity',
      'Meets statutory professional body registration requirements'
    ],
    cons: [
      'Directors are jointly and severally liable with the company for debts contracted during their tenure',
      'Personal assets remain exposed for contractual professional obligations',
      'Strict oversight by respective statutory councils (LPC, HPCSA, IRBA, ECSA)',
      'Requires specialized Memorandum of Incorporation (MOI)'
    ],
    keyRegulation: 'Section 8(2)(c) & Section 19(3) of Companies Act 71 of 2008.'
  }
];

export const CIPC_STEPS: CipcStep[] = [
  {
    step: 1,
    title: 'BizPortal Account & Director Identity Verification',
    timeframe: '10 - 20 minutes',
    fee: 'Free',
    description: 'Create an account on the official CIPC BizPortal (bizportal.gov.za). The system validates your South African ID number in real-time against the Department of Home Affairs National Population Register.',
    requirements: [
      'Valid 13-digit South African ID number or verified foreign passport',
      'Personal cell phone for OTP SMS verification',
      'Active email address',
      'Proof of residential address for FICA validation'
    ],
    tips: 'Ensure your ID photo and marital status match Home Affairs records to prevent automatic verification rejections.',
    officialUrl: 'https://bizportal.gov.za/login.aspx',
    actionText: 'Open BizPortal Registration Login'
  },
  {
    step: 2,
    title: 'Company Name Reservation (Optional vs Enterprise Number)',
    timeframe: 'Immediate to 24 hours',
    fee: 'R50 (or R0 if using enterprise number)',
    description: 'You can propose up to 4 name choices in order of preference. CIPC automated name search checks for conflicting or misleading names. Alternatively, register immediately for free using your enterprise registration number (e.g., 2026/123456/07) and change to a named entity later.',
    requirements: [
      'Up to 4 unique proposed company names',
      'Name must not contain prohibited words (e.g., "National", "State", vulgarities)',
      'R50 CIPC customer account balance or card payment'
    ],
    tips: 'Include distinctive keywords (e.g., "Kallie Logistics" instead of just "Logistics") to prevent conflicts with pre-existing registered trademarks.',
    officialUrl: 'https://bizportal.gov.za/company_registration.aspx',
    actionText: 'Check Name Availability on BizPortal'
  },
  {
    step: 3,
    title: 'Director Details & Standard MOI Submission',
    timeframe: '15 - 30 minutes',
    fee: 'R125 (Standard Registration)',
    description: 'Input all founding directors (minimum 1 director required for a Pty Ltd). BizPortal generates a standardized Memorandum of Incorporation (Form CoR15.1A) granting standard shareholder voting rights and ordinary share allocation.',
    requirements: [
      'Full legal names, ID/passport numbers, residential addresses of all directors',
      'Financial year-end month selection (typically February or June)',
      'Registered physical address and principal place of business in South Africa',
      'Initial authorized and issued share count (e.g., 100 or 1,000 ordinary par shares)'
    ],
    tips: 'For standard startups, 1,000 ordinary shares without nominal value is common practice, making future employee or co-founder equity allocation straightforward.',
    officialUrl: 'https://bizportal.gov.za/company_registration.aspx',
    actionText: 'Submit CoR15.1A Director Details'
  },
  {
    step: 4,
    title: 'Payment & Immediate CoR14.3 Issuance',
    timeframe: 'Immediate to 2 hours',
    fee: 'Total R175 (R50 Name + R125 Registration)',
    description: 'Complete secure checkout via debit/credit card. Once processed, BizPortal automatically issues your official CoR14.3 Registration Certificate with enterprise registration number and security barcode.',
    requirements: [
      'Credit card or Instant EFT for R175 total balance',
      'All directors must accept the appointment notification if requested'
    ],
    tips: 'Download and safely store multiple digital copies of CoR14.3 and the stamped MOI (CoR15.1A). These are required by every bank, funder, and vendor.',
    officialUrl: 'https://bizportal.gov.za',
    actionText: 'Download CoR14.3 on BizPortal'
  },
  {
    step: 5,
    title: 'Automatic SARS Income Tax & Bank Integration',
    timeframe: 'Automatic on registration',
    fee: 'Free',
    description: 'CIPC is directly integrated with SARS eFiling. Your 10-digit Corporate Income Tax (CIT) number is generated automatically and printed on your CoR14.3. You can also select instant business bank account opening.',
    requirements: [
      'Appoint a registered Public Officer via SARS eFiling',
      'Select bank preference (FNB, Nedbank, Standard Bank, Absa, Capitec)',
      'Complete FICA verification with the bank'
    ],
    tips: 'You MUST log into SARS eFiling, register your company, and link the designated Public Officer within 21 days of incorporation.',
    officialUrl: 'https://sarsefiling.co.za',
    actionText: 'Appoint Public Officer on SARS eFiling'
  },
  {
    step: 6,
    title: 'Post-Registration: Annual Returns & Beneficial Ownership',
    timeframe: 'Annual statutory mandate',
    fee: 'R100 - R4,000/yr (turnover-based)',
    description: 'South African law mandates filing CIPC Annual Returns within 30 business days of your company incorporation anniversary each year to prove continuous trading. Failure leads to deregistration and asset freezing. In addition, you must submit the Beneficial Ownership Register.',
    requirements: [
      'Audited financial statement or Financial Accountability Supplement (FAS)',
      'Turnover declaration for the preceding financial year',
      'Beneficial Ownership register showing any individual holding 5% or more effective interest'
    ],
    tips: 'Set a calendar reminder 1 month before your incorporation month. CIPC deregistration results in bank accounts being frozen and assets vesting in the state.',
    officialUrl: 'https://annualreturns.cipc.co.za',
    actionText: 'File Annual Returns & Beneficial Ownership'
  }
];

export const TAX_OBLIGATIONS: TaxObligation[] = [
  {
    id: 'cit',
    name: 'Corporate Income Tax (CIT)',
    threshold: 'Mandatory from Day 1 for all registered companies',
    rate: 'Standard 27% (or SBC graduated relief from 0% to 27%)',
    frequency: 'Two provisional returns (6-month & year-end) + 1 annual ITR14',
    formName: 'IRP6 & ITR14',
    description: 'Tax levied on the net taxable profit of your company. Small Business Corporations (SBC) qualifying under Section 12E enjoy preferential tax brackets with 0% tax on the first R95,750 of taxable income.',
    penalties: 'Non-submission penalties up to R16,000/month plus interest on outstanding tax at prescribed rates.',
    officialUrl: 'https://www.sars.gov.za/types-of-tax/corporate-income-tax/'
  },
  {
    id: 'vat',
    name: 'Value-Added Tax (VAT)',
    threshold: 'Compulsory at R1,000,000 turnover; Voluntary from R50,000',
    rate: 'Standard 15% (Zero-rated for basic foods/exports)',
    frequency: 'Bi-monthly (every 2 months) or monthly on VAT201',
    formName: 'VAT201',
    description: 'Indirect tax charged on the supply of goods and services. Mandatory once taxable turnover exceeds R1m in a consecutive 12-month period. Registering voluntarily allows you to claim input VAT on startup equipment and operating expenses.',
    penalties: '10% immediate late payment penalty plus compound interest calculated monthly.',
    officialUrl: 'https://www.sars.gov.za/types-of-tax/value-added-tax/'
  },
  {
    id: 'paye_uif',
    name: 'Employer Taxes (PAYE & UIF)',
    threshold: 'Mandatory the moment you employ any worker',
    rate: 'PAYE (sliding scale) + UIF (1% employer + 1% employee = 2%)',
    frequency: 'Monthly by the 7th of following month + Bi-annual EMP501 reconciliation',
    formName: 'EMP201 & EMP501',
    description: 'Pay-As-You-Earn (PAYE) deducts income tax from employees earning above the tax threshold. Unemployment Insurance Fund (UIF) is capped at R177.12/month per worker each for employer and employee.',
    penalties: '10% late payment penalty plus personal liability for directors if PAYE is withheld but not remitted.',
    officialUrl: 'https://www.sars.gov.za/types-of-tax/paye/'
  },
  {
    id: 'turnover_tax',
    name: 'Turnover Tax for Micro-Businesses',
    threshold: 'Optional for businesses with annual turnover under R1,000,000',
    rate: 'Graduated: 0% up to R335,000, max 3% over R750,000',
    frequency: 'Two interim payments (TT02) + One annual return (TT03)',
    formName: 'TT02 / TT03',
    description: 'Replaces Income Tax, VAT (optional exemption), Provisional Tax, Capital Gains Tax, and Dividends Tax with a single, simplified turnover-based calculation designed to reduce bookkeeping costs.',
    penalties: 'Disqualification if turnover exceeds R1,000,000 or if shares are held in other companies.',
    officialUrl: 'https://www.sars.gov.za/types-of-tax/turnover-tax/'
  },
  {
    id: 'sdl',
    name: 'Skills Development Levy (SDL)',
    threshold: 'Total payroll exceeds R500,000 over 12 months',
    rate: '1% of total employee remuneration',
    frequency: 'Monthly alongside EMP201',
    formName: 'EMP201',
    description: 'Funds SETA skills training and learnership schemes. Micro-businesses with annual payroll under R500,000 are legally exempt from SDL.',
    penalties: '10% penalty plus interest on underpayments.',
    officialUrl: 'https://www.sars.gov.za/types-of-tax/skills-development-levy/'
  }
];

export const FUNDING_PROGRAMS: FundingProgram[] = [
  {
    id: 'nyda_grant',
    name: 'NYDA Grant Programme',
    agency: 'NYDA',
    category: 'Grant',
    fundingRange: 'R1,000 - R200,000',
    targetAudience: '100% South African youth-owned startups (founders aged 18 - 35).',
    eligibility: [
      'Founders must be South African citizens aged 18 to 35',
      '100% youth-owned enterprise with full-time operational involvement',
      'Completion of NYDA Entrepreneurship Development Training (EDT) or Voucher Programme',
      'Valid SARS Tax Compliance Status (TCS)'
    ],
    keyBenefits: [
      '100% non-repayable capital grant (no equity or repayment required)',
      'Free mentorship and technical business coaching for 12 months',
      'Market linkage and procurement directory listing'
    ],
    applicationMethod: 'Apply online via the NYDA ERP portal (erp.nyda.gov.za) or at any NYDA district branch.',
    turnaroundTime: '6 to 12 weeks',
    isYouthTargeted: true,
    isTechInnovation: false,
    officialUrl: 'https://erp.nyda.gov.za',
    portalName: 'NYDA ERP Portal'
  },
  {
    id: 'ycf_dsbd',
    name: 'Youth Challenge Fund (YCF)',
    agency: 'DSBD',
    category: 'Blended Capital',
    fundingRange: 'Up to R1,500,000',
    targetAudience: 'Youth-led startups in digital tech, green economy, agro-processing, and manufacturing.',
    eligibility: [
      'Founders aged 18 - 35 with minimum 51% youth ownership',
      'Business operating in designated high-growth economic sectors',
      'Demonstrated prototype, working product, or commercially viable concept',
      'Willingness to participate in post-investment monitoring'
    ],
    keyBenefits: [
      'Blended funding: up to 80% non-repayable grant + 20% low-interest term loan',
      'Working capital, asset acquisition, and commercialization support',
      'Subsidized business development services'
    ],
    applicationMethod: 'Apply via Department of Small Business Development / SEDFA digital portal.',
    turnaroundTime: '8 to 16 weeks',
    isYouthTargeted: true,
    isTechInnovation: true,
    officialUrl: 'https://www.dsbd.gov.za',
    portalName: 'DSBD Official Portal'
  },
  {
    id: 'tia_seed',
    name: 'TIA Seed Fund Programme',
    agency: 'TIA',
    category: 'Grant',
    fundingRange: 'Up to R650,000',
    targetAudience: 'Innovators, researchers, and technology startups bridging the gap from prototype to market.',
    eligibility: [
      'Innovative proprietary technology, intellectual property (IP), or novel process',
      'Technology Readiness Level (TRL) between 3 and 7',
      'Clear commercialization pathway and demonstrable market need',
      'South African registered Pty Ltd or university spin-out'
    ],
    keyBenefits: [
      'Covers prototype refinement, certification, testing, and pilot trials',
      'Non-dilutive grant capital with no equity stake taken',
      'Access to partner university labs, science parks, and specialist mentorship'
    ],
    applicationMethod: 'Channelled through designated TIA partner institutions (universities, regional innovation hubs, and tech incubators).',
    turnaroundTime: '12 to 20 weeks',
    isYouthTargeted: false,
    isTechInnovation: true,
    officialUrl: 'https://www.tia.org.za',
    portalName: 'TIA Funding Portal'
  },
  {
    id: 'sedfa_merged',
    name: 'SEDFA Asset & Working Capital Finance',
    agency: 'SEDFA',
    category: 'Blended Capital',
    fundingRange: 'R50,000 - R15,000,000',
    targetAudience: 'SMEs, township enterprises, cooperatives, and rural businesses seeking asset finance.',
    eligibility: [
      'Merged entity combining SEDA, SEFA, and CBDA (operationalized Oct 2024)',
      'South African majority-owned enterprise (Pty Ltd or registered Cooperative)',
      'Commercially viable business plan with verified cash-flow projections',
      'Clear job creation impact in local communities'
    ],
    keyBenefits: [
      'Term loans, asset finance, revolving credit, and bridging finance at below-prime rates',
      'Township and Rural Entrepreneurship Programme (TREP) micro-grants',
      'Access to nationwide SEDFA incubation and quality enhancement centers'
    ],
    applicationMethod: 'Submit through the unified SEDFA portal (sedfa.org.za) or regional enterprise centers.',
    turnaroundTime: '6 to 10 weeks',
    isYouthTargeted: false,
    isTechInnovation: false,
    officialUrl: 'https://sedfa.org.za',
    portalName: 'SEDFA Official Portal'
  },
  {
    id: 'dtic_cost_sharing',
    name: 'dtic & DSBD Cost-Sharing Grants (BBSDP / SPII)',
    agency: 'dtic',
    category: 'Cost-Sharing',
    fundingRange: '50% to 80% of project costs (up to R1,000,000+)',
    targetAudience: 'Established small businesses with minimum 12-month trading track record.',
    eligibility: [
      'Minimum 12 consecutive months of verified trading bank statements',
      'Majority South African ownership (>51% black-owned for BBSDP)',
      'Compliant SARS TCS PIN and valid B-BBEE affidavit',
      'Business must contribute 20% to 50% matching co-funding'
    ],
    keyBenefits: [
      'Government funds up to 80% of tooling, industrial equipment, and enterprise IT',
      'Subsidizes ISO certification, quality testing, and export readiness',
      'Non-repayable once approved milestones are audited'
    ],
    applicationMethod: 'Direct submission to Department of Trade, Industry and Competition (the dtic) or DSBD.',
    turnaroundTime: '12 to 24 weeks',
    isYouthTargeted: false,
    isTechInnovation: false,
    officialUrl: 'https://www.thedtic.gov.za/financial-and-non-financial-support/incentives/',
    portalName: 'dtic Incentives Portal'
  },
  {
    id: 'seta_learnership',
    name: 'SETA Learnership Subsidies & Grants',
    agency: 'SETA',
    category: 'Learnership',
    fundingRange: 'Fully funded tuition + R3,500 - R6,000/mo learner stipends',
    targetAudience: 'Employers willing to host 18-35 year-old learners for 12-month work-based training.',
    eligibility: [
      'Employer registered with relevant SETA (e.g. MICT SETA, Services SETA, W&R SETA)',
      'Workplace skills plan (WSP) and Annual Training Report (ATR) submitted if SDL-payer',
      'Accredited training provider partnership'
    ],
    keyBenefits: [
      'Covers 100% of accredited training costs and learner monthly stipends',
      'Section 12H Income Tax allowance: up to R80,000 tax deduction per completed learner',
      'Massive boost on B-BBEE Skills Development scorecard element'
    ],
    applicationMethod: 'Apply during annual SETA Discretionary Grant funding windows via your sector SETA.',
    turnaroundTime: 'Annual application cycle',
    isYouthTargeted: true,
    isTechInnovation: false,
    officialUrl: 'https://www.dhet.gov.za',
    portalName: 'DHET SETA Directory'
  },
  {
    id: 'yes_programme',
    name: 'Youth Employment Service (YES) 12-Month Initiative',
    agency: 'YES',
    category: 'Learnership',
    fundingRange: 'B-BBEE Scorecard Boost (1 to 2 Levels Up)',
    targetAudience: 'Businesses sponsoring 12-month quality workplace experiences for unemployed youth.',
    eligibility: [
      'Commitment to sponsor youth for 12 months with minimum national wage stipend',
      'Workplaces can host internally or sponsor youth into community impact partners',
      'Registration with YES 4 Youth non-profit initiative'
    ],
    keyBenefits: [
      'Move up 1 full B-BBEE contributor level (or 2 levels if meeting target + 2.5% absorption)',
      'Substantial competitive edge for public tenders and corporate procurement',
      'Youth gain certified smartphone work portfolio and verified work reference'
    ],
    applicationMethod: 'Register online at yes4youth.co.za.',
    turnaroundTime: '2 to 4 weeks setup',
    isYouthTargeted: true,
    isTechInnovation: false,
    officialUrl: 'https://yes4youth.co.za',
    portalName: 'YES 4 Youth Portal'
  }
];

export const PREREQUISITES: PrerequisiteItem[] = [
  {
    id: 'cor14_3',
    title: 'CIPC Registration Certificate (CoR14.3)',
    issuer: 'Companies & Intellectual Property Commission (CIPC)',
    importance: 'Critical',
    description: 'The primary legal birth certificate of your private company showing enterprise number, incorporation date, and registered address.',
    howToObtain: 'Issued automatically via BizPortal upon company registration, or retrieved via CIPC e-Services disclosure.',
    estimatedCost: 'Included in registration (or R30 reprint)',
    turnaroundTime: 'Instant download',
    officialUrl: 'https://bizportal.gov.za',
    linkText: 'Download on BizPortal'
  },
  {
    id: 'sars_tcs',
    title: 'Valid SARS Tax Compliance Status (TCS) PIN',
    issuer: 'South African Revenue Service (SARS)',
    importance: 'Critical',
    description: 'An active, unexpired 8-character PIN issued by SARS proving all tax returns are up to date and no unmanaged debt exists.',
    howToObtain: 'Request via SARS eFiling under "Tax Compliance Status" menu once Public Officer is verified and all returns are filed.',
    estimatedCost: 'Free',
    turnaroundTime: 'Instant on eFiling if compliant',
    officialUrl: 'https://sarsefiling.co.za',
    linkText: 'Request on SARS eFiling'
  },
  {
    id: 'bbee_affidavit',
    title: 'Sworn B-BBEE EME Affidavit',
    issuer: 'Commissioner of Oaths (using official DTIC template)',
    importance: 'Critical',
    description: 'For businesses with annual turnover under R10,000,000 (Exempted Micro Enterprise). Valid for 12 months and confirms black ownership percentage.',
    howToObtain: 'Complete the official DTIC sworn affidavit template and sign before a Commissioner of Oaths (Police Station, Post Office, Bank Manager, or Attorney).',
    estimatedCost: 'Free (or nominal R0 - R50)',
    turnaroundTime: 'Same day',
    officialUrl: 'https://www.thedtic.gov.za/economic-empowerment/b-bbee/b-bbee-templates/',
    linkText: 'DTIC Official Templates'
  },
  {
    id: 'bank_statements',
    title: 'Stamped Business Bank Statements (3 to 6 Months)',
    issuer: 'Commercial Bank (FNB, Standard Bank, Nedbank, Absa, Capitec)',
    importance: 'Critical',
    description: 'Original stamped bank statements in the official legal registered company name showing genuine transactions, cash flow velocity, and healthy balances.',
    howToObtain: 'Download stamped statements from online banking app or request stamped copies at any branch.',
    estimatedCost: 'Free online / minimal branch fee',
    turnaroundTime: 'Instant',
    officialUrl: 'https://bizportal.gov.za',
    linkText: 'Link Bank on BizPortal'
  },
  {
    id: 'business_plan',
    title: 'Detailed Business Plan & 3-Year Financial Projections',
    issuer: 'Prepared by Founder / Financial Advisor',
    importance: 'Critical',
    description: 'Comprehensive dossier covering executive summary, market validation, competitor analysis, operational breakdown, and monthly cash-flow forecasts.',
    howToObtain: 'Develop using structured financial models. Must demonstrate revenue assumptions, unit economics, and repayment capacity if loan/grant.',
    estimatedCost: 'Self-prepared or R3,000 - R15,000 professional advisory',
    turnaroundTime: '1 to 3 weeks',
    officialUrl: 'https://sedfa.org.za',
    linkText: 'SEDFA Business Plan Guide'
  },
  {
    id: 'beneficial_ownership',
    title: 'CIPC Beneficial Ownership Register Filing',
    issuer: 'CIPC Portal',
    importance: 'High',
    description: 'South African anti-money laundering legislation requires every company to file a register disclosing natural persons who hold 5% or more direct or indirect beneficial ownership.',
    howToObtain: 'Log into CIPC e-Services or BizPortal, submit shareholder certificates, share register, and ID copies of ultimate beneficial owners.',
    estimatedCost: 'Free',
    turnaroundTime: '1 to 2 working days',
    officialUrl: 'https://eservices.cipc.co.za',
    linkText: 'File on CIPC e-Services'
  },
  {
    id: 'director_fica',
    title: 'Certified Director IDs & Proof of Address (FICA)',
    issuer: 'Commissioner of Oaths / Utility Provider',
    importance: 'High',
    description: 'Clear copies of green barcoded ID book or smart ID cards for all directors, certified within the last 3 calendar months, plus municipal utility bill or lease.',
    howToObtain: 'Visit nearest SAPS police station or bank manager with original ID cards; attach utility bill less than 3 months old.',
    estimatedCost: 'Free',
    turnaroundTime: 'Same day',
    officialUrl: 'https://www.saps.gov.za',
    linkText: 'Find Nearest SAPS Station'
  },
  {
    id: 'coida_good_standing',
    title: 'COIDA Letter of Good Standing',
    issuer: 'Compensation Fund (Dept of Employment & Labour)',
    importance: 'High',
    description: 'Mandatory if employing staff. Protects employers against employee claims for workplace injuries or occupational illnesses.',
    howToObtain: 'Register with Compensation Fund via CompEasy online portal, submit annual Return of Earnings (W.As.8), and pay assessment fee.',
    estimatedCost: 'Based on annual payroll % (assessment fee)',
    turnaroundTime: '3 to 10 days',
    officialUrl: 'https://compeasy.labour.gov.za',
    linkText: 'CompEasy Online Portal'
  },
  {
    id: 'csd_registration',
    title: 'Central Supplier Database (CSD) MAAA Number',
    issuer: 'National Treasury',
    importance: 'Recommended',
    description: 'Mandatory supplier database for doing business with South African government departments, municipalities, SOEs, and accessing certain public grants.',
    howToObtain: 'Register online at csd.gov.za with CIPC enterprise number, SARS tax pin, and bank details.',
    estimatedCost: 'Free',
    turnaroundTime: '1 to 3 days',
    officialUrl: 'https://secure.csd.gov.za',
    linkText: 'Register on National CSD'
  }
];

export const TECH_HUBS_LIST = [
  {
    name: 'Softstart BTI',
    location: 'Midrand, Gauteng',
    focus: 'ICT, software development, SaaS, and electronics hardware',
    offerings: 'Incubation, seed grant facilitation, rapid prototyping labs, export mentorship.',
    url: 'https://softstartbti.co.za'
  },
  {
    name: 'Tshimologong Digital Precinct',
    location: 'Braamfontein, Johannesburg',
    focus: 'Digital tech, gaming, VR/AR, fintech, and creative technology',
    offerings: 'Wits University affiliated incubator, accelerator cohorts, investor demo days.',
    url: 'https://tshimologong.joburg'
  },
  {
    name: 'mLab South Africa',
    location: 'Tshwane, Polokwane, Kimberley & nationwide',
    focus: 'Mobile apps, digital skills, IoT, and youth tech entrepreneurship',
    offerings: 'Coders academy, product acceleration, start-up grants and investor pitching.',
    url: 'https://mlab.co.za'
  },
  {
    name: 'Silicon Cape Initiative',
    location: 'Western Cape',
    focus: 'Tech startup ecosystem, venture capital, high-growth scaleups',
    offerings: 'Ecosystem networking, venture angel connections, international trade missions.',
    url: 'https://siliconcape.com'
  },
  {
    name: 'Cortex Hub',
    location: 'East London, Eastern Cape',
    focus: 'Software, telematics, and rural/township tech innovation',
    offerings: 'Workspace, seed capital facilitation, software engineering mentorship.',
    url: 'https://thecortexhub.com'
  }
];

export const CIPC_FAST_TRACK_LINKS = [
  {
    title: 'BizPortal Registration Portal',
    desc: 'Register a new (Pty) Ltd online with instant CoR14.3 issuance and automated SARS tax number.',
    url: 'https://bizportal.gov.za',
    label: 'Open BizPortal',
    isPrimary: true
  },
  {
    title: 'CIPC e-Services Gateway',
    desc: 'Full statutory portal for director changes, disclosures, MOI amendments, and enterprise search.',
    url: 'https://eservices.cipc.co.za',
    label: 'Open CIPC e-Services'
  },
  {
    title: 'Annual Returns Filing Portal',
    desc: 'Mandatory annual compliance filing to keep your company active and prevent deregistration.',
    url: 'https://annualreturns.cipc.co.za',
    label: 'File Annual Returns'
  },
  {
    title: 'Beneficial Ownership Register',
    desc: 'Submit beneficial ownership declarations for natural persons with 5%+ interest (AML compliance).',
    url: 'https://eservices.cipc.co.za',
    label: 'Submit Beneficial Ownership'
  },
  {
    title: 'Company Name Search & Reservation',
    desc: 'Verify if your desired company name is already registered before paying the R50 fee.',
    url: 'https://bizportal.gov.za/company_registration.aspx',
    label: 'Search Company Names'
  },
  {
    title: 'CIPC Certificate Verification (CoR14.3)',
    desc: 'Verify the authenticity and trading status of any South African registered entity.',
    url: 'https://www.cipc.co.za',
    label: 'Verify Certificate'
  }
];
