export type JobType = 'full-time' | 'part-time' | 'contract' | 'internship' | 'temporary';
export type ExperienceLevel = 'entry' | 'mid' | 'senior' | 'lead' | 'executive';
export type RemoteOption = 'remote' | 'hybrid' | 'onsite';

export interface Job {
  id: string;
  title: string;
  company: string;
  companyId: string;
  companyLogo?: string;
  location: string;
  type: JobType;
  experienceLevel: ExperienceLevel;
  remoteOption: RemoteOption;
  salary: {
    min: number;
    max: number;
    currency: string;
    period: 'hourly' | 'monthly' | 'yearly';
  };
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  tags: string[];
  postedAt: Date;
  applicationDeadline?: Date;
  applicants?: number;
  featured?: boolean;
  active: boolean;
}

export interface JobFilters {
  search?: string;
  location?: string;
  type?: JobType[];
  experienceLevel?: ExperienceLevel[];
  remoteOption?: RemoteOption[];
  salaryMin?: number;
  salaryMax?: number;
  tags?: string[];
}

export interface JobApplication {
  id: string;
  jobId: string;
  userId: string;
  coverLetter: string;
  resumeUrl?: string;
  status: 'pending' | 'reviewing' | 'accepted' | 'rejected';
  appliedAt: Date;
  updatedAt: Date;
}

export interface SearchQuery {
  query: string;
  location?: string;
  timestamp: Date;
}