import React, { useState } from 'react';
import { X, MessageSquarePlus } from 'lucide-react';
import { useRecruiterStore } from '../../store/recruiterStore';

interface AddCandidateNoteModalProps {
  applicationId: string;
  candidateName: string;
  isOpen: boolean;
  onClose: () => void;
}

export const AddCandidateNoteModal: React.FC<AddCandidateNoteModalProps> = ({
  applicationId,
  candidateName,
  isOpen,
  onClose
}) => {
  const { addRecruiterNote } = useRecruiterStore();
  const [noteText, setNoteText] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    addRecruiterNote(applicationId, noteText.trim());
    setNoteText('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
              <MessageSquarePlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Add Recruiter Note</h3>
              <p className="text-xs text-slate-500">Internal notes for {candidateName}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Note Content
            </label>
            <textarea
              rows={4}
              required
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Record candidate screening observations, salary expectations, or interview takeaways..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 text-xs font-medium hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium rounded-lg shadow-xs"
            >
              Save Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
