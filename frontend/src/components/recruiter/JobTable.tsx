import React from 'react';
import { Eye, Edit3, PauseCircle, PlayCircle, Trash2, MoreHorizontal } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Job, JobStatus } from '../../types/recruiter.types';
import { useRecruiterStore } from '../../store/recruiterStore';

interface JobTableProps {
  jobs: Job[];
}

export const JobTable: React.FC<JobTableProps> = ({ jobs }) => {
  const navigate = useNavigate();
  const { organizationId = 'clyptus' } = useParams<{ organizationId: string }>();
  const { updateJobStatus, deleteJob } = useRecruiterStore();

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

  if (jobs.length === 0) {
    return (
      <div className="bg-white p-12 text-center rounded-xl border border-slate-200">
        <p className="text-slate-500 font-medium text-sm">No jobs found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider">
            <tr>
              <th className="py-3.5 px-4">Job Title</th>
              <th className="py-3.5 px-4">Department</th>
              <th className="py-3.5 px-4">Location</th>
              <th className="py-3.5 px-4">Type</th>
              <th className="py-3.5 px-4">Experience</th>
              <th className="py-3.5 px-4 text-center">Applications</th>
              <th className="py-3.5 px-4">Posted Date</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {jobs.map((job) => (
              <tr key={job.id} className="hover:bg-slate-50/60 transition-colors">
                <td className="py-3.5 px-4">
                  <div
                    onClick={() => navigate(`/org/${organizationId}/recruiter/jobs/${job.id}`)}
                    className="font-bold text-slate-900 hover:text-blue-600 cursor-pointer text-sm"
                  >
                    {job.title}
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium">
                    ${(job.salaryMin / 1000).toFixed(0)}k - ${(job.salaryMax / 1000).toFixed(0)}k • {job.openings} openings
                  </div>
                </td>
                <td className="py-3.5 px-4 font-semibold text-slate-700">{job.department}</td>
                <td className="py-3.5 px-4">
                  {job.location} <span className="text-[10px] text-slate-400">({job.workMode})</span>
                </td>
                <td className="py-3.5 px-4">{job.employmentType}</td>
                <td className="py-3.5 px-4">{job.experienceLevel}</td>
                <td className="py-3.5 px-4 text-center">
                  <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 font-bold rounded-lg border border-indigo-100">
                    {job.applicationsCount}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-slate-500 font-medium">{job.postedDate}</td>
                <td className="py-3.5 px-4">{getStatusBadge(job.status)}</td>
                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => navigate(`/org/${organizationId}/recruiter/jobs/${job.id}`)}
                      title="View Job Details"
                      className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => navigate(`/org/${organizationId}/recruiter/jobs/${job.id}/edit`)}
                      title="Edit Job"
                      className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    {job.status === 'Published' && (
                      <button
                        onClick={() => updateJobStatus(job.id, 'Paused')}
                        title="Pause Job"
                        className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg"
                      >
                        <PauseCircle className="w-4 h-4" />
                      </button>
                    )}
                    {job.status === 'Paused' && (
                      <button
                        onClick={() => updateJobStatus(job.id, 'Published')}
                        title="Publish Job"
                        className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg"
                      >
                        <PlayCircle className="w-4 h-4" />
                      </button>
                    )}

                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete "${job.title}"?`)) {
                          deleteJob(job.id);
                        }
                      }}
                      title="Delete Job"
                      className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
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
