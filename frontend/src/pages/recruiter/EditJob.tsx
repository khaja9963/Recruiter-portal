import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Send } from 'lucide-react';
import { useRecruiterStore } from '../../store/recruiterStore';
import { JobStatus, EmploymentType, WorkMode } from '../../types/recruiter.types';

export const EditJob: React.FC = () => {
  const navigate = useNavigate();
  const { organizationId = 'clyptus', jobId } = useParams<{ organizationId: string; jobId: string }>();
  const { jobs, updateJob } = useRecruiterStore();

  const existingJob = jobs.find((j) => j.id === jobId);

  const [title, setTitle] = useState(existingJob?.title || '');
  const [department, setDepartment] = useState(existingJob?.department || 'Engineering');
  const [status, setStatus] = useState<JobStatus>(existingJob?.status || 'Published');
  const [employmentType, setEmploymentType] = useState<EmploymentType>(existingJob?.employmentType || 'Full-time');
  const [workMode, setWorkMode] = useState<WorkMode>(existingJob?.workMode || 'Hybrid');
  const [location, setLocation] = useState(existingJob?.location || 'San Francisco, CA');
  const [salaryMin, setSalaryMin] = useState<number>(existingJob?.salaryMin || 140000);
  const [salaryMax, setSalaryMax] = useState<number>(existingJob?.salaryMax || 180000);
  const [summary, setSummary] = useState(existingJob?.summary || '');

  if (!existingJob) {
    return (
      <div className="p-8 text-center bg-white rounded-xl border border-slate-200">
        <p className="text-slate-500 font-medium">Job requisition not found.</p>
        <button onClick={() => navigate(-1)} className="mt-4 text-xs font-bold text-blue-600">
          Go Back
        </button>
      </div>
    );
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateJob(existingJob.id, {
      title,
      department,
      status,
      employmentType,
      workMode,
      location,
      salaryMin,
      salaryMax,
      summary
    });
    navigate(`/org/${organizationId}/recruiter/jobs/${existingJob.id}`);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in duration-200">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 text-slate-500 hover:text-slate-800 rounded-xl">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Edit Job: {existingJob.title}</h1>
            <p className="text-xs text-slate-500">Update job requisition details</p>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5"
        >
          <Save className="w-4 h-4" /> Save Changes
        </button>
      </div>

      <form onSubmit={handleSave} className="bg-white p-6 rounded-xl border border-slate-200 space-y-4 text-xs">
        <div>
          <label className="block font-bold text-slate-700 uppercase mb-1">Job Title</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Department</label>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as JobStatus)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
            >
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
              <option value="Paused">Paused</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-700 uppercase mb-1">Job Summary</label>
          <textarea
            rows={4}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg"
          />
        </div>
      </form>
    </div>
  );
};
