import React from 'react';
import { Gift, Calendar, DollarSign, Send, XCircle, CheckCircle } from 'lucide-react';
import { Offer, OfferStatus } from '../../types/recruiter.types';
import { useRecruiterStore } from '../../store/recruiterStore';

interface OfferTableProps {
  offers: Offer[];
}

export const OfferTable: React.FC<OfferTableProps> = ({ offers }) => {
  const { updateOfferStatus } = useRecruiterStore();

  const getStatusBadge = (status: OfferStatus) => {
    switch (status) {
      case 'Draft':
        return <span className="px-2.5 py-0.5 text-xs font-semibold badge-draft rounded-full">Draft</span>;
      case 'Sent':
        return <span className="px-2.5 py-0.5 text-xs font-semibold badge-offer rounded-full">Offer Sent</span>;
      case 'Accepted':
        return <span className="px-2.5 py-0.5 text-xs font-semibold badge-hired rounded-full">Accepted</span>;
      case 'Rejected':
        return <span className="px-2.5 py-0.5 text-xs font-semibold badge-rejected rounded-full">Declined</span>;
      case 'Expired':
        return <span className="px-2.5 py-0.5 text-xs font-semibold badge-paused rounded-full">Expired</span>;
    }
  };

  if (offers.length === 0) {
    return (
      <div className="bg-white p-12 text-center rounded-xl border border-slate-200">
        <p className="text-slate-500 font-medium text-sm">No offer letters generated yet.</p>
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
              <th className="py-3.5 px-4">Job Title</th>
              <th className="py-3.5 px-4">Base Salary</th>
              <th className="py-3.5 px-4">Bonus / Equity</th>
              <th className="py-3.5 px-4">Offer Date</th>
              <th className="py-3.5 px-4">Target Start</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {offers.map((offer) => (
              <tr key={offer.id} className="hover:bg-slate-50/60 transition-colors">
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <img src={offer.candidateAvatar} alt={offer.candidateName} className="w-9 h-9 rounded-full object-cover" />
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{offer.candidateName}</div>
                      <div className="text-[11px] text-slate-400 font-medium">{offer.candidateEmail}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4 font-semibold text-slate-800">{offer.jobTitle}</td>
                <td className="py-3.5 px-4 font-bold text-emerald-700 text-sm">
                  ${offer.baseSalary.toLocaleString()} /yr
                </td>
                <td className="py-3.5 px-4">
                  <div className="font-medium text-slate-700">+${offer.bonus.toLocaleString()} Bonus</div>
                  <div className="text-[11px] text-slate-400">{offer.equity}</div>
                </td>
                <td className="py-3.5 px-4 font-medium text-slate-500">{offer.offerDate}</td>
                <td className="py-3.5 px-4 font-medium text-slate-700">{offer.joiningDate}</td>
                <td className="py-3.5 px-4">{getStatusBadge(offer.status)}</td>
                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    {offer.status === 'Sent' && (
                      <>
                        <button
                          onClick={() => updateOfferStatus(offer.id, 'Accepted')}
                          title="Mark Offer Accepted"
                          className="px-2.5 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-semibold rounded-lg text-xs flex items-center gap-1"
                        >
                          <CheckCircle className="w-3.5 h-3.5" /> Accept
                        </button>
                        <button
                          onClick={() => updateOfferStatus(offer.id, 'Rejected')}
                          title="Mark Offer Declined"
                          className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    {offer.status === 'Draft' && (
                      <button
                        onClick={() => updateOfferStatus(offer.id, 'Sent')}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-xs flex items-center gap-1"
                      >
                        <Send className="w-3.5 h-3.5" /> Send Offer
                      </button>
                    )}
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
