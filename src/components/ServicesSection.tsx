import React, { useState } from 'react';
import { ArrowUpRight, Check, Layers, HardHat, Home, Rocket, Cloud } from 'lucide-react';
import { SERVICES_DATA } from '../data/mockData';
import { NavigationTab } from '../types';

interface ServicesSectionProps {
  onNavigate: (tab: NavigationTab) => void;
  onOpenConsultation: () => void;
  theme?: 'dark' | 'light';
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onNavigate,
  onOpenConsultation,
  theme = 'dark'
}) => {
  const [selectedAudience, setSelectedAudience] = useState<string>('All');
  const isDark = theme === 'dark';

  const filterTabs = ['All', 'Enterprises', 'Industrial', 'Startups', 'Commercial'];

  const filteredServices = selectedAudience === 'All'
    ? SERVICES_DATA
    : SERVICES_DATA.filter(s => s.targetAudience === selectedAudience);

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'consultancy-cloud':
        return <Cloud className="h-5 w-5 text-cyan-400" />;
      case 'saas-engineering':
        return <Layers className="h-5 w-5 text-blue-400" />;
      case 'predictive-maintenance':
        return <HardHat className="h-5 w-5 text-emerald-400" />;
      case 'smart-iot-systems':
        return <Home className="h-5 w-5 text-teal-400" />;
      case 'startup-accelerator':
        return <Rocket className="h-5 w-5 text-purple-400" />;
      default:
        return <Layers className="h-5 w-5 text-cyan-400" />;
    }
  };

  return (
    <section className={`py-24 border-b transition-colors duration-300 w-full ${
      isDark ? 'bg-black text-white border-white/10' : 'bg-slate-50 text-slate-900 border-slate-200'
    }`}>
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        
        {/* Section Header with Pill Tag */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border backdrop-blur-md mb-4 ${
              isDark
                ? 'bg-white/[0.04] border-white/10 text-slate-300'
                : 'bg-white/80 border-slate-200 text-slate-700 shadow-sm'
            }`}>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Capabilities &amp; Solutions</span>
            </div>

            <h2
              className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
              style={{ fontFamily: 'var(--font-display, Syne, sans-serif)' }}
            >
              Precision Engineering Architecture
            </h2>
            <p className={`text-sm sm:text-base mt-2 max-w-2xl ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Delivering high-concurrency SaaS, AI predictive telemetry, smart home automation, and scalable cloud systems.
            </p>
          </div>

          {/* Interactive filter control pills */}
          <div className={`flex items-center gap-1 p-1 rounded-full border backdrop-blur-xl shrink-0 self-start md:self-auto overflow-x-auto ${
            isDark ? 'bg-slate-950/80 border-white/10' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedAudience(tab)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all whitespace-nowrap cursor-pointer ${
                  selectedAudience === tab
                    ? isDark
                      ? 'bg-white/20 text-white font-semibold shadow-inner'
                      : 'bg-slate-900 text-white font-semibold'
                    : isDark
                      ? 'text-slate-400 hover:text-white'
                      : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Services Cards with Frosted Glass styling */}
        <div className="space-y-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className={`group p-6 sm:p-8 rounded-3xl border transition-all duration-300 backdrop-blur-xl ${
                isDark
                  ? 'bg-slate-900/30 hover:bg-slate-900/60 border-white/10 hover:border-emerald-500/30 shadow-xl'
                  : 'bg-white/80 hover:bg-white border-slate-200 hover:border-emerald-500/40 shadow-sm'
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Number & Headline */}
                <div className="lg:col-span-5 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-emerald-400 tracking-wider">
                      {service.number}
                    </span>
                    <span className={`text-xs font-medium ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                      Target Sector: {service.targetAudience}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-2xl border shrink-0 ${
                      isDark ? 'bg-white/[0.04] border-white/10' : 'bg-slate-100 border-slate-200'
                    }`}>
                      {getServiceIcon(service.id)}
                    </div>
                    <h3 className={`text-xl sm:text-2xl font-bold transition-colors ${
                      isDark ? 'text-white group-hover:text-emerald-300' : 'text-slate-900 group-hover:text-emerald-600'
                    }`}>
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-emerald-400/90 font-medium">
                    {service.tagline}
                  </p>

                  <p className={`text-sm leading-relaxed pt-1 ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {service.description}
                  </p>
                </div>

                {/* Capabilities Checklist */}
                <div className="lg:col-span-4 space-y-2.5">
                  <div className={`text-xs font-semibold uppercase tracking-wider ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    Core Engineering Modules
                  </div>
                  <ul className="space-y-2">
                    {service.capabilities.map((cap, i) => (
                      <li key={i} className={`flex items-start gap-2.5 text-xs leading-snug ${
                        isDark ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Deliverables & Actions */}
                <div className={`lg:col-span-3 lg:border-l lg:pl-6 space-y-4 ${
                  isDark ? 'lg:border-white/10' : 'lg:border-slate-200'
                }`}>
                  <div>
                    <div className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      Key Deliverables
                    </div>
                    <div className="space-y-1.5 text-xs font-mono">
                      {service.deliverables.map((deliv, idx) => (
                        <div key={idx} className={`flex items-center gap-1.5 ${
                          isDark ? 'text-slate-400' : 'text-slate-600'
                        }`}>
                          <span className="text-emerald-400">→</span>
                          <span>{deliv}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col gap-2">
                    {service.id === 'predictive-maintenance' && (
                      <button
                        onClick={() => onNavigate('predictive-ai')}
                        className={`inline-flex items-center justify-between px-4 py-2.5 text-xs font-semibold rounded-2xl border transition-all cursor-pointer ${
                          isDark
                            ? 'bg-white/[0.04] hover:bg-white/[0.08] border-white/10 text-white'
                            : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-800'
                        }`}
                      >
                        <span>Launch Digital Twin</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </button>
                    )}

                    {service.id === 'smart-iot-systems' && (
                      <button
                        onClick={() => onNavigate('smart-iot')}
                        className={`inline-flex items-center justify-between px-4 py-2.5 text-xs font-semibold rounded-2xl border transition-all cursor-pointer ${
                          isDark
                            ? 'bg-white/[0.04] hover:bg-white/[0.08] border-white/10 text-white'
                            : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-800'
                        }`}
                      >
                        <span>Test IoT Simulator</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </button>
                    )}

                    <button
                      onClick={onOpenConsultation}
                      className="inline-flex items-center justify-between px-4 py-2.5 text-xs font-bold rounded-2xl bg-white text-black hover:bg-slate-200 transition-colors shadow-md cursor-pointer"
                    >
                      <span>Request Scope Proposal</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
