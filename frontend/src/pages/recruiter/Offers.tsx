import React, { useState } from 'react';
import { Gift, Plus, Search } from 'lucide-react';
import { useRecruiterStore } from '../../store/recruiterStore';
import { OfferTable } from '../../components/recruiter/OfferTable';
import { CreateOfferModal } from '../../components/recruiter/CreateOfferModal';

export const Offers: React.FC = () => {
  const { offers } = useRecruiterStore();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isCreateOfferOpen, setIsCreateOfferOpen] = useState(false);

  const filteredOffers = offers.filter((offer) => {
    const matchesSearch =
      offer.candidateName.toLowerCase().includes(search.toLowerCase()) ||
      offer.jobTitle.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'all' || offer.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Offer Management</h1>
          <p className="text-xs text-slate-500">Track and generate compensation packages for top candidates</p>
        </div>

        <button
          onClick={() => setIsCreateOfferOpen(true)}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Create Offer Package
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search candidate name or job title..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full sm:w-44 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 font-medium"
        >
          <option value="all">All Statuses</option>
          <option value="Sent">Offer Sent</option>
          <option value="Accepted">Accepted</option>
          <option value="Draft">Draft</option>
          <option value="Rejected">Declined</option>
        </select>
      </div>

      {/* Offer Table */}
      <OfferTable offers={filteredOffers} />

      {/* Create Offer Modal */}
      <CreateOfferModal isOpen={isCreateOfferOpen} onClose={() => setIsCreateOfferOpen(false)} />
    </div>
  );
};
