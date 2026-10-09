import React from 'react';
import { CASE_STUDIES } from '../data/mockData';
import { TrendingUp, Quote, CheckCircle } from 'lucide-react';

interface CaseStudiesProps {
  theme?: 'dark' | 'light';
}

export const CaseStudies: React.FC<CaseStudiesProps> = ({ theme = 'dark' }) => {
  const isDark = theme === 'dark';

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
            <span>Verified Deployment Evidence</span>
          </div>
          <h2
            className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
            style={{ fontFamily: 'var(--font-display, Syne, sans-serif)' }}
          >
            Measurable engineering impact across industrial and software environments.
          </h2>
          <p className={`text-sm sm:text-base mt-2 max-w-2xl ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Real case studies from production floors and high-throughput SaaS architectures engineered by Gikspot.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {CASE_STUDIES.map((study, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                
                {/* Header info */}
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-semibold text-white">{study.client}</span>
                  <span className="font-mono text-cyan-400">{study.industry}</span>
                </div>

                {/* Marquee Metric Callout */}
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 flex items-center gap-3">
                  <TrendingUp className="h-6 w-6 text-emerald-400 shrink-0" />
                  <div>
                    <div className="text-xl font-bold text-white tabular-nums">
                      {study.metric}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5 font-mono">
                      {study.timeline}
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white">
                  {study.title}
                </h3>

                <div className="space-y-3 text-xs leading-relaxed text-slate-300">
                  <div>
                    <span className="font-bold text-slate-200">The Problem: </span>
                    <span className="text-slate-400">{study.challenge}</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-200">Gikspot Solution: </span>
                    <span>{study.solution}</span>
                  </div>
                </div>

              </div>

              {/* Attributable Quote */}
              <div className="pt-4 border-t border-slate-800/80">
                <div className="flex gap-2.5">
                  <Quote className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5 opacity-60" />
                  <p className="text-xs italic text-slate-300 leading-relaxed">
                    "{study.quote.text}"
                  </p>
                </div>
                <div className="mt-3 text-xs text-slate-400 font-medium pl-6">
                  <span className="text-white font-semibold">{study.quote.author}</span>
                  <span aria-hidden="true" className="mx-1.5 text-slate-600">·</span>
                  <span>{study.quote.role}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Adjacency Trust Markers */}
        <div className="mt-12 p-6 rounded-2xl border border-slate-800 bg-slate-900/30 flex flex-wrap items-center justify-between gap-6 text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-emerald-400" />
            <span>48h Average Incident Response Turnaround</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-emerald-400" />
            <span>100% Client Code &amp; Hardware IP Retention</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-emerald-400" />
            <span>Direct Access to Senior Systems Architects</span>
          </div>
        </div>

      </div>
    </section>
  );
};
