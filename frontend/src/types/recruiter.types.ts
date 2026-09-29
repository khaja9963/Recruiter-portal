export type JobStatus = 'Draft' | 'Published' | 'Paused' | 'Closed';
export type EmploymentType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Remote';
export type WorkMode = 'On-site' | 'Remote' | 'Hybrid';
export type ExperienceLevel = 'Entry-level' | 'Mid-level' | 'Senior' | 'Lead' | 'Executive';

export type ApplicationStage = 
  | 'Applied' 
  | 'Screening' 
  | 'Shortlisted' 
  | 'Interview' 
  | 'Offer' 
  | 'Hired' 
  | 'Rejected';

export type InterviewType = 'Video' | 'Onsite' | 'Phone';
export type InterviewStatus = 'Scheduled' | 'Completed' | 'Cancelled' | 'Rescheduled';
export type RecommendationType = 'Proceed' | 'Hold' | 'Reject';
export type OfferStatus = 'Draft' | 'Sent' | 'Accepted' | 'Rejected' | 'Expired';

export interface RecruiterProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  title: string;
  avatar: string;
  organizationId: string;
  organizationName: string;
  role: 'Recruiter' | 'Senior Recruiter' | 'Lead Recruiter' | 'Talent Acquisition Manager';
  joinedDate: string;
  department?: string;
  location?: string;
  bio?: string;
  timezone?: string;
}

export interface ScreeningQuestion {
  id: string;
  question: string;
  required: boolean;
}

export interface Job {
  id: string;
  organizationId: string;
  title: string;
  department: string;
  location: string;
  employmentType: EmploymentType;
  workMode: WorkMode;
  experienceLevel: ExperienceLevel;
  salaryMin: number;
  salaryMax: number;
  currency: string;
  status: JobStatus;
  postedDate: string;
  deadline: string;
  openings: number;
  assignedRecruiterId: string;
  assignedRecruiterName: string;
  summary: string;
  responsibilities: string[];
  requiredSkills: string[];
  preferredSkills: string[];
  qualifications: string[];
  interviewProcess: string[];
  screeningQuestions: ScreeningQuestion[];
  applicationsCount: number;
  shortlistedCount: number;
  viewsCount: number;
}

export interface WorkExperienceItem {
  company: string;
  role: string;
  duration: string;
  description: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  year: string;
}

export interface ProjectItem {
  title: string;
  description: string;
  link?: string;
}

export interface Candidate {
  id: string;
  organizationId: string;
  name: string;
  avatar: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  experienceYears: number;
  skills: string[];
  education: string;
  currentCompany: string;
  resumeUrl: string;
  matchScore: number;
  overallRating: number;
  availability: string;
  appliedJobsCount: number;
  summary: string;
  workHistory: WorkExperienceItem[];
  educationList: EducationItem[];
  projects: ProjectItem[];
  certifications: string[];
}

export interface RecruiterNote {
  id: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  createdAt: string;
}

export interface ApplicationTimelineEvent {
  id: string;
  stage: ApplicationStage;
  date: string;
  description: string;
  updatedBy: string;
}

export interface Application {
  id: string;
  candidateId: string;
  jobId: string;
  organizationId: string;
  candidateName: string;
  candidateAvatar: string;
  candidateEmail: string;
  candidatePhone: string;
  candidateTitle: string;
  candidateLocation: string;
  candidateExperienceYears: number;
  candidateSkills: string[];
  jobTitle: string;
  department: string;
  appliedDate: string;
  stage: ApplicationStage;
  matchScore: number;
  resumeUrl: string;
  notes: RecruiterNote[];
  timeline: ApplicationTimelineEvent[];
}

export interface InterviewFeedback {
  id: string;
  interviewId: string;
  technicalScore: number;
  communicationScore: number;
  problemSolvingScore: number;
  suitabilityScore: number;
  strengths: string;
  weaknesses: string;
  recommendation: RecommendationType;
  comments: string;
  submittedAt: string;
  submittedBy: string;
}

export interface Interview {
  id: string;
  applicationId: string;
  candidateId: string;
  jobId: string;
  organizationId: string;
  candidateName: string;
  candidateAvatar: string;
  candidateEmail: string;
  jobTitle: string;
  roundName: string;
  interviewerName: string;
  interviewerEmail: string;
  date: string;
  time: string;
  type: InterviewType;
  meetingLink?: string;
  location?: string;
  status: InterviewStatus;
  notes?: string;
  feedback?: InterviewFeedback;
}

export interface Offer {
  id: string;
  applicationId: string;
  candidateId: string;
  jobId: string;
  organizationId: string;
  candidateName: string;
  candidateAvatar: string;
  candidateEmail: string;
  jobTitle: string;
  department: string;
  offerDate: string;
  joiningDate: string;
  baseSalary: number;
  bonus: number;
  equity: string;
  currency: string;
  status: OfferStatus;
  notes?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'application' | 'interview' | 'offer' | 'feedback' | 'stage' | 'job';
  timestamp: string;
  read: boolean;
  link?: string;
}

export interface RecruiterKPIs {
  activeJobs: number;
  draftJobs: number;
  totalApplications: number;
  newApplications: number;
  shortlistedCandidates: number;
  interviewsScheduled: number;
  offersSent: number;
  hiredCandidates: number;
}

export interface ActivityItem {
  id: string;
  type: string;
  user: string;
  action: string;
  target: string;
  time: string;
  badgeColor?: string;
}
