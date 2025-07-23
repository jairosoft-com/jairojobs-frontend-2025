'use client';

import Link from 'next/link';
import { useEffect } from 'react';
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
import { ApplicationModal } from '@/components/features/ApplicationModal';
import { Job, Company } from '@/types';

interface JobDetailsClientProps {
  job: Job;
  company: Company;
  relatedJobs: Job[];
}

export function JobDetailsClient({ job, company, relatedJobs }: JobDetailsClientProps) {
  // Update browser title
  useEffect(() => {
    document.title = `${job.title} at ${job.company} - JairoJobs`;
  }, [job.title, job.company]);

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
      <JobDetailsHeader job={job} company={company} />

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
            <CompanyCard company={company} />

            {/* Related Jobs */}
            {relatedJobs.length > 0 && (
              <div>
                <RelatedJobs jobs={relatedJobs} title="Similar Positions" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Apply Button - Sticky at bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-10 border-t bg-white p-4 lg:hidden">
        <div className="w-full">
          <ApplicationModal job={job} />
        </div>
      </div>
    </div>
  );
}