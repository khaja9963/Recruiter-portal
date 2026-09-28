import React, { useState } from 'react';
import { X, DollarSign, Calendar, Gift, FileText, Send } from 'lucide-react';
import { useRecruiterStore } from '../../store/recruiterStore';
import { Application } from '../../types/recruiter.types';

interface CreateOfferModalProps {
  application?: Application | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CreateOfferModal: React.FC<CreateOfferModalProps> = ({
  application,
  isOpen,
  onClose
}) => {
  const { applications, createOffer } = useRecruiterStore();
  const targetApp = application || applications[0];

  const [selectedAppId, setSelectedAppId] = useState(targetApp?.id || '');
  const [baseSalary, setBaseSalary] = useState<number>(175000);
  const [bonus, setBonus] = useState<number>(15000);
  const [equity, setEquity] = useState('10,000 RSUs (4-year vest)');
  const [joiningDate, setJoiningDate] = useState('2026-10-15');
  const [notes, setNotes] = useState('Standard 4-year vesting schedule with 1-year cliff.');

  if (!isOpen) return null;

  const currentApp = applications.find((a) => a.id === selectedAppId) || targetApp;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentApp) return;

    createOffer({
      applicationId: currentApp.id,
      candidateId: currentApp.candidateId,
      jobId: currentApp.jobId,
      candidateName: currentApp.candidateName,
      candidateAvatar: currentApp.candidateAvatar,
      candidateEmail: currentApp.candidateEmail,
      jobTitle: currentApp.jobTitle,
      department: currentApp.department,
      joiningDate,
      baseSalary,
      bonus,
      equity,
      currency: 'USD',
      notes
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Generate Job Offer</h3>
              <p className="text-xs text-slate-500">Draft compensation package for candidate</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-sm max-h-[80vh] overflow-y-auto">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Select Candidate & Job
            </label>
            <select
              value={selectedAppId}
              onChange={(e) => setSelectedAppId(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-xs bg-white"
            >
              {applications.map((app) => (
                <option key={app.id} value={app.id}>
                  {app.candidateName} — {app.jobTitle}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Base Salary (USD/yr)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 font-bold">$</span>
                <input
                  type="number"
                  required
                  value={baseSalary}
                  onChange={(e) => setBaseSalary(Number(e.target.value))}
                  className="w-full pl-7 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Signing Bonus (USD)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 font-bold">$</span>
                <input
                  type="number"
                  value={bonus}
                  onChange={(e) => setBonus(Number(e.target.value))}
                  className="w-full pl-7 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-xs"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Equity / RSUs
              </label>
              <input
                type="text"
                value={equity}
                onChange={(e) => setEquity(e.target.value)}
                placeholder="e.g. 10,000 RSUs"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Target Start Date
              </label>
              <input
                type="date"
                required
                value={joiningDate}
                onChange={(e) => setJoiningDate(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Offer Package Notes
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Vesting schedule, relocation allowance, benefits..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-xs"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 text-xs font-medium hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium rounded-lg shadow-xs flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" /> Send Offer Letter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
