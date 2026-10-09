import React, { useState } from 'react';
import { Trophy, Gamepad2, Monitor, Users, CheckCircle2, ArrowRight } from 'lucide-react';
import { TOURNAMENT_LIST } from '../data/mockData';
import { TournamentItem } from '../types';

interface FutureGamingArenaProps {
  theme?: 'dark' | 'light';
}

export const FutureGamingArena: React.FC<FutureGamingArenaProps> = ({ theme = 'dark' }) => {
  const isDark = theme === 'dark';
  const [selectedTournament, setSelectedTournament] = useState<TournamentItem | null>(null);
  const [teamForm, setTeamForm] = useState({
    teamName: '',
    captainName: '',
    email: '',
    discordId: '',
    country: ''
  });
  const [submittedTourney, setSubmittedTourney] = useState<string | null>(null);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTournament) {
      setSubmittedTourney(selectedTournament.title);
      setSelectedTournament(null);
    }
  };

  return (
    <section className={`py-24 border-b transition-colors duration-300 ${
      isDark ? 'bg-black text-white border-white/10' : 'bg-slate-50 text-slate-900 border-slate-200'
    }`}>
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border backdrop-blur-md mb-4 ${
            isDark
              ? 'bg-white/[0.04] border-white/10 text-slate-300'
              : 'bg-white/80 border-slate-200 text-slate-700 shadow-sm'
          }`}>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Future Roadmap Division</span>
            <span aria-hidden="true">·</span>
            <span>2027 Strategic Horizon</span>
          </div>
          <h2
            className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
            style={{ fontFamily: 'var(--font-display, Syne, sans-serif)' }}
          >
            Gikspot Arena: Esports Engineering &amp; Tournament Hosting
          </h2>
          <p className={`text-sm sm:text-base mt-2 max-w-2xl ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Leveraging our low-latency systems engineering to build custom competition-grade PC hardware, private high-tick LAN networks, and premier esports tournaments.
          </p>
        </div>

        {/* Visual Showcase Banner */}
        <div className="mb-12 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 relative rounded-xl overflow-hidden border border-slate-800 aspect-[16/9] bg-slate-950 shadow-2xl">
              <img
                src="/src/assets/images/gaming_arena_future_1791225135497.jpg"
                alt="Gikspot Future Esports Arena and Competition Gaming Rigs"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-slate-300">
                <span className="font-semibold text-white">Gikspot Colosseum Prototype</span>
                <span className="text-cyan-400 font-mono">128-Tick Fiber Backbone</span>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                Beyond Standard PC Gaming
              </div>
              <h3 className="text-2xl font-bold text-white">
                Purpose-built tournament infrastructure with zero frame drops.
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                As Gikspot expands, our hardware engineering lab is developing custom liquid-cooled tournament rigs and custom input-polling drivers designed to eliminate jitter in competitive play. Our arena initiative will bring regional technology cups and LAN invitationals to emerging tech hubs.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-lg border border-slate-800 bg-slate-950">
                  <div className="flex items-center gap-1.5 font-semibold text-white">
                    <Monitor className="h-4 w-4 text-cyan-400" />
                    <span>Custom Rigs</span>
                  </div>
                  <div className="text-slate-400 text-[11px] mt-1">Direct-die cooling, binned silicon, tuned BIOS</div>
                </div>

                <div className="p-3 rounded-lg border border-slate-800 bg-slate-950">
                  <div className="flex items-center gap-1.5 font-semibold text-white">
                    <Gamepad2 className="h-4 w-4 text-cyan-400" />
                    <span>LAN Infrastructure</span>
                  </div>
                  <div className="text-slate-400 text-[11px] mt-1">Isolated sub-millisecond local routing</div>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Confirmation Banner if team registered */}
        {submittedTourney && (
          <div className="mb-8 p-4 rounded-xl border border-emerald-800/80 bg-emerald-950/20 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
              <div className="text-xs text-slate-200">
                <span className="font-bold text-white">Registration Application Logged:</span> Your team is queued for qualification in <span className="text-cyan-400 font-semibold">{submittedTourney}</span>. Rulebook sent to captain.
              </div>
            </div>
            <button
              onClick={() => setSubmittedTourney(null)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Upcoming Tournaments Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">
              Upcoming Invitational Tournaments
            </h3>
            <span className="text-xs text-slate-400 font-mono">2027 Season Calendar</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TOURNAMENT_LIST.map((tourney) => (
              <div
                key={tourney.id}
                className="rounded-xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900/80 hover:border-slate-700 transition-all p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="font-semibold text-cyan-400">{tourney.game}</span>
                    <span className="text-[11px] text-slate-500">{tourney.dates}</span>
                  </div>

                  <h4 className="text-base font-bold text-white leading-snug">
                    {tourney.title}
                  </h4>

                  <div className="mt-3 space-y-1 text-xs text-slate-400 font-mono">
                    <div className="text-emerald-400 font-bold text-sm">
                      Prize Pool: {tourney.prizePool}
                    </div>
                    <div>Format: {tourney.format}</div>
                    <div className="flex items-center gap-1.5 pt-1 text-slate-300">
                      <Users className="h-3.5 w-3.5 text-cyan-400" />
                      <span>{tourney.registeredTeams} / {tourney.maxTeams} Teams Seeded</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
                    <div className="text-slate-500 font-semibold uppercase text-[10px]">Mandatory Official Rig:</div>
                    <div className="text-slate-300 mt-0.5">{tourney.rigSpecs}</div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800">
                  <button
                    onClick={() => setSelectedTournament(tourney)}
                    className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors cursor-pointer"
                  >
                    <Trophy className="h-3.5 w-3.5" />
                    <span>Register Team for Qualifiers</span>
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Tournament Registration Modal */}
      {selectedTournament && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8 space-y-5 shadow-2xl">
            
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div>
                <div className="text-xs font-mono text-cyan-400 uppercase">
                  LAN Invitational Registration
                </div>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  {selectedTournament.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedTournament(null)}
                className="text-slate-400 hover:text-white text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs text-slate-300 mb-1">Team / Organization Name *</label>
                <input
                  required
                  type="text"
                  value={teamForm.teamName}
                  onChange={(e) => setTeamForm({ ...teamForm, teamName: e.target.value })}
                  placeholder="e.g. Apex Vanguard Esports"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">Team Captain Name *</label>
                <input
                  required
                  type="text"
                  value={teamForm.captainName}
                  onChange={(e) => setTeamForm({ ...teamForm, captainName: e.target.value })}
                  placeholder="e.g. Jordan Vance"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-300 mb-1">Official Email *</label>
                  <input
                    required
                    type="email"
                    value={teamForm.email}
                    onChange={(e) => setTeamForm({ ...teamForm, email: e.target.value })}
                    placeholder="captain@team.gg"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-300 mb-1">Discord ID / Handle</label>
                  <input
                    type="text"
                    value={teamForm.discordId}
                    onChange={(e) => setTeamForm({ ...teamForm, discordId: e.target.value })}
                    placeholder="jordan_apex#0001"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="p-3 rounded-lg border border-slate-800 bg-slate-950 text-[11px] text-slate-400">
                Tournament machines, custom peripheral drivers, and high-frequency displays are provided on-site by Gikspot Engineering.
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedTournament(null)}
                  className="px-3 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors cursor-pointer"
                >
                  Submit Team Application
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </section>
  );
};
