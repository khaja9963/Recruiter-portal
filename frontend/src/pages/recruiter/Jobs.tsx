import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Plus, Search, Filter, LayoutGrid, List, Briefcase, RefreshCw } from 'lucide-react';
import { useRecruiterStore } from '../../store/recruiterStore';
import { JobCard } from '../../components/recruiter/JobCard';
import { JobTable } from '../../components/recruiter/JobTable';
import { JobStatus, EmploymentType } from '../../types/recruiter.types';

export const Jobs: React.FC = () => {
  const navigate = useNavigate();
  const { organizationId = 'clyptus' } = useParams<{ organizationId: string }>();
  const { jobs } = useRecruiterStore();

  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [deptFilter, setDeptFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.department.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    const matchesDept = deptFilter === 'all' || job.department === deptFilter;
    const matchesType = typeFilter === 'all' || job.employmentType === typeFilter;

    return matchesSearch && matchesStatus && matchesDept && matchesType;
  });

  const departments = Array.from(new Set(jobs.map((j) => j.department)));

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Title Header */}
      <div className="pb-2 border-b border-slate-200/80">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Job Requisitions</h1>
        <p className="text-xs text-slate-500">Manage and publish job postings for your organization</p>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex flex-1 flex-col sm:flex-row items-center gap-3">
          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search job title or location..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-40 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Statuses</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
            <option value="Paused">Paused</option>
            <option value="Closed">Closed</option>
          </select>

          {/* Department Filter */}
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="w-full sm:w-40 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Departments</option>
            {departments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 self-end md:self-auto">
          <button
            onClick={() => setViewMode('table')}
            className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
              viewMode === 'table' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
            }`}
            title="Table View"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
              viewMode === 'grid' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
            }`}
            title="Grid Card View"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      {viewMode === 'table' ? (
        <JobTable jobs={filteredJobs} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};
