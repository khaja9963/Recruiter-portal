import React from 'react';
import { Outlet } from 'react-router-dom';
import { RecruiterSidebar } from './RecruiterSidebar';
import { RecruiterHeader } from './RecruiterHeader';
import { GlobalSearchModal } from '../../components/recruiter/GlobalSearchModal';

export const RecruiterLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 antialiased selection:bg-blue-500 selection:text-white">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <RecruiterHeader />
        <main className="flex-1 p-4 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          <Outlet />
        </main>
      </div>

      {/* Global Command / Search Modal */}
      <GlobalSearchModal />
    </div>
  );
};
