import React from 'react';
import { Eye, Edit3, PauseCircle, PlayCircle, XCircle, Users, Calendar, MapPin, Briefcase } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Job, JobStatus } from '../../types/recruiter.types';
import { useRecruiterStore } from '../../store/recruiterStore';

interface JobCardProps {
  job: Job;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const navigate = useNavigate();
  const { organizationId = 'clyptus' } = useParams<{ organizationId: string }>();
  const { updateJobStatus } = useRecruiterStore();

  const getStatusBadge = (status: JobStatus) => {
    switch (status) {
      case 'Published':
        return <span className="px-2.5 py-0.5 text-xs font-semibold badge-published rounded-full">Published</span>;
      case 'Draft':
        return <span className="px-2.5 py-0.5 text-xs font-semibold badge-draft rounded-full">Draft</span>;
      case 'Paused':
        return <span className="px-2.5 py-0.5 text-xs font-semibold badge-paused rounded-full">Paused</span>;
      case 'Closed':
        return <span className="px-2.5 py-0.5 text-xs font-semibold badge-closed rounded-full">Closed</span>;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider">
              {job.department}
            </span>
            <h3
              onClick={() => navigate(`/org/${organizationId}/recruiter/jobs/${job.id}`)}
              className="text-base font-bold text-slate-900 hover:text-blue-600 cursor-pointer transition-colors line-clamp-1"
            >
              {job.title}
            </h3>
          </div>
          {getStatusBadge(job.status)}
        </div>

        <div className="flex flex-wrap items-center gap-y-1.5 gap-x-4 text-xs text-slate-500 mb-4 font-medium">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" /> {job.location} ({job.workMode})
          </span>
          <span className="flex items-center gap-1">
            <Briefcase className="w-3.5 h-3.5 text-slate-400" /> {job.employmentType}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-slate-400" /> Posted {job.postedDate}
          </span>
        </div>

        <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">{job.summary}</p>
      </div>

      <div>
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-600 mb-4">
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-indigo-500" />
            <span className="font-bold text-slate-900">{job.applicationsCount}</span> Applications
          </div>
          <div>
            <span className="font-semibold text-slate-900">{job.shortlistedCount}</span> Shortlisted
          </div>
          <div>
            Openings: <span className="font-bold text-slate-900">{job.openings}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/org/${organizationId}/recruiter/jobs/${job.id}`)}
            className="flex-1 py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" /> View
          </button>
          <button
            onClick={() => navigate(`/org/${organizationId}/recruiter/jobs/${job.id}/edit`)}
            className="py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" /> Edit
          </button>

          {job.status === 'Published' && (
            <button
              onClick={() => updateJobStatus(job.id, 'Paused')}
              title="Pause Job"
              className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg border border-amber-200"
            >
              <PauseCircle className="w-4 h-4" />
            </button>
          )}
          {job.status === 'Paused' && (
            <button
              onClick={() => updateJobStatus(job.id, 'Published')}
              title="Resume Job"
              className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg border border-emerald-200"
            >
              <PlayCircle className="w-4 h-4" />
            </button>
          )}
          {job.status === 'Draft' && (
            <button
              onClick={() => updateJobStatus(job.id, 'Published')}
              title="Publish Job"
              className="py-1.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg"
            >
              Publish
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
