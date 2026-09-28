import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Eye, Send, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { useRecruiterStore } from '../../store/recruiterStore';
import { EmploymentType, WorkMode, ExperienceLevel } from '../../types/recruiter.types';

export const CreateJob: React.FC = () => {
  const navigate = useNavigate();
  const { organizationId = 'clyptus' } = useParams<{ organizationId: string }>();
  const { createJob, profile } = useRecruiterStore();

  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('Engineering');
  const [employmentType, setEmploymentType] = useState<EmploymentType>('Full-time');
  const [workMode, setWorkMode] = useState<WorkMode>('Hybrid');
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>('Senior');
  const [location, setLocation] = useState('San Francisco, CA');
  const [salaryMin, setSalaryMin] = useState<number>(130000);
  const [salaryMax, setSalaryMax] = useState<number>(170000);
  const [openings, setOpenings] = useState<number>(1);
  const [deadline, setDeadline] = useState('2026-11-30');
  const [summary, setSummary] = useState('');

  const [responsibilitiesText, setResponsibilitiesText] = useState(
    'Architect scalable frontend applications\nCollaborate with product managers and backend teams\nMentor team members'
  );
  const [requiredSkillsText, setRequiredSkillsText] = useState('React, TypeScript, Tailwind CSS, REST APIs');
  const [preferredSkillsText, setPreferredSkillsText] = useState('Next.js, WebSockets, Jest');
  const [qualificationsText, setQualificationsText] = useState('B.S. in Computer Science or equivalent\n4+ years software development experience');

  const [screeningQuestions, setScreeningQuestions] = useState([
    { id: '1', question: 'How many years of relevant experience do you have?', required: true }
  ]);

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const buildJobPayload = (status: 'Published' | 'Draft') => {
    return {
      title,
      department,
      location,
      employmentType,
      workMode,
      experienceLevel,
      salaryMin,
      salaryMax,
      currency: 'USD',
      status,
      deadline,
      openings,
      assignedRecruiterId: profile.id,
      assignedRecruiterName: profile.name,
      summary,
      responsibilities: responsibilitiesText.split('\n').filter((s) => s.trim().length > 0),
      requiredSkills: requiredSkillsText.split(',').map((s) => s.trim()).filter((s) => s.length > 0),
      preferredSkills: preferredSkillsText.split(',').map((s) => s.trim()).filter((s) => s.length > 0),
      qualifications: qualificationsText.split('\n').filter((s) => s.trim().length > 0),
      interviewProcess: ['Recruiter Screen', 'Technical Interview', 'System Design', 'Culture Fit'],
      screeningQuestions
    };
  };

  const handleSave = (status: 'Published' | 'Draft') => {
    if (!title.trim() || !summary.trim()) {
      alert('Please fill out the Job Title and Summary.');
      return;
    }
    const created = createJob(buildJobPayload(status));
    navigate(`/org/${organizationId}/recruiter/jobs/${created.id}`);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200 pb-12">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Create New Job Posting</h1>
            <p className="text-xs text-slate-500">Draft or publish a job requisition for your organization</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleSave('Draft')}
            className="px-4 py-2 border border-slate-300 rounded-xl text-slate-700 text-xs font-semibold hover:bg-slate-100 flex items-center gap-1.5"
          >
            <Save className="w-4 h-4 text-slate-500" /> Save Draft
          </button>
          <button
            type="button"
            onClick={() => setIsPreviewOpen(true)}
            className="px-4 py-2 border border-slate-300 rounded-xl text-slate-700 text-xs font-semibold hover:bg-slate-100 flex items-center gap-1.5"
          >
            <Eye className="w-4 h-4 text-blue-600" /> Preview
          </button>
          <button
            type="button"
            onClick={() => handleSave('Published')}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5"
          >
            <Send className="w-4 h-4" /> Publish Job
          </button>
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={(e) => { e.preventDefault(); handleSave('Published'); }} className="space-y-6 text-sm">
        {/* Basic Info */}
        <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">1. Basic Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Job Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Senior Frontend Engineer (React/TypeScript)"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Department
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white"
              >
                <option value="Engineering">Engineering</option>
                <option value="Product & Design">Product & Design</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="Data & AI">Data & AI</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Employment Type
              </label>
              <select
                value={employmentType}
                onChange={(e) => setEmploymentType(e.target.value as EmploymentType)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Work Mode
              </label>
              <select
                value={workMode}
                onChange={(e) => setWorkMode(e.target.value as WorkMode)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white"
              >
                <option value="Hybrid">Hybrid</option>
                <option value="Remote">Remote</option>
                <option value="On-site">On-site</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Salary Min ($/yr)
              </label>
              <input
                type="number"
                value={salaryMin}
                onChange={(e) => setSalaryMin(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Salary Max ($/yr)
              </label>
              <input
                type="number"
                value={salaryMax}
                onChange={(e) => setSalaryMax(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              />
            </div>
          </div>
        </div>

        {/* Description & Details */}
        <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">2. Job Content</h2>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Job Summary *
            </label>
            <textarea
              rows={3}
              required
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Overview of the role and key goals..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Key Responsibilities (One per line)
            </label>
            <textarea
              rows={3}
              value={responsibilitiesText}
              onChange={(e) => setResponsibilitiesText(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Required Skills (Comma separated)
              </label>
              <input
                type="text"
                value={requiredSkillsText}
                onChange={(e) => setRequiredSkillsText(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Preferred Skills (Comma separated)
              </label>
              <input
                type="text"
                value={preferredSkillsText}
                onChange={(e) => setPreferredSkillsText(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              />
            </div>
          </div>
        </div>

        {/* Recruitment Settings */}
        <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">3. Recruitment Settings</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Number of Openings
              </label>
              <input
                type="number"
                value={openings}
                onChange={(e) => setOpenings(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Application Deadline
              </label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
