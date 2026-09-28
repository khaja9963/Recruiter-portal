import React from 'react';
import { Calendar, Clock, Video, User, Star, MessageSquare, CheckCircle, ExternalLink } from 'lucide-react';
import { Interview, InterviewStatus } from '../../types/recruiter.types';
import { useRecruiterStore } from '../../store/recruiterStore';

interface InterviewCardProps {
  interview: Interview;
  onOpenFeedback: (interview: Interview) => void;
}

export const InterviewCard: React.FC<InterviewCardProps> = ({ interview, onOpenFeedback }) => {
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

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <img src={interview.candidateAvatar} alt={interview.candidateName} className="w-10 h-10 rounded-full object-cover" />
            <div>
              <h4 className="font-bold text-slate-900 text-sm">{interview.candidateName}</h4>
              <p className="text-xs text-slate-500 font-medium">{interview.jobTitle}</p>
            </div>
          </div>
          {getStatusBadge(interview.status)}
        </div>

        <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/60 mb-3 space-y-1.5 text-xs text-slate-700">
          <div className="font-bold text-indigo-700 flex items-center justify-between">
            <span>{interview.roundName}</span>
            <span className="text-[11px] font-normal text-slate-500">{interview.type} Call</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-600">
            <Calendar className="w-3.5 h-3.5 text-slate-400" /> {interview.date} ({interview.time})
          </div>
          <div className="flex items-center gap-1.5 text-slate-600">
            <User className="w-3.5 h-3.5 text-slate-400" /> Interviewer: {interview.interviewerName}
          </div>
        </div>

        {interview.meetingLink && (
          <a
            href={interview.meetingLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 mb-3"
          >
            <ExternalLink className="w-3.5 h-3.5" /> Join Google Meet Link
          </a>
        )}

        {interview.feedback && (
          <div className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-lg text-xs space-y-1">
            <div className="font-bold text-emerald-800 flex items-center justify-between">
              <span>Feedback Submitted</span>
              <span className="text-[11px] font-semibold">{interview.feedback.recommendation}</span>
            </div>
            <p className="text-emerald-700 text-[11px] line-clamp-2">"{interview.feedback.comments}"</p>
          </div>
        )}
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center gap-2 mt-4">
        <button
          onClick={() => onOpenFeedback(interview)}
          className="flex-1 py-1.5 px-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors flex items-center justify-center gap-1.5"
        >
          <MessageSquare className="w-3.5 h-3.5" /> {interview.feedback ? 'Edit Feedback' : 'Add Feedback'}
        </button>

        {interview.status === 'Scheduled' && (
          <button
            onClick={() => updateInterviewStatus(interview.id, 'Completed')}
            className="py-1.5 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-semibold rounded-lg"
          >
            Mark Done
          </button>
        )}
      </div>
    </div>
  );
};
