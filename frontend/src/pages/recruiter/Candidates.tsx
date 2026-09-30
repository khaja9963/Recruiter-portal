import React, { useState } from 'react';
import { Search, Filter, LayoutGrid, List, UserCheck, Star, Plus, Users } from 'lucide-react';
import { useRecruiterStore } from '../../store/recruiterStore';
import { CandidateCard } from '../../components/recruiter/CandidateCard';
import { CandidateTable } from '../../components/recruiter/CandidateTable';
import { AddCandidateModal } from '../../components/recruiter/AddCandidateModal';

export const Candidates: React.FC = () => {
  const { candidates } = useRecruiterStore();
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [search, setSearch] = useState('');
  const [skillFilter, setSkillFilter] = useState('all');
  const [expFilter, setExpFilter] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredCandidates = candidates.filter((cand) => {
    const matchesSearch =
      cand.name.toLowerCase().includes(search.toLowerCase()) ||
      cand.title.toLowerCase().includes(search.toLowerCase()) ||
      cand.location.toLowerCase().includes(search.toLowerCase()) ||
      cand.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()));

    const matchesSkill =
      skillFilter === 'all' || cand.skills.some((s) => s.toLowerCase() === skillFilter.toLowerCase());

    const matchesExp =
      expFilter === 'all' ||
      (expFilter === 'senior' && cand.experienceYears >= 5) ||
      (expFilter === 'mid' && cand.experienceYears >= 3 && cand.experienceYears < 5);

    return matchesSearch && matchesSkill && matchesExp;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-600" /> Candidate Talent Pool ({filteredCandidates.length})
          </h1>
          <p className="text-xs text-slate-500">Discover, register, and inspect candidate profiles and real PDF resumes</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold text-xs rounded-xl shadow-2xs flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Real Candidate
          </button>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs font-medium transition-colors ${
                viewMode === 'grid' ? 'bg-white text-indigo-600 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs font-medium transition-colors ${
                viewMode === 'table' ? 'bg-white text-indigo-600 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search candidate name, skill, target role..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <select
          value={skillFilter}
          onChange={(e) => setSkillFilter(e.target.value)}
          className="w-full sm:w-44 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 font-medium"
        >
          <option value="all">All Skills</option>
          <option value="React">React</option>
          <option value="TypeScript">TypeScript</option>
          <option value="Node.js">Node.js</option>
          <option value="Figma">Figma</option>
        </select>

        <select
          value={expFilter}
          onChange={(e) => setExpFilter(e.target.value)}
          className="w-full sm:w-44 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 font-medium"
        >
          <option value="all">Any Experience</option>
          <option value="senior">Senior (5+ yrs)</option>
          <option value="mid">Mid-level (3-5 yrs)</option>
        </select>
      </div>

      {/* Candidate Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCandidates.map((cand) => (
            <CandidateCard key={cand.id} candidate={cand} />
          ))}
        </div>
      ) : (
        <CandidateTable candidates={filteredCandidates} />
      )}

      {/* Add Candidate Modal */}
      <AddCandidateModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};
