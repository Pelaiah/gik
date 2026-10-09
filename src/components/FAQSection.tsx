import React, { useState } from 'react';
import { 
  ChevronDown, 
  HelpCircle, 
  Code2, 
  Cpu, 
  ShieldCheck, 
  Rocket, 
  Clock, 
  Layers, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface FAQItem {
  id: string;
  category: 'engineering' | 'process' | 'security' | 'pricing';
  question: string;
  answer: string;
  highlights?: string[];
  badge?: string;
}

interface FAQSectionProps {
  theme?: 'dark' | 'light';
  onOpenConsultation?: (scope?: string) => void;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 'custom-software',
    category: 'engineering',
    question: 'What kind of custom software, applications, and systems can Gikspot build for our company?',
    answer: 'Gikspot engineers end-to-end bespoke software across the entire tech stack. We design and deliver mission-critical enterprise web apps, high-concurrency cloud backend systems, real-time distributed microservices, native mobile solutions (iOS/Android), and specialized IoT & industrial firmware interfaces. Whether you need to replace legacy infrastructure, launch a novel SaaS platform from zero, or build real-time digital twins for physical operations, we deliver turnkey, production-grade codebases that you own 100%.',
    highlights: [
      'Full-stack Web & Mobile platforms (Next.js, React, Node.js, Go, Rust, React Native)',
      'High-throughput cloud architecture & real-time event streaming (Kafka, gRPC, WebSockets)',
      'Enterprise SaaS platforms with billing, multi-tenancy, and granular RBAC',
      'Industrial IoT dashboards, SCADA integration, and telemetry ingest engines'
    ],
    badge: 'Core Capability'
  },
  {
    id: 'ai-integration',
    category: 'engineering',
    question: 'How do you integrate AI and predictive intelligence into our existing systems without disrupting operations?',
    answer: 'We don’t just wrap generic APIs—we engineer domain-specific intelligence models, edge inference pipelines, and predictive algorithms calibrated to your exact business telemetry and data silos. We deploy non-invasive shadow pipelines and event interceptors that mirror live traffic to validate accuracy before promoting models to production, guaranteeing zero disruption or downtime to your existing workflows.',
    highlights: [
      'Edge AI deployment with sub-10ms inference latencies on hardware gateways',
      'Continuous vibration, thermal, and sensor anomaly detection algorithms',
      'Predictive maintenance engines preventing unplanned equipment downtime',
      'Zero-downtime shadow pipeline rollouts with automated validation checks'
    ],
    badge: 'AI & Edge'
  },
  {
    id: 'engagement-timeline',
    category: 'process',
    question: 'How quickly can we start, and what does the end-to-end development cycle look like?',
    answer: 'We can deploy a dedicated engineering strike-team within 5 business days of contract finalization. Our engagement begins with a rapid 7-day Architecture Blueprint sprint where we map out system requirements, data schemas, API contracts, and interactive prototypes. From there, we deliver production-ready working increments every 2-week sprint with continuous staging deployments so you can test features and provide feedback in real time.',
    highlights: [
      'Day 1–7: Architecture Blueprint, schema contracts, and UX prototypes',
      'Day 8–30: Alpha core engine MVP live on dedicated staging cluster',
      'Bi-weekly production releases with automated CI/CD and rigorous test suites',
      'Direct Slack/Teams channel with senior systems engineers—no middlemen'
    ],
    badge: 'Agile Delivery'
  },
  {
    id: 'code-ownership-ip',
    category: 'security',
    question: 'Who owns the intellectual property (IP), source code, and deployment architecture?',
    answer: 'You own 100% of all intellectual property, source code, data pipelines, infrastructure configurations, and design assets from day one. We never lock clients into proprietary hosting monopolies or opaque runtimes. Everything is delivered in cleanly documented Git repositories, containerized with Docker/Kubernetes, and deployed directly to your private cloud accounts (AWS, GCP, Azure, or on-premises servers).',
    highlights: [
      'Complete IP assignment in writing upon milestone completion',
      'Direct deployment into your AWS, GCP, Azure, or bare-metal infrastructure',
      'Comprehensive architecture docs, API specs (OpenAPI), and test coverage',
      'No proprietary licensing fees or vendor lock-in'
    ],
    badge: '100% Client Owned'
  },
  {
    id: 'security-compliance',
    category: 'security',
    question: 'How does Gikspot handle enterprise-grade security, data sovereignty, and compliance?',
    answer: 'Security is engineered into our architecture from the foundational layer, not retrofitted as an afterthought. We implement Zero Trust architecture, end-to-end AES-256 encryption at rest, TLS 1.3 in transit, automated vulnerability SAST/DAST scanning in CI/CD, and role-based access control (RBAC). Our systems are architected to seamlessly pass SOC 2 Type II, HIPAA, ISO 27001, and GDPR compliance audits.',
    highlights: [
      'Zero Trust design with strict mTLS service-to-service communication',
      'Automated container scanning and dependency CVE vulnerability gates',
      'Audit logging, tamper-proof audit trails, and biometric/MFA auth hooks',
      'Compliance-ready blueprints for SOC 2 Type II and HIPAA environments'
    ],
    badge: 'Enterprise Grade'
  },
  {
    id: 'budget-roi',
    category: 'pricing',
    question: 'What are your pricing models, and how do you guarantee return on investment (ROI)?',
    answer: 'We offer flexible engagement structures tailored to your organization’s stage: Fixed-Scope Sprints for well-defined MVPs and feature rollouts, or Dedicated Engineering Retainers for continuous system expansion and innovation. Every proposal includes transparent scope boundaries, quantifiable milestone deliverables, and calculated operational cost forecasts so you know your total cost of ownership upfront.',
    highlights: [
      'Transparent milestone-based invoicing with verifiable deliverable sign-offs',
      'Included post-launch warranty, telemetry monitoring, and SLAs',
      'Architecture optimization often reduces 3rd party cloud bills by 30–50%',
      'Interactive Architecture Estimator to plan your team composition & runway'
    ],
    badge: 'Transparent ROI'
  },
  {
    id: 'post-launch-support',
    category: 'process',
    question: 'What happens after launch? Do you provide maintenance, scaling, and team handover?',
    answer: 'We stand firmly behind everything we build. All production deployments include a dedicated 60-day warranty and stabilization period. Beyond launch, you can transition into our 24/7 Tier-3 Site Reliability Engineering (SRE) support tier, or we can conduct guided pair-programming and technical handover sessions to upskill your internal engineering team on the codebase.',
    highlights: [
      '60-day zero-defect warranty and hypercare monitoring period',
      'Custom 24/7 SRE uptime monitoring and incident response agreements',
      'Recorded code walkthroughs and architectural knowledge-transfer workshops',
      'Seamless transition options for scaling up or handing off internally'
    ],
    badge: 'Long-term Support'
  }
];

export const FAQSection: React.FC<FAQSectionProps> = ({
  theme = 'dark',
  onOpenConsultation
}) => {
  const [openIds, setOpenIds] = useState<string[]>(['custom-software', 'ai-integration']);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'engineering' | 'process' | 'security' | 'pricing'>('all');

  const isDark = theme === 'dark';

  const toggleAccordion = (id: string) => {
    setOpenIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = selectedCategory === 'all' 
    ? FAQ_DATA 
    : FAQ_DATA.filter(item => item.category === selectedCategory);

  const categories = [
    { id: 'all', label: 'All Questions', count: FAQ_DATA.length },
    { id: 'engineering', label: 'Engineering & AI', count: FAQ_DATA.filter(f => f.category === 'engineering').length },
    { id: 'process', label: 'Process & Timeline', count: FAQ_DATA.filter(f => f.category === 'process').length },
    { id: 'security', label: 'Security & IP', count: FAQ_DATA.filter(f => f.category === 'security').length },
    { id: 'pricing', label: 'Pricing & ROI', count: FAQ_DATA.filter(f => f.category === 'pricing').length },
  ];

  return (
    <section 
      id="faq" 
      className={`relative py-24 sm:py-32 overflow-hidden transition-colors duration-300 ${
        isDark ? 'bg-black text-white' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Background Cyber Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-transparent blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-500/5 blur-[120px] pointer-events-none -z-10" />

      {/* Decorative Blueprint Corner Grid */}
      <div className="absolute top-6 right-6 opacity-20 pointer-events-none hidden md:block">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          <path d="M 0 20 L 100 20 L 100 120" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className={isDark ? "stroke-emerald-400" : "stroke-slate-400"} />
          <circle cx="100" cy="20" r="3" fill="#34d399" />
          <path d="M 20 0 L 20 100 L 120 100" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className={isDark ? "stroke-cyan-400" : "stroke-slate-400"} />
          <circle cx="20" cy="100" r="3" fill="#38bdf8" />
        </svg>
      </div>

      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border transition-colors bg-emerald-500/10 border-emerald-500/20 text-emerald-400">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Client & Partner Inquiries</span>
          </div>

          <h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight"
            style={{ fontFamily: "'Lexend', sans-serif" }}
          >
            Everything You Need to Know Before <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Building Your Software With Us
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Transparent answers on custom architecture, intellectual property, timelines, and how our engineering teams turn high-stakes requirements into resilient production systems.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as any)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer border ${
                    isActive
                      ? isDark
                        ? 'bg-emerald-500 text-black border-emerald-400 font-semibold shadow-lg shadow-emerald-500/20'
                        : 'bg-slate-900 text-white border-slate-900 font-semibold shadow-md'
                      : isDark
                        ? 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                        : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 shadow-xs'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] ${
                    isActive 
                      ? isDark ? 'bg-black/20 text-black' : 'bg-white/20 text-white'
                      : isDark ? 'bg-white/10 text-slate-300' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Accordion List Container */}
        <div className="max-w-4xl mx-auto space-y-3.5">
          {filteredFaqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);

            return (
              <div
                key={faq.id}
                className={`group rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? isDark
                      ? 'bg-gradient-to-b from-white/[0.06] to-white/[0.02] border-emerald-500/40 shadow-xl shadow-emerald-950/20'
                      : 'bg-white border-emerald-500/50 shadow-lg shadow-emerald-100/40'
                    : isDark
                      ? 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.03]'
                      : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white'
                }`}
              >
                {/* Accordion Header / Question Trigger */}
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full px-5 sm:px-7 py-5 flex items-center justify-between gap-4 text-left cursor-pointer transition-colors"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3.5 sm:gap-4 flex-1">
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 ${
                      isOpen
                        ? isDark
                          ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-sm shadow-emerald-500/20'
                          : 'bg-emerald-50 border-emerald-300 text-emerald-700'
                        : isDark
                          ? 'bg-white/[0.05] border-white/10 text-slate-400 group-hover:text-white'
                          : 'bg-slate-100 border-slate-200 text-slate-500 group-hover:text-slate-900'
                    }`}>
                      {faq.category === 'engineering' && <Code2 className="h-4 w-4" />}
                      {faq.category === 'process' && <Rocket className="h-4 w-4" />}
                      {faq.category === 'security' && <ShieldCheck className="h-4 w-4" />}
                      {faq.category === 'pricing' && <Sparkles className="h-4 w-4" />}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 flex-1">
                      <span 
                        className={`text-base sm:text-lg font-semibold tracking-tight transition-colors ${
                          isOpen
                            ? isDark ? 'text-white' : 'text-slate-950'
                            : isDark ? 'text-slate-200 group-hover:text-white' : 'text-slate-800 group-hover:text-slate-950'
                        }`}
                        style={{ fontFamily: "'Lexend', sans-serif" }}
                      >
                        {faq.question}
                      </span>
                      
                      {faq.badge && (
                        <span className={`inline-flex items-center self-start sm:self-center px-2 py-0.5 rounded-full text-[10px] font-medium border shrink-0 ${
                          isOpen
                            ? isDark
                              ? 'bg-emerald-400/10 text-emerald-300 border-emerald-400/30'
                              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : isDark
                              ? 'bg-white/[0.05] text-slate-400 border-white/10'
                              : 'bg-slate-100 text-slate-600 border-slate-200'
                        }`}>
                          {faq.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                    isOpen
                      ? isDark
                        ? 'bg-emerald-400 text-black border-emerald-400 rotate-180'
                        : 'bg-slate-900 text-white border-slate-900 rotate-180'
                      : isDark
                        ? 'bg-white/[0.05] border-white/10 text-slate-400 group-hover:text-white'
                        : 'bg-slate-100 border-slate-200 text-slate-600 group-hover:text-slate-900'
                  }`}>
                    <ChevronDown className="h-4 w-4 transition-transform duration-300" />
                  </div>
                </button>

                {/* Accordion Body Content */}
                {isOpen && (
                  <div className={`px-5 sm:px-7 pb-6 pt-1 text-sm sm:text-base leading-relaxed border-t transition-all animate-fadeIn ${
                    isDark ? 'border-white/5 text-slate-300' : 'border-slate-100 text-slate-600'
                  }`}>
                    <p className="mb-4">
                      {faq.answer}
                    </p>

                    {faq.highlights && (
                      <div className={`mt-4 pt-4 border-t rounded-xl p-4 space-y-2.5 ${
                        isDark ? 'bg-black/40 border-white/5' : 'bg-slate-50 border-slate-200/80'
                      }`}>
                        <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                          <Layers className="h-3.5 w-3.5" />
                          <span>Key Deliverables & Specifications</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                          {faq.highlights.map((highlight, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                              <span className={isDark ? "text-slate-300" : "text-slate-700"}>{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-5 flex items-center justify-between flex-wrap gap-3 pt-3">
                      <span className="text-xs text-slate-500">
                        Have specific architecture requirements for this?
                      </span>
                      <button
                        onClick={() => onOpenConsultation?.(`Inquiry regarding: ${faq.question}`)}
                        className={`inline-flex items-center gap-1.5 text-xs font-medium transition-colors cursor-pointer ${
                          isDark ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-700 hover:text-emerald-800'
                        }`}
                      >
                        <span>Discuss this requirement</span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* High-Impact Client Conversion Callout */}
        <div className={`mt-16 max-w-4xl mx-auto rounded-3xl p-6 sm:p-10 border transition-all duration-300 relative overflow-hidden ${
          isDark
            ? 'bg-gradient-to-br from-emerald-950/40 via-slate-900/60 to-black border-emerald-500/30'
            : 'bg-gradient-to-br from-emerald-50 via-white to-teal-50/40 border-emerald-200 shadow-xl'
        }`}>
          {/* Subtle grid pattern overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <Rocket className="h-3 w-3" />
                <span>Ready to Build?</span>
              </div>
              <h3 
                className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-snug"
                style={{ fontFamily: "'Lexend', sans-serif" }}
              >
                Let’s engineer your software, application, or system.
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Bring us your toughest technical challenges, legacy modernization projects, or greenfield vision. We provide fixed-scope estimates, interactive prototypes, and senior architects on day one.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto shrink-0">
              <button
                onClick={() => {
                  const contactEl = document.getElementById('contact');
                  if (contactEl) {
                    contactEl.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    onOpenConsultation?.('Full system build request');
                  }
                }}
                className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm transition-all shadow-lg cursor-pointer ${
                  isDark
                    ? 'bg-emerald-400 text-black hover:bg-emerald-300 shadow-emerald-500/25 hover:scale-[1.02]'
                    : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-emerald-600/20 hover:scale-[1.02]'
                }`}
              >
                <span>Initiate Project Consultation</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                <Clock className="h-3.5 w-3.5 text-emerald-400" />
                <span>Average kickoff: Under 5 business days</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
