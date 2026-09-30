import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  UserCheck,
  XCircle,
  Calendar,
  MessageSquare,
  FileText,
  Star,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  ExternalLink,
  Plus
} from 'lucide-react';
import { useRecruiterStore } from '../../store/recruiterStore';
import { ScheduleInterviewModal } from '../../components/recruiter/ScheduleInterviewModal';
import { AddCandidateNoteModal } from '../../components/recruiter/AddCandidateNoteModal';

export const CandidateDetails: React.FC = () => {
  const navigate = useNavigate();
  const { organizationId = 'clyptus', candidateId } = useParams<{
    organizationId: string;
    candidateId: string;
  }>();

  const { candidates, applications, interviews, shortlistCandidate, updateCandidate } = useRecruiterStore();
  const resumeInputRef = React.useRef<HTMLInputElement>(null);

  const candidate = candidates.find((c) => c.id === candidateId);
  const candidateApps = applications.filter((a) => a.candidateId === candidateId);
  const candidateInterviews = interviews.filter((i) => i.candidateId === candidateId);

  const [activeTab, setActiveTab] = useState<'profile' | 'resume' | 'applications' | 'interviews' | 'notes'>('profile');
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isNoteOpen, setIsNoteOpen] = useState(false);

  const handleResumeFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && candidate) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          updateCandidate(candidate.id, { resumeUrl: reader.result });
          alert(`Successfully uploaded real PDF resume: ${file.name}`);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  if (!candidate) {
    return (
      <div className="p-8 text-center bg-white rounded-xl border border-slate-200">
        <p className="text-slate-500 font-medium">Candidate profile not found.</p>
        <button onClick={() => navigate(-1)} className="mt-4 text-xs font-bold text-blue-600">
          Back to Candidates
        </button>
      </div>
    );
  }

  const primaryApp = candidateApps[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-200 pb-12">
      {/* Top Header Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 text-slate-500 hover:text-slate-800 rounded-xl">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <img
              src={candidate.avatar}
              alt={candidate.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900">{candidate.name}</h1>
                <span className="px-2.5 py-0.5 text-xs font-bold bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-current text-emerald-500" /> {candidate.matchScore}% Match
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-600">{candidate.title}</p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> {candidate.location}
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5" /> {candidate.experienceYears} Years Exp
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5" /> {candidate.email}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => shortlistCandidate(candidate.id)}
              className="px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-xl border border-indigo-200"
            >
              Shortlist
            </button>
            <button
              onClick={() => setIsScheduleOpen(true)}
              className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5"
            >
              <Calendar className="w-4 h-4" /> Schedule Interview
            </button>
            <button
              onClick={() => setIsNoteOpen(true)}
              className="px-3.5 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold rounded-xl border border-purple-200 flex items-center gap-1.5"
            >
              <MessageSquare className="w-4 h-4" /> Add Note
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-t border-slate-100 pt-3">
          {[
            { id: 'profile', label: 'Candidate Profile' },
            { id: 'resume', label: 'Resume Preview' },
            { id: 'applications', label: `Applications (${candidateApps.length})` },
            { id: 'interviews', label: `Interview History (${candidateInterviews.length})` },
            { id: 'notes', label: `Recruiter Notes (${primaryApp?.notes.length || 0})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Summary */}
            <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 mb-2">Professional Summary</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{candidate.summary}</p>
            </div>

            {/* Work History */}
            <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Work Experience</h3>
              {candidate.workHistory.map((exp, i) => (
                <div key={i} className="pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                    <span>{exp.role} — {exp.company}</span>
                    <span className="text-slate-400 font-normal">{exp.duration}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{exp.description}</p>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 mb-3">Skills & Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill, i) => (
                  <span key={i} className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar Timeline */}
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 mb-4">Recruitment Timeline</h3>
              {primaryApp ? (
                <div className="space-y-3">
                  {primaryApp.timeline.map((item) => (
                    <div key={item.id} className="flex items-start gap-3 text-xs">
                      <div className="w-2 h-2 rounded-full bg-blue-600 mt-1 shrink-0" />
                      <div>
                        <div className="font-bold text-slate-800">{item.stage}</div>
                        <div className="text-[11px] text-slate-500">{item.description}</div>
                        <div className="text-[10px] text-slate-400">{item.date} • {item.updatedBy}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400">No active applications</p>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'resume' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
          <input
            type="file"
            ref={resumeInputRef}
            onChange={handleResumeFileChange}
            accept=".pdf,.doc,.docx"
            className="hidden"
          />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-600" /> Candidate Resume Document
              </h3>
              <p className="text-xs text-slate-500">
                View or upload real PDF resume for {candidate.name}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => resumeInputRef.current?.click()}
                className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-2xs flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" /> Upload Real PDF Resume
              </button>

              <a
                href={candidate.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 flex items-center gap-1.5 transition-colors"
              >
                <ExternalLink className="w-4 h-4" /> Open / Download PDF
              </a>
            </div>
          </div>

          <div className="w-full bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-inner min-h-[600px] flex flex-col">
            {candidate.resumeUrl ? (
              <iframe
                src={candidate.resumeUrl}
                title={`${candidate.name} Resume`}
                className="w-full h-[650px] border-0 rounded-2xl"
              />
            ) : (
              <div className="p-12 text-center text-xs text-slate-400 font-medium">
                No PDF resume uploaded yet. Click "Upload Real PDF Resume" above to select a file from your computer.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modals */}
      {primaryApp && (
        <ScheduleInterviewModal
          isOpen={isScheduleOpen}
          onClose={() => setIsScheduleOpen(false)}
          prefillApplicationId={primaryApp.id}
        />
      )}
      {primaryApp && (
        <AddCandidateNoteModal
          applicationId={primaryApp.id}
          candidateName={candidate.name}
          isOpen={isNoteOpen}
          onClose={() => setIsNoteOpen(false)}
        />
      )}
    </div>
  );
};
