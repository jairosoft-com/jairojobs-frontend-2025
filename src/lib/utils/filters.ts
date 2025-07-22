import { JobType, ExperienceLevel, RemoteOption } from '@/types';

export const JOB_TYPE_OPTIONS: { value: JobType; label: string }[] = [
  { value: 'full-time', label: 'Full Time' },
  { value: 'part-time', label: 'Part Time' },
  { value: 'contract', label: 'Contract' },
  { value: 'internship', label: 'Internship' },
  { value: 'temporary', label: 'Temporary' },
];

export const EXPERIENCE_LEVEL_OPTIONS: { value: ExperienceLevel; label: string }[] = [
  { value: 'entry', label: 'Entry Level' },
  { value: 'mid', label: 'Mid Level' },
  { value: 'senior', label: 'Senior Level' },
  { value: 'lead', label: 'Lead' },
  { value: 'executive', label: 'Executive' },
];

export const REMOTE_OPTION_OPTIONS: { value: RemoteOption; label: string }[] = [
  { value: 'remote', label: 'Remote' },
  { value: 'hybrid', label: 'Hybrid' },
  { value: 'onsite', label: 'On-site' },
];

export const SALARY_RANGES = [
  { value: '0-50000', label: '$0 - $50k', min: 0, max: 50000 },
  { value: '50000-75000', label: '$50k - $75k', min: 50000, max: 75000 },
  { value: '75000-100000', label: '$75k - $100k', min: 75000, max: 100000 },
  { value: '100000-150000', label: '$100k - $150k', min: 100000, max: 150000 },
  { value: '150000-200000', label: '$150k - $200k', min: 150000, max: 200000 },
  { value: '200000+', label: '$200k+', min: 200000, max: undefined },
];

export const SORT_OPTIONS = [
  { value: 'relevance', label: 'Most Relevant' },
  { value: 'date', label: 'Most Recent' },
  { value: 'salary', label: 'Highest Salary' },
];

export const ITEMS_PER_PAGE_OPTIONS = [
  { value: 10, label: '10 per page' },
  { value: 20, label: '20 per page' },
  { value: 50, label: '50 per page' },
];