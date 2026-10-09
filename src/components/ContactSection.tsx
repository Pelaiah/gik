import React, { useState } from 'react';
import { Mail, Phone, MapPin, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface ContactSectionProps {
  theme?: 'dark' | 'light';
  initialScope?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  theme = 'dark',
  initialScope = ''
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: initialScope,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const isDark = theme === 'dark';

  return (
    <section id="contact" className={`relative overflow-hidden py-24 sm:py-32 transition-colors duration-300 ${
      isDark ? 'bg-black text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Top emerald ambient light beam matching picture 2 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-80 bg-gradient-to-b from-emerald-500/20 via-emerald-600/5 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Circuit lines in corners */}
      <div className="absolute top-12 left-6 w-48 h-32 opacity-25 pointer-events-none hidden lg:block">
        <svg viewBox="0 0 200 120" fill="none" className="w-full h-full stroke-emerald-400">
          <path d="M 0 20 L 70 20 L 110 60 L 190 60" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="190" cy="60" r="3" fill="#34d399" />
          <path d="M 30 0 L 30 70 L 60 100 L 140 100" strokeWidth="1.5" />
          <circle cx="140" cy="100" r="3" fill="#34d399" />
        </svg>
      </div>

      <div className="absolute top-12 right-6 w-48 h-32 opacity-25 pointer-events-none hidden lg:block">
        <svg viewBox="0 0 200 120" fill="none" className="w-full h-full stroke-emerald-400">
          <path d="M 200 20 L 130 20 L 90 60 L 10 60" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="10" cy="60" r="3" fill="#34d399" />
          <path d="M 170 0 L 170 70 L 140 100 L 60 100" strokeWidth="1.5" />
          <circle cx="60" cy="100" r="3" fill="#34d399" />
        </svg>
      </div>

      {/* Large faint background text "CONTACT" matching picture 2 */}
      <div
        aria-hidden="true"
        className={`absolute top-16 left-1/2 -translate-x-1/2 select-none pointer-events-none text-[8rem] sm:text-[12rem] lg:text-[16rem] font-black tracking-widest leading-none uppercase ${
          isDark ? 'text-white/[0.03]' : 'text-slate-900/[0.03]'
        }`}
        style={{ fontFamily: 'var(--font-display, Syne, sans-serif)' }}
      >
        CONTACT
      </div>

      <div className="relative w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        
        {/* Subtitle pill tag matching picture 2 */}
        <div className="mb-6">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border backdrop-blur-md ${
            isDark
              ? 'bg-white/[0.04] border-white/10 text-slate-300'
              : 'bg-white/80 border-slate-200 text-slate-700 shadow-sm'
          }`}>
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Contact</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Heading + 3 Frosted Action Cards */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2
                className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
                style={{ fontFamily: 'var(--font-display, Syne, sans-serif)' }}
              >
                Get in touch
              </h2>
              <p className={`mt-3 text-sm sm:text-base leading-relaxed ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}>
                Have questions or ready to transform your business with AI automation, IoT integration, and custom cloud architecture?
              </p>
            </div>

            {/* 3 Sleek Cards matching picture 2 */}
            <div className="space-y-3.5">
              
              {/* Card 1: Email */}
              <a
                href="mailto:engineering@gikspot.com"
                className={`group flex items-center justify-between p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                  isDark
                    ? 'bg-slate-900/40 hover:bg-slate-900/80 border-white/10 hover:border-emerald-500/40 shadow-lg'
                    : 'bg-white/90 hover:bg-white border-slate-200 hover:border-emerald-500/40 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${
                    isDark
                      ? 'bg-white/[0.04] border-white/10 text-slate-300 group-hover:text-emerald-400 group-hover:border-emerald-500/30'
                      : 'bg-slate-100 border-slate-200 text-slate-700'
                  }`}>
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      Email us
                    </div>
                    <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      engineering@gikspot.com
                    </div>
                  </div>
                </div>
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                  isDark ? 'bg-white/[0.04] text-slate-400 group-hover:text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </a>

              {/* Card 2: Phone */}
              <a
                href="tel:+18004457768"
                className={`group flex items-center justify-between p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                  isDark
                    ? 'bg-slate-900/40 hover:bg-slate-900/80 border-white/10 hover:border-emerald-500/40 shadow-lg'
                    : 'bg-white/90 hover:bg-white border-slate-200 hover:border-emerald-500/40 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${
                    isDark
                      ? 'bg-white/[0.04] border-white/10 text-slate-300 group-hover:text-emerald-400 group-hover:border-emerald-500/30'
                      : 'bg-slate-100 border-slate-200 text-slate-700'
                  }`}>
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      Call us
                    </div>
                    <div className={`text-sm font-medium font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      +1 (800) 445-7768
                    </div>
                  </div>
                </div>
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                  isDark ? 'bg-white/[0.04] text-slate-400 group-hover:text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </a>

              {/* Card 3: Location */}
              <div
                className={`flex items-center justify-between p-4 rounded-2xl border ${
                  isDark
                    ? 'bg-slate-900/40 border-white/10 shadow-lg'
                    : 'bg-white/90 border-slate-200 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${
                    isDark
                      ? 'bg-white/[0.04] border-white/10 text-slate-300'
                      : 'bg-slate-100 border-slate-200 text-slate-700'
                  }`}>
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      Our location
                    </div>
                    <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      420 Innovation Pkwy, Silicon Valley, CA
                    </div>
                  </div>
                </div>
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                  isDark ? 'bg-white/[0.04] text-slate-400' : 'bg-slate-100 text-slate-600'
                }`}>
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Dark Frosted Glass Form with Crisp White Submit Button */}
          <div className="lg:col-span-7">
            <div className={`rounded-3xl border p-6 sm:p-8 backdrop-blur-2xl shadow-2xl ${
              isDark
                ? 'bg-slate-950/70 border-white/10'
                : 'bg-white/80 border-slate-200 shadow-slate-200'
            }`}>
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Message Dispatched
                  </h3>
                  <p className={`text-sm max-w-md mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Thank you, {formData.name || 'there'}! A systems engineer from Gikspot will respond to your inquiry at <span className="text-emerald-400">{formData.email}</span> within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', message: '' });
                    }}
                    className={`mt-4 px-4 py-2 text-xs font-semibold rounded-xl border ${
                      isDark
                        ? 'border-white/10 bg-white/[0.04] text-slate-300 hover:text-white'
                        : 'border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Name Input */}
                  <div>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Name"
                      className={`w-full px-4 py-3.5 rounded-2xl border text-sm transition-all focus:outline-none ${
                        isDark
                          ? 'bg-slate-900/60 border-white/10 text-white placeholder:text-slate-500 focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/20'
                          : 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
                      }`}
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Email"
                      className={`w-full px-4 py-3.5 rounded-2xl border text-sm transition-all focus:outline-none ${
                        isDark
                          ? 'bg-slate-900/60 border-white/10 text-white placeholder:text-slate-500 focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/20'
                          : 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
                      }`}
                    />
                  </div>

                  {/* Message Input */}
                  <div>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Message"
                      className={`w-full px-4 py-3.5 rounded-2xl border text-sm transition-all focus:outline-none resize-none ${
                        isDark
                          ? 'bg-slate-900/60 border-white/10 text-white placeholder:text-slate-500 focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/20'
                          : 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
                      }`}
                    />
                  </div>

                  {/* Submit Button (Crisp White matching picture 2) */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 rounded-2xl bg-white text-slate-950 font-bold text-sm hover:bg-slate-100 active:scale-[0.99] transition-all shadow-xl shadow-white/5 cursor-pointer"
                    >
                      Submit
                    </button>
                  </div>

                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
