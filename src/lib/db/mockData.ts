import { Job, Company, JobFilters } from '@/types';

export const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'TechCorp Solutions',
    logo: '/companies/techcorp.png',
    description:
      'Leading technology solutions provider specializing in cloud infrastructure and enterprise software.',
    website: 'https://techcorp.example.com',
    industry: 'technology',
    size: 'large',
    founded: 2010,
    headquarters: 'San Francisco, CA',
    locations: ['San Francisco, CA', 'New York, NY', 'Austin, TX', 'Remote'],
    employees: {
      min: 1000,
      max: 5000,
    },
    culture:
      'Innovation-driven culture with focus on work-life balance and continuous learning.',
    benefits: [
      'Comprehensive health insurance',
      'Unlimited PTO',
      '401(k) matching',
      'Remote work options',
      'Professional development budget',
      'Stock options',
    ],
    techStack: [
      'React',
      'Node.js',
      'AWS',
      'Python',
      'Kubernetes',
      'TypeScript',
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/company/techcorp',
      twitter: 'https://twitter.com/techcorp',
    },
    verified: true,
    featured: true,
  },
  {
    id: '2',
    name: 'StartupHub',
    logo: '/companies/startuphub.png',
    description:
      'Fast-growing fintech startup revolutionizing digital payments.',
    website: 'https://startuphub.example.com',
    industry: 'finance',
    size: 'startup',
    founded: 2021,
    headquarters: 'New York, NY',
    locations: ['New York, NY', 'Remote'],
    employees: {
      min: 50,
      max: 100,
    },
    culture:
      'Fast-paced, collaborative environment with entrepreneurial spirit.',
    benefits: [
      'Health insurance',
      'Flexible hours',
      'Equity compensation',
      'Remote-first',
      'Learning stipend',
    ],
    techStack: ['React Native', 'Go', 'PostgreSQL', 'Docker', 'TypeScript'],
    socialLinks: {
      linkedin: 'https://linkedin.com/company/startuphub',
    },
    verified: true,
    featured: false,
  },
  {
    id: '3',
    name: 'Global Health Systems',
    logo: '/companies/globalhealth.png',
    description:
      'Healthcare technology company improving patient care through innovative solutions.',
    website: 'https://globalhealth.example.com',
    industry: 'healthcare',
    size: 'medium',
    founded: 2015,
    headquarters: 'Boston, MA',
    locations: ['Boston, MA', 'Chicago, IL', 'Remote'],
    employees: {
      min: 300,
      max: 500,
    },
    culture:
      'Mission-driven organization focused on making healthcare accessible.',
    benefits: [
      'Excellent health coverage',
      'Parental leave',
      'Retirement planning',
      'Wellness programs',
      'Volunteer time off',
    ],
    techStack: ['Java', 'Spring Boot', 'Angular', 'MySQL', 'AWS', 'FHIR'],
    socialLinks: {
      linkedin: 'https://linkedin.com/company/globalhealth',
      facebook: 'https://facebook.com/globalhealth',
    },
    verified: true,
    featured: false,
  },
];

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Full Stack Developer',
    company: 'TechCorp Solutions',
    companyId: '1',
    companyLogo: '/companies/techcorp.png',
    location: 'San Francisco, CA',
    type: 'full-time',
    experienceLevel: 'senior',
    remoteOption: 'hybrid',
    salary: {
      min: 150000,
      max: 200000,
      currency: 'USD',
      period: 'yearly',
    },
    description: `We are looking for a Senior Full Stack Developer to join our growing engineering team. You will be responsible for designing and implementing scalable web applications using modern technologies.

    As a senior member of the team, you'll mentor junior developers, participate in architectural decisions, and help shape our engineering culture.`,
    requirements: [
      '5+ years of experience in full-stack development',
      'Strong proficiency in React, Node.js, and TypeScript',
      'Experience with cloud platforms (AWS preferred)',
      'Solid understanding of database design and optimization',
      'Experience with microservices architecture',
      'Excellent communication and leadership skills',
    ],
    responsibilities: [
      'Design and develop scalable web applications',
      'Lead technical projects from conception to deployment',
      'Mentor junior developers and conduct code reviews',
      'Collaborate with product managers and designers',
      'Participate in on-call rotation for production support',
      'Contribute to architectural decisions and technical strategy',
    ],
    benefits: [
      'Competitive salary and equity',
      'Comprehensive health, dental, and vision insurance',
      'Unlimited PTO policy',
      '401(k) with company matching',
      'Professional development budget',
      'Flexible work arrangements',
    ],
    tags: ['React', 'Node.js', 'TypeScript', 'AWS', 'Full Stack'],
    postedAt: new Date('2025-01-15'),
    applicationDeadline: new Date('2025-02-28'),
    applicants: 42,
    featured: true,
    active: true,
  },
  {
    id: '2',
    title: 'Frontend Engineer',
    company: 'StartupHub',
    companyId: '2',
    companyLogo: '/companies/startuphub.png',
    location: 'New York, NY',
    type: 'full-time',
    experienceLevel: 'mid',
    remoteOption: 'remote',
    salary: {
      min: 100000,
      max: 140000,
      currency: 'USD',
      period: 'yearly',
    },
    description: `Join our dynamic team as a Frontend Engineer and help build the future of digital payments. You'll work on cutting-edge fintech products used by millions of users worldwide.`,
    requirements: [
      '3+ years of experience in frontend development',
      'Expert knowledge of React and React Native',
      'Strong understanding of JavaScript/TypeScript',
      'Experience with state management (Redux, MobX, or similar)',
      'Knowledge of responsive design and cross-browser compatibility',
      'Passion for creating exceptional user experiences',
    ],
    responsibilities: [
      'Build and maintain responsive web applications',
      'Collaborate with designers to implement pixel-perfect UIs',
      'Optimize applications for maximum speed and scalability',
      'Write clean, maintainable, and testable code',
      'Participate in agile development processes',
    ],
    benefits: [
      'Competitive salary with equity',
      'Health, dental, and vision insurance',
      'Flexible working hours',
      'Remote-first culture',
      'Learning and development stipend',
    ],
    tags: ['React', 'React Native', 'TypeScript', 'Fintech', 'Remote'],
    postedAt: new Date('2025-01-20'),
    applicants: 28,
    featured: false,
    active: true,
  },
  {
    id: '3',
    title: 'DevOps Engineer',
    company: 'Global Health Systems',
    companyId: '3',
    companyLogo: '/companies/globalhealth.png',
    location: 'Boston, MA',
    type: 'full-time',
    experienceLevel: 'senior',
    remoteOption: 'hybrid',
    salary: {
      min: 130000,
      max: 170000,
      currency: 'USD',
      period: 'yearly',
    },
    description: `We're seeking a DevOps Engineer to help us scale our healthcare platform. You'll work on critical infrastructure that powers applications used by healthcare providers nationwide.`,
    requirements: [
      '5+ years of DevOps/SRE experience',
      'Strong experience with AWS and cloud architecture',
      'Proficiency in Infrastructure as Code (Terraform, CloudFormation)',
      'Experience with container orchestration (Kubernetes)',
      'Knowledge of CI/CD pipelines and automation',
      'Understanding of HIPAA compliance and security best practices',
    ],
    responsibilities: [
      'Design and maintain scalable cloud infrastructure',
      'Implement and manage CI/CD pipelines',
      'Monitor system performance and ensure high availability',
      'Automate deployment and operational processes',
      'Ensure security and compliance standards are met',
      'Collaborate with development teams to improve deployment processes',
    ],
    benefits: [
      'Competitive compensation',
      'Excellent health coverage',
      '4 weeks PTO',
      'Parental leave policy',
      'Professional development opportunities',
      'Mission-driven work environment',
    ],
    tags: ['AWS', 'Kubernetes', 'Terraform', 'DevOps', 'Healthcare'],
    postedAt: new Date('2025-01-18'),
    applicants: 15,
    featured: false,
    active: true,
  },
  {
    id: '4',
    title: 'Junior Backend Developer',
    company: 'TechCorp Solutions',
    companyId: '1',
    companyLogo: '/companies/techcorp.png',
    location: 'Austin, TX',
    type: 'full-time',
    experienceLevel: 'entry',
    remoteOption: 'onsite',
    salary: {
      min: 70000,
      max: 90000,
      currency: 'USD',
      period: 'yearly',
    },
    description: `Start your career with TechCorp as a Junior Backend Developer. This is an excellent opportunity for recent graduates or early-career developers to learn from experienced engineers and work on impactful projects.`,
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      'Understanding of programming fundamentals',
      'Knowledge of at least one backend language (Python, Java, or Node.js)',
      'Familiarity with databases and SQL',
      'Strong problem-solving skills',
      'Eagerness to learn and grow',
    ],
    responsibilities: [
      'Assist in developing and maintaining backend services',
      'Write unit tests and documentation',
      'Participate in code reviews and team meetings',
      'Learn and apply best practices in software development',
      'Collaborate with senior developers on feature implementation',
    ],
    benefits: [
      'Competitive entry-level salary',
      'Comprehensive benefits package',
      'Mentorship program',
      'Education reimbursement',
      'Clear career progression path',
      'Modern office with free meals',
    ],
    tags: ['Python', 'Node.js', 'Entry Level', 'Backend'],
    postedAt: new Date('2025-01-22'),
    applicants: 89,
    featured: false,
    active: true,
  },
  {
    id: '5',
    title: 'Product Designer',
    company: 'StartupHub',
    companyId: '2',
    companyLogo: '/companies/startuphub.png',
    location: 'Remote',
    type: 'full-time',
    experienceLevel: 'mid',
    remoteOption: 'remote',
    salary: {
      min: 90000,
      max: 130000,
      currency: 'USD',
      period: 'yearly',
    },
    description: `We're looking for a talented Product Designer to shape the user experience of our fintech products. You'll work closely with product managers and engineers to create intuitive, beautiful interfaces.`,
    requirements: [
      '3+ years of product design experience',
      'Strong portfolio demonstrating UI/UX skills',
      'Proficiency in Figma or similar design tools',
      'Understanding of design systems and component libraries',
      'Experience with user research and testing',
      'Excellent communication and presentation skills',
    ],
    responsibilities: [
      'Design user interfaces for web and mobile applications',
      'Create and maintain design systems',
      'Conduct user research and usability testing',
      'Collaborate with cross-functional teams',
      'Present design concepts to stakeholders',
      'Iterate on designs based on feedback and data',
    ],
    benefits: [
      'Remote work from anywhere',
      'Competitive compensation',
      'Health insurance stipend',
      'Home office setup budget',
      'Annual company retreats',
      'Equity compensation',
    ],
    tags: ['UI/UX', 'Product Design', 'Figma', 'Remote', 'Fintech'],
    postedAt: new Date('2025-01-19'),
    applicants: 56,
    featured: true,
    active: true,
  },
];

// Helper functions to filter and search jobs
export function searchJobs(query: string, location?: string): Job[] {
  return mockJobs.filter(job => {
    const matchesQuery =
      query === '' ||
      job.title.toLowerCase().includes(query.toLowerCase()) ||
      job.company.toLowerCase().includes(query.toLowerCase()) ||
      job.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()));

    const matchesLocation =
      !location ||
      job.location.toLowerCase().includes(location.toLowerCase()) ||
      job.remoteOption === 'remote';

    return matchesQuery && matchesLocation;
  });
}

// Enhanced filter function with JobFilters support
export function filterJobs(filters: JobFilters): Job[] {
  return mockJobs.filter(job => {
    // Active jobs only
    if (!job.active) return false;

    // Search query
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch =
        job.title.toLowerCase().includes(searchLower) ||
        job.company.toLowerCase().includes(searchLower) ||
        job.description.toLowerCase().includes(searchLower) ||
        job.tags.some(tag => tag.toLowerCase().includes(searchLower));
      if (!matchesSearch) return false;
    }

    // Location
    if (filters.location) {
      const locationLower = filters.location.toLowerCase();
      const matchesLocation =
        job.location.toLowerCase().includes(locationLower) ||
        job.remoteOption === 'remote';
      if (!matchesLocation) return false;
    }

    // Job type
    if (filters.type && filters.type.length > 0) {
      if (!filters.type.includes(job.type)) return false;
    }

    // Experience level
    if (filters.experienceLevel && filters.experienceLevel.length > 0) {
      if (!filters.experienceLevel.includes(job.experienceLevel)) return false;
    }

    // Remote option
    if (filters.remoteOption && filters.remoteOption.length > 0) {
      if (!filters.remoteOption.includes(job.remoteOption)) return false;
    }

    // Salary range
    if (filters.salaryMin !== undefined || filters.salaryMax !== undefined) {
      // Convert to yearly for comparison
      let yearlyMin = job.salary.min;
      let yearlyMax = job.salary.max;

      if (job.salary.period === 'hourly') {
        yearlyMin = job.salary.min * 2080; // 40 hours/week * 52 weeks
        yearlyMax = job.salary.max * 2080;
      } else if (job.salary.period === 'monthly') {
        yearlyMin = job.salary.min * 12;
        yearlyMax = job.salary.max * 12;
      }

      if (filters.salaryMin !== undefined && yearlyMax < filters.salaryMin)
        return false;
      if (filters.salaryMax !== undefined && yearlyMin > filters.salaryMax)
        return false;
    }

    // Tags
    if (filters.tags && filters.tags.length > 0) {
      const hasMatchingTag = filters.tags.some(tag =>
        job.tags.some(jobTag => jobTag.toLowerCase() === tag.toLowerCase()),
      );
      if (!hasMatchingTag) return false;
    }

    return true;
  });
}

export type SortOption = 'relevance' | 'date' | 'salary';

export function sortJobs(jobs: Job[], sortBy: SortOption = 'relevance'): Job[] {
  const sorted = [...jobs];

  switch (sortBy) {
    case 'date':
      return sorted.sort((a, b) => b.postedAt.getTime() - a.postedAt.getTime());

    case 'salary':
      return sorted.sort((a, b) => {
        // Convert to yearly for comparison
        const getYearlySalary = (job: Job) => {
          const avg = (job.salary.min + job.salary.max) / 2;
          if (job.salary.period === 'hourly') return avg * 2080;
          if (job.salary.period === 'monthly') return avg * 12;
          return avg;
        };
        return getYearlySalary(b) - getYearlySalary(a);
      });

    case 'relevance':
    default:
      // Featured jobs first, then by date
      return sorted.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.postedAt.getTime() - a.postedAt.getTime();
      });
  }
}

export function getJobById(id: string): Job | undefined {
  return mockJobs.find(job => job.id === id);
}

export function getCompanyById(id: string): Company | undefined {
  return mockCompanies.find(company => company.id === id);
}

export function getFeaturedJobs(): Job[] {
  return mockJobs.filter(job => job.featured && job.active);
}

export function getJobsByCompany(companyId: string): Job[] {
  return mockJobs.filter(job => job.companyId === companyId && job.active);
}

// Get related jobs based on tags, company, or location
export function getRelatedJobs(jobId: string, limit: number = 4): Job[] {
  const currentJob = getJobById(jobId);
  if (!currentJob) return [];

  // Score each job based on similarity
  const scoredJobs = mockJobs
    .filter(job => job.id !== jobId && job.active)
    .map(job => {
      let score = 0;

      // Same company (highest weight)
      if (job.companyId === currentJob.companyId) score += 5;

      // Same location
      if (job.location === currentJob.location) score += 3;

      // Same job type
      if (job.type === currentJob.type) score += 2;

      // Same experience level
      if (job.experienceLevel === currentJob.experienceLevel) score += 2;

      // Matching tags
      const matchingTags = job.tags.filter(tag =>
        currentJob.tags.includes(tag),
      ).length;
      score += matchingTags;

      return { job, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score);

  return scoredJobs.slice(0, limit).map(item => item.job);
}

// Job categories for browsing
export const jobCategories = [
  { name: 'Engineering', icon: '💻', count: 142 },
  { name: 'Design', icon: '🎨', count: 38 },
  { name: 'Product', icon: '📱', count: 27 },
  { name: 'Marketing', icon: '📣', count: 45 },
  { name: 'Sales', icon: '💼', count: 63 },
  { name: 'Operations', icon: '⚙️', count: 31 },
  { name: 'HR', icon: '👥', count: 19 },
  { name: 'Finance', icon: '💰', count: 24 },
];

// Pagination helper
export function paginateJobs(
  jobs: Job[],
  page: number,
  itemsPerPage: number = 10,
) {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedJobs = jobs.slice(startIndex, endIndex);

  return {
    jobs: paginatedJobs,
    totalPages: Math.ceil(jobs.length / itemsPerPage),
    totalJobs: jobs.length,
    currentPage: page,
    hasNextPage: endIndex < jobs.length,
    hasPrevPage: page > 1,
  };
}
