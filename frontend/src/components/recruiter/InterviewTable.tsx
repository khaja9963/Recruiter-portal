import React from 'react';
import { Calendar, Clock, Video, User, ExternalLink, MessageSquare } from 'lucide-react';
import { Interview, InterviewStatus } from '../../types/recruiter.types';
import { useRecruiterStore } from '../../store/recruiterStore';

interface InterviewTableProps {
  interviews: Interview[];
  onOpenFeedback: (interview: Interview) => void;
}

export const InterviewTable: React.FC<InterviewTableProps> = ({ interviews, onOpenFeedback }) => {
  const { updateInterviewStatus } = useRecruiterStore();

  const getStatusBadge = (status: InterviewStatus) => {
    switch (status) {
      case 'Scheduled':
        return <span className="px-2.5 py-0.5 text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 rounded-full">Scheduled</span>;
      case 'Completed':
        return <span className="px-2.5 py-0.5 text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">Completed</span>;
      case 'Cancelled':
        return <span className="px-2.5 py-0.5 text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200 rounded-full">Cancelled</span>;
      case 'Rescheduled':
        return <span className="px-2.5 py-0.5 text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 rounded-full">Rescheduled</span>;
    }
  };

  if (interviews.length === 0) {
    return (
      <div className="bg-white p-12 text-center rounded-xl border border-slate-200">
        <p className="text-slate-500 font-medium text-sm">No interviews found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider">
            <tr>
              <th className="py-3.5 px-4">Candidate</th>
              <th className="py-3.5 px-4">Job & Round</th>
              <th className="py-3.5 px-4">Interviewer</th>
              <th className="py-3.5 px-4">Date & Time</th>
              <th className="py-3.5 px-4">Type</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {interviews.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <img src={item.candidateAvatar} alt={item.candidateName} className="w-9 h-9 rounded-full object-cover" />
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{item.candidateName}</div>
                      <div className="text-[11px] text-slate-400">{item.candidateEmail}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <div className="font-semibold text-slate-800">{item.jobTitle}</div>
                  <div className="text-[11px] text-indigo-600 font-bold">{item.roundName}</div>
                </td>
                <td className="py-3.5 px-4 font-medium text-slate-700">{item.interviewerName}</td>
                <td className="py-3.5 px-4 font-medium text-slate-700">
                  {item.date}
                  <div className="text-[11px] text-slate-400">{item.time}</div>
                </td>
                <td className="py-3.5 px-4">{item.type}</td>
                <td className="py-3.5 px-4">{getStatusBadge(item.status)}</td>
                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onOpenFeedback(item)}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-xs flex items-center gap-1"
                    >
                      <MessageSquare className="w-3.5 h-3.5" /> Feedback
                    </button>
                    {item.status === 'Scheduled' && (
                      <button
                        onClick={() => updateInterviewStatus(item.id, 'Completed')}
                        className="px-2.5 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-semibold rounded-lg text-xs"
                      >
                        Complete
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
