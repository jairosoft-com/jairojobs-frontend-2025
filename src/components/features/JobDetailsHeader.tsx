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
  Share2
} from 'lucide-react';
import { formatDate, getTimeAgo, getDaysUntil, isDeadlineSoon } from '@/lib/utils/date';
import { 
  JOB_TYPE_OPTIONS, 
  EXPERIENCE_LEVEL_OPTIONS, 
  REMOTE_OPTION_OPTIONS 
} from '@/lib/utils/filters';
import Image from 'next/image';

interface JobDetailsHeaderProps {
  job: Job;
  company: Company;
}

export function JobDetailsHeader({ job, company }: JobDetailsHeaderProps) {
  const jobTypeLabel = JOB_TYPE_OPTIONS.find(opt => opt.value === job.type)?.label || job.type;
  const experienceLevelLabel = EXPERIENCE_LEVEL_OPTIONS.find(opt => opt.value === job.experienceLevel)?.label || job.experienceLevel;
  const remoteOptionLabel = REMOTE_OPTION_OPTIONS.find(opt => opt.value === job.remoteOption)?.label || job.remoteOption;
  
  const formatSalary = () => {
    const min = job.salary.min >= 1000 ? `${Math.round(job.salary.min / 1000)}k` : job.salary.min;
    const max = job.salary.max >= 1000 ? `${Math.round(job.salary.max / 1000)}k` : job.salary.max;
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
    <div className="bg-white border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Company and Title */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-4">
            {company.logo && (
              <div className="relative w-16 h-16 flex-shrink-0">
                <Image
                  src={company.logo}
                  alt={`${company.name} logo`}
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
              <p className="text-xl text-gray-600">{company.name}</p>
            </div>
          </div>
          {job.featured && (
            <Badge variant="default">Featured</Badge>
          )}
        </div>

        {/* Job Meta Information */}
        <div className="flex flex-wrap gap-4 mb-6 text-gray-600">
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
            <span>{formatSalary()}</span>
          </div>
          {job.applicants !== undefined && (
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{job.applicants} applicants</span>
            </div>
          )}
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Badge variant="secondary">{jobTypeLabel}</Badge>
          <Badge variant="outline">{experienceLevelLabel}</Badge>
        </div>

        {/* Timeline Information */}
        <div className="flex flex-wrap gap-4 mb-8 text-sm text-gray-600">
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
                  <span className="text-red-600 font-medium ml-1">
                    (Deadline in {getDaysUntil(job.applicationDeadline)} days)
                  </span>
                )}
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            size="lg" 
            onClick={handleApply}
            className="flex-1 sm:flex-initial"
          >
            Apply Now
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={handleSave}
          >
            <Bookmark className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>
    </div>
  );
}