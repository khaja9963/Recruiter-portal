import { useRecruiterStore } from '../../store/recruiterStore';
import {
  Job,
  Candidate,
  Application,
  Interview,
  Offer,
  RecruiterProfile,
  RecruiterKPIs,
  ApplicationStage,
  JobStatus,
  InterviewStatus,
  OfferStatus,
  InterviewFeedback
} from '../../types/recruiter.types';

// Mock API delay for realistic network experience
const delay = (ms = 150) => new Promise((resolve) => setTimeout(resolve, ms));

export const recruiterApi = {
  // Profile
  getProfile: async (): Promise<RecruiterProfile> => {
    await delay();
    return useRecruiterStore.getState().profile;
  },
  updateProfile: async (updates: Partial<RecruiterProfile>): Promise<RecruiterProfile> => {
    await delay();
    useRecruiterStore.getState().updateProfile(updates);
    return useRecruiterStore.getState().profile;
  },

  // KPIs & Stats
  getDashboardKPIs: async (): Promise<RecruiterKPIs> => {
    await delay();
    const state = useRecruiterStore.getState();
    const activeJobs = state.jobs.filter((j) => j.status === 'Published').length;
    const draftJobs = state.jobs.filter((j) => j.status === 'Draft').length;
    const totalApplications = state.applications.length;
    const newApplications = state.applications.filter((a) => a.stage === 'Applied').length;
    const shortlistedCandidates = state.applications.filter((a) => a.stage === 'Shortlisted').length;
    const interviewsScheduled = state.interviews.filter((i) => i.status === 'Scheduled').length;
    const offersSent = state.offers.filter((o) => o.status === 'Sent').length;
    const hiredCandidates = state.applications.filter((a) => a.stage === 'Hired').length;

    return {
      activeJobs,
      draftJobs,
      totalApplications,
      newApplications,
      shortlistedCandidates,
      interviewsScheduled,
      offersSent,
      hiredCandidates
    };
  },

  // Jobs
  getJobs: async (filters?: { status?: JobStatus; search?: string; department?: string }): Promise<Job[]> => {
    await delay();
    let jobs = useRecruiterStore.getState().jobs;
    if (filters?.status) {
      jobs = jobs.filter((j) => j.status === filters.status);
    }
    if (filters?.department) {
      jobs = jobs.filter((j) => j.department.toLowerCase().includes(filters.department!.toLowerCase()));
    }
    if (filters?.search) {
      const query = filters.search.toLowerCase();
      jobs = jobs.filter(
        (j) =>
          j.title.toLowerCase().includes(query) ||
          j.location.toLowerCase().includes(query) ||
          j.department.toLowerCase().includes(query)
      );
    }
    return jobs;
  },

  getJobById: async (jobId: string): Promise<Job | null> => {
    await delay();
    const job = useRecruiterStore.getState().jobs.find((j) => j.id === jobId);
    return job || null;
  },

  createJob: async (jobData: Omit<Job, 'id' | 'organizationId' | 'postedDate' | 'applicationsCount' | 'shortlistedCount' | 'viewsCount'>): Promise<Job> => {
    await delay();
    return useRecruiterStore.getState().createJob(jobData);
  },

  updateJob: async (jobId: string, updates: Partial<Job>): Promise<Job> => {
    await delay();
    useRecruiterStore.getState().updateJob(jobId, updates);
    return useRecruiterStore.getState().jobs.find((j) => j.id === jobId)!;
  },

  updateJobStatus: async (jobId: string, status: JobStatus): Promise<void> => {
    await delay();
    useRecruiterStore.getState().updateJobStatus(jobId, status);
  },

  deleteJob: async (jobId: string): Promise<void> => {
    await delay();
    useRecruiterStore.getState().deleteJob(jobId);
  },

  // Candidates
  getCandidates: async (filters?: { search?: string; skill?: string; location?: string }): Promise<Candidate[]> => {
    await delay();
    let candidates = useRecruiterStore.getState().candidates;
    if (filters?.search) {
      const query = filters.search.toLowerCase();
      candidates = candidates.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.title.toLowerCase().includes(query) ||
          c.location.toLowerCase().includes(query) ||
          c.skills.some((s) => s.toLowerCase().includes(query))
      );
    }
    if (filters?.skill) {
      candidates = candidates.filter((c) =>
        c.skills.some((s) => s.toLowerCase().includes(filters.skill!.toLowerCase()))
      );
    }
    if (filters?.location) {
      candidates = candidates.filter((c) =>
        c.location.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }
    return candidates;
  },

  getCandidateById: async (candidateId: string): Promise<Candidate | null> => {
    await delay();
    return useRecruiterStore.getState().candidates.find((c) => c.id === candidateId) || null;
  },

  // Applications
  getApplications: async (filters?: { jobId?: string; stage?: ApplicationStage; search?: string }): Promise<Application[]> => {
    await delay();
    let apps = useRecruiterStore.getState().applications;
    if (filters?.jobId) {
      apps = apps.filter((a) => a.jobId === filters.jobId);
    }
    if (filters?.stage) {
      apps = apps.filter((a) => a.stage === filters.stage);
    }
    if (filters?.search) {
      const query = filters.search.toLowerCase();
      apps = apps.filter(
        (a) =>
          a.candidateName.toLowerCase().includes(query) ||
          a.jobTitle.toLowerCase().includes(query) ||
          a.candidateEmail.toLowerCase().includes(query)
      );
    }
    return apps;
  },

  updateApplicationStage: async (applicationId: string, newStage: ApplicationStage): Promise<void> => {
    await delay();
    useRecruiterStore.getState().updateApplicationStage(applicationId, newStage);
  },

  addRecruiterNote: async (applicationId: string, note: string): Promise<void> => {
    await delay();
    useRecruiterStore.getState().addRecruiterNote(applicationId, note);
  },

  // Interviews
  getInterviews: async (): Promise<Interview[]> => {
    await delay();
    return useRecruiterStore.getState().interviews;
  },

  scheduleInterview: async (interviewData: Omit<Interview, 'id' | 'organizationId' | 'status'>): Promise<Interview> => {
    await delay();
    return useRecruiterStore.getState().scheduleInterview(interviewData);
  },

  addInterviewFeedback: async (interviewId: string, feedback: Omit<InterviewFeedback, 'id' | 'interviewId' | 'submittedAt'>): Promise<void> => {
    await delay();
    useRecruiterStore.getState().addInterviewFeedback(interviewId, feedback);
  },

  // Offers
  getOffers: async (): Promise<Offer[]> => {
    await delay();
    return useRecruiterStore.getState().offers;
  },

  createOffer: async (offerData: Omit<Offer, 'id' | 'organizationId' | 'offerDate' | 'status'>): Promise<Offer> => {
    await delay();
    return useRecruiterStore.getState().createOffer(offerData);
  },

  updateOfferStatus: async (offerId: string, status: OfferStatus): Promise<void> => {
    await delay();
    useRecruiterStore.getState().updateOfferStatus(offerId, status);
  }
};
