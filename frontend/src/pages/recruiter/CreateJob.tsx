import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Briefcase,
  Sparkles,
  ChevronDown,
  Info,
  Calendar,
  X,
  Plus,
  Trash2,
  CheckCircle2,
  HelpCircle,
  ShieldAlert,
  Copy,
  Globe,
  Eye,
  Save,
  Send,
  Building2,
  MapPin,
  Coins,
  Award
} from 'lucide-react';
import { useRecruiterStore } from '../../store/recruiterStore';
import { EmploymentType, WorkMode, ExperienceLevel } from '../../types/recruiter.types';

export const CreateJob: React.FC = () => {
  const navigate = useNavigate();
  const { organizationId = 'clyptus' } = useParams<{ organizationId: string }>();
  const { createJob, profile, jobs } = useRecruiterStore();

  // Header & Template Controls
  const [selectedCountry, setSelectedCountry] = useState('India');
  const [showRefCode, setShowRefCode] = useState(false);
  const [refCode, setRefCode] = useState('');

  // Posting details (Left Column)
  const [jobCategory, setJobCategory] = useState<'Permanent' | 'Contract' | 'Walk-in'>('Permanent');
  const [employmentType, setEmploymentType] = useState<EmploymentType>('Full-time');
  const [scheduleMode, setScheduleMode] = useState<'now' | 'date'>('now');
  const [scheduleDate, setScheduleDate] = useState('2026-10-01');
  const [expiryDate, setExpiryDate] = useState('2026-11-29');
  
  // Walk-in venue details
  const [venueAddress, setVenueAddress] = useState('');
  const [walkinStartDate, setWalkinStartDate] = useState('2026-10-01');
  const [walkinStartTime, setWalkinStartTime] = useState('12:00 AM');
  const [walkinEndDate, setWalkinEndDate] = useState('2026-10-02');
  const [walkinEndTime, setWalkinEndTime] = useState('12:00 AM');

  // Main Job Details (Right Column)
  const [title, setTitle] = useState('');
  const [expType, setExpType] = useState<'experienced' | 'fresher'>('experienced');
  const [experienceMin, setExperienceMin] = useState<number>(2);
  const [experienceMax, setExperienceMax] = useState<number>(6);
  const [jobDescription, setJobDescription] = useState('');
  const [prioritizeWomen, setPrioritizeWomen] = useState(false);

  // Skills & Location
  const [skills, setSkills] = useState<string[]>(['React.js', 'TypeScript', 'Tailwind CSS']);
  const [skillInput, setSkillInput] = useState('');
  const [workMode, setWorkMode] = useState<WorkMode>('On-site');
  const [location, setLocation] = useState('Bangalore, Karnataka');

  // Compensation & Benefits
  const [salaryMin, setSalaryMin] = useState<number>(800000); // 8 LPA
  const [salaryMax, setSalaryMax] = useState<number>(1500000); // 15 LPA
  const [hideSalary, setHideSalary] = useState<boolean>(false);
  const [perksAndBenefits, setPerksAndBenefits] = useState('');
  const [industry, setIndustry] = useState('IT Software & Services');
  const [functionRole, setFunctionRole] = useState('Software Engineering - Frontend');
  const [educationLevel, setEducationLevel] = useState('B.E / B.Tech (CS / IT / ECE)');

  // Folder & Questionnaire
  const [folderName, setFolderName] = useState('Engineering Hiring 2026');
  const [enableQuestionnaire, setEnableQuestionnaire] = useState(false);
  const [screeningQuestions, setScreeningQuestions] = useState([
    { id: '1', question: 'What is your current notice period?', required: true },
    { id: '2', question: 'Are you open to working on-site in Bangalore?', required: true }
  ]);

  // AI & Preview state
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleAddSkill = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ('key' in e && e.key !== 'Enter') return;
    e.preventDefault();
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleAddQuestion = () => {
    setScreeningQuestions([
      ...screeningQuestions,
      { id: Date.now().toString(), question: '', required: false }
    ]);
  };

  const handleRemoveQuestion = (id: string) => {
    setScreeningQuestions(screeningQuestions.filter((q) => q.id !== id));
  };

  const handleGenerateAI = () => {
    if (!title.trim()) {
      alert('Please enter a Job Title first so AI can generate relevant skills and descriptions.');
      return;
    }
    setIsGeneratingAI(true);
    setTimeout(() => {
      setJobDescription(
        `We are seeking an exceptionally talented ${title} to join our growing engineering team at Clyptus Software Solution.

Key Responsibilities:
• Architect, design, and deploy scalable, enterprise-grade application features.
• Collaborate closely with product managers, UX designers, and system architects.
• Write clean, robust, well-tested TypeScript & React code.
• Optimize application performance, accessibility, and cross-browser responsiveness.

Qualifications & Requirements:
• ${experienceMin}-${experienceMax} years of hands-on software development experience.
• Proficiency in modern frontend technologies, REST/GraphQL APIs, and state management.
• Strong problem-solving skills and passion for high-quality software engineering.`
      );
      setSkills(['React.js', 'TypeScript', 'Node.js', 'System Design', 'Tailwind CSS', 'GraphQL']);
      setIsGeneratingAI(false);
    }, 800);
  };

  const handleCloneJob = (jobId: string) => {
    const target = jobs.find((j) => j.id === jobId);
    if (target) {
      setTitle(`${target.title} (Copy)`);
      setIndustry(target.department);
      setLocation(target.location);
      setEmploymentType(target.employmentType);
      setWorkMode(target.workMode);
      setExperienceMin(target.experienceMin || 2);
      setExperienceMax(target.experienceMax || 6);
      setSalaryMin(target.salaryMin || 800000);
      setSalaryMax(target.salaryMax || 1500000);
      setSkills(target.requiredSkills || []);
      setJobDescription(target.summary || '');
    }
  };

  const buildJobPayload = (status: 'Published' | 'Draft') => {
    return {
      title,
      department: industry,
      location,
      employmentType,
      workMode,
      experienceLevel: (experienceMin <= 2 ? 'Entry-level' : experienceMin >= 7 ? 'Senior' : 'Mid-level') as ExperienceLevel,
      experienceMin,
      experienceMax,
      noticePeriod: '30 Days (Negotiable)',
      educationLevel,
      salaryMin,
      salaryMax,
      currency: 'INR',
      hideSalary,
      status,
      deadline: expiryDate,
      openings: 2,
      assignedRecruiterId: profile.id,
      assignedRecruiterName: profile.name,
      summary: jobDescription.substring(0, 300) || `${title} requisition at Clyptus Software Solution.`,
      responsibilities: jobDescription.split('\n').filter((s) => s.trim().length > 0),
      requiredSkills: skills,
      preferredSkills: ['Agile', 'Git', 'CI/CD'],
      qualifications: [educationLevel, `${experienceMin}-${experienceMax} years experience`],
      interviewProcess: ['HR Screening', 'Technical Evaluation', 'System Design', 'Final Managerial'],
      screeningQuestions: enableQuestionnaire ? screeningQuestions.filter((q) => q.question.trim().length > 0) : []
    };
  };

  const handleSubmit = (status: 'Published' | 'Draft') => {
    if (!title.trim()) {
      alert('Please fill out the Job Title.');
      return;
    }
    const created = createJob(buildJobPayload(status));
    navigate(`/org/${organizationId}/recruiter/jobs/${created.id}`);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-24 font-sans text-slate-900 select-none animate-in fade-in duration-200">
      
      {/* Sub-Header & Breadcrumb Bar */}
      <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="text-xs text-slate-500 font-semibold flex items-center gap-1.5">
              <span className="hover:underline cursor-pointer" onClick={() => navigate(`/org/${organizationId}/recruiter/dashboard`)}>Dashboard</span>
              <span>›</span>
              <span className="text-indigo-600 font-bold">Post Job</span>
            </div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Create Job
            </h1>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (12 col md / 4 col lg) - Posting Details */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Card 1: Posting Details */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
            <h3 className="font-extrabold text-slate-900 text-sm border-b border-slate-100 pb-2">
              Posting details
            </h3>

            {/* Segmented Job Type: Permanent / Contract / Walk-in */}
            <div>
              <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold text-center">
                {(['Permanent', 'Contract', 'Walk-in'] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setJobCategory(cat)}
                    className={`py-1.5 rounded-lg transition-all cursor-pointer ${
                      jobCategory === cat ? 'bg-white text-indigo-700 shadow-2xs border border-slate-200' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Permanent View */}
            {jobCategory === 'Permanent' && (
              <>
                <div className="flex items-center gap-6 pt-1 text-xs font-semibold text-slate-800">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="empType"
                      checked={employmentType === 'Full-time'}
                      onChange={() => setEmploymentType('Full-time')}
                      className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Full time</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="empType"
                      checked={employmentType === 'Part-time'}
                      onChange={() => setEmploymentType('Part-time')}
                      className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Part time</span>
                  </label>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <label className="block text-xs font-bold text-slate-700">
                    Schedule job post
                  </label>
                  <div className="flex items-center gap-6 text-xs font-semibold text-slate-800">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="schedule"
                        checked={scheduleMode === 'now'}
                        onChange={() => setScheduleMode('now')}
                        className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span>Post now</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="schedule"
                        checked={scheduleMode === 'date'}
                        onChange={() => setScheduleMode('date')}
                        className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span>Choose a date</span>
                    </label>
                  </div>

                  {scheduleMode === 'date' && (
                    <div className="pt-1.5 animate-in fade-in duration-150">
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        Select Posting Date
                      </label>
                      <input
                        type="date"
                        value={scheduleDate}
                        onChange={(e) => setScheduleDate(e.target.value)}
                        className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Expiry date
                  </label>
                  <input
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </>
            )}

            {/* Contract View (Matching Screenshot 1) */}
            {jobCategory === 'Contract' && (
              <>
                <div className="space-y-2 pt-1">
                  <label className="block text-xs font-bold text-slate-700">
                    Schedule job post
                  </label>
                  <div className="flex items-center gap-6 text-xs font-semibold text-slate-800">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="scheduleContract"
                        checked={scheduleMode === 'now'}
                        onChange={() => setScheduleMode('now')}
                        className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span>Post now</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="scheduleContract"
                        checked={scheduleMode === 'date'}
                        onChange={() => setScheduleMode('date')}
                        className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span>Choose a date</span>
                    </label>
                  </div>

                  {scheduleMode === 'date' && (
                    <div className="pt-1.5 animate-in fade-in duration-150">
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        Select Posting Date
                      </label>
                      <input
                        type="date"
                        value={scheduleDate}
                        onChange={(e) => setScheduleDate(e.target.value)}
                        className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Expiry date
                  </label>
                  <input
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </>
            )}

            {/* Walk-in View (Matching Screenshot 2) */}
            {jobCategory === 'Walk-in' && (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Venue address <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    value={venueAddress}
                    onChange={(e) => setVenueAddress(e.target.value)}
                    placeholder="Write address here"
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-medium text-slate-800 focus:ring-2 focus:ring-indigo-500 resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Start Date <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={walkinStartDate}
                      onChange={(e) => setWalkinStartDate(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Start time <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={walkinStartTime}
                      onChange={(e) => setWalkinStartTime(e.target.value)}
                      placeholder="12:00 AM"
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      End Date <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={walkinEndDate}
                      onChange={(e) => setWalkinEndDate(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      End time <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={walkinEndTime}
                      onChange={(e) => setWalkinEndTime(e.target.value)}
                      placeholder="12:00 AM"
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 font-medium leading-tight pt-1">
                  Note: This is the closing date of the job. The job will be expired once passed this date
                </div>
              </>
            )}
          </div>

        </div>

        {/* Right Column (12 col md / 8 col lg) - Job Details */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Card 1: Job details */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-5">
            <h3 className="font-extrabold text-slate-900 text-base border-b border-slate-100 pb-3">
              Job details
            </h3>

            {/* Job title & Reference code */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700">
                  Job title <span className="text-rose-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowRefCode(!showRefCode)}
                  className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add reference code
                </button>
              </div>

              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Search job title e.g. Senior Frontend Engineer"
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />

              {showRefCode && (
                <div className="mt-2.5">
                  <input
                    type="text"
                    value={refCode}
                    onChange={(e) => setRefCode(e.target.value)}
                    placeholder="Enter internal reference / requisition code (e.g. REQ-2026-ENG-08)"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono text-slate-800"
                  />
                </div>
              )}
            </div>

            {/* Experience Section: Fresher vs Experienced */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-700">
                Experience <span className="text-rose-500">*</span>
              </label>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setExpType('fresher');
                    setExperienceMin(0);
                    setExperienceMax(1);
                  }}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                    expType === 'fresher'
                      ? 'bg-indigo-50 text-indigo-700 border-indigo-300 ring-2 ring-indigo-500/20'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  Fresher only
                </button>
                <button
                  type="button"
                  onClick={() => setExpType('experienced')}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                    expType === 'experienced'
                      ? 'bg-indigo-50 text-indigo-700 border-indigo-300 ring-2 ring-indigo-500/20'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  Experienced only
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Min experience (years) <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={experienceMin}
                    onChange={(e) => setExperienceMin(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 bg-white focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                  >
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15].map((y) => (
                      <option key={y} value={y}>{y} Years</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Max experience (years) <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={experienceMax}
                    onChange={(e) => setExperienceMax(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 bg-white focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20].map((y) => (
                      <option key={y} value={y}>{y} Years</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* AI Generator Button */}
            <div>
              <button
                type="button"
                onClick={handleGenerateAI}
                disabled={isGeneratingAI}
                className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-2xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer"
              >
                <Sparkles className={`w-4 h-4 text-indigo-600 ${isGeneratingAI ? 'animate-spin' : ''}`} />
                <span>{isGeneratingAI ? 'Generating with Clyptus AI...' : 'Generate skills & job description by AI'}</span>
              </button>
            </div>

            {/* Job description Rich Text */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700">
                  Job description <span className="text-rose-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setJobDescription('')}
                  className="text-xs font-bold text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  Clear
                </button>
              </div>

              <div className="border border-slate-300 rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500">
                {/* Formatting Toolbar */}
                <div className="bg-slate-50 border-b border-slate-200 px-3 py-2 flex items-center gap-3 text-xs font-bold text-slate-700">
                  <button type="button" className="px-2 py-0.5 hover:bg-slate-200 rounded font-serif">B</button>
                  <button type="button" className="px-2 py-0.5 hover:bg-slate-200 rounded italic font-serif">I</button>
                  <button type="button" className="px-2 py-0.5 hover:bg-slate-200 rounded underline font-serif">U</button>
                  <span className="text-slate-300">|</span>
                  <button type="button" className="px-2 py-0.5 hover:bg-slate-200 rounded">• List</button>
                  <button type="button" className="px-2 py-0.5 hover:bg-slate-200 rounded">1. List</button>
                  <span className="text-slate-300">|</span>
                  <select className="bg-transparent font-semibold text-xs text-slate-700 focus:outline-none">
                    <option>Normal</option>
                    <option>Heading 1</option>
                    <option>Heading 2</option>
                  </select>
                </div>

                <textarea
                  rows={7}
                  required
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Outlines the roles and responsibilities the candidate will perform in this role."
                  className="w-full p-4 text-xs font-medium text-slate-800 border-none focus:outline-none resize-y"
                />
              </div>
            </div>

            {/* Diversity Priority Checkbox */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
              <label className="flex items-center gap-2.5 font-bold text-slate-800 cursor-pointer">
                <span>This job will prioritize:</span>
                <input
                  type="checkbox"
                  checked={prioritizeWomen}
                  onChange={(e) => setPrioritizeWomen(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                />
                <span>Women</span>
              </label>
            </div>
          </div>

          {/* Card 2: Skills & Job Location */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-5">
            {/* Skills */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Skills <span className="text-rose-500">*</span>
              </label>
              <div className="flex flex-wrap items-center gap-2 p-2.5 border border-slate-300 rounded-xl focus-within:ring-2 focus-within:ring-indigo-500 bg-white">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 border border-indigo-100 text-xs font-bold px-3 py-1 rounded-full"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="hover:text-rose-600 rounded-full cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={handleAddSkill}
                  placeholder={skills.length === 0 ? "Search by skills e.g., Java, Customer Support" : "Add skill..."}
                  className="flex-1 min-w-[180px] bg-transparent text-xs font-medium text-slate-900 border-none focus:outline-none py-1"
                />
              </div>
              <div className="text-[11px] text-slate-400 mt-1">Press Enter to add skills tag</div>
            </div>

            {/* Job Location */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Job location <span className="text-rose-500">*</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <select
                    value={workMode}
                    onChange={(e) => setWorkMode(e.target.value as WorkMode)}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 bg-white focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                  >
                    <option value="On-site">On-site</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 bg-white focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                  >
                    <option value="Bangalore, Karnataka">Bangalore, Karnataka</option>
                    <option value="Hyderabad, Telangana">Hyderabad, Telangana</option>
                    <option value="Pune, Maharashtra">Pune, Maharashtra</option>
                    <option value="Mumbai, Maharashtra">Mumbai, Maharashtra</option>
                    <option value="Delhi NCR / Gurgaon">Delhi NCR / Gurgaon</option>
                    <option value="Chennai, Tamil Nadu">Chennai, Tamil Nadu</option>
                    <option value="Remote, India">Remote, India</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Salary & Classification */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-5">
            {/* Min & Max Salary */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Min salary (Annually ₹) <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={salaryMin}
                    onChange={(e) => setSalaryMin(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 bg-white focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                  >
                    <option value={300000}>₹ 3 Lakhs</option>
                    <option value={500000}>₹ 5 Lakhs</option>
                    <option value={800000}>₹ 8 Lakhs</option>
                    <option value={1200000}>₹ 12 Lakhs</option>
                    <option value={1800000}>₹ 18 Lakhs</option>
                    <option value={2500000}>₹ 25 Lakhs</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Max salary (Annually ₹) <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={salaryMax}
                    onChange={(e) => setSalaryMax(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 bg-white focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                  >
                    <option value={600000}>₹ 6 Lakhs</option>
                    <option value={1000000}>₹ 10 Lakhs</option>
                    <option value={1500000}>₹ 15 Lakhs</option>
                    <option value={2200000}>₹ 22 Lakhs</option>
                    <option value={3000000}>₹ 30 Lakhs</option>
                    <option value={5000000}>₹ 50 Lakhs+</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Perks & Benefits */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Perks and benefits <Info className="w-3.5 h-3.5 text-slate-400 inline" />
              </label>
              <input
                type="text"
                value={perksAndBenefits}
                onChange={(e) => setPerksAndBenefits(e.target.value)}
                placeholder="Eg. Cab Services, Paternity leave, Health Insurance, Annual Bonus"
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Industry */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Industry
              </label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 bg-white focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="IT Software & Services">IT Software & Services</option>
                <option value="Engineering & Construction">Engineering & Construction</option>
                <option value="Financial Services & Fintech">Financial Services & Fintech</option>
                <option value="E-Commerce & Internet">E-Commerce & Internet</option>
                <option value="Healthcare & Pharma">Healthcare & Pharma</option>
              </select>
            </div>

            {/* Functions & Roles */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Functions and roles
              </label>
              <select
                value={functionRole}
                onChange={(e) => setFunctionRole(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 bg-white focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="Software Engineering - Frontend">Software Engineering - Frontend</option>
                <option value="Software Engineering - Backend">Software Engineering - Backend</option>
                <option value="Software Engineering - Full Stack">Software Engineering - Full Stack</option>
                <option value="DevOps & Cloud Architecture">DevOps & Cloud Architecture</option>
                <option value="Product Management">Product Management</option>
              </select>
            </div>

            {/* Education */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Education
              </label>
              <select
                value={educationLevel}
                onChange={(e) => setEducationLevel(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 bg-white focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="B.E / B.Tech (CS / IT / ECE)">B.E / B.Tech (CS / IT / ECE)</option>
                <option value="M.Tech / MS in CS">M.Tech / MS in CS</option>
                <option value="MCA / B.Sc Computer Science">MCA / B.Sc Computer Science</option>
                <option value="Any Graduate">Any Graduate</option>
              </select>
            </div>
          </div>

          {/* Card 4: Folder & Questionnaire */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Folder */}
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm mb-3">Folder</h3>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Folder to save this job <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                placeholder="e.g. Engineering Hiring Q4"
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Questionnaire */}
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm mb-3">Questionnaire</h3>
              <label className="flex items-center gap-2 font-bold text-xs text-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={enableQuestionnaire}
                  onChange={(e) => setEnableQuestionnaire(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                />
                <span>Add questionnaire to this job posting</span>
              </label>

              {enableQuestionnaire && (
                <div className="mt-4 space-y-3">
                  {screeningQuestions.map((q, idx) => (
                    <div key={q.id} className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-400">{idx + 1}.</span>
                      <input
                        type="text"
                        value={q.question}
                        onChange={(e) => {
                          const updated = [...screeningQuestions];
                          updated[idx].question = e.target.value;
                          setScreeningQuestions(updated);
                        }}
                        placeholder="Enter question for applicants"
                        className="flex-1 px-3 py-1.5 border border-slate-300 rounded-xl text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveQuestion(q.id)}
                        className="p-1 text-slate-400 hover:text-rose-600 rounded"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddQuestion}
                    className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Question
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Sticky Bottom Action Bar (Matching Foundit layout) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 p-4 shadow-xl z-30 flex items-center justify-end px-6 lg:px-12">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => handleSubmit('Draft')}
            className="text-xs font-extrabold text-slate-700 hover:text-indigo-600 hover:underline cursor-pointer"
          >
            Save as draft
          </button>

          <button
            type="button"
            onClick={() => setIsPreviewOpen(true)}
            className="px-5 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
          >
            Preview job post
          </button>

          <button
            type="button"
            onClick={() => handleSubmit('Published')}
            className="px-7 py-2.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-xl text-xs font-extrabold shadow-md transition-all cursor-pointer"
          >
            Post Job
          </button>
        </div>
      </div>

      {/* Job Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-4 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-extrabold uppercase bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-100">
                  JOB PREVIEW
                </span>
                <h2 className="text-lg font-extrabold text-slate-900 mt-1">{title || 'Untitled Job Post'}</h2>
              </div>
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="flex flex-wrap items-center gap-4 text-slate-500 font-semibold">
                <span>📍 {location}</span>
                <span>•</span>
                <span>💼 {employmentType} ({workMode})</span>
                <span>•</span>
                <span>⏱️ {experienceMin}-{experienceMax} Years Exp</span>
                <span>•</span>
                <span>💰 {hideSalary ? 'Confidential' : `₹${(salaryMin/100000).toFixed(1)}L - ₹${(salaryMax/100000).toFixed(1)}L PA`}</span>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <h4 className="font-bold text-slate-900 mb-1">Required Skills:</h4>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((s) => (
                    <span key={s} className="px-2.5 py-0.5 bg-slate-100 rounded-full text-slate-800 font-semibold">{s}</span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <h4 className="font-bold text-slate-900 mb-1">Job Description:</h4>
                <p className="whitespace-pre-line text-slate-600 leading-relaxed">
                  {jobDescription || 'No description provided.'}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Close Preview
              </button>
              <button
                onClick={() => {
                  setIsPreviewOpen(false);
                  handleSubmit('Published');
                }}
                className="px-5 py-2 bg-[#4F46E5] text-white rounded-xl text-xs font-bold hover:bg-[#4338CA]"
              >
                Confirm & Post Job
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
