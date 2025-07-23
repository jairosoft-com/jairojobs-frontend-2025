import { notFound } from 'next/navigation';
import { getJobById, getCompanyById, getRelatedJobs } from '@/lib/db/mockData';
import { JobDetailsClient } from './JobDetailsClient';

interface JobDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Generate metadata for the page
export async function generateMetadata({ params }: JobDetailsPageProps) {
  const { id } = await params;
  const job = getJobById(id);

  if (!job || !job.active) {
    return { title: 'Job Not Found - JairoJobs' };
  }

  return {
    title: `${job.title} at ${job.company} - JairoJobs`,
  };
}

export default async function JobDetailsPage({ params }: JobDetailsPageProps) {
  const { id } = await params;
  const job = getJobById(id);

  if (!job || !job.active) {
    notFound();
  }

  const company = getCompanyById(job.companyId);
  const relatedJobs = getRelatedJobs(job.id);
  
  // If company data is not found, create a minimal company object
  const companyData = company || {
    id: job.companyId,
    name: job.company,
    logo: job.companyLogo,
    description: '',
    website: '#',
    industry: 'other' as const,
    size: 'medium' as const,
    headquarters: job.location,
    locations: [job.location],
    employees: { min: 0, max: 0 },
    verified: false,
  };

  return (
    <JobDetailsClient 
      job={job} 
      company={companyData} 
      relatedJobs={relatedJobs} 
    />
  );
}
