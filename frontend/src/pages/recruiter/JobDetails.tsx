import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Edit3,
  PauseCircle,
  PlayCircle,
  Users,
  Calendar,
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { useRecruiterStore } from '../../store/recruiterStore';
import { ApplicationTable } from '../../components/recruiter/ApplicationTable';

export const JobDetails: React.FC = () => {
  const navigate = useNavigate();
  const { organizationId = 'clyptus', jobId } = useParams<{ organizationId: string; jobId: string }>();
  const { jobs, applications, updateJobStatus } = useRecruiterStore();

  const job = jobs.find((j) => j.id === jobId);
  const jobApps = applications.filter((a) => a.jobId === jobId);

  if (!job) {
    return (
      <div className="p-8 text-center bg-white rounded-xl border border-slate-200">
        <p className="text-slate-500 font-medium">Job requisition not found.</p>
        <button onClick={() => navigate(-1)} className="mt-4 text-xs font-bold text-blue-600">
          Return to Jobs
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 text-slate-500 hover:text-slate-800 rounded-xl">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                {job.department}
              </span>
              <span className="px-2.5 py-0.5 text-xs font-semibold badge-published rounded-full">{job.status}</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900">{job.title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/org/${organizationId}/recruiter/jobs/${job.id}/edit`)}
            className="px-3.5 py-2 border border-slate-300 rounded-xl text-slate-700 text-xs font-semibold hover:bg-slate-100 flex items-center gap-1.5"
          >
            <Edit3 className="w-4 h-4" /> Edit Job
          </button>
          {job.status === 'Published' && (
            <button
              onClick={() => updateJobStatus(job.id, 'Paused')}
              className="px-3.5 py-2 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 text-xs font-semibold rounded-xl flex items-center gap-1.5"
            >
              <PauseCircle className="w-4 h-4" /> Pause Job
            </button>
          )}
          {job.status === 'Paused' && (
            <button
              onClick={() => updateJobStatus(job.id, 'Published')}
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5"
            >
              <PlayCircle className="w-4 h-4" /> Resume Job
            </button>
          )}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <span className="text-[11px] font-semibold text-slate-400">Total Applicants</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">{job.applicationsCount}</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <span className="text-[11px] font-semibold text-slate-400">Shortlisted</span>
          <div className="text-2xl font-bold text-indigo-600 mt-1">{job.shortlistedCount}</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <span className="text-[11px] font-semibold text-slate-400">Open Positions</span>
          <div className="text-2xl font-bold text-emerald-600 mt-1">{job.openings}</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <span className="text-[11px] font-semibold text-slate-400">Salary Range</span>
          <div className="text-base font-bold text-slate-900 mt-1">
            ${(job.salaryMin / 1000).toFixed(0)}k - ${(job.salaryMax / 1000).toFixed(0)}k
          </div>
        </div>
      </div>

      {/* Job Posting Details Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-indigo-600" />
            <h2 className="text-base font-extrabold text-slate-900">Job Posting Details</h2>
          </div>
          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            Requisition ID: {job.id}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 text-xs">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Job Title</span>
            <div className="font-extrabold text-slate-900 text-sm">{job.title}</div>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Department</span>
            <div className="font-bold text-slate-800">{job.department}</div>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Job Location</span>
            <div className="font-bold text-slate-800 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-indigo-500" />
              <span>{job.location}</span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Work Mode</span>
            <div className="font-bold text-slate-800">{job.workMode}</div>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Employment Type</span>
            <div className="font-bold text-slate-800">{job.employmentType}</div>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Experience Range</span>
            <div className="font-bold text-slate-800">
              {job.experienceMin !== undefined && job.experienceMax !== undefined
                ? `${job.experienceMin} - ${job.experienceMax} Years`
                : job.experienceLevel}
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Annual Salary Range</span>
            <div className="font-bold text-slate-800">
              {job.salaryMin ? `${job.salaryMin} - ${job.salaryMax} Lacs` : `${job.currency} ${job.salaryMin} - ${job.salaryMax}`}
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Number of Openings</span>
            <div className="font-bold text-slate-800">{job.openings} Open Positions</div>
          </div>

          {job.noticePeriod && (
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Notice Period</span>
              <div className="font-bold text-slate-800">{job.noticePeriod}</div>
            </div>
          )}

          {job.educationLevel && (
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Education Level</span>
              <div className="font-bold text-slate-800">{job.educationLevel}</div>
            </div>
          )}

          <div className="space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Assigned Recruiter</span>
            <div className="font-bold text-slate-800">{job.assignedRecruiterName || 'Sarah Jenkins'}</div>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Posted Date</span>
            <div className="font-bold text-slate-800">{job.postedDate}</div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-slate-200/80 p-6 space-y-6">
        <div>
          <h3 className="font-bold text-slate-900 text-sm mb-2">Job Description & Summary</h3>
          <p className="text-xs text-slate-600 leading-relaxed">{job.summary}</p>
        </div>

        <div>
          <h3 className="font-bold text-slate-900 text-sm mb-2">Key Responsibilities</h3>
          <ul className="list-disc list-inside text-xs text-slate-600 space-y-1.5">
            {job.responsibilities.map((resp, i) => (
              <li key={i}>{resp}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-slate-900 text-sm mb-2">Required Skills</h3>
          <div className="flex flex-wrap gap-2">
            {job.requiredSkills.map((skill, i) => (
              <span key={i} className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-lg border border-blue-200">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {job.preferredSkills.length > 0 && (
          <div>
            <h3 className="font-bold text-slate-900 text-sm mb-2">Preferred Skills</h3>
            <div className="flex flex-wrap gap-2">
              {job.preferredSkills.map((skill, i) => (
                <span key={i} className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-lg border border-slate-200">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {job.interviewProcess.length > 0 && (
          <div>
            <h3 className="font-bold text-slate-900 text-sm mb-2">Recruitment Stage Process</h3>
            <div className="flex flex-wrap gap-2">
              {job.interviewProcess.map((step, i) => (
                <span key={i} className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-lg border border-indigo-200">
                  {i + 1}. {step}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Applications for this Job */}
      <div className="space-y-4">
        <h3 className="font-bold text-slate-900 text-base">Applications for this Position ({jobApps.length})</h3>
        <ApplicationTable
          applications={jobApps}
          onOpenStageModal={() => {}}
          onOpenNoteModal={() => {}}
          onOpenScheduleInterview={() => {}}
        />
      </div>
    </div>
  );
};
