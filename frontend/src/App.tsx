import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { RecruiterLogin } from './pages/auth/RecruiterLogin';
import { RecruiterLayout } from './layouts/recruiter/RecruiterLayout';
import { Dashboard } from './pages/recruiter/Dashboard';
import { Jobs } from './pages/recruiter/Jobs';
import { CreateJob } from './pages/recruiter/CreateJob';
import { JobDetails } from './pages/recruiter/JobDetails';
import { EditJob } from './pages/recruiter/EditJob';
import { Candidates } from './pages/recruiter/Candidates';
import { CandidateSearch } from './pages/recruiter/CandidateSearch';
import { CandidateDetails } from './pages/recruiter/CandidateDetails';
import { Applications } from './pages/recruiter/Applications';
import { AtsPipeline } from './pages/recruiter/AtsPipeline';
import { Interviews } from './pages/recruiter/Interviews';
import { Offers } from './pages/recruiter/Offers';
import { Messages } from './pages/recruiter/Messages';
import { Tasks } from './pages/recruiter/Tasks';
import { AiTools } from './pages/recruiter/AiTools';
import { Tokens } from './pages/recruiter/Tokens';
import { Analytics } from './pages/recruiter/Analytics';
import { Notifications } from './pages/recruiter/Notifications';
import { Profile } from './pages/recruiter/Profile';
import { Settings } from './pages/recruiter/Settings';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
});

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Recruiter Login Routes */}
          <Route path="/" element={<RecruiterLogin />} />
          <Route path="/login" element={<RecruiterLogin />} />
          <Route path="/recruiter/login" element={<RecruiterLogin />} />

          {/* Recruiter Protected Route Tree */}
          <Route path="/org/:organizationId/recruiter" element={<RecruiterLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="jobs" element={<Jobs />} />
            <Route path="jobs/create" element={<CreateJob />} />
            <Route path="jobs/:jobId" element={<JobDetails />} />
            <Route path="jobs/:jobId/edit" element={<EditJob />} />
            <Route path="candidates" element={<Candidates />} />
            <Route path="candidates/search" element={<CandidateSearch />} />
            <Route path="candidates/:candidateId" element={<CandidateDetails />} />
            <Route path="applications" element={<Applications />} />
            <Route path="ats" element={<AtsPipeline />} />
            <Route path="interviews" element={<Interviews />} />
            <Route path="offers" element={<Offers />} />
            <Route path="messages" element={<Messages />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="ai-tools" element={<AiTools />} />
            <Route path="tokens" element={<Tokens />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
