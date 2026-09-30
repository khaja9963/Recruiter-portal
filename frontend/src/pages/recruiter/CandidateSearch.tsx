import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';
import {
  Search,
  Filter,
  SlidersHorizontal,
  MapPin,
  Briefcase,
  GraduationCap,
  Sparkles,
  Bookmark,
  ArrowUpDown,
  ExternalLink,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';
import { useRecruiterStore } from '../../store/recruiterStore';

export const CandidateSearch: React.FC = () => {
  const { organizationId = 'clyptus' } = useParams<{ organizationId: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const { candidates } = useRecruiterStore();

  const [keyword, setKeyword] = React.useState(initialQuery);
  const [selectedSkill, setSelectedSkill] = useState<string>('All');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [selectedExperience, setSelectedExperience] = useState<string>('All');
  const [selectedWorkMode, setSelectedWorkMode] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'relevance' | 'experience' | 'matchScore'>('relevance');
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [shortlistedIds, setShortlistedIds] = useState<string[]>([]);

  React.useEffect(() => {
    const queryParam = searchParams.get('q');
    if (queryParam !== null) {
      setKeyword(queryParam);
    }
  }, [searchParams]);

  const allSkills = ['All', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Next.js', 'Python', 'Docker'];
  const allLocations = ['All', 'San Francisco, CA', 'Austin, TX', 'New York, NY', 'Remote', 'Seattle, WA'];

  const toggleSave = (id: string) => {
    if (savedIds.includes(id)) {
      setSavedIds(savedIds.filter((item) => item !== id));
    } else {
      setSavedIds([...savedIds, id]);
    }
  };

  const toggleShortlist = (id: string) => {
    if (shortlistedIds.includes(id)) {
      setShortlistedIds(shortlistedIds.filter((item) => item !== id));
    } else {
      setShortlistedIds([...shortlistedIds, id]);
    }
  };

  const filteredCandidates = candidates.filter((cand) => {
    let matchesKeyword = true;
    if (keyword.trim()) {
      const searchTerms = keyword
        .replace(/["()]/g, '')
        .split(/\s+AND\s+|\s+OR\s+|\s+/)
        .map((t) => t.trim().toLowerCase())
        .filter((t) => t.length > 0);

      const fullCandidateText = `${cand.name} ${cand.title} ${cand.skills.join(' ')} ${cand.location} ${cand.summary || ''}`.toLowerCase();

      matchesKeyword = searchTerms.some((term) => fullCandidateText.includes(term));
    }

    const matchesSkill = selectedSkill === 'All' || cand.skills.includes(selectedSkill);
    const matchesLocation = selectedLocation === 'All' || cand.location.includes(selectedLocation);
    const matchesExp =
      selectedExperience === 'All' ||
      (selectedExperience === '1-3' && cand.experienceYears <= 3) ||
      (selectedExperience === '4-6' && cand.experienceYears >= 4 && cand.experienceYears <= 6) ||
      (selectedExperience === '7+' && cand.experienceYears >= 7);

    return matchesKeyword && matchesSkill && matchesLocation && matchesExp;
  });

  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    if (sortBy === 'matchScore') return (b.matchScore || 0) - (a.matchScore || 0);
    if (sortBy === 'experience') return b.experienceYears - a.experienceYears;
    return (b.matchScore || 0) - (a.matchScore || 0);
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Search className="w-5 h-5 text-blue-600" /> Advanced Candidate Search
          </h1>
          <p className="text-xs text-slate-500">
            Search talent across skills, semantic relevance, experience, and availability within {organizationId.toUpperCase()}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setKeyword('');
              setSelectedSkill('All');
              setSelectedLocation('All');
              setSelectedExperience('All');
            }}
            className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Search Bar & Filters Card */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search by candidate name, job title, skills (e.g. React, TypeScript), or keywords..."
            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-slate-100">
          <div>
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">Skill</label>
            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
            >
              {allSkills.map((skill) => (
                <option key={skill} value={skill}>{skill}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">Location</label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
            >
              {allLocations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">Experience Level</label>
            <select
              value={selectedExperience}
              onChange={(e) => setSelectedExperience(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
            >
              <option value="All">All Experience</option>
              <option value="1-3">Entry/Mid (1 - 3 yrs)</option>
              <option value="4-6">Mid/Senior (4 - 6 yrs)</option>
              <option value="7+">Staff/Lead (7+ yrs)</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">Sort Results By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
            >
              <option value="relevance">AI Match Relevance</option>
              <option value="experience">Experience (Highest First)</option>
              <option value="matchScore">Match Score (%)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count & Facets */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>Found <strong className="text-slate-800 font-semibold">{sortedCandidates.length}</strong> matching candidates</span>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 text-[11px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full font-medium border border-blue-200">
            <Sparkles className="w-3 h-3 text-blue-600" /> AI Powered Ranking Active
          </span>
        </div>
      </div>

      {/* Candidate Results Grid */}
      {sortedCandidates.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400 mb-3">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-semibold text-slate-800">No candidates match your search filters</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting your keyword, expanding locations, or clearing skill constraints.
          </p>
          <button
            onClick={() => {
              setKeyword('');
              setSelectedSkill('All');
              setSelectedLocation('All');
              setSelectedExperience('All');
            }}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors shadow-2xs"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sortedCandidates.map((cand) => {
            const isSaved = savedIds.includes(cand.id);
            const isShortlisted = shortlistedIds.includes(cand.id);

            return (
              <div
                key={cand.id}
                className="bg-white rounded-xl border border-slate-200/90 p-4 hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={cand.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb'}
                        alt={cand.name}
                        className="w-11 h-11 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <button
                          onClick={() => navigate(`/org/${organizationId}/recruiter/candidates/${cand.id}`)}
                          className="text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors flex items-center gap-1 group text-left"
                        >
                          {cand.name}
                          <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-transform group-hover:translate-x-0.5" />
                        </button>
                        <div className="text-xs text-slate-600 font-medium">{cand.title}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <div className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-emerald-600" />
                        {cand.matchScore}% Match
                      </div>
                      <button
                        onClick={() => toggleSave(cand.id)}
                        title={isSaved ? 'Remove from saved' : 'Save candidate'}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          isSaved
                            ? 'bg-amber-50 border-amber-300 text-amber-600'
                            : 'bg-white border-slate-200 text-slate-400 hover:text-amber-500'
                        }`}
                      >
                        <Bookmark className="w-3.5 h-3.5 fill-current" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" /> {cand.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5 text-slate-400" /> {cand.experienceYears} Years Exp
                    </span>
                    <span className="flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5 text-slate-400" /> {cand.education}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {cand.skills.map((skill) => (
                      <span
                        key={skill}
                        className={`px-2 py-0.5 text-[11px] rounded-md font-medium ${
                          keyword && skill.toLowerCase().includes(keyword.toLowerCase())
                            ? 'bg-blue-100 text-blue-800 font-semibold'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Available: Immediately</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleShortlist(cand.id)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 ${
                        isShortlisted
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {isShortlisted ? 'Shortlisted' : 'Shortlist'}
                    </button>
                    <button
                      onClick={() => navigate(`/org/${organizationId}/recruiter/candidates/${cand.id}`)}
                      className="px-3 py-1 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors shadow-2xs"
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
