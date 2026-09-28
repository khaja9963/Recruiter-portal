import React from 'react';
import {
  MoreVertical,
  Calendar,
  MessageSquare,
  Star,
  ChevronRight,
  UserCheck,
  XCircle,
  Gift,
  FileText
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Application, ApplicationStage } from '../../types/recruiter.types';
import { useRecruiterStore } from '../../store/recruiterStore';

interface ApplicationPipelineProps {
  applications: Application[];
  onOpenStageModal: (app: Application) => void;
  onOpenNoteModal: (app: Application) => void;
  onOpenScheduleInterview: (app: Application) => void;
  onOpenCreateOffer: (app: Application) => void;
}

const PIPELINE_COLUMNS: { id: ApplicationStage; title: string; color: string; badge: string }[] = [
  { id: 'Applied', title: 'Applied', color: 'border-blue-500 bg-blue-50/40 text-blue-700', badge: 'badge-applied' },
  { id: 'Screening', title: 'Screening', color: 'border-purple-500 bg-purple-50/40 text-purple-700', badge: 'badge-screening' },
  { id: 'Shortlisted', title: 'Shortlisted', color: 'border-indigo-500 bg-indigo-50/40 text-indigo-700', badge: 'badge-shortlisted' },
  { id: 'Interview', title: 'Interview', color: 'border-cyan-500 bg-cyan-50/40 text-cyan-700', badge: 'badge-interview' },
  { id: 'Offer', title: 'Offer Extended', color: 'border-amber-500 bg-amber-50/40 text-amber-700', badge: 'badge-offer' },
  { id: 'Hired', title: 'Hired', color: 'border-emerald-500 bg-emerald-50/40 text-emerald-700', badge: 'badge-hired' }
];

export const ApplicationPipeline: React.FC<ApplicationPipelineProps> = ({
  applications,
  onOpenStageModal,
  onOpenNoteModal,
  onOpenScheduleInterview,
  onOpenCreateOffer
}) => {
  const navigate = useNavigate();
  const { organizationId = 'clyptus' } = useParams<{ organizationId: string }>();
  const { rejectCandidate } = useRecruiterStore();

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 pt-1">
      {PIPELINE_COLUMNS.map((column) => {
        const columnApps = applications.filter((a) => a.stage === column.id);

        return (
          <div
            key={column.id}
            className="w-72 flex-shrink-0 bg-slate-100/70 rounded-xl p-3 border border-slate-200/80 flex flex-col max-h-[75vh]"
          >
            {/* Column Header */}
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full border-2 ${column.color}`} />
                <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider">{column.title}</h4>
              </div>
              <span className="px-2 py-0.5 text-xs font-bold bg-white text-slate-700 rounded-full shadow-2xs border border-slate-200">
                {columnApps.length}
              </span>
            </div>

            {/* Column Cards */}
            <div className="space-y-3 overflow-y-auto flex-1 pr-1">
              {columnApps.length === 0 ? (
                <div className="py-8 text-center text-slate-400 text-xs font-medium border-2 border-dashed border-slate-200 rounded-lg">
                  No applications
                </div>
              ) : (
                columnApps.map((app) => (
                  <div
                    key={app.id}
                    className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-2xs hover:shadow-md transition-all group duration-200 space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={app.candidateAvatar}
                          alt={app.candidateName}
                          className="w-9 h-9 rounded-full object-cover border border-slate-200"
                        />
                        <div>
                          <h5
                            onClick={() => navigate(`/org/${organizationId}/recruiter/candidates/${app.candidateId}`)}
                            className="font-bold text-xs text-slate-900 hover:text-blue-600 cursor-pointer line-clamp-1"
                          >
                            {app.candidateName}
                          </h5>
                          <p className="text-[11px] text-slate-500 font-medium line-clamp-1">{app.jobTitle}</p>
                        </div>
                      </div>
                      <span className="px-1.5 py-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-700 rounded-md border border-emerald-100 flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-emerald-500 text-emerald-500" /> {app.matchScore}%
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
                      <span>Applied {app.appliedDate}</span>
                      {app.notes.length > 0 && (
                        <span className="flex items-center gap-1 text-purple-600">
                          <MessageSquare className="w-3 h-3" /> {app.notes.length} note
                        </span>
                      )}
                    </div>

                    {/* Quick Stage Actions */}
                    <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-1">
                      <button
                        onClick={() => onOpenStageModal(app)}
                        className="flex-1 py-1 px-2 bg-slate-50 hover:bg-blue-50 hover:text-blue-700 text-slate-600 text-[11px] font-medium rounded-md border border-slate-200 transition-colors flex items-center justify-center gap-1"
                      >
                        Stage <ChevronRight className="w-3 h-3" />
                      </button>

                      {column.id === 'Interview' && (
                        <button
                          onClick={() => onOpenScheduleInterview(app)}
                          title="Schedule Interview"
                          className="p-1.5 bg-cyan-50 text-cyan-700 hover:bg-cyan-100 rounded-md border border-cyan-200"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {column.id === 'Shortlisted' && (
                        <button
                          onClick={() => onOpenScheduleInterview(app)}
                          title="Schedule Interview"
                          className="p-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-md border border-indigo-200"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {(column.id === 'Interview' || column.id === 'Shortlisted') && (
                        <button
                          onClick={() => onOpenCreateOffer(app)}
                          title="Generate Offer"
                          className="p-1.5 bg-amber-50 text-amber-700 hover:bg-amber-100 rounded-md border border-amber-200"
                        >
                          <Gift className="w-3.5 h-3.5" />
                        </button>
                      )}

                      <button
                        onClick={() => onOpenNoteModal(app)}
                        title="Add Recruiter Note"
                        className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-md"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Reject application for ${app.candidateName}?`)) {
                            rejectCandidate(app.id);
                          }
                        }}
                        title="Reject Candidate"
                        className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-md"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
