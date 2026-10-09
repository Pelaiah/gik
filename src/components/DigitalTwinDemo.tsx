import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle2, RotateCcw, Wrench, Zap, Activity, Info } from 'lucide-react';
import { PredictiveTelemetry } from '../types';

interface DigitalTwinDemoProps {
  theme?: 'dark' | 'light';
}

export const DigitalTwinDemo: React.FC<DigitalTwinDemoProps> = ({ theme = 'dark' }) => {
  const isDark = theme === 'dark';
  const [telemetry, setTelemetry] = useState<PredictiveTelemetry>({
    timestamp: new Date().toLocaleTimeString(),
    rpm: 3560,
    temperatureC: 62.4,
    vibrationMmS: 1.8,
    bearingLoadKn: 24.2,
    acousticDb: 48.5,
    healthScore: 98,
    status: 'nominal',
    predictedFailureHours: null,
    activeAnomaly: null,
  });

  const [activeAnomalyMode, setActiveAnomalyMode] = useState<'none' | 'bearing' | 'thermal' | 'cavitation'>('none');
  const [workOrderCreated, setWorkOrderCreated] = useState(false);
  const [eventLogs, setEventLogs] = useState<string[]>([
    'System calibrated to ISO 10816-3 industrial vibration standards.',
    'Telemetry streaming active via MQTT Broker over TLS (10 Hz).',
    'AI edge model baseline established across 48 harmonics.'
  ]);

  // Telemetry real-time ticking simulation
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().toLocaleTimeString();
      setTelemetry((prev) => {
        let baseRpm = 3560 + (Math.random() * 20 - 10);
        let baseTemp = 62.0 + (Math.random() * 1.2 - 0.6);
        let baseVib = 1.8 + (Math.random() * 0.3 - 0.15);
        let baseAcoustic = 48.0 + (Math.random() * 1.5 - 0.7);
        let health = 98;
        let status: 'nominal' | 'warning' | 'critical' = 'nominal';
        let failHours: number | null = null;
        let anomalyName: string | null = null;

        if (activeAnomalyMode === 'bearing') {
          baseVib = 6.8 + (Math.random() * 0.8 - 0.4);
          baseAcoustic = 79.4 + (Math.random() * 3 - 1.5);
          baseTemp = 74.2 + (Math.random() * 1.5);
          health = 64;
          status = 'warning';
          failHours = 52;
          anomalyName = 'Early Stage Inner-Race Bearing Micro-Spall Detected';
        } else if (activeAnomalyMode === 'thermal') {
          baseTemp = 91.8 + (Math.random() * 2.5);
          baseVib = 4.2 + (Math.random() * 0.5);
          health = 46;
          status = 'critical';
          failHours = 18;
          anomalyName = 'Lubrication Breakdown & Thermal Runaway Hazard';
        } else if (activeAnomalyMode === 'cavitation') {
          baseAcoustic = 92.5 + (Math.random() * 4);
          baseRpm = 3480 + (Math.random() * 50 - 25);
          baseVib = 5.6 + (Math.random() * 0.6);
          health = 58;
          status = 'warning';
          failHours = 38;
          anomalyName = 'Suction Cavitation & High-Frequency Acoustic Burst';
        }

        return {
          timestamp: now,
          rpm: Math.round(baseRpm),
          temperatureC: parseFloat(baseTemp.toFixed(1)),
          vibrationMmS: parseFloat(baseVib.toFixed(2)),
          bearingLoadKn: parseFloat((24.2 + Math.random() * 0.4).toFixed(1)),
          acousticDb: parseFloat(baseAcoustic.toFixed(1)),
          healthScore: health,
          status,
          predictedFailureHours: failHours,
          activeAnomaly: anomalyName,
        };
      });
    }, 1800);

    return () => clearInterval(interval);
  }, [activeAnomalyMode]);

  const triggerAnomaly = (mode: 'bearing' | 'thermal' | 'cavitation') => {
    setActiveAnomalyMode(mode);
    setWorkOrderCreated(false);
    const names = {
      bearing: 'Simulated bearing micro-fracture injection at 2.4kHz harmonic.',
      thermal: 'Simulated coolant valve constriction; oil viscosity degrading.',
      cavitation: 'Simulated inlet pressure collapse causing impeller cavitation.'
    };
    setEventLogs(prev => [
      `[${new Date().toLocaleTimeString()}] ALERT: ${names[mode]}`,
      ...prev.slice(0, 5)
    ]);
  };

  const resetNominal = () => {
    setActiveAnomalyMode('none');
    setWorkOrderCreated(false);
    setEventLogs(prev => [
      `[${new Date().toLocaleTimeString()}] Restored nominal baseline parameters.`,
      ...prev.slice(0, 5)
    ]);
  };

  const dispatchWorkOrder = () => {
    setWorkOrderCreated(true);
    setEventLogs(prev => [
      `[${new Date().toLocaleTimeString()}] CMMS DISPATCH: Preventive work order #GS-8911 generated and routed to Reliability Team.`,
      ...prev.slice(0, 5)
    ]);
  };

  return (
    <section className={`py-24 border-b transition-colors duration-300 ${
      isDark ? 'bg-black text-white border-white/10' : 'bg-slate-50 text-slate-900 border-slate-200'
    }`}>
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border backdrop-blur-md mb-4 ${
              isDark
                ? 'bg-white/[0.04] border-white/10 text-slate-300'
                : 'bg-white/80 border-slate-200 text-slate-700 shadow-sm'
            }`}>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live Interactive Simulator</span>
            </div>
            <h2
              className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
              style={{ fontFamily: 'var(--font-display, Syne, sans-serif)' }}
            >
              Industrial AI Predictive Digital Twin
            </h2>
            <p className={`text-sm sm:text-base mt-2 max-w-2xl ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Experience how Gikspot’s edge sensor network and anomaly detection models predict catastrophic machine breakdown before physical damage occurs.
            </p>
          </div>

          <div className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full border text-xs font-mono backdrop-blur-xl ${
            isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
              Turbine 02-B · Status:
            </span>
            <span className={`font-semibold uppercase ${
              telemetry.status === 'nominal' ? 'text-emerald-400' :
              telemetry.status === 'warning' ? 'text-amber-400' : 'text-rose-400'
            }`}>
              {telemetry.status}
            </span>
          </div>
        </div>

        {/* Dashboard Shell */}
        <div className={`rounded-3xl border p-6 sm:p-8 backdrop-blur-2xl shadow-2xl transition-all ${
          isDark
            ? 'bg-slate-900/30 border-white/10'
            : 'bg-white/85 border-slate-200 shadow-slate-200'
        }`}>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Visual Asset + Equipment Status */}
            <div className="lg:col-span-5 space-y-5">
              <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 aspect-[4/3]">
                <img
                  src="/src/assets/images/smart_industry_predictive_1791225106089.jpg"
                  alt="Industrial machinery with vibration and thermal sensor node"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                
                {/* Visual Sensor Overlay Indicator */}
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-950/80 border border-slate-700/80 backdrop-blur-md text-xs font-mono text-slate-200">
                  <span className={`h-2 w-2 rounded-full animate-ping ${
                    telemetry.status === 'nominal' ? 'bg-emerald-400' : 'bg-rose-500'
                  }`} />
                  <span>Node: GS-VIB-980 (Active)</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 p-3 bg-slate-900/90 border border-slate-800 rounded-lg">
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span className="font-semibold">Machine Health Score</span>
                    <span className="font-mono tabular-nums font-bold text-cyan-400">{telemetry.healthScore} / 100</span>
                  </div>
                  <div className="mt-2 h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        telemetry.healthScore > 80 ? 'bg-emerald-400' :
                        telemetry.healthScore > 50 ? 'bg-amber-400' : 'bg-rose-500'
                      }`}
                      style={{ width: `${telemetry.healthScore}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Anomaly Callout Box */}
              {telemetry.activeAnomaly ? (
                <div className={`p-4 rounded-xl border ${
                  telemetry.status === 'critical' ? 'bg-rose-950/30 border-rose-800/80' : 'bg-amber-950/30 border-amber-800/80'
                }`}>
                  <div className="flex items-start gap-3">
                    <AlertTriangle className={`h-5 w-5 shrink-0 ${
                      telemetry.status === 'critical' ? 'text-rose-400' : 'text-amber-400'
                    }`} />
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-white uppercase tracking-wider">
                        Predictive Anomaly Detected
                      </div>
                      <p className="text-xs text-slate-300 font-medium">
                        {telemetry.activeAnomaly}
                      </p>
                      <div className="text-xs text-slate-400 font-mono pt-1">
                        Est. Remaining Useful Life: <span className="text-cyan-400 font-bold">{telemetry.predictedFailureHours} Hours</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-xs text-slate-400">
                      Recommendation: Inspect bearing lubricant &amp; schedule race replacement
                    </span>
                    {!workOrderCreated ? (
                      <button
                        onClick={dispatchWorkOrder}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-md transition-colors"
                      >
                        <Wrench className="h-3.5 w-3.5" />
                        <span>Dispatch Work Order</span>
                      </button>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-medium">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>Work Order Queued</span>
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl border border-emerald-900/40 bg-emerald-950/10 flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                  <div className="text-xs text-slate-300">
                    <span className="font-semibold text-white">Harmonic Baseline Normal:</span> All 3 vibration axes and temperature telemetry within ISO Category II tolerances.
                  </div>
                </div>
              )}

            </div>

            {/* Right: Real-time Telemetry Gauges + Injection Controls */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Telemetry Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                
                <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/60">
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider">Vibration Velocity</div>
                  <div className="text-xl sm:text-2xl font-mono font-bold text-white tabular-nums mt-1">
                    {telemetry.vibrationMmS} <span className="text-xs text-slate-500 font-normal">mm/s</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">Nominal: &lt; 2.5 mm/s</div>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/60">
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider">Bearing Temp</div>
                  <div className="text-xl sm:text-2xl font-mono font-bold text-white tabular-nums mt-1">
                    {telemetry.temperatureC} <span className="text-xs text-slate-500 font-normal">°C</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">Alarm threshold: 85.0°C</div>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/60">
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider">Shaft Speed</div>
                  <div className="text-xl sm:text-2xl font-mono font-bold text-white tabular-nums mt-1">
                    {telemetry.rpm} <span className="text-xs text-slate-500 font-normal">RPM</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">Sync: 3600 RPM ±2%</div>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/60">
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider">Acoustic Emission</div>
                  <div className="text-xl sm:text-2xl font-mono font-bold text-white tabular-nums mt-1">
                    {telemetry.acousticDb} <span className="text-xs text-slate-500 font-normal">dB</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">Ultrasonic HF Sensor</div>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/60">
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider">Radial Load</div>
                  <div className="text-xl sm:text-2xl font-mono font-bold text-white tabular-nums mt-1">
                    {telemetry.bearingLoadKn} <span className="text-xs text-slate-500 font-normal">kN</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">Hydraulic strain cell</div>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/60">
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider">Telemetry Stream</div>
                  <div className="text-sm font-mono font-bold text-cyan-400 tabular-nums mt-2 flex items-center gap-1.5">
                    <Activity className="h-4 w-4 animate-pulse text-emerald-400" />
                    <span>MQTT 10Hz</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">Packets: 0 dropped</div>
                </div>

              </div>

              {/* Anomaly Injector Simulator Section */}
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Zap className="h-3.5 w-3.5 text-cyan-400" />
                    Simulate Failure Stress Scenario
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Click to test AI model response
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    onClick={() => triggerAnomaly('bearing')}
                    className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-all text-left cursor-pointer ${
                      activeAnomalyMode === 'bearing'
                        ? 'bg-amber-950/60 border-amber-600 text-amber-200'
                        : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="font-bold">Bearing Micro-Spall</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">High-frequency vibration spike</div>
                  </button>

                  <button
                    onClick={() => triggerAnomaly('thermal')}
                    className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-all text-left cursor-pointer ${
                      activeAnomalyMode === 'thermal'
                        ? 'bg-rose-950/60 border-rose-600 text-rose-200'
                        : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="font-bold">Thermal Runaway</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Lubricant viscosity failure</div>
                  </button>

                  <button
                    onClick={() => triggerAnomaly('cavitation')}
                    className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-all text-left cursor-pointer ${
                      activeAnomalyMode === 'cavitation'
                        ? 'bg-amber-950/60 border-amber-600 text-amber-200'
                        : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="font-bold">Suction Cavitation</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Turbine impeller flow collapse</div>
                  </button>
                </div>

                {activeAnomalyMode !== 'none' && (
                  <button
                    onClick={resetNominal}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md transition-colors"
                  >
                    <RotateCcw className="h-3 w-3" />
                    <span>Reset Calibration to Baseline</span>
                  </button>
                )}
              </div>

              {/* Edge Diagnostic Telemetry Log */}
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 font-mono text-xs space-y-1.5">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>Edge Anomaly Log · ISO 13373-1</span>
                  <span className="text-[10px] text-slate-500">Live Buffer</span>
                </div>
                {eventLogs.map((log, index) => (
                  <div key={index} className="text-slate-300 text-[11px] flex items-start gap-2">
                    <span className="text-cyan-500">›</span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
