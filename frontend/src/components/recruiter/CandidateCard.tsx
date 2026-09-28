import React from 'react';
import { User, MapPin, Briefcase, GraduationCap, Star, FileText, CheckCircle, Mail, Phone, PlusCircle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Candidate } from '../../types/recruiter.types';
import { useRecruiterStore } from '../../store/recruiterStore';

interface CandidateCardProps {
  candidate: Candidate;
  onScheduleInterview?: (candId: string) => void;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({ candidate, onScheduleInterview }) => {
  const navigate = useNavigate();
  const { organizationId = 'clyptus' } = useParams<{ organizationId: string }>();
  const { shortlistCandidate } = useRecruiterStore();

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <img
              src={candidate.avatar}
              alt={candidate.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-xs"
            />
            <div>
              <h3
                onClick={() => navigate(`/org/${organizationId}/recruiter/candidates/${candidate.id}`)}
                className="font-bold text-slate-900 text-sm hover:text-blue-600 cursor-pointer transition-colors"
              >
                {candidate.name}
              </h3>
              <p className="text-xs text-slate-500 font-medium">{candidate.title}</p>
              <div className="text-[11px] text-slate-400">{candidate.currentCompany}</div>
            </div>
          </div>
          {candidate.matchScore && (
            <div className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-200 flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-current text-emerald-500" /> {candidate.matchScore}% Match
            </div>
          )}
        </div>

        <div className="space-y-1.5 text-xs text-slate-500 mb-4 font-medium">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400" /> {candidate.location}
          </div>
          <div className="flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-slate-400" /> {candidate.experienceYears} Years Experience
          </div>
          <div className="flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-slate-400" /> {candidate.education}
          </div>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {candidate.skills.slice(0, 5).map((skill, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[11px] font-medium rounded-md"
            >
              {skill}
            </span>
          ))}
          {candidate.skills.length > 5 && (
            <span className="px-2 py-0.5 bg-slate-50 text-slate-400 text-[11px] font-medium rounded-md">
              +{candidate.skills.length - 5}
            </span>
          )}
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1 text-emerald-600 font-medium">
            <FileText className="w-3.5 h-3.5" /> Resume Verified
          </span>
          <span>{candidate.availability}</span>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={() => navigate(`/org/${organizationId}/recruiter/candidates/${candidate.id}`)}
            className="flex-1 py-1.5 px-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors text-center"
          >
            View Profile
          </button>
          <button
            onClick={() => shortlistCandidate(candidate.id)}
            title="Shortlist Candidate"
            className="py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
          >
            Shortlist
          </button>
        </div>
      </div>
    </div>
  );
};
