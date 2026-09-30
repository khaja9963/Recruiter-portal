import React, { useState } from 'react';
import { Eye, Edit3, MapPin, Briefcase, Users, Calendar, BarChart2, CheckCircle2, UserCheck } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Job } from '../../types/recruiter.types';
import { useRecruiterStore } from '../../store/recruiterStore';

interface JobCardProps {
  job: Job;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const navigate = useNavigate();
  const { organizationId = 'clyptus' } = useParams<{ organizationId: string }>();
  const { updateJobStatus } = useRecruiterStore();

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-4">
      {/* Top Row: Department Tag & Status Badge */}
      <div className="flex items-center justify-between gap-2">
        <span className="px-3 py-1 bg-indigo-50 text-indigo-700 font-bold text-[11px] rounded-full border border-indigo-100">
          {job.department}
        </span>
        <span className="px-3 py-1 bg-emerald-50 text-emerald-700 font-bold text-[11px] rounded-full border border-emerald-200 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> {job.status}
        </span>
      </div>

      {/* Title & Summary */}
      <div>
        <h3
          onClick={() => navigate(`/org/${organizationId}/recruiter/jobs/${job.id}`)}
          className="text-base font-extrabold text-slate-900 hover:text-indigo-600 cursor-pointer transition-colors line-clamp-1"
        >
          {job.title}
        </h3>
        <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed font-normal">
          {job.summary}
        </p>
      </div>



      {/* Job Details Grid Box */}
      <div className="bg-slate-50/50 rounded-xl p-3 border border-slate-100 grid grid-cols-2 gap-2 text-xs">
        <div>
          <div className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
            <MapPin className="w-3 h-3 text-slate-400" /> Location
          </div>
          <div className="font-bold text-slate-800 truncate">{job.location}</div>
        </div>

        <div>
          <div className="text-[10px] text-slate-400 font-medium">Mode</div>
          <div className="font-bold text-slate-800 uppercase">{job.workMode}</div>
        </div>

        <div>
          <div className="text-[10px] text-slate-400 font-medium">Experience</div>
          <div className="font-bold text-slate-800">{job.experienceLevel}</div>
        </div>

        <div>
          <div className="text-[10px] text-slate-400 font-medium">Salary</div>
          <div className="font-bold text-slate-800">
            {job.salaryMin && job.salaryMax
              ? `$${(job.salaryMin / 1000).toFixed(0)}k - $${(job.salaryMax / 1000).toFixed(0)}k`
              : 'Competitive'}
          </div>
        </div>
      </div>

      {/* Skill Tags */}
      <div className="flex flex-wrap gap-1.5">
        {job.requiredSkills &&
          job.requiredSkills.slice(0, 4).map((skill, idx) => (
            <span key={idx} className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-semibold rounded-md border border-slate-200">
              {skill}
            </span>
          ))}
      </div>

      {/* Action Buttons Row 1: Status Action & Edit (Matching website theme, NO harsh red) */}
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
        <button
          onClick={() => updateJobStatus(job.id, job.status === 'Published' ? 'Paused' : 'Published')}
          className={`py-2 px-3 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-2xs ${
            job.status === 'Published'
              ? 'bg-slate-700 hover:bg-slate-800 text-white'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          {job.status === 'Published' ? 'Pause Requisition' : 'Publish Requisition'}
        </button>

        <button
          onClick={() => navigate(`/org/${organizationId}/recruiter/jobs/${job.id}/edit`)}
          className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors border border-slate-200"
        >
          <Edit3 className="w-3.5 h-3.5" /> Edit
        </button>
      </div>

      {/* Action Buttons Row 2: Job Analysis & ATS Pipeline */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => navigate(`/org/${organizationId}/recruiter/jobs/${job.id}`)}
          className="py-2 px-3 bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
        >
          <BarChart2 className="w-3.5 h-3.5" /> Job Analysis
        </button>

        <button
          onClick={() => navigate(`/org/${organizationId}/recruiter/ats?jobId=${job.id}`)}
          className="py-2 px-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors border border-indigo-200"
        >
          <Users className="w-3.5 h-3.5" /> ATS Pipeline ({job.applicationsCount})
        </button>
      </div>
    </div>
  );
};
