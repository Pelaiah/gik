import React from 'react';
import { NavigationTab } from '../types';

interface FooterProps {
  onSelectTab: (tab: NavigationTab) => void;
  onOpenConsultation: () => void;
  theme?: 'dark' | 'light';
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onOpenConsultation, theme = 'dark' }) => {
  const isDark = theme === 'dark';

  return (
    <footer className={`border-t py-16 text-xs transition-colors duration-300 ${
      isDark ? 'bg-black text-slate-400 border-white/10' : 'bg-slate-100 text-slate-600 border-slate-200'
    }`}>
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand & Purpose */}
          <div className="md:col-span-5 space-y-4">
            <button
              onClick={() => onSelectTab('overview')}
              className="text-xl font-bold tracking-tight text-white hover:text-cyan-400 transition-colors cursor-pointer text-left"
              style={{ fontFamily: 'var(--font-display, Syne, sans-serif)' }}
            >
              Gikspot
            </button>
            <p className="text-slate-400 leading-relaxed max-w-sm text-xs">
              Systems engineering firm delivering enterprise digital transformation, scalable SaaS architectures, AI predictive maintenance for manufacturing, certified hardware controllers, and future esports tournament technologies.
            </p>
            <div className="text-[11px] text-slate-500 space-y-1">
              <div>Facility &amp; R&amp;D Lab: 420 Innovation Parkway, Suite 800</div>
              <div>Direct Dispatch: logistics@gikspot.com · +1 (800) 445-7768</div>
            </div>
          </div>

          {/* Navigation Mirrors */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Systems &amp; Solutions
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectTab('services')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Enterprise Consultancy &amp; SaaS
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('predictive-ai')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  AI Industrial Predictive Maintenance
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('smart-iot')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Smart Home &amp; Facility IoT
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('estimator')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Architecture &amp; Runway Estimator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('gaming-future')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Esports Arena &amp; Competition Rigs
                </button>
              </li>
            </ul>
          </div>

          {/* Hardware & Procurement */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Vendor Store &amp; Hardware
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectTab('hardware-shop')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  DIN-Rail Industrial Controllers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('hardware-shop')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Tri-Axis Vibration &amp; Acoustic Nodes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('hardware-shop')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Matter &amp; Thread Building Gateways
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenConsultation}
                  className="hover:text-cyan-400 transition-colors text-cyan-300"
                >
                  Request B2B Wholesale Quote (Net 30)
                </button>
              </li>
            </ul>

            <div className="pt-2 text-[11px] text-slate-500 leading-normal">
              Compliance: ISO 27001 Certified · IEC 62443 Industrial Cybersecurity · Matter 1.3 Partner · CE &amp; FCC Compliant
            </div>
          </div>

        </div>

        {/* Quiet Copyright Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            &copy; {new Date().getFullYear()} Gikspot Technologies Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => {
                const el = document.getElementById('faq');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Client FAQ
            </button>
            <span>Hardware Warranty Terms</span>
            <span>Master Services Agreement (MSA)</span>
            <span>Security Policy</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
