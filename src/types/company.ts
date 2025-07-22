export type CompanySize = 'startup' | 'small' | 'medium' | 'large' | 'enterprise';
export type Industry = 
  | 'technology'
  | 'healthcare'
  | 'finance'
  | 'education'
  | 'retail'
  | 'manufacturing'
  | 'consulting'
  | 'media'
  | 'nonprofit'
  | 'government'
  | 'other';

export interface Company {
  id: string;
  name: string;
  logo?: string;
  description: string;
  website: string;
  industry: Industry;
  size: CompanySize;
  founded?: number;
  headquarters: string;
  locations: string[];
  employees: {
    min: number;
    max: number;
  };
  culture?: string;
  benefits?: string[];
  techStack?: string[];
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  verified: boolean;
  featured?: boolean;
}

export interface CompanyStats {
  totalJobs: number;
  activeJobs: number;
  totalApplications: number;
  averageResponseTime?: number; // in days
  hiringRate?: number; // percentage
}