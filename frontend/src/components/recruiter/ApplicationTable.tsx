import React from 'react';
import { Eye, Edit3, Calendar, MessageSquare, Star, CheckCircle, XCircle, ChevronRight } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Application, ApplicationStage } from '../../types/recruiter.types';
import { useRecruiterStore } from '../../store/recruiterStore';

interface ApplicationTableProps {
  applications: Application[];
  onOpenStageModal: (app: Application) => void;
  onOpenNoteModal: (app: Application) => void;
  onOpenScheduleInterview: (app: Application) => void;
}

export const ApplicationTable: React.FC<ApplicationTableProps> = ({
  applications,
  onOpenStageModal,
  onOpenNoteModal,
  onOpenScheduleInterview
}) => {
  const navigate = useNavigate();
  const { organizationId = 'clyptus' } = useParams<{ organizationId: string }>();
  const { rejectCandidate } = useRecruiterStore();

  const getStageBadge = (stage: ApplicationStage) => {
    switch (stage) {
      case 'Applied':
        return <span className="px-2.5 py-0.5 text-xs font-semibold badge-applied rounded-full">Applied</span>;
      case 'Screening':
        return <span className="px-2.5 py-0.5 text-xs font-semibold badge-screening rounded-full">Screening</span>;
      case 'Shortlisted':
        return <span className="px-2.5 py-0.5 text-xs font-semibold badge-shortlisted rounded-full">Shortlisted</span>;
      case 'Interview':
        return <span className="px-2.5 py-0.5 text-xs font-semibold badge-interview rounded-full">Interview</span>;
      case 'Offer':
        return <span className="px-2.5 py-0.5 text-xs font-semibold badge-offer rounded-full">Offer Extended</span>;
      case 'Hired':
        return <span className="px-2.5 py-0.5 text-xs font-semibold badge-hired rounded-full">Hired</span>;
      case 'Rejected':
        return <span className="px-2.5 py-0.5 text-xs font-semibold badge-rejected rounded-full">Rejected</span>;
    }
  };

  if (applications.length === 0) {
    return (
      <div className="bg-white p-12 text-center rounded-xl border border-slate-200">
        <p className="text-slate-500 font-medium text-sm">No applications found matching filters.</p>
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
              <th className="py-3.5 px-4">Job Title</th>
              <th className="py-3.5 px-4">Department</th>
              <th className="py-3.5 px-4">Applied Date</th>
              <th className="py-3.5 px-4 text-center">Match Score</th>
              <th className="py-3.5 px-4">Current Stage</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {applications.map((app) => (
              <tr key={app.id} className="hover:bg-slate-50/60 transition-colors">
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <img src={app.candidateAvatar} alt={app.candidateName} className="w-9 h-9 rounded-full object-cover" />
                    <div>
                      <div
                        onClick={() => navigate(`/org/${organizationId}/recruiter/candidates/${app.candidateId}`)}
                        className="font-bold text-slate-900 hover:text-blue-600 cursor-pointer text-sm"
                      >
                        {app.candidateName}
                      </div>
                      <div className="text-[11px] text-slate-400 font-medium">{app.candidateEmail}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4 font-semibold text-slate-800">{app.jobTitle}</td>
                <td className="py-3.5 px-4 font-medium text-slate-600">{app.department}</td>
                <td className="py-3.5 px-4 text-slate-500 font-medium">{app.appliedDate}</td>
                <td className="py-3.5 px-4 text-center">
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 font-bold rounded-lg border border-emerald-100">
                    {app.matchScore}%
                  </span>
                </td>
                <td className="py-3.5 px-4">{getStageBadge(app.stage)}</td>
                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => onOpenStageModal(app)}
                      className="px-2.5 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold rounded-lg text-xs flex items-center gap-1"
                    >
                      Stage <ChevronRight className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => onOpenScheduleInterview(app)}
                      title="Schedule Interview"
                      className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg"
                    >
                      <Calendar className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onOpenNoteModal(app)}
                      title="Add Note"
                      className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Reject candidate ${app.candidateName}?`)) {
                          rejectCandidate(app.id);
                        }
                      }}
                      title="Reject Candidate"
                      className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
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
