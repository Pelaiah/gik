import React from 'react';
import { ShoppingBag, ArrowUpRight, Sun, Moon, Settings } from 'lucide-react';
import { NavigationTab } from '../types';

interface NavbarProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenConsultation: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  cartCount,
  onOpenCart,
  onOpenConsultation,
  theme,
  onToggleTheme,
}) => {
  const isDark = theme === 'dark';

  return (
    <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-3 sm:px-6 pointer-events-none">
      <div className={`pointer-events-auto flex items-center justify-between gap-2 sm:gap-4 px-3 sm:px-4 py-2 rounded-full border shadow-2xl transition-all duration-300 max-w-5xl w-full ${
        isDark
          ? 'bg-slate-950/75 border-white/10 text-white backdrop-blur-xl shadow-black/60'
          : 'bg-white/80 border-slate-200 text-slate-900 backdrop-blur-xl shadow-slate-300/40'
      }`}>
        
        {/* Left Zone: Squircle Icon + Brand Title */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => onSelectTab('overview')}
            aria-label="Home"
            className={`flex h-8 w-8 items-center justify-center rounded-xl border transition-colors cursor-pointer ${
              isDark
                ? 'bg-white/[0.05] border-white/10 text-emerald-400 hover:bg-white/[0.1]'
                : 'bg-slate-100 border-slate-200 text-emerald-600 hover:bg-slate-200'
            }`}
          >
            <Settings className="h-4 w-4 animate-spin-slow" />
          </button>

          <button
            onClick={() => onSelectTab('overview')}
            className={`text-sm sm:text-base font-bold tracking-tight cursor-pointer ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
            style={{ fontFamily: 'var(--font-display, Syne, sans-serif)' }}
          >
            Gikspot
          </button>
        </div>

        {/* Center Zone: Pill Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 text-xs font-medium">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'services', label: 'Capabilities' },
            { id: 'predictive-ai', label: 'Predictive AI' },
            { id: 'smart-iot', label: 'Smart IoT' },
            { id: 'hardware-shop', label: 'Hardware Store' },
            { id: 'estimator', label: 'Estimator' },
            { id: 'gaming-future', label: 'Arena' },
          ].map((tab) => {
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id as NavigationTab)}
                className={`px-3 py-1.5 rounded-full transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? isDark
                      ? 'bg-white/15 text-white font-semibold shadow-inner'
                      : 'bg-slate-900 text-white font-semibold'
                    : isDark
                      ? 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Right Zone: Theme Toggle + Cart + Get Started Pill Button */}
        <div className="flex items-center gap-2 shrink-0">
          
          {/* Theme switcher (Cyber Dark <-> Ethereal Light matching both reference images) */}
          <button
            onClick={onToggleTheme}
            aria-label="Toggle Theme"
            title={isDark ? "Switch to Ethereal Light (MachinaFusion style)" : "Switch to Cyber Dark (J_ Kyorov style)"}
            className={`flex h-8 w-8 items-center justify-center rounded-full border transition-colors cursor-pointer ${
              isDark
                ? 'bg-white/[0.05] border-white/10 text-slate-300 hover:text-white'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-black'
            }`}
          >
            {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
          </button>

          {/* Cart Pill */}
          <button
            onClick={onOpenCart}
            aria-label="Shopping Bag"
            className={`relative flex h-8 w-8 items-center justify-center rounded-full border transition-colors cursor-pointer ${
              isDark
                ? 'bg-white/[0.05] border-white/10 text-slate-300 hover:text-white'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-black'
            }`}
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald-400 px-1 text-[10px] font-bold text-black tabular-nums">
                {cartCount}
              </span>
            )}
          </button>

          {/* Get in touch button matching user request */}
          <button
            onClick={onOpenConsultation}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer shadow-sm ${
              isDark
                ? 'bg-white text-black hover:bg-slate-200'
                : 'bg-slate-950 text-white hover:bg-slate-800'
            }`}
          >
            <span>Get in touch</span>
            <ArrowUpRight className="h-3 w-3" />
          </button>
        </div>

      </div>

      {/* Mobile nav bar pills */}
      <div className="lg:hidden fixed bottom-4 inset-x-3 z-50 flex justify-center pointer-events-none">
        <div className={`pointer-events-auto flex items-center gap-1 px-3 py-2 rounded-full border shadow-2xl backdrop-blur-xl overflow-x-auto no-scrollbar max-w-md ${
          isDark ? 'bg-slate-950/85 border-white/10 text-white' : 'bg-white/90 border-slate-200 text-slate-900'
        }`}>
          {[
            { id: 'overview', label: 'Home' },
            { id: 'services', label: 'Services' },
            { id: 'predictive-ai', label: 'AI Twin' },
            { id: 'smart-iot', label: 'IoT' },
            { id: 'hardware-shop', label: 'Hardware' },
            { id: 'estimator', label: 'Estimator' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id as NavigationTab)}
              className={`px-3 py-1 rounded-full text-[11px] font-medium whitespace-nowrap cursor-pointer ${
                currentTab === tab.id
                  ? isDark ? 'bg-white/20 text-white font-bold' : 'bg-slate-900 text-white font-bold'
                  : isDark ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
