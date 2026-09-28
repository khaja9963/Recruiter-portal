import React, { useState } from 'react';
import { X, Calendar, Clock, Video, User, Briefcase, Link, FileText } from 'lucide-react';
import { useRecruiterStore } from '../../store/recruiterStore';
import { InterviewType } from '../../types/recruiter.types';

interface ScheduleInterviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillCandidateId?: string;
  prefillJobId?: string;
  prefillApplicationId?: string;
}

export const ScheduleInterviewModal: React.FC<ScheduleInterviewModalProps> = ({
  isOpen,
  onClose,
  prefillCandidateId,
  prefillJobId,
  prefillApplicationId
}) => {
  const { candidates, jobs, applications, scheduleInterview } = useRecruiterStore();

  const initialApp = applications.find((a) => a.id === prefillApplicationId) || applications[0];
  const [selectedAppId, setSelectedAppId] = useState(initialApp?.id || '');
  const [roundName, setRoundName] = useState('Technical Screening');
  const [interviewerName, setInterviewerName] = useState('Sarah Jenkins');
  const [interviewerEmail, setInterviewerEmail] = useState('sarah.jenkins@clyptus.com');
  const [date, setDate] = useState('2026-09-30');
  const [time, setTime] = useState('02:00 PM - 03:00 PM');
  const [type, setType] = useState<InterviewType>('Video');
  const [meetingLink, setMeetingLink] = useState('https://meet.google.com/xyz-recruiter-demo');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const currentApp = applications.find((a) => a.id === selectedAppId) || initialApp;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentApp) return;

    scheduleInterview({
      applicationId: currentApp.id,
      candidateId: currentApp.candidateId,
      jobId: currentApp.jobId,
      candidateName: currentApp.candidateName,
      candidateAvatar: currentApp.candidateAvatar,
      candidateEmail: currentApp.candidateEmail,
      jobTitle: currentApp.jobTitle,
      roundName,
      interviewerName,
      interviewerEmail,
      date,
      time,
      type,
      meetingLink,
      notes
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Schedule Interview</h3>
              <p className="text-xs text-slate-500">Set up a new candidate interview round</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors">
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
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-800 bg-white"
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
                Interview Round
              </label>
              <input
                type="text"
                value={roundName}
                onChange={(e) => setRoundName(e.target.value)}
                required
                placeholder="e.g. System Design / HR"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Interview Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as InterviewType)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Video">Video Call</option>
                <option value="Onsite">On-site Office</option>
                <option value="Phone">Phone Call</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Interviewer Name
              </label>
              <input
                type="text"
                value={interviewerName}
                onChange={(e) => setInterviewerName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Interviewer Email
              </label>
              <input
                type="email"
                value={interviewerEmail}
                onChange={(e) => setInterviewerEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Time Slot
              </label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                placeholder="02:00 PM - 03:00 PM"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {type === 'Video' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Meeting Link
              </label>
              <input
                type="url"
                value={meetingLink}
                onChange={(e) => setMeetingLink(e.target.value)}
                placeholder="https://meet.google.com/..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Instructions / Notes
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Instructions for the interviewer or preparation notes for the candidate..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-100 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-xs transition-colors"
            >
              Schedule Interview
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
