'use client';

import { Job } from '@/types';
import { JobCard } from './JobCard';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface RelatedJobsProps {
  jobs: Job[];
  title?: string;
}

export function RelatedJobs({
  jobs,
  title = 'Similar Jobs',
}: RelatedJobsProps) {
  // Limit to 4 jobs for display
  const displayedJobs = jobs.slice(0, 4);
  const hasMoreJobs = jobs.length > 4;

  if (jobs.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500">
        No similar jobs found
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        {hasMoreJobs && (
          <Link
            href="/jobs"
            className="flex items-center gap-1 text-primary hover:underline"
          >
            View all jobs
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {displayedJobs.map(job => (
          <JobCard
            key={job.id}
            job={job}
            onClick={() => {
              window.location.href = `/jobs/${job.id}`;
            }}
          />
        ))}
      </div>
    </div>
  );
}
