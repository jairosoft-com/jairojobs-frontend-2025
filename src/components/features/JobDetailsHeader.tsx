'use client';

import { Job, Company } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  MapPin,
  Building2,
  DollarSign,
  Users,
  Clock,
  Calendar,
  Bookmark,
  Share2,
} from 'lucide-react';
import {
  formatDate,
  getTimeAgo,
  getDaysUntil,
  isDeadlineSoon,
} from '@/lib/utils/date';
import {
  JOB_TYPE_OPTIONS,
  EXPERIENCE_LEVEL_OPTIONS,
  REMOTE_OPTION_OPTIONS,
} from '@/lib/utils/filters';
import Image from 'next/image';

interface JobDetailsHeaderProps {
  job: Job;
  company: Company;
}

export function JobDetailsHeader({ job, company }: JobDetailsHeaderProps) {
  const jobTypeLabel =
    JOB_TYPE_OPTIONS.find(opt => opt.value === job.type)?.label || job.type;
  const experienceLevelLabel =
    EXPERIENCE_LEVEL_OPTIONS.find(opt => opt.value === job.experienceLevel)
      ?.label || job.experienceLevel;
  const remoteOptionLabel =
    REMOTE_OPTION_OPTIONS.find(opt => opt.value === job.remoteOption)?.label ||
    job.remoteOption;

  const formatSalary = () => {
    const min =
      job.salary.min >= 1000
        ? `${Math.round(job.salary.min / 1000)}k`
        : job.salary.min;
    const max =
      job.salary.max >= 1000
        ? `${Math.round(job.salary.max / 1000)}k`
        : job.salary.max;
    return `$${min} - $${max}/${job.salary.period === 'yearly' ? 'year' : job.salary.period}`;
  };

  const handleApply = () => {
    // TODO: Implement apply functionality
    console.log('Apply clicked');
  };

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Save clicked');
  };

  const handleShare = () => {
    // TODO: Implement share functionality
    console.log('Share clicked');
  };

  return (
    <div className="border-b bg-white">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Company and Title */}
        <div className="mb-6 flex items-start justify-between">
          <div className="flex items-start gap-4">
            {company.logo && (
              <div className="relative h-16 w-16 flex-shrink-0">
                <Image
                  src={company.logo}
                  alt={`${company.name} logo`}
                  fill
                  className="rounded-lg object-contain"
                />
              </div>
            )}
            <div>
              <h1 className="mb-2 text-3xl font-bold text-gray-900">
                {job.title}
              </h1>
              <p className="text-xl text-gray-600" data-testid="company-name">
                {company.name}
              </p>
            </div>
          </div>
          {job.featured && <Badge variant="default">Featured</Badge>}
        </div>

        {/* Job Meta Information */}
        <div className="mb-6 flex flex-wrap gap-4 text-gray-600">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Building2 className="h-4 w-4" />
            <span>{remoteOptionLabel}</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="h-4 w-4" />
            <span data-testid="salary-range">{formatSalary()}</span>
          </div>
          {job.applicants !== undefined && (
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{job.applicants} applicants</span>
            </div>
          )}
        </div>

        {/* Badges */}
        <div className="mb-6 flex flex-wrap gap-2">
          <Badge variant="secondary" data-testid="job-type-badge">{jobTypeLabel}</Badge>
          <Badge variant="outline" data-testid="experience-badge">{experienceLevelLabel}</Badge>
          <Badge variant="outline" data-testid="location-badge">{job.location}</Badge>
        </div>

        {/* Timeline Information */}
        <div className="mb-8 flex flex-wrap gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>Posted {getTimeAgo(job.postedAt)}</span>
          </div>
          {job.applicationDeadline && (
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>
                Deadline: {formatDate(job.applicationDeadline)}
                {isDeadlineSoon(job.applicationDeadline) && (
                  <span className="ml-1 font-medium text-red-600">
                    (Deadline in {getDaysUntil(job.applicationDeadline)} days)
                  </span>
                )}
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            size="lg"
            onClick={handleApply}
            className="flex-1 sm:flex-initial"
          >
            Apply Now
          </Button>
          <Button variant="outline" size="lg" onClick={handleSave}>
            <Bookmark className="mr-2 h-4 w-4" />
            Save Job
          </Button>
          <Button variant="outline" size="lg" onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </div>
    </div>
  );
}
