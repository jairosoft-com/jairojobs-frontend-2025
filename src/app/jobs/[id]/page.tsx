'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { use } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { JobDetailsHeader } from '@/components/features/JobDetailsHeader';
import { CompanyCard } from '@/components/features/CompanyCard';
import { JobDescription } from '@/components/features/JobDescription';
import { RelatedJobs } from '@/components/features/RelatedJobs';
import { getJobById, getCompanyById, getRelatedJobs } from '@/lib/db/mockData';

interface JobDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function JobDetailsPage({ params }: JobDetailsPageProps) {
  const { id } = use(params);
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
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Navigation */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/jobs">Jobs</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{job.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Job Header */}
      <JobDetailsHeader job={job} company={companyData} />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column - Job Details */}
          <div className="lg:col-span-2">
            <JobDescription job={job} />
          </div>

          {/* Right Column - Company Info and Related Jobs */}
          <div className="space-y-8">
            {/* Company Card */}
            <CompanyCard company={companyData} />

            {/* Related Jobs */}
            {relatedJobs.length > 0 && (
              <div>
                <RelatedJobs jobs={relatedJobs} title="Similar Jobs" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Apply Button - Sticky at bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-10 border-t bg-white p-4 lg:hidden">
        <button
          className="h-12 w-full rounded-md bg-primary px-6 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          onClick={() => {
            // TODO: Implement apply functionality
            console.log('Apply clicked');
          }}
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}
