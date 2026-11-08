import React from 'react';
import { ExternalLink, Shield } from 'lucide-react';

interface FooterProps {
  onNavigatePage: (page: 'home' | 'about' | 'contact' | 'privacy') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigatePage }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <div className="w-6 h-6 rounded bg-emerald-600 flex items-center justify-center text-xs font-extrabold">
                IB
              </div>
              <span>Ispani Biz Hub · MaruB Creations</span>
            </div>
            <p className="text-slate-400 max-w-md leading-relaxed text-xs">
              Empowering South African entrepreneurs, emerging startups, and established SMEs with direct statutory roadmaps across CIPC BizPortal registration, SARS tax compliance, merged SEDFA initiatives, and government capital grants.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs">
              <button
                onClick={() => { onNavigatePage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="text-slate-300 hover:text-white transition-colors"
              >
                Home
              </button>
              <span className="text-slate-700">·</span>
              <button
                onClick={() => { onNavigatePage('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="text-slate-300 hover:text-white transition-colors"
              >
                About Us
              </button>
              <span className="text-slate-700">·</span>
              <button
                onClick={() => { onNavigatePage('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="text-slate-300 hover:text-white transition-colors"
              >
                Contact
              </button>
              <span className="text-slate-700">·</span>
              <button
                onClick={() => { onNavigatePage('privacy'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="text-slate-300 hover:text-white transition-colors"
              >
                Privacy Policy
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-xs mb-3">Official SA Portals</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://bizportal.gov.za"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1"
                >
                  <span>CIPC BizPortal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://sarsefiling.co.za"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1"
                >
                  <span>SARS eFiling</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://sedfa.org.za"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1"
                >
                  <span>SEDFA Agency Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://erp.nyda.gov.za"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1"
                >
                  <span>NYDA ERP Grants</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-xs mb-3">National Registries</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://secure.csd.gov.za"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1"
                >
                  <span>Treasury CSD Supplier Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.thedtic.gov.za"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1"
                >
                  <span>Department of Trade & Industry</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://yes4youth.co.za"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1"
                >
                  <span>YES 4 Youth Initiative</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            &copy; 2026 MaruB Creations. All rights reserved. Ispani Biz Hub is an informational educational resource.
          </div>
          <div className="text-center sm:text-right max-w-md">
            Disclaimer: This platform provides regulatory roadmaps and educational guidance. Always verify official statutory requirements directly with CIPC, SARS, or a registered Chartered Accountant.
          </div>
        </div>
      </div>
    </footer>
  );
};
