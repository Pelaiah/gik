import React, { useState } from 'react';
import { X, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialScope?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  initialScope = ''
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    engagementType: 'Enterprise Architecture & Cloud',
    budgetRange: '$50,000 – $150,000',
    timeline: 'Immediate (Within 4 Weeks)',
    scopeNotes: initialScope,
    requireNda: true,
  });

  const [submitted, setSubmitted] = useState(false);
  const [referenceTicket, setReferenceTicket] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ticketId = `GIK-${Math.floor(10000 + Math.random() * 90000)}`;
    setReferenceTicket(ticketId);
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8 space-y-6 shadow-2xl my-8">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div>
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
              Technical Advisory &amp; Systems Scoping
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
              Initiate Technical Consultation
            </h3>
          </div>
          <button
            onClick={handleResetAndClose}
            className="text-slate-400 hover:text-white text-lg font-bold p-1 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="h-12 w-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="h-6 w-6" />
            </div>

            <h4 className="text-lg font-bold text-white">Consultation Request Queued</h4>
            <p className="text-xs text-slate-300 leading-relaxed max-w-md mx-auto">
              Your technical dossier <span className="font-mono text-cyan-400 font-bold">{referenceTicket}</span> has been assigned to a Principal Systems Architect at Gikspot.
            </p>

            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 text-left text-xs font-mono space-y-2">
              <div className="text-slate-400">Target Contact: <span className="text-white">{formData.fullName} ({formData.company})</span></div>
              <div className="text-slate-400">Engagement Area: <span className="text-white">{formData.engagementType}</span></div>
              <div className="text-slate-400">NDA Enforced: <span className="text-emerald-400">{formData.requireNda ? 'Yes (Mutual NDA generated)' : 'Standard'}</span></div>
              <div className="text-slate-400">Discovery SLA: <span className="text-cyan-400">Architect call within 1 business day</span></div>
            </div>

            <button
              onClick={handleResetAndClose}
              className="w-full py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors cursor-pointer"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-300 mb-1">Full Name *</label>
                <input
                  required
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Elena Rostova"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">Corporate Email *</label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="elena@enterprise.io"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-300 mb-1">Company / Organization *</label>
                <input
                  required
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Vanguard Energy Group"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">Phone / Mobile (Optional)</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 019-2834"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-300 mb-1">Primary Scope Focus</label>
                <select
                  value={formData.engagementType}
                  onChange={(e) => setFormData({ ...formData, engagementType: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="Enterprise Architecture & Cloud">Enterprise Architecture &amp; Cloud</option>
                  <option value="Custom SaaS Development">Custom SaaS Development</option>
                  <option value="Industrial AI Predictive Maintenance">Industrial AI Predictive Maintenance</option>
                  <option value="Smart Homes & IoT Facilities">Smart Homes &amp; IoT Facilities</option>
                  <option value="Startup Acceleration & Workflow">Startup Acceleration &amp; Workflow</option>
                  <option value="Hardware Vendor Volume RFQ">Hardware Vendor Volume RFQ</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">Target Horizon</label>
                <select
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="Immediate (Within 4 Weeks)">Immediate (Within 4 Weeks)</option>
                  <option value="Q3/Q4 Strategic Planning">Q3/Q4 Strategic Planning</option>
                  <option value="Proof of Concept (POC)">Proof of Concept (POC)</option>
                  <option value="Hardware Vendor Evaluation">Hardware Vendor Evaluation</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-300 mb-1">Project Details / Scope Summary</label>
              <textarea
                rows={3}
                value={formData.scopeNotes}
                onChange={(e) => setFormData({ ...formData, scopeNotes: e.target.value })}
                placeholder="Describe your existing technical bottlenecks, required protocols, target scale, or specific hardware needs..."
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="nda-checkbox"
                checked={formData.requireNda}
                onChange={(e) => setFormData({ ...formData, requireNda: e.target.checked })}
                className="h-4 w-4 rounded border-slate-800 bg-slate-950 text-cyan-500 focus:ring-0 cursor-pointer"
              />
              <label htmlFor="nda-checkbox" className="text-xs text-slate-400 cursor-pointer flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-cyan-400" />
                <span>Require mutual Non-Disclosure Agreement (NDA) prior to technical deep-dive</span>
              </label>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end gap-3">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors cursor-pointer shadow-sm"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Submit Technical Scope</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
