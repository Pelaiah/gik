import React, { useRef, useEffect } from 'react';
import { ArrowRight, Cpu, Activity, BarChart3, ShieldCheck, Zap, Server, CheckCircle2, Star } from 'lucide-react';
import { NavigationTab } from '../types';

interface HeroProps {
  onNavigate: (tab: NavigationTab) => void;
  onOpenConsultation: () => void;
  theme?: 'dark' | 'light';
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenConsultation, theme = 'dark' }) => {
  const isDark = theme === 'dark';
  const videoRef = useRef<HTMLVideoElement>(null);

  // Safely manage background video lifecycle with autoplay guarantee
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let isMounted = true;
    video.muted = true;
    video.defaultMuted = true;

    try {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Ignore abort on quick navigation
        });
      }
    } catch {
      // ignore
    }

    return () => {
      isMounted = false;
      try {
        video.pause();
      } catch {
        // ignore
      }
    };
  }, []);

  return (
    <section className={`relative w-full overflow-hidden pt-28 pb-20 transition-colors duration-300 ${
      isDark ? 'bg-black text-white' : 'bg-slate-950 text-white'
    }`}>
      
      {/* 1. Full-screen Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center opacity-85 transition-opacity duration-700 filter brightness-95"
        >
          <source src="/videos/gikspot-hero.mp4" type="video/mp4" />
        </video>

        {/* Ambient Glow & Scrim: Keep video vividly visible while enhancing typography */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/90 pointer-events-none" />
        
        {/* Glowing undulating wave horizon matching SpineEdge reference */}
        <div className="absolute bottom-0 inset-x-0 h-96 opacity-60 pointer-events-none">
          <svg viewBox="0 0 1440 320" fill="none" preserveAspectRatio="none" className="w-full h-full">
            <path
              d="M0,160 C320,300 480,40 800,200 C1120,360 1280,100 1440,240 L1440,320 L0,320 Z"
              fill="url(#wave-gradient)"
            />
            <defs>
              <linearGradient id="wave-gradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#064e3b" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#0d9488" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.4" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* 2. Hero Content Container (Utilizing Entire Screen Width) */}
      <div className="relative z-10 w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 text-center pt-8 pb-16">
        {/* Clean Headline in Lexend Font */}
        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-[1.18] drop-shadow-xl"
          style={{ fontFamily: "'Lexend', sans-serif", textWrap: 'balance' }}
        >
          Revolutionize Your Enterprise with{' '}
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            Industrial Systems &amp; AI Power
          </span>
        </h1>

        {/* Clean Supporting Description */}
        <p className="mt-5 text-sm sm:text-base md:text-lg text-slate-300/90 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
          Harness scalable cloud infrastructure, AI-driven predictive maintenance for manufacturing facilities, and certified IoT hardware to eliminate unplanned downtime.
        </p>

        {/* Dual High-Impact Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => onNavigate('estimator')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold bg-emerald-400 text-slate-950 hover:bg-emerald-300 transition-all shadow-[0_0_35px_rgba(52,211,153,0.45)] hover:shadow-[0_0_45px_rgba(52,211,153,0.65)] hover:scale-105 active:scale-100 cursor-pointer"
          >
            <span>Scope Architecture Blueprint</span>
            <ArrowRight className="h-4 w-4 stroke-[2.5]" />
          </button>

          <button
            onClick={() => onNavigate('hardware-shop')}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold border border-white/20 bg-slate-900/70 hover:bg-slate-800 backdrop-blur-xl text-white transition-all hover:border-white/40 cursor-pointer shadow-lg"
          >
            <Cpu className="h-4 w-4 text-cyan-400" />
            <span>Explore Hardware Store</span>
          </button>

          <button
            onClick={() => onNavigate('predictive-ai')}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium border border-white/10 bg-black/40 hover:bg-black/60 backdrop-blur-xl text-slate-300 hover:text-white transition-all cursor-pointer"
          >
            <Activity className="h-4 w-4 text-emerald-400" />
            <span>See It In Action</span>
          </button>
        </div>

        {/* Brand Trust Strip Across Entire Width */}
        <div className="mt-20 pt-10 border-t border-white/10">
          <div className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-8">
            Trusted by 180+ world-class enterprise facilities and engineering organizations
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-8 items-center justify-center text-slate-400 font-semibold text-sm">
            <div className="flex items-center justify-center gap-2 hover:text-white transition-colors">
              <span className="font-bold text-base tracking-wider text-slate-200">SIEMENS</span>
            </div>
            <div className="flex items-center justify-center gap-2 hover:text-white transition-colors">
              <span className="font-bold text-base tracking-wider text-slate-200">ABB</span>
            </div>
            <div className="flex items-center justify-center gap-2 hover:text-white transition-colors">
              <span className="font-bold text-sm tracking-wider text-slate-200">SCHNEIDER</span>
            </div>
            <div className="flex items-center justify-center gap-2 hover:text-white transition-colors">
              <span className="font-bold text-base tracking-wider text-slate-200">ROCKWELL</span>
            </div>
            <div className="flex items-center justify-center gap-2 hover:text-white transition-colors">
              <span className="font-bold text-base tracking-wider text-slate-200">AWS IoT</span>
            </div>
            <div className="flex items-center justify-center gap-2 hover:text-white transition-colors">
              <span className="font-bold text-base tracking-wider text-slate-200">NVIDIA</span>
            </div>
            <div className="flex items-center justify-center gap-2 hover:text-white transition-colors">
              <span className="font-bold text-base tracking-wider text-slate-200">ADVANTECH</span>
            </div>
            <div className="flex items-center justify-center gap-2 hover:text-white transition-colors">
              <span className="font-bold text-base tracking-wider text-slate-200">MATTER</span>
            </div>
          </div>
        </div>

        {/* 3 Full-Width Hero Feature Cards (Matching the 3 Cards in SpineEdge image) */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          
          {/* Card 1: Data-Driven Telemetry */}
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-emerald-500/40 transition-all shadow-2xl group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-white/[0.05] border border-white/10 text-emerald-400">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <span className="text-xs font-mono text-emerald-400">01 / Telemetry</span>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                Data-Driven AI Insights
              </h3>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                Stream real-time tri-axis vibration, temperature, and acoustic metrics with millisecond latency to edge anomaly detection engines.
              </p>
            </div>

            {/* Visual Mini Graphic matching image */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <div className="p-4 rounded-2xl bg-black/50 border border-white/5 space-y-2">
                <div className="flex justify-between text-xs text-slate-400 font-mono">
                  <span>Bearing Health</span>
                  <span className="text-emerald-400 font-bold">98.4% Nominal</span>
                </div>
                <div className="flex items-end gap-1.5 h-12 pt-2">
                  <div className="flex-1 bg-emerald-500/30 rounded-t h-1/2" />
                  <div className="flex-1 bg-emerald-500/50 rounded-t h-3/4" />
                  <div className="flex-1 bg-emerald-400 rounded-t h-full shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                  <div className="flex-1 bg-emerald-500/60 rounded-t h-4/5" />
                  <div className="flex-1 bg-emerald-500/40 rounded-t h-2/3" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Smart Automation */}
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-cyan-500/40 transition-all shadow-2xl group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-white/[0.05] border border-white/10 text-cyan-400">
                  <Zap className="h-6 w-6" />
                </div>
                <span className="text-xs font-mono text-cyan-400">02 / Automation</span>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                Industrial Smart Automation
              </h3>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                Automate facility controls, motor banks, and environmental HVAC loops with local-first Matter and Modbus DIN-rail controllers.
              </p>
            </div>

            {/* Visual Mini Graphic matching image */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <div className="p-4 rounded-2xl bg-black/50 border border-white/5 space-y-2 font-mono text-xs">
                <div className="flex justify-between items-center text-slate-400">
                  <span>Controller Node</span>
                  <span className="text-cyan-400 font-semibold">GS-PLC-800 Active</span>
                </div>
                <div className="grid grid-cols-4 gap-1 pt-1 text-center text-[10px]">
                  <div className="p-1 rounded bg-slate-800 text-slate-300">CH 1</div>
                  <div className="p-1 rounded bg-slate-800 text-slate-300">CH 2</div>
                  <div className="p-1 rounded bg-cyan-950 border border-cyan-500/50 text-cyan-300">CH 3</div>
                  <div className="p-1 rounded bg-slate-800 text-slate-300">CH 4</div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Maximum Reliability & Satisfaction */}
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-teal-500/40 transition-all shadow-2xl group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-white/[0.05] border border-white/10 text-teal-400">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <span className="text-xs font-mono text-teal-400">03 / Reliability</span>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-teal-300 transition-colors">
                Guaranteed 99.98% Uptime
              </h3>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                Prevent catastrophic failures 48-72 hours in advance. Keep equipment spinning, assembly lines moving, and cloud SLAs protected.
              </p>
            </div>

            {/* Visual Mini Review matching image */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <div className="p-4 rounded-2xl bg-black/50 border border-white/5 space-y-1.5">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-300 italic line-clamp-2">
                  "Paid for itself in quarter one. Predicted bearing micro-spall 64 hours early."
                </p>
                <div className="text-[11px] text-slate-400 font-medium pt-0.5">
                  Erich Lindner · Head of Reliability, Vanguard
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* 3. "How It Works" Section (Full-Width Architecture Grid) */}
      <div className="relative z-10 w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 pt-12 pb-12 border-t border-white/10">
        
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-slate-900/60 backdrop-blur-md text-xs font-medium text-emerald-400 mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Step-by-Step Architecture</span>
          </div>
          <h2
            className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight"
            style={{ fontFamily: 'var(--font-display, Syne, sans-serif)' }}
          >
            How Gikspot Works
          </h2>
          <p className="mt-3 text-sm sm:text-base lg:text-lg text-slate-400">
            End-to-end integration from physical sensor instrumentations to cloud telemetry and automated incident recovery.
          </p>
        </div>

        {/* 4-Column Responsive Grid Across Screen */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 w-full">
          
          {/* Step 1 */}
          <div className="p-8 sm:p-10 rounded-3xl border border-white/10 bg-slate-900/50 backdrop-blur-2xl hover:border-emerald-500/30 transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                Step 01
              </div>
              <h3 className="text-2xl font-bold text-white">
                Instrument Physical Assets with Sensors
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Magnetic-mount tri-axis vibration nodes, ultrasonic acoustic pods, and thermal sensors attach in minutes with zero disruption to production lines.
              </p>
            </div>
            
            <div className="p-5 rounded-2xl bg-black/60 border border-white/5 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span className="text-slate-300">IP67 Wireless Nodes Connected</span>
              </div>
              <span className="text-emerald-400 font-semibold">10Hz Sampling</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-8 sm:p-10 rounded-3xl border border-white/10 bg-slate-900/50 backdrop-blur-2xl hover:border-cyan-500/30 transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                Step 02
              </div>
              <h3 className="text-2xl font-bold text-white">
                Edge Ingestion &amp; Protocol Gateways
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Our DIN-rail controllers bridge Modbus, OPC UA, Matter, and MQTT telemetry, deduplicating data locally before secure TLS cloud transit.
              </p>
            </div>
            
            <div className="p-5 rounded-2xl bg-black/60 border border-white/5 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2.5">
                <Server className="h-4 w-4 text-cyan-400" />
                <span className="text-slate-300">Dual GbE + Thread Border Router</span>
              </div>
              <span className="text-cyan-400 font-semibold">&lt; 1ms Latency</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-8 sm:p-10 rounded-3xl border border-white/10 bg-slate-900/50 backdrop-blur-2xl hover:border-teal-500/30 transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="text-xs font-mono text-teal-400 font-bold uppercase tracking-wider">
                Step 03
              </div>
              <h3 className="text-2xl font-bold text-white">
                AI Anomaly &amp; Failure Prediction
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Machine learning models analyze harmonic FFT spectra and thermal drift to flag bearing micro-fractures, cavitation, and motor imbalances 48h to 72h early.
              </p>
            </div>
            
            <div className="p-5 rounded-2xl bg-black/60 border border-white/5 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2.5">
                <Activity className="h-4 w-4 text-teal-400" />
                <span className="text-slate-300">Remaining Useful Life (RUL) Modeling</span>
              </div>
              <span className="text-teal-400 font-semibold">ISO 10816 Verified</span>
            </div>
          </div>

          {/* Step 4 */}
          <div className="p-8 sm:p-10 rounded-3xl border border-white/10 bg-slate-900/50 backdrop-blur-2xl hover:border-emerald-500/30 transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                Step 04
              </div>
              <h3 className="text-2xl font-bold text-white">
                Automated Work-Orders &amp; Continuous Scale
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                When an anomaly is flagged, Gikspot auto-generates CMMS maintenance tickets, alerts the engineering team, and orders replacement parts before downtime occurs.
              </p>
            </div>
            
            <div className="p-5 rounded-2xl bg-black/60 border border-white/5 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span className="text-slate-300">Preventive Ticket Auto-Routed</span>
              </div>
              <span className="text-emerald-400 font-semibold">Zero-Downtime</span>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
