import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Eye, Send, Plus, Trash2, CheckCircle2, Briefcase, MapPin, Clock, Award, Building2, Coins } from 'lucide-react';
import { useRecruiterStore } from '../../store/recruiterStore';
import { EmploymentType, WorkMode, ExperienceLevel } from '../../types/recruiter.types';

export const CreateJob: React.FC = () => {
  const navigate = useNavigate();
  const { organizationId = 'clyptus' } = useParams<{ organizationId: string }>();
  const { createJob, profile } = useRecruiterStore();

  // Basic Information
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('Engineering');
  const [employmentType, setEmploymentType] = useState<EmploymentType>('Full-time');
  const [workMode, setWorkMode] = useState<WorkMode>('Hybrid');

  // Experience & Candidate Requirements (Foundit standard)
  const [experienceMin, setExperienceMin] = useState<number>(3);
  const [experienceMax, setExperienceMax] = useState<number>(7);
  const [noticePeriod, setNoticePeriod] = useState<string>('30 Days (1 Month)');
  const [educationLevel, setEducationLevel] = useState<string>('B.E / B.Tech / B.Sc (CS/IT)');
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>('Senior');

  // Location & Compensation
  const [location, setLocation] = useState('San Francisco, CA');
  const [currency, setCurrency] = useState<string>('USD');
  const [salaryMin, setSalaryMin] = useState<number>(130000);
  const [salaryMax, setSalaryMax] = useState<number>(170000);
  const [hideSalary, setHideSalary] = useState<boolean>(false);

  // Requisition Settings
  const [openings, setOpenings] = useState<number>(2);
  const [deadline, setDeadline] = useState('2026-11-30');
  const [summary, setSummary] = useState('');

  // Skills & Content
  const [responsibilitiesText, setResponsibilitiesText] = useState(
    'Architect and build high-performance React and TypeScript applications.\nCollaborate with cross-functional product, UX, and backend engineering teams.\nPerform code reviews and maintain automated testing standards.'
  );
  const [requiredSkillsText, setRequiredSkillsText] = useState('React, TypeScript, Tailwind CSS, REST APIs');
  const [preferredSkillsText, setPreferredSkillsText] = useState('Next.js, Zustand, Jest, Docker');
  const [qualificationsText, setQualificationsText] = useState('Bachelor degree in Computer Science, IT or related field.\nProven track record of building production software apps.');

  // Screening Questions
  const [screeningQuestions, setScreeningQuestions] = useState([
    { id: '1', question: 'What is your current notice period?', required: true },
    { id: '2', question: 'How many years of hands-on experience do you have in React & TypeScript?', required: true }
  ]);

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleAddQuestion = () => {
    setScreeningQuestions([
      ...screeningQuestions,
      { id: Date.now().toString(), question: '', required: false }
    ]);
  };

  const handleRemoveQuestion = (id: string) => {
    setScreeningQuestions(screeningQuestions.filter((q) => q.id !== id));
  };

  const handleQuestionChange = (id: string, text: string) => {
    setScreeningQuestions(
      screeningQuestions.map((q) => (q.id === id ? { ...q, question: text } : q))
    );
  };

  const buildJobPayload = (status: 'Published' | 'Draft') => {
    return {
      title,
      department,
      location,
      employmentType,
      workMode,
      experienceLevel,
      experienceMin,
      experienceMax,
      noticePeriod,
      educationLevel,
      salaryMin,
      salaryMax,
      currency,
      hideSalary,
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
      interviewProcess: ['HR Screening', 'Technical Coding', 'System Design', 'Leadership Round'],
      screeningQuestions: screeningQuestions.filter((q) => q.question.trim().length > 0)
    };
  };

  const handleSave = (status: 'Published' | 'Draft') => {
    if (!title.trim() || !summary.trim()) {
      alert('Please fill out the Job Title and Role Summary.');
      return;
    }
    const created = createJob(buildJobPayload(status));
    navigate(`/org/${organizationId}/recruiter/jobs/${created.id}`);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-200 pb-16 font-sans text-slate-900">
      {/* Top Header */}
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-indigo-600" /> Create New Job Posting
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Clyptus Requisition Portal • Fill in mandatory candidate details, notice period, and experience ranges
            </p>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={(e) => { e.preventDefault(); handleSave('Published'); }} className="space-y-6 text-sm">
        
        {/* Section 1: Basic Information */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Building2 className="w-4 h-4 text-indigo-600" />
            <h2 className="text-sm font-extrabold text-slate-900">1. Basic Job Information</h2>
          </div>

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
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-xs font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Department / Industry *
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-semibold bg-white focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Engineering">Engineering</option>
                <option value="IT Software & Services">IT Software & Services</option>
                <option value="Product & Design">Product & Design</option>
                <option value="Infrastructure & Cloud">Infrastructure & Cloud</option>
                <option value="Data & Analytics">Data & Analytics</option>
                <option value="Marketing & Sales">Marketing & Sales</option>
                <option value="Human Resources">Human Resources</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Employment Type *
              </label>
              <select
                value={employmentType}
                onChange={(e) => setEmploymentType(e.target.value as EmploymentType)}
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-semibold bg-white focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Work Mode *
              </label>
              <select
                value={workMode}
                onChange={(e) => setWorkMode(e.target.value as WorkMode)}
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-semibold bg-white focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Hybrid">Hybrid</option>
                <option value="Remote">Remote</option>
                <option value="On-site">On-site</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Seniority Level
              </label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value as ExperienceLevel)}
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-semibold bg-white focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Entry-level">Entry-level</option>
                <option value="Mid-level">Mid-level</option>
                <option value="Senior">Senior</option>
                <option value="Lead">Lead</option>
                <option value="Executive">Executive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Candidate Experience & Requirements */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Award className="w-4 h-4 text-indigo-600" />
            <h2 className="text-sm font-extrabold text-slate-900">2. Candidate Experience & Requirements</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Min Experience (Years) *
              </label>
              <select
                value={experienceMin}
                onChange={(e) => setExperienceMin(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-semibold bg-white focus:ring-2 focus:ring-indigo-500"
              >
                <option value={0}>0 Years (Freshers)</option>
                <option value={1}>1 Year</option>
                <option value={2}>2 Years</option>
                <option value={3}>3 Years</option>
                <option value={4}>4 Years</option>
                <option value={5}>5 Years</option>
                <option value={6}>6 Years</option>
                <option value={8}>8 Years</option>
                <option value={10}>10+ Years</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Max Experience (Years) *
              </label>
              <select
                value={experienceMax}
                onChange={(e) => setExperienceMax(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-semibold bg-white focus:ring-2 focus:ring-indigo-500"
              >
                <option value={1}>1 Year</option>
                <option value={2}>2 Years</option>
                <option value={3}>3 Years</option>
                <option value={5}>5 Years</option>
                <option value={7}>7 Years</option>
                <option value={10}>10 Years</option>
                <option value={12}>12 Years</option>
                <option value={15}>15+ Years</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Notice Period Required *
              </label>
              <select
                value={noticePeriod}
                onChange={(e) => setNoticePeriod(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-semibold bg-white focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Immediate Joiner (0-15 Days)">Immediate Joiner (0-15 Days)</option>
                <option value="15 Days">15 Days</option>
                <option value="30 Days (1 Month)">30 Days (1 Month)</option>
                <option value="45 Days">45 Days</option>
                <option value="60 Days (2 Months)">60 Days (2 Months)</option>
                <option value="90 Days (3 Months)">90 Days (3 Months)</option>
                <option value="Negotiable / Any">Negotiable / Any</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Education Qualification
              </label>
              <select
                value={educationLevel}
                onChange={(e) => setEducationLevel(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-semibold bg-white focus:ring-2 focus:ring-indigo-500"
              >
                <option value="B.E / B.Tech / B.Sc (CS/IT)">B.E / B.Tech / B.Sc (CS/IT)</option>
                <option value="M.E / M.Tech / M.Sc">M.E / M.Tech / M.Sc</option>
                <option value="MCA / BCA">MCA / BCA</option>
                <option value="MBA / PGDM">MBA / PGDM</option>
                <option value="Diploma">Diploma</option>
                <option value="Any Graduate">Any Graduate</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 3: Location & Compensation */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Coins className="w-4 h-4 text-indigo-600" />
            <h2 className="text-sm font-extrabold text-slate-900">3. Location & Compensation (CTC Range)</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Primary City / Location *
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. San Francisco, CA or Bengaluru"
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-semibold bg-white"
              >
                <option value="USD">USD ($)</option>
                <option value="INR">INR (₹)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Minimum CTC / Salary
              </label>
              <input
                type="number"
                value={salaryMin}
                onChange={(e) => setSalaryMin(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Maximum CTC / Salary
              </label>
              <input
                type="number"
                value={salaryMax}
                onChange={(e) => setSalaryMax(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-semibold"
              />
            </div>

            <div className="md:col-span-2 flex items-center pt-5">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                <input
                  type="checkbox"
                  checked={hideSalary}
                  onChange={(e) => setHideSalary(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                />
                Hide Salary Range from Job Seekers (Disclose on Request)
              </label>
            </div>
          </div>
        </div>

        {/* Section 4: Key Skills & Job Content */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Clock className="w-4 h-4 text-indigo-600" />
            <h2 className="text-sm font-extrabold text-slate-900">4. Key Skills & Job Content</h2>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Job Summary / Role Overview *
            </label>
            <textarea
              rows={3}
              required
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Provide a compelling overview of the role, product domain, and key achievements expected..."
              className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Mandatory Key Skills (Comma separated) *
              </label>
              <input
                type="text"
                required
                value={requiredSkillsText}
                onChange={(e) => setRequiredSkillsText(e.target.value)}
                placeholder="React, TypeScript, Node.js, Tailwind CSS"
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Desired / Preferred Skills (Comma separated)
              </label>
              <input
                type="text"
                value={preferredSkillsText}
                onChange={(e) => setPreferredSkillsText(e.target.value)}
                placeholder="Next.js, Zustand, Jest, Docker"
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Key Responsibilities (One per line)
            </label>
            <textarea
              rows={4}
              value={responsibilitiesText}
              onChange={(e) => setResponsibilitiesText(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-mono"
            />
          </div>
        </div>

        {/* Section 5: Requisition Settings */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <CheckCircle2 className="w-4 h-4 text-indigo-600" />
            <h2 className="text-sm font-extrabold text-slate-900">5. Requisition & Application Settings</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Number of Openings
              </label>
              <input
                type="number"
                min={1}
                value={openings}
                onChange={(e) => setOpenings(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-bold"
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
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Assigned Lead Recruiter
              </label>
              <input
                type="text"
                disabled
                value={profile.name}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-bold bg-slate-50 text-slate-700"
              />
            </div>
          </div>
        </div>

        {/* Section 6: Candidate Screening Questions */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-sm font-extrabold text-slate-900">6. Candidate Screening Questions</h2>
            <button
              type="button"
              onClick={handleAddQuestion}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add Question
            </button>
          </div>

          <div className="space-y-3">
            {screeningQuestions.map((q, idx) => (
              <div key={q.id} className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400 w-5">{idx + 1}.</span>
                <input
                  type="text"
                  value={q.question}
                  onChange={(e) => handleQuestionChange(q.id, e.target.value)}
                  placeholder="Enter custom screening question..."
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-xl text-xs"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveQuestion(q.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons Bar (Always at bottom) */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm flex items-center justify-end gap-3 sticky bottom-4 z-10">
          <button
            type="button"
            onClick={() => handleSave('Draft')}
            className="px-5 py-2.5 border border-slate-300 rounded-xl text-slate-700 text-xs font-bold hover:bg-slate-100 flex items-center gap-1.5 transition-colors"
          >
            <Save className="w-4 h-4 text-slate-500" /> Save Draft
          </button>
          
          <button
            type="button"
            onClick={() => setIsPreviewOpen(true)}
            className="px-5 py-2.5 border border-slate-300 rounded-xl text-slate-700 text-xs font-bold hover:bg-slate-100 flex items-center gap-1.5 transition-colors"
          >
            <Eye className="w-4 h-4 text-indigo-600" /> Preview Requisition
          </button>

          <button
            type="button"
            onClick={() => handleSave('Published')}
            className="px-6 py-2.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <Send className="w-4 h-4" /> Publish Job
          </button>
        </div>
      </form>

      {/* Requisition Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-lg">Job Requisition Preview</h3>
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="text-xs font-bold px-3 py-1 bg-slate-100 rounded-lg text-slate-600"
              >
                Close
              </button>
            </div>

            <div className="space-y-3">
              <div className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full">
                {department}
              </div>
              <h2 className="text-xl font-extrabold text-slate-900">{title || 'Untitled Job Position'}</h2>
              <div className="flex flex-wrap gap-4 text-xs text-slate-500 font-medium">
                <span>📍 {location} ({workMode})</span>
                <span>💼 {employmentType}</span>
                <span>🎓 Exp: {experienceMin} - {experienceMax} Years</span>
                <span>⏱️ Notice: {noticePeriod}</span>
                <span>💰 CTC: {currency} {salaryMin} - {salaryMax}</span>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <h4 className="font-bold text-xs text-slate-900 mb-1">Role Summary</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{summary || 'No summary provided.'}</p>
              </div>

              <div>
                <h4 className="font-bold text-xs text-slate-900 mb-1">Mandatory Key Skills</h4>
                <div className="flex flex-wrap gap-1.5">
                  {requiredSkillsText.split(',').map((s, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-slate-100 text-slate-800 text-xs font-semibold rounded-md">
                      {s.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
