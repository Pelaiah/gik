import React, { useState } from 'react';
import { Calculator, ArrowRight, ShieldCheck, Check, Clock, Users } from 'lucide-react';

interface ArchitectureEstimatorProps {
  onOpenConsultationWithScope: (scopeSummary: string) => void;
  theme?: 'dark' | 'light';
}

export const ArchitectureEstimator: React.FC<ArchitectureEstimatorProps> = ({
  onOpenConsultationWithScope,
  theme = 'dark'
}) => {
  const isDark = theme === 'dark';
  const [tier, setTier] = useState<'enterprise' | 'startup'>('enterprise');
  const [selectedModules, setSelectedModules] = useState<string[]>([
    'saas',
    'cloud',
    'predictive'
  ]);
  const [nodeScale, setNodeScale] = useState<'pilot' | 'growth' | 'massive'>('growth');
  const [compliance, setCompliance] = useState<'standard' | 'high-security'>('high-security');

  const toggleModule = (id: string) => {
    setSelectedModules(prev =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter(m => m !== id) : prev) : [...prev, id]
    );
  };

  // Calculations
  const baseWeeks = tier === 'startup' ? 6 : 10;
  const moduleWeeks = selectedModules.length * 2;
  const scaleWeeks = nodeScale === 'pilot' ? 0 : nodeScale === 'growth' ? 2 : 4;
  const totalWeeks = baseWeeks + moduleWeeks + scaleWeeks;

  const getTeamComposition = () => {
    if (tier === 'startup') {
      return '1 Staff Systems Architect · 2 Senior Full-Stack Engineers · 1 Cloud/DevOps Lead';
    }
    return '1 Principal Solutions Architect · 3 Senior Systems Engineers · 1 Industrial IoT Firmware Specialist · 1 FinOps/DevSecOps Engineer';
  };

  const getEstimatedRange = () => {
    let base = tier === 'startup' ? 24000 : 55000;
    base += selectedModules.length * 9000;
    if (nodeScale === 'massive') base += 22000;
    if (compliance === 'high-security') base += 14000;
    const low = Math.round(base * 0.85 / 1000) * 1000;
    const high = Math.round(base * 1.15 / 1000) * 1000;
    return `$${low.toLocaleString()} – $${high.toLocaleString()}`;
  };

  const handleRequestScope = () => {
    const summary = `Profile: ${tier.toUpperCase()} | Modules: ${selectedModules.join(', ')} | Scale: ${nodeScale} | Security: ${compliance} | Est. Runway: ${totalWeeks} weeks`;
    onOpenConsultationWithScope(summary);
  };

  return (
    <section className={`py-24 border-b transition-colors duration-300 ${
      isDark ? 'bg-black text-white border-white/10' : 'bg-slate-50 text-slate-900 border-slate-200'
    }`}>
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        
        {/* Header */}
        <div className="mb-12">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border backdrop-blur-md mb-4 ${
            isDark
              ? 'bg-white/[0.04] border-white/10 text-slate-300'
              : 'bg-white/80 border-slate-200 text-slate-700 shadow-sm'
          }`}>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Interactive Scope Calculator</span>
          </div>
          <h2
            className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
            style={{ fontFamily: 'var(--font-display, Syne, sans-serif)' }}
          >
            Architecture Blueprint &amp; Delivery Runway Estimator
          </h2>
          <p className={`text-sm sm:text-base mt-2 max-w-2xl ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Configure your technical scope to calculate project velocity, team sizing, and production deliverables.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. Track Selection */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                1. Project Acceleration Track
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setTier('enterprise')}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    tier === 'enterprise'
                      ? 'bg-slate-900 border-cyan-400/80 ring-1 ring-cyan-400/40'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="text-sm font-bold text-white">Enterprise Transformation</div>
                  <div className="text-xs text-slate-400 mt-1">Multi-cloud scale, legacy decoupling, zero-downtime SLA</div>
                </button>

                <button
                  type="button"
                  onClick={() => setTier('startup')}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    tier === 'startup'
                      ? 'bg-slate-900 border-cyan-400/80 ring-1 ring-cyan-400/40'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="text-sm font-bold text-white">Startup Velocity Engine</div>
                  <div className="text-xs text-slate-400 mt-1">Rapid MVP engineering, founder tooling, scalable seed base</div>
                </button>
              </div>
            </div>

            {/* 2. Core Modules */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                2. Solution Modules Required
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { id: 'saas', name: 'Multi-Tenant SaaS Core', desc: 'Auth, billing, role-based access, API gateways' },
                  { id: 'predictive', name: 'Industrial AI Predictive Engine', desc: 'Edge vibration/thermal FFT & RUL failure alerting' },
                  { id: 'cloud', name: 'Scalable Cloud & Kubernetes', desc: 'Terraform IaC, microservices, auto-scaling clusters' },
                  { id: 'iot', name: 'Smart IoT & Hardware Ingestion', desc: 'MQTT brokers, local-first gateways, sensor drivers' },
                  { id: 'workflow', name: 'Automated Operations & CI/CD', desc: 'Trunk-based deploy pipelines & internal tool suites' },
                  { id: 'hardware-custom', name: 'Custom Hardware Firmware', desc: 'Embedded C/Rust for DIN-rail PLCs & edge nodes' }
                ].map((mod) => {
                  const isChecked = selectedModules.includes(mod.id);
                  return (
                    <button
                      key={mod.id}
                      type="button"
                      onClick={() => toggleModule(mod.id)}
                      className={`p-3 rounded-lg border text-left transition-all flex items-start gap-3 cursor-pointer ${
                        isChecked
                          ? 'bg-slate-900 border-cyan-500/60 text-slate-100'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                        isChecked ? 'bg-cyan-500 border-cyan-500 text-slate-950' : 'border-slate-700'
                      }`}>
                        {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white">{mod.name}</div>
                        <div className="text-[11px] text-slate-400 leading-tight mt-0.5">{mod.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Node Scale & Compliance */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  3. Ingestion &amp; Device Scale
                </label>
                <div className="flex rounded-lg border border-slate-800 bg-slate-950 p-1">
                  {[
                    { id: 'pilot', label: 'Pilot (< 500)' },
                    { id: 'growth', label: '1k – 10k Nodes' },
                    { id: 'massive', label: '100k+ Global' }
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setNodeScale(s.id as any)}
                      className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                        nodeScale === s.id
                          ? 'bg-slate-800 text-cyan-300 font-semibold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  4. Regulatory &amp; Compliance Target
                </label>
                <div className="flex rounded-lg border border-slate-800 bg-slate-950 p-1">
                  <button
                    type="button"
                    onClick={() => setCompliance('standard')}
                    className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                      compliance === 'standard'
                        ? 'bg-slate-800 text-cyan-300 font-semibold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    SOC2 / Standard
                  </button>
                  <button
                    type="button"
                    onClick={() => setCompliance('high-security')}
                    className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                      compliance === 'high-security'
                        ? 'bg-slate-800 text-cyan-300 font-semibold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    IEC 62443 / ISO 27001
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Results Summary Card */}
          <div className="lg:col-span-5 p-6 rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-md space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-cyan-400" />
                <span className="font-bold text-white text-base">Estimated Delivery Blueprint</span>
              </div>
              <span className="text-xs font-mono text-cyan-400 uppercase">Interactive Model</span>
            </div>

            {/* Metrics */}
            <div className="space-y-4">
              <div>
                <div className="text-xs text-slate-400">Estimated Delivery Runway</div>
                <div className="text-3xl font-extrabold text-white tabular-nums flex items-center gap-2 mt-1">
                  <Clock className="h-6 w-6 text-cyan-400" />
                  <span>{totalWeeks} Weeks</span>
                  <span className="text-xs font-normal text-slate-400">to production launch</span>
                </div>
              </div>

              <div>
                <div className="text-xs text-slate-400">Projected Investment Runway</div>
                <div className="text-2xl font-bold text-white tabular-nums mt-1 font-mono text-cyan-300">
                  {getEstimatedRange()}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Includes full IP ownership, production CI/CD, and 90-day post-launch warranty
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80">
                <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-1.5">
                  <Users className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Dedicated Engineering Squad</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-mono">
                  {getTeamComposition()}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Guaranteed Deliverables
                </div>
                <div className="space-y-1 text-xs text-slate-300 font-mono">
                  <div className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Complete Source Code &amp; Infrastructure as Code</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Automated Security Scans &amp; Penetration Report</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span>24/7 Production Runbooks &amp; Observability Dashboards</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleRequestScope}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors shadow-md shadow-cyan-500/20 cursor-pointer"
              >
                <span>Export Blueprint &amp; Request Proposal</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 mt-2.5">
                <ShieldCheck className="h-3.5 w-3.5 text-slate-400" />
                <span>NDA signed prior to deep technical discovery</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
