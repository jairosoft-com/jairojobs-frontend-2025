export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'jobseeker' | 'employer' | 'admin';
  profile?: UserProfile;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile {
  headline?: string;
  summary?: string;
  location?: string;
  phone?: string;
  website?: string;
  resume?: {
    url: string;
    uploadedAt: Date;
  };
  skills: string[];
  experience: WorkExperience[];
  education: Education[];
  languages?: Language[];
  availability?: 'immediate' | 'two-weeks' | 'one-month' | 'not-looking';
  desiredSalary?: {
    min: number;
    max: number;
    currency: string;
    period: 'hourly' | 'monthly' | 'yearly';
  };
  socialLinks?: {
    linkedin?: string;
    github?: string;
    portfolio?: string;
    twitter?: string;
  };
}

export interface WorkExperience {
  id: string;
  title: string;
  company: string;
  location?: string;
  startDate: Date;
  endDate?: Date; // null if current job
  current: boolean;
  description: string;
  achievements?: string[];
}

export interface Education {
  id: string;
  degree: string;
  field: string;
  institution: string;
  location?: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  gpa?: number;
  achievements?: string[];
}

export interface Language {
  name: string;
  proficiency: 'basic' | 'conversational' | 'professional' | 'native';
}

export interface SavedJob {
  userId: string;
  jobId: string;
  savedAt: Date;
}

export interface JobAlert {
  id: string;
  userId: string;
  name: string;
  filters: {
    keywords?: string[];
    location?: string;
    type?: string[];
    experienceLevel?: string[];
    remoteOption?: string[];
    salaryMin?: number;
  };
  frequency: 'daily' | 'weekly' | 'instant';
  active: boolean;
  createdAt: Date;
}