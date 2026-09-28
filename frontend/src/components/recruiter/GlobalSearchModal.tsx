import React, { useState, useEffect } from 'react';
import { Search, X, Briefcase, User, FileText, Calendar, ArrowRight } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecruiterStore } from '../../store/recruiterStore';

export const GlobalSearchModal: React.FC = () => {
  const { isGlobalSearchOpen, setGlobalSearchOpen, jobs, candidates, applications, interviews } =
    useRecruiterStore();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { organizationId = 'clyptus' } = useParams<{ organizationId: string }>();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setGlobalSearchOpen(!isGlobalSearchOpen);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isGlobalSearchOpen, setGlobalSearchOpen]);

  if (!isGlobalSearchOpen) return null;

  const filteredJobs = query.trim()
    ? jobs.filter((j) => j.title.toLowerCase().includes(query.toLowerCase()) || j.department.toLowerCase().includes(query.toLowerCase()))
    : jobs.slice(0, 3);

  const filteredCandidates = query.trim()
    ? candidates.filter(
        (c) =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.title.toLowerCase().includes(query.toLowerCase()) ||
          c.skills.some((s) => s.toLowerCase().includes(query.toLowerCase()))
      )
    : candidates.slice(0, 3);

  const handleSelectJob = (id: string) => {
    setGlobalSearchOpen(false);
    navigate(`/org/${organizationId}/recruiter/jobs/${id}`);
  };

  const handleSelectCandidate = (id: string) => {
    setGlobalSearchOpen(false);
    navigate(`/org/${organizationId}/recruiter/candidates/${id}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-150">
        <div className="flex items-center px-4 py-3 border-b border-slate-100 bg-slate-50/50">
          <Search className="w-5 h-5 text-slate-400 mr-3" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search active jobs, candidate profiles, applications, skills..."
            className="w-full bg-transparent text-slate-900 placeholder-slate-400 focus:outline-none text-sm font-medium"
          />
          <button
            onClick={() => setGlobalSearchOpen(false)}
            className="text-slate-400 hover:text-slate-600 text-xs px-2 py-1 bg-slate-200/60 rounded-md font-mono"
          >
            ESC
          </button>
        </div>

        <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
          {/* Jobs */}
          {filteredJobs.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-2 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-blue-500" /> Jobs ({filteredJobs.length})
              </div>
              <div className="space-y-1">
                {filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    onClick={() => handleSelectJob(job.id)}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-blue-50/60 cursor-pointer group transition-colors"
                  >
                    <div>
                      <div className="text-xs font-semibold text-slate-800 group-hover:text-blue-600">
                        {job.title}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {job.department} • {job.location} • {job.applicationsCount} applicants
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Candidates */}
          {filteredCandidates.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-2 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-indigo-500" /> Candidates ({filteredCandidates.length})
              </div>
              <div className="space-y-1">
                {filteredCandidates.map((cand) => (
                  <div
                    key={cand.id}
                    onClick={() => handleSelectCandidate(cand.id)}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-indigo-50/60 cursor-pointer group transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img src={cand.avatar} alt={cand.name} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <div className="text-xs font-semibold text-slate-800 group-hover:text-indigo-600">
                          {cand.name}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {cand.title} • {cand.location} • {cand.experienceYears} yrs exp
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
