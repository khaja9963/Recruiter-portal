import React, { useState } from 'react';
import { X, GitCommit, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useRecruiterStore } from '../../store/recruiterStore';
import { Application, ApplicationStage } from '../../types/recruiter.types';

interface ChangeStageModalProps {
  application: Application | null;
  isOpen: boolean;
  onClose: () => void;
}

const STAGES: { stage: ApplicationStage; label: string; desc: string }[] = [
  { stage: 'Applied', label: 'Applied', desc: 'Initial application submitted' },
  { stage: 'Screening', label: 'Screening', desc: 'Under recruiter resume review' },
  { stage: 'Shortlisted', label: 'Shortlisted', desc: 'Approved for interview loop' },
  { stage: 'Interview', label: 'Interview', desc: 'Interview rounds in progress' },
  { stage: 'Offer', label: 'Offer', desc: 'Offer extended to candidate' },
  { stage: 'Hired', label: 'Hired', desc: 'Candidate accepted offer' },
  { stage: 'Rejected', label: 'Rejected', desc: 'Candidate application declined' }
];

export const ChangeStageModal: React.FC<ChangeStageModalProps> = ({
  application,
  isOpen,
  onClose
}) => {
  const { updateApplicationStage } = useRecruiterStore();
  const [selectedStage, setSelectedStage] = useState<ApplicationStage>(
    application?.stage || 'Screening'
  );

  if (!isOpen || !application) return null;

  const handleSave = () => {
    updateApplicationStage(application.id, selectedStage);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
              <GitCommit className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Change Application Stage</h3>
              <p className="text-xs text-slate-500">{application.candidateName}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-3">
          <p className="text-xs text-slate-600 mb-2">
            Select the new recruitment pipeline stage for this application:
          </p>
          <div className="space-y-2">
            {STAGES.map((s) => {
              const isSelected = selectedStage === s.stage;
              const isCurrent = application.stage === s.stage;

              return (
                <button
                  key={s.stage}
                  onClick={() => setSelectedStage(s.stage)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/60 ring-1 ring-blue-500'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                      }`}
                    >
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-800 flex items-center gap-2">
                        {s.label}
                        {isCurrent && (
                          <span className="px-1.5 py-0.5 text-[10px] bg-slate-200 text-slate-700 rounded-xs font-normal">
                            Current Stage
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500">{s.desc}</div>
                    </div>
                  </div>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 text-xs font-medium hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg shadow-xs"
            >
              Update Stage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
