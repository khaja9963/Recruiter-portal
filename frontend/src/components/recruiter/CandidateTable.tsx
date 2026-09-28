import React from 'react';
import { Eye, FileText, CheckCircle, Mail, Phone, Star } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Candidate } from '../../types/recruiter.types';
import { useRecruiterStore } from '../../store/recruiterStore';

interface CandidateTableProps {
  candidates: Candidate[];
}

export const CandidateTable: React.FC<CandidateTableProps> = ({ candidates }) => {
  const navigate = useNavigate();
  const { organizationId = 'clyptus' } = useParams<{ organizationId: string }>();
  const { shortlistCandidate } = useRecruiterStore();

  if (candidates.length === 0) {
    return (
      <div className="bg-white p-12 text-center rounded-xl border border-slate-200">
        <p className="text-slate-500 font-medium text-sm">No candidate profiles found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider">
            <tr>
              <th className="py-3.5 px-4">Candidate</th>
              <th className="py-3.5 px-4">Title & Company</th>
              <th className="py-3.5 px-4">Location</th>
              <th className="py-3.5 px-4">Experience</th>
              <th className="py-3.5 px-4">Skills</th>
              <th className="py-3.5 px-4 text-center">Match Score</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {candidates.map((cand) => (
              <tr key={cand.id} className="hover:bg-slate-50/60 transition-colors">
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <img src={cand.avatar} alt={cand.name} className="w-9 h-9 rounded-full object-cover" />
                    <div>
                      <div
                        onClick={() => navigate(`/org/${organizationId}/recruiter/candidates/${cand.id}`)}
                        className="font-bold text-slate-900 hover:text-blue-600 cursor-pointer text-sm"
                      >
                        {cand.name}
                      </div>
                      <div className="text-[11px] text-slate-400 font-medium">{cand.email}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <div className="font-semibold text-slate-800">{cand.title}</div>
                  <div className="text-[11px] text-slate-400">{cand.currentCompany}</div>
                </td>
                <td className="py-3.5 px-4 font-medium text-slate-700">{cand.location}</td>
                <td className="py-3.5 px-4 font-medium text-slate-700">{cand.experienceYears} Years</td>
                <td className="py-3.5 px-4">
                  <div className="flex flex-wrap gap-1 max-w-xs">
                    {cand.skills.slice(0, 3).map((skill, i) => (
                      <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] rounded-md font-medium">
                        {skill}
                      </span>
                    ))}
                    {cand.skills.length > 3 && (
                      <span className="px-1.5 py-0.5 bg-slate-50 text-slate-400 text-[10px] rounded-md font-medium">
                        +{cand.skills.length - 3}
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-3.5 px-4 text-center">
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 font-bold rounded-lg border border-emerald-100">
                    {cand.matchScore}%
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => navigate(`/org/${organizationId}/recruiter/candidates/${cand.id}`)}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-xs"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => shortlistCandidate(cand.id)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs"
                    >
                      Shortlist
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
