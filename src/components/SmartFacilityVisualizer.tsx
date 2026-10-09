import React, { useState } from 'react';
import { Power, Shield, Sun, Wind, CheckCircle2, Sliders, Cpu } from 'lucide-react';
import { INITIAL_SMART_DEVICES } from '../data/mockData';
import { SmartDeviceNode } from '../types';

interface SmartFacilityVisualizerProps {
  theme?: 'dark' | 'light';
}

export const SmartFacilityVisualizer: React.FC<SmartFacilityVisualizerProps> = ({ theme = 'dark' }) => {
  const isDark = theme === 'dark';
  const [devices, setDevices] = useState<SmartDeviceNode[]>(INITIAL_SMART_DEVICES);
  const [selectedZone, setSelectedZone] = useState<string>('All');
  const [activePreset, setActivePreset] = useState<'nominal' | 'eco' | 'high-security'>('nominal');

  const zones = ['All', 'Server Room', 'Assembly Line', 'Smart Office', 'Facility Perimeter'];

  const toggleDevice = (id: string) => {
    setDevices(prev => prev.map(d => {
      if (d.id === id) {
        return {
          ...d,
          isActive: !d.isActive,
          powerDrawWatts: !d.isActive ? (d.type === 'climate' ? 1420 : d.type === 'power' ? 19280 : d.type === 'lighting' ? 380 : 65) : 12
        };
      }
      return d;
    }));
  };

  const applyPreset = (preset: 'nominal' | 'eco' | 'high-security') => {
    setActivePreset(preset);
    if (preset === 'eco') {
      setDevices(prev => prev.map(d => ({
        ...d,
        isActive: d.type === 'security' || d.id === 'dev-1',
        powerDrawWatts: d.type === 'security' ? 65 : d.id === 'dev-1' ? 980 : 8
      })));
    } else if (preset === 'high-security') {
      setDevices(prev => prev.map(d => ({
        ...d,
        isActive: true,
        powerDrawWatts: d.type === 'power' ? 19280 : d.type === 'climate' ? 1420 : 420
      })));
    } else {
      setDevices(INITIAL_SMART_DEVICES);
    }
  };

  const filteredDevices = selectedZone === 'All'
    ? devices
    : devices.filter(d => d.zone === selectedZone);

  const totalPowerDrawKw = (devices.reduce((acc, d) => acc + (d.isActive ? d.powerDrawWatts : 0), 0) / 1000).toFixed(2);
  const activeCount = devices.filter(d => d.isActive).length;

  const getDeviceIcon = (type: SmartDeviceNode['type']) => {
    switch (type) {
      case 'climate':
        return <Wind className="h-5 w-5 text-cyan-400" />;
      case 'power':
        return <Power className="h-5 w-5 text-amber-400" />;
      case 'security':
        return <Shield className="h-5 w-5 text-emerald-400" />;
      case 'lighting':
        return <Sun className="h-5 w-5 text-yellow-400" />;
      default:
        return <Cpu className="h-5 w-5 text-cyan-400" />;
    }
  };

  return (
    <section className={`py-24 border-b transition-colors duration-300 ${
      isDark ? 'bg-black text-white border-white/10' : 'bg-slate-50 text-slate-900 border-slate-200'
    }`}>
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border backdrop-blur-md mb-4 ${
              isDark
                ? 'bg-white/[0.04] border-white/10 text-slate-300'
                : 'bg-white/80 border-slate-200 text-slate-700 shadow-sm'
            }`}>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Facility &amp; Estate Automation</span>
            </div>
            <h2
              className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
              style={{ fontFamily: 'var(--font-display, Syne, sans-serif)' }}
            >
              Smart Homes &amp; Unified IoT Orchestration
            </h2>
            <p className={`text-sm sm:text-base mt-2 max-w-2xl ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Gikspot bridges consumer-friendly Matter &amp; Thread protocols with industrial RS-485 Modbus backbones, delivering single-pane-of-glass facility intelligence.
            </p>
          </div>

          {/* Preset Buttons */}
          <div className="flex items-center gap-2">
            <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Profile:</span>
            <div className={`flex items-center gap-1 p-1 rounded-full border backdrop-blur-xl ${
              isDark ? 'bg-slate-950/80 border-white/10' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <button
                onClick={() => applyPreset('nominal')}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-colors cursor-pointer ${
                  activePreset === 'nominal'
                    ? isDark ? 'bg-white/20 text-white font-semibold shadow-inner' : 'bg-slate-900 text-white font-semibold'
                    : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Standard
              </button>
              <button
                onClick={() => applyPreset('eco')}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-colors cursor-pointer ${
                  activePreset === 'eco'
                    ? isDark ? 'bg-white/20 text-white font-semibold shadow-inner' : 'bg-slate-900 text-white font-semibold'
                    : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Eco Shedding
              </button>
              <button
                onClick={() => applyPreset('high-security')}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-colors cursor-pointer ${
                  activePreset === 'high-security'
                    ? isDark ? 'bg-white/20 text-white font-semibold shadow-inner' : 'bg-slate-900 text-white font-semibold'
                    : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Full Alert
              </button>
            </div>
          </div>
        </div>

        {/* Master Container */}
        <div className={`rounded-3xl border p-6 sm:p-8 backdrop-blur-2xl shadow-2xl transition-all ${
          isDark
            ? 'bg-slate-900/30 border-white/10'
            : 'bg-white/85 border-slate-200 shadow-slate-200'
        }`}>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Visual Architecture Showcase */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative rounded-xl overflow-hidden border border-slate-800 aspect-[4/3] bg-slate-950">
                <img
                  src="/src/assets/images/smart_home_iot_1791225116967.jpg"
                  alt="Modern architectural smart interior with wall control panel"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 p-3 bg-slate-900/90 border border-slate-800 rounded-lg text-xs space-y-1">
                  <div className="flex items-center justify-between font-semibold text-slate-200">
                    <span>Gikspot Thread Border Gateway</span>
                    <span className="text-cyan-400 font-mono">Channel 25 · 2.4GHz</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    Sub-10ms localized latency. Zero cloud dependency for core automation triggers.
                  </p>
                </div>
              </div>

              {/* Energy & Connectivity Telemetry Banner */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950">
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider">Active Aggregate Load</div>
                  <div className="text-xl sm:text-2xl font-mono font-bold text-white tabular-nums mt-1">
                    {totalPowerDrawKw} <span className="text-xs text-slate-500 font-normal">kW</span>
                  </div>
                  <div className="text-[11px] text-emerald-400 mt-0.5">3-Phase Submetered</div>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950">
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider">Mesh Nodes Online</div>
                  <div className="text-xl sm:text-2xl font-mono font-bold text-cyan-400 tabular-nums mt-1">
                    {activeCount} / {devices.length}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Matter 1.3 Certified</div>
                </div>
              </div>
            </div>

            {/* Interactive Node Controller Grid */}
            <div className="lg:col-span-7 space-y-5">
              
              {/* Zone Filter Strip */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-lg overflow-x-auto">
                {zones.map((zone) => (
                  <button
                    key={zone}
                    onClick={() => setSelectedZone(zone)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      selectedZone === zone
                        ? 'bg-slate-800 text-cyan-300 shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {zone}
                  </button>
                ))}
              </div>

              {/* Device Cards Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
                {filteredDevices.map((device) => (
                  <div
                    key={device.id}
                    className={`p-4 rounded-xl border transition-all ${
                      device.isActive
                        ? 'border-slate-700 bg-slate-950/80'
                        : 'border-slate-850 bg-slate-950/30 opacity-70'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 shrink-0">
                          {getDeviceIcon(device.type)}
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-white truncate">
                            {device.name}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                            <span>{device.zone}</span>
                            <span aria-hidden="true" className="text-slate-600">·</span>
                            <span className="font-mono text-cyan-300/80">{device.value}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Power & Interactive Toggle */}
                      <div className="flex items-center gap-4 shrink-0">
                        <div className="hidden sm:block text-right">
                          <div className="text-xs font-mono font-bold text-slate-300 tabular-nums">
                            {device.isActive ? `${device.powerDrawWatts} W` : 'Standby'}
                          </div>
                          <div className="text-[10px] text-slate-500">Live draw</div>
                        </div>

                        <button
                          onClick={() => toggleDevice(device.id)}
                          aria-label={`Toggle ${device.name}`}
                          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                            device.isActive ? 'bg-cyan-500' : 'bg-slate-800'
                          }`}
                        >
                          <span
                            aria-hidden="true"
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-slate-950 shadow ring-0 transition duration-200 ease-in-out ${
                              device.isActive ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>

                    </div>
                  </div>
                ))}
              </div>

              {/* Protocol Integration Footer info */}
              <div className="p-3.5 rounded-xl border border-slate-800/80 bg-slate-950 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                  <span>Protocols Supported: Matter · Thread · Zigbee 3.0 · Modbus RTU/TCP · BACnet</span>
                </div>
                <span className="text-slate-500">Local-first SQLite event cache</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
