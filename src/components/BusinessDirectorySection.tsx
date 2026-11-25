import React, { useState, useEffect, useMemo } from 'react';
import {
  Building2,
  Search,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  PlusCircle,
  MessageCircle,
  Mail,
  Globe,
  X,
  ArrowRight,
  ArrowLeft,
  Lock,
  Loader2,
  RefreshCw,
  Filter,
  Sparkles
} from 'lucide-react';

// Replace with your deployed Google Apps Script Web App URL
export const SCRIPT_URL = 'PASTE_YOUR_WEB_APP_URL_HERE';

export type SAProvince =
  | 'Eastern Cape'
  | 'Free State'
  | 'Gauteng'
  | 'KwaZulu-Natal'
  | 'Limpopo'
  | 'Mpumalanga'
  | 'Northern Cape'
  | 'North West'
  | 'Western Cape';

export type RegistrationStatus = 'CIPC Registered' | 'Sole Proprietor / Informal';

export interface DirectoryBusiness {
  id: string;
  businessName: string;
  category: string;
  province: SAProvince | string;
  city: string;
  shortDescription: string;
  publicWhatsApp: string;
  publicEmail: string;
  websiteOrSocialUrl?: string;
  registrationStatus: RegistrationStatus | string;
  isCipcVerified: boolean;
  verified?: boolean;
  status?: string;
}

export interface BusinessSubmissionFormData {
  businessName: string;
  category: string;
  province: SAProvince | '';
  city: string;
  shortDescription: string;
  ownerFullName: string;
  publicWhatsApp: string;
  publicEmail: string;
  websiteOrSocialUrl: string;
  registrationStatus: RegistrationStatus;
  cipcRegNumber: string;
  popiaConsent: boolean;
  faxNumber: string; // Honeypot field for spam protection
}

export const SA_PROVINCES: SAProvince[] = [
  'Eastern Cape',
  'Free State',
  'Gauteng',
  'KwaZulu-Natal',
  'Limpopo',
  'Mpumalanga',
  'Northern Cape',
  'North West',
  'Western Cape'
];

export const BUSINESS_CATEGORIES: string[] = [
  'Retail & E-Commerce',
  'Construction & Trades',
  'Agriculture & Agro-Processing',
  'Automotive & Logistics',
  'Catering, Food & Hospitality',
  'Creative, Media & Digital Marketing',
  'IT, Software & Tech Support',
  'Manufacturing & Industrial',
  'Professional, Accounting & Legal Services',
  'Other Services'
];

const FALLBACK_VERIFIED_BUSINESSES: DirectoryBusiness[] = [
  {
    id: 'marub-creations',
    businessName: 'MaruB Creations',
    category: 'Retail & E-Commerce',
    province: 'Western Cape',
    city: 'Cape Town',
    shortDescription:
      'Custom corporate gifts, personalized sublimation merchandise, MaruB Connect digital business cards, and VitaTag-SA emergency tags. Delivering nationwide.',
    publicWhatsApp: '082 400 7223',
    publicEmail: 'lerato@marubcreations.co.za',
    registrationStatus: 'CIPC Registered',
    isCipcVerified: true,
    verified: true,
    status: 'Verified'
  },
  {
    id: 'io-electrical-consultant-services',
    businessName: 'IO Electrical and Consultant Services',
    category: 'Construction & Trades',
    province: 'Gauteng',
    city: 'Johannesburg',
    shortDescription:
      '24/7 emergency electrical breakdown support, PLC/SCADA troubleshooting, rapid COC issuance, and distribution board & panel building for commercial and industrial facilities.',
    publicWhatsApp: '081 311 5237',
    publicEmail: 'info@ioelectrical.co.za',
    registrationStatus: 'CIPC Registered',
    isCipcVerified: true,
    verified: true,
    status: 'Verified'
  }
];

/**
 * Formats a South African phone number (e.g. "082 400 7223" -> "27824007223")
 * for Click-to-WhatsApp (wa.me) links.
 */
export function formatSaWhatsAppNumber(rawPhone: string): string {
  const digits = (rawPhone || '').replace(/\D/g, '');
  if (!digits) return '';
  if (digits.startsWith('0') && digits.length === 10) {
    return `27${digits.slice(1)}`;
  }
  if (digits.startsWith('27')) {
    return digits;
  }
  if (digits.length === 9) {
    return `27${digits}`;
  }
  return digits;
}

function normalizeBusinessRecord(raw: Record<string, unknown>, idx: number): DirectoryBusiness | null {
  const businessName = String(raw.businessName || raw.name || '').trim();
  if (!businessName) return null;

  // Strict Sheet-to-Live Verification check: ONLY rows marked Verified in the Google Sheet appear online
  const statusStr = String(raw.status ?? '').trim().toLowerCase();
  const verifiedVal = raw.verified;
  const isMarkedVerified =
    statusStr === 'verified' ||
    verifiedVal === true ||
    String(verifiedVal ?? '').trim().toLowerCase() === 'true' ||
    String(verifiedVal ?? '').trim().toLowerCase() === 'verified' ||
    String(verifiedVal ?? '').trim().toLowerCase() === 'yes';

  if (!isMarkedVerified) {
    return null;
  }

  const isCipcVerified =
    raw.isCipcVerified === true ||
    String(raw.isCipcVerified).toLowerCase() === 'true' ||
    String(raw.isCipcVerified).toLowerCase() === 'yes';

  const rawWebsite = raw.websiteOrSocialUrl ? String(raw.websiteOrSocialUrl).trim() : '';

  return {
    id: String(raw.id || `biz-${idx}-${businessName.toLowerCase().replace(/\s+/g, '-')}`),
    businessName,
    category: String(raw.category || 'Other Services').trim(),
    province: String(raw.province || 'Gauteng').trim(),
    city: String(raw.city || '').trim(),
    shortDescription: String(raw.shortDescription || '').trim(),
    publicWhatsApp: String(raw.publicWhatsApp || '').trim(),
    publicEmail: String(raw.publicEmail || '').trim(),
    websiteOrSocialUrl: rawWebsite.length > 0 ? rawWebsite : undefined,
    registrationStatus: String(
      raw.registrationStatus || (isCipcVerified ? 'CIPC Registered' : 'Sole Proprietor / Informal')
    ),
    isCipcVerified,
    verified: true,
    status: 'Verified'
  };
}

const INITIAL_FORM_STATE: BusinessSubmissionFormData = {
  businessName: '',
  category: BUSINESS_CATEGORIES[0],
  province: 'Gauteng',
  city: '',
  shortDescription: '',
  ownerFullName: '',
  publicWhatsApp: '',
  publicEmail: '',
  websiteOrSocialUrl: '',
  registrationStatus: 'CIPC Registered',
  cipcRegNumber: '',
  popiaConsent: false,
  faxNumber: ''
};

export const BusinessDirectorySection: React.FC = () => {
  const [businesses, setBusinesses] = useState<DirectoryBusiness[]>(FALLBACK_VERIFIED_BUSINESSES);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProvince, setSelectedProvince] = useState<string>('All');

  // Modal & 2-Step Form State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formStep, setFormStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState<BusinessSubmissionFormData>(INITIAL_FORM_STATE);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState<boolean>(false);

  const fetchVerifiedBusinesses = async () => {
    setIsLoading(true);
    try {
      if (SCRIPT_URL && SCRIPT_URL.startsWith('http')) {
        const response = await fetch(SCRIPT_URL, { method: 'GET' });
        if (response.ok) {
          const data = await response.json();
          const rawList: Record<string, unknown>[] = Array.isArray(data?.businesses)
            ? data.businesses
            : Array.isArray(data)
            ? data
            : [];
          const normalized = rawList
            .map((item, idx) => normalizeBusinessRecord(item, idx))
            .filter((item): item is DirectoryBusiness => item !== null);

          setBusinesses(normalized);
        }
      }
    } catch {
      // Keep the two verified seed listings until live Google Sheet Web App URL is connected
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVerifiedBusinesses();
  }, []);

  const filteredBusinesses = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return businesses.filter((biz) => {
      const matchesCategory =
        selectedCategory === 'All' || biz.category === selectedCategory;
      const matchesProvince =
        selectedProvince === 'All' || biz.province === selectedProvince;
      const matchesSearch =
        !q ||
        biz.businessName.toLowerCase().includes(q) ||
        biz.shortDescription.toLowerCase().includes(q) ||
        biz.city.toLowerCase().includes(q) ||
        biz.category.toLowerCase().includes(q) ||
        biz.province.toLowerCase().includes(q);

      return matchesCategory && matchesProvince && matchesSearch;
    });
  }, [businesses, searchQuery, selectedCategory, selectedProvince]);

  const openListingModal = () => {
    setFormData(INITIAL_FORM_STATE);
    setFormStep(1);
    setFormError(null);
    setIsSubmittedSuccess(false);
    setIsModalOpen(true);
  };

  const closeListingModal = () => {
    if (isSubmitting) return;
    setIsModalOpen(false);
  };

  const handleStep1Next = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!formData.businessName.trim()) {
      setFormError('Please enter your trading or registered business name.');
      return;
    }
    if (!formData.category) {
      setFormError('Please select a business category.');
      return;
    }
    if (!formData.province) {
      setFormError('Please select your South African province.');
      return;
    }
    if (!formData.city.trim()) {
      setFormError('Please enter your city or town.');
      return;
    }
    if (!formData.shortDescription.trim()) {
      setFormError('Please provide a brief description of your products or services.');
      return;
    }
    if (formData.shortDescription.length > 200) {
      setFormError('Short description must be 200 characters or fewer.');
      return;
    }

    setFormStep(2);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Spam Honeypot check: if hidden faxNumber is populated, silently show confirmation
    if (formData.faxNumber.trim() !== '') {
      setIsSubmittedSuccess(true);
      return;
    }

    if (!formData.ownerFullName.trim()) {
      setFormError('Please enter the business owner’s full name (kept strictly private).');
      return;
    }
    if (!formData.publicWhatsApp.trim()) {
      setFormError('Please enter a public WhatsApp number for customer enquiries.');
      return;
    }
    if (!formData.publicEmail.trim()) {
      setFormError('Please enter a public business email address.');
      return;
    }
    if (
      formData.registrationStatus === 'CIPC Registered' &&
      !formData.cipcRegNumber.trim()
    ) {
      setFormError('Please provide your CIPC Registration Number for verification (kept private).');
      return;
    }
    if (!formData.popiaConsent) {
      setFormError('Please accept the mandatory POPIA verification consent to proceed.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        websiteOrSocialUrl: formData.websiteOrSocialUrl.trim(),
        cipcRegNumber:
          formData.registrationStatus === 'CIPC Registered'
            ? formData.cipcRegNumber.trim()
            : '',
        formattedWhatsApp: formatSaWhatsAppNumber(formData.publicWhatsApp),
        status: 'Pending',
        submittedAt: new Date().toISOString()
      };

      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      setIsSubmittedSuccess(true);
    } catch {
      // With mode: 'no-cors', opaque responses resolve or if placeholder URL fails in dev, still transition cleanly
      setIsSubmittedSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="directory"
      className="py-12 lg:py-16 bg-[#070B28] text-white border-b-2 border-[#15806B] transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 pb-6 border-b border-[#15806B]/50">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAB308]/15 border border-[#EAB308]/40 text-[#EAB308] text-xs font-extrabold tracking-wide">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Vetted SA SMME Marketplace</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
              iSpani Verified SA Business Directory
            </h2>

            <p className="text-xs sm:text-sm text-slate-200 max-w-2xl leading-relaxed">
              Discover and connect directly with vetted South African SMMEs, suppliers, and service providers via WhatsApp. Every listed business undergoes manual CIPC or trade vetting before publication.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={openListingModal}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#EAB308] hover:bg-[#facc15] text-[#070B28] text-xs sm:text-sm font-extrabold shadow-md transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 stroke-[2.5]" />
              <span>List Your Business</span>
            </button>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0D133D] border border-slate-800 space-y-4 no-print">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search businesses by name, service, or city (e.g., Solar, Catering, Johannesburg)..."
                className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-[#070B28] border border-slate-700 focus:border-[#EAB308] text-xs sm:text-sm text-white placeholder:text-slate-400 focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                aria-label="Filter by Business Category"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#070B28] border border-slate-700 focus:border-[#EAB308] text-xs sm:text-sm text-white focus:outline-none cursor-pointer"
              >
                <option value="All">All Categories</option>
                {BUSINESS_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Province Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
                aria-label="Filter by South African Province"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#070B28] border border-slate-700 focus:border-[#EAB308] text-xs sm:text-sm text-white focus:outline-none cursor-pointer"
              >
                <option value="All">All 9 SA Provinces</option>
                {SA_PROVINCES.map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-[#EAB308]" />
              <span>
                Showing <strong className="text-white">{filteredBusinesses.length}</strong> verified{' '}
                {filteredBusinesses.length === 1 ? 'business' : 'businesses'}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {(searchQuery || selectedCategory !== 'All' || selectedProvince !== 'All') && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                    setSelectedProvince('All');
                  }}
                  className="text-xs font-bold text-[#EAB308] hover:underline cursor-pointer"
                >
                  Reset Filters
                </button>
              )}

              <button
                type="button"
                onClick={fetchVerifiedBusinesses}
                disabled={isLoading}
                className="inline-flex items-center gap-1 text-xs text-slate-300 hover:text-[#EAB308] transition-colors cursor-pointer"
                title="Refresh directory"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-[#EAB308]' : ''}`} />
                <span>{isLoading ? 'Syncing...' : 'Refresh'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Directory Business Cards Grid */}
        {filteredBusinesses.length === 0 ? (
          <div className="p-10 rounded-2xl bg-[#0D133D] border border-slate-800 text-center space-y-3">
            <Building2 className="w-8 h-8 text-[#EAB308] mx-auto" />
            <h3 className="text-base font-bold text-white">
              No verified businesses match your current filter
            </h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              Try clearing your search or selecting &ldquo;All Categories&rdquo; and &ldquo;All 9 SA Provinces&rdquo; — or be the first to list your business in this sector!
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setSelectedProvince('All');
                }}
                className="px-4 py-2 rounded-xl bg-[#070B28] hover:bg-slate-900 border border-slate-700 text-white text-xs font-bold cursor-pointer"
              >
                Clear Filters
              </button>
              <button
                type="button"
                onClick={openListingModal}
                className="px-4 py-2 rounded-xl bg-[#EAB308] hover:bg-[#facc15] text-[#070B28] text-xs font-extrabold cursor-pointer"
              >
                + List Your Business
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
            {filteredBusinesses.map((biz) => {
              const formattedWa = formatSaWhatsAppNumber(biz.publicWhatsApp);
              const waHref = formattedWa
                ? `https://wa.me/${formattedWa}?text=${encodeURIComponent(
                    `Hi ${biz.businessName}, I found your verified business profile on the iSpani BizHub Directory and would like to enquire.`
                  )}`
                : undefined;

              return (
                <article
                  key={biz.id}
                  className="rounded-2xl bg-[#0D133D] border border-slate-800 hover:border-[#EAB308]/80 p-5 sm:p-6 flex flex-col justify-between gap-4 transition-all shadow-lg"
                >
                  <div className="space-y-3">
                    {/* Top Badges Row */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      {biz.isCipcVerified ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#15806B]/25 border border-[#15806B] text-emerald-200 text-xs font-extrabold">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                          <span>CIPC Verified</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EAB308]/15 border border-[#EAB308]/40 text-[#EAB308] text-xs font-extrabold">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#EAB308] shrink-0" />
                          <span>Vetted</span>
                        </span>
                      )}

                      <span className="px-2.5 py-1 rounded-lg bg-[#070B28] border border-slate-800 text-xs font-semibold text-slate-200">
                        {biz.category}
                      </span>
                    </div>

                    {/* Business Name & Location */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                        {biz.businessName}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-[#EAB308] font-semibold mt-1">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span>
                          {biz.city ? `${biz.city}, ` : ''}
                          {biz.province}
                        </span>
                      </div>
                    </div>

                    {/* Short Description */}
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {biz.shortDescription}
                    </p>
                  </div>

                  {/* Bottom Contact Action Bar */}
                  <div className="pt-4 border-t border-[#15806B]/40 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      {waHref && (
                        <a
                          href={waHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#15806B] hover:bg-[#116957] text-white text-xs font-extrabold shadow-xs transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>
                      )}

                      {biz.publicEmail && (
                        <a
                          href={`mailto:${biz.publicEmail}?subject=${encodeURIComponent(
                            `Enquiry via iSpani BizHub Directory – ${biz.businessName}`
                          )}`}
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#070B28] hover:bg-slate-900 text-slate-200 border border-slate-700 text-xs font-bold transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5 text-[#EAB308]" />
                          <span>Email</span>
                        </a>
                      )}
                    </div>

                    {biz.websiteOrSocialUrl && biz.websiteOrSocialUrl.trim().length > 0 && (
                      <a
                        href={
                          biz.websiteOrSocialUrl.trim().startsWith('http')
                            ? biz.websiteOrSocialUrl.trim()
                            : `https://${biz.websiteOrSocialUrl.trim()}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#070B28] hover:bg-slate-900 text-[#EAB308] border border-slate-700 text-xs font-bold transition-colors"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        <span>Website</span>
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* 2-Step "List Your Business" Mobile-Friendly Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto no-print"
          role="dialog"
          aria-modal="true"
          aria-labelledby="list-business-modal-title"
        >
          <div className="relative w-full max-w-xl rounded-2xl bg-[#0D133D] border border-slate-700 shadow-2xl overflow-hidden my-8">
            {/* Modal Header */}
            <div className="bg-[#070B28] px-5 py-4 border-b-2 border-[#15806B] flex items-center justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#EAB308]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Free SMME Directory Listing</span>
                </div>
                <h3
                  id="list-business-modal-title"
                  className="text-base sm:text-lg font-extrabold text-white"
                >
                  {isSubmittedSuccess
                    ? 'Submission Received'
                    : `List Your Business · Step ${formStep} of 2`}
                </h3>
              </div>

              <button
                type="button"
                onClick={closeListingModal}
                aria-label="Close modal"
                className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-[#0D133D] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Step Progress Indicator */}
            {!isSubmittedSuccess && (
              <div className="px-5 pt-4">
                <div className="grid grid-cols-2 gap-2">
                  <div
                    className={`h-1.5 rounded-full transition-colors ${
                      formStep >= 1 ? 'bg-[#EAB308]' : 'bg-slate-800'
                    }`}
                  />
                  <div
                    className={`h-1.5 rounded-full transition-colors ${
                      formStep === 2 ? 'bg-[#EAB308]' : 'bg-slate-800'
                    }`}
                  />
                </div>
                <div className="flex justify-between text-[11px] font-semibold text-slate-300 mt-1.5">
                  <span className={formStep === 1 ? 'text-[#EAB308] font-bold' : ''}>
                    1. Public Business Profile
                  </span>
                  <span className={formStep === 2 ? 'text-[#EAB308] font-bold' : ''}>
                    2. Contact &amp; CIPC Verification
                  </span>
                </div>
              </div>
            )}

            {/* Modal Body */}
            <div className="p-5 sm:p-6">
              {isSubmittedSuccess ? (
                <div className="py-6 text-center space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#15806B]/25 border border-[#15806B] text-emerald-300 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-1.5">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#EAB308]/15 border border-[#EAB308]/40 text-[#EAB308] text-xs font-extrabold">
                      Pending Verification
                    </span>
                    <h4 className="text-xl font-extrabold text-white pt-1">
                      Thank you for listing {formData.businessName}!
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-200 max-w-md mx-auto leading-relaxed">
                      Submitted! Your business has been sent to our verification sheet. Once our team verifies your details, it will go live on the directory automatically.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#070B28] border border-slate-800 text-left text-xs text-slate-200 space-y-1 max-w-md mx-auto">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Business:</span>
                      <span className="font-bold text-white">{formData.businessName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Location:</span>
                      <span className="font-semibold text-slate-200">
                        {formData.city}, {formData.province}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Status:</span>
                      <span className="font-semibold text-[#EAB308]">
                        {formData.registrationStatus}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={closeListingModal}
                      className="px-6 py-2.5 rounded-xl bg-[#EAB308] hover:bg-[#facc15] text-[#070B28] text-xs font-extrabold cursor-pointer"
                    >
                      Done &amp; Return to Directory
                    </button>
                  </div>
                </div>
              ) : formStep === 1 ? (
                <form onSubmit={handleStep1Next} className="space-y-4">
                  {formError && (
                    <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-200 text-xs font-medium">
                      {formError}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-slate-200 mb-1.5">
                      Business / Trading Name <span className="text-[#EAB308]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.businessName}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, businessName: e.target.value }))
                      }
                      placeholder="e.g., Thabo Solar & Electrical (Pty) Ltd"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#070B28] border border-slate-700 focus:border-[#EAB308] text-xs sm:text-sm text-white focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-200 mb-1.5">
                        Industry Category <span className="text-[#EAB308]">*</span>
                      </label>
                      <select
                        required
                        value={formData.category}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, category: e.target.value }))
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#070B28] border border-slate-700 focus:border-[#EAB308] text-xs sm:text-sm text-white focus:outline-none"
                      >
                        {BUSINESS_CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-200 mb-1.5">
                        Province <span className="text-[#EAB308]">*</span>
                      </label>
                      <select
                        required
                        value={formData.province}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            province: e.target.value as SAProvince
                          }))
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#070B28] border border-slate-700 focus:border-[#EAB308] text-xs sm:text-sm text-white focus:outline-none"
                      >
                        {SA_PROVINCES.map((prov) => (
                          <option key={prov} value={prov}>
                            {prov}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-200 mb-1.5">
                      City / Town / Township <span className="text-[#EAB308]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, city: e.target.value }))
                      }
                      placeholder="e.g., Soweto, Midrand, Polokwane, Umlazi"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#070B28] border border-slate-700 focus:border-[#EAB308] text-xs sm:text-sm text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-bold text-slate-200">
                        Short Description of Services <span className="text-[#EAB308]">*</span>
                      </label>
                      <span
                        className={`text-[11px] font-mono ${
                          formData.shortDescription.length >= 190
                            ? 'text-[#EAB308] font-bold'
                            : 'text-slate-300'
                        }`}
                      >
                        {formData.shortDescription.length} / 200
                      </span>
                    </div>
                    <textarea
                      required
                      maxLength={200}
                      rows={3}
                      value={formData.shortDescription}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          shortDescription: e.target.value.slice(0, 200)
                        }))
                      }
                      placeholder="Briefly describe what you offer, your accreditations, and who you serve (max 200 chars)..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#070B28] border border-slate-700 focus:border-[#EAB308] text-xs sm:text-sm text-white focus:outline-none resize-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={closeListingModal}
                      className="px-4 py-2.5 rounded-xl bg-[#070B28] hover:bg-slate-900 border border-slate-700 text-xs font-bold text-slate-200 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#EAB308] hover:bg-[#facc15] text-[#070B28] text-xs font-extrabold cursor-pointer"
                    >
                      <span>Next: Verification Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {formError && (
                    <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-200 text-xs font-medium">
                      {formError}
                    </div>
                  )}

                  {/* Hidden Honeypot Input for Spam Protection */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="faxNumber">Fax Number (Do not fill)</label>
                    <input
                      id="faxNumber"
                      type="text"
                      name="faxNumber"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.faxNumber}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, faxNumber: e.target.value }))
                      }
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-bold text-slate-200">
                        Owner / Director Full Name <span className="text-[#EAB308]">*</span>
                      </label>
                      <span className="inline-flex items-center gap-1 text-[10px] text-emerald-300 font-semibold">
                        <Lock className="w-3 h-3" />
                        <span>Private · Never Public</span>
                      </span>
                    </div>
                    <input
                      type="text"
                      required
                      value={formData.ownerFullName}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, ownerFullName: e.target.value }))
                      }
                      placeholder="Full Name & Surname (for internal vetting only)"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#070B28] border border-slate-700 focus:border-[#EAB308] text-xs sm:text-sm text-white focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-200 mb-1.5">
                        Public WhatsApp Number <span className="text-[#EAB308]">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.publicWhatsApp}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, publicWhatsApp: e.target.value }))
                        }
                        placeholder="e.g., 082 123 4567"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#070B28] border border-slate-700 focus:border-[#EAB308] text-xs sm:text-sm text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-200 mb-1.5">
                        Public Business Email <span className="text-[#EAB308]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.publicEmail}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, publicEmail: e.target.value }))
                        }
                        placeholder="info@yourbusiness.co.za"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#070B28] border border-slate-700 focus:border-[#EAB308] text-xs sm:text-sm text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-200 mb-1.5">
                      Website or Social Media Link{' '}
                      <span className="text-slate-300 font-normal">
                        (Optional — leave blank if you don&apos;t have one)
                      </span>
                    </label>
                    <input
                      type="text"
                      value={formData.websiteOrSocialUrl}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          websiteOrSocialUrl: e.target.value
                        }))
                      }
                      placeholder="https://yourbusiness.co.za or facebook.com/yourbusiness"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#070B28] border border-slate-700 focus:border-[#EAB308] text-xs sm:text-sm text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-200 mb-1.5">
                      Registration Status <span className="text-[#EAB308]">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {(
                        ['CIPC Registered', 'Sole Proprietor / Informal'] as RegistrationStatus[]
                      ).map((statusOption) => {
                        const isSelected = formData.registrationStatus === statusOption;
                        return (
                          <button
                            key={statusOption}
                            type="button"
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                registrationStatus: statusOption
                              }))
                            }
                            className={`px-3.5 py-2.5 rounded-xl text-xs font-bold border text-left transition-all cursor-pointer flex items-center justify-between ${
                              isSelected
                                ? 'bg-[#EAB308]/15 border-[#EAB308] text-[#EAB308]'
                                : 'bg-[#070B28] border-slate-700 text-slate-200 hover:border-slate-600'
                            }`}
                          >
                            <span>{statusOption}</span>
                            {isSelected && <CheckCircle2 className="w-4 h-4 text-[#EAB308]" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Conditional CIPC Reg Number (Only shown if CIPC Registered) */}
                  {formData.registrationStatus === 'CIPC Registered' && (
                    <div className="p-3.5 rounded-xl bg-[#070B28]/90 border border-[#15806B] space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-bold text-emerald-300">
                          CIPC Enterprise Registration Number <span className="text-[#EAB308]">*</span>
                        </label>
                        <span className="inline-flex items-center gap-1 text-[10px] text-emerald-300 font-semibold">
                          <Lock className="w-3 h-3" />
                          <span>Private Verification Only</span>
                        </span>
                      </div>
                      <input
                        type="text"
                        required
                        value={formData.cipcRegNumber}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, cipcRegNumber: e.target.value }))
                        }
                        placeholder="e.g., 2024/123456/07"
                        className="w-full px-3.5 py-2 rounded-lg bg-[#0D133D] border border-slate-700 focus:border-[#15806B] text-xs sm:text-sm text-white font-mono focus:outline-none"
                      />
                      <p className="text-[11px] text-slate-300">
                        Used strictly to award your green &ldquo;CIPC Verified&rdquo; badge. Never displayed on your public card.
                      </p>
                    </div>
                  )}

                  {/* Mandatory POPIA Consent Checkbox */}
                  <label className="flex items-start gap-2.5 p-3 rounded-xl bg-[#070B28] border border-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={formData.popiaConsent}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, popiaConsent: e.target.checked }))
                      }
                      className="mt-0.5 w-4 h-4 accent-[#EAB308] rounded cursor-pointer"
                    />
                    <span className="text-[11px] text-slate-200 leading-relaxed">
                      <strong className="text-white">POPIA Verification Consent:</strong> I confirm that I am authorized to list this business on Ispani Biz Hub and consent to the public display of the business profile and contact channels above. Private owner and CIPC registration numbers are kept strictly confidential for verification.
                    </span>
                  </label>

                  <div className="pt-2 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => {
                        setFormError(null);
                        setFormStep(1);
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#070B28] hover:bg-slate-900 border border-slate-700 text-xs font-bold text-slate-200 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#EAB308] hover:bg-[#facc15] disabled:opacity-50 text-[#070B28] text-xs font-extrabold cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="w-4 h-4" />
                          <span>Submit for Verification</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BusinessDirectorySection;
