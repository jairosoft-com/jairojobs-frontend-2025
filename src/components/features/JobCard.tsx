'use client';

import { Job } from '@/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Briefcase, DollarSign, Users } from 'lucide-react';

interface JobCardProps {
  job: Job;
  onClick?: (job: Job) => void;
}

export function JobCard({ job, onClick }: JobCardProps) {
  const formatSalary = (amount: number) => {
    if (amount >= 1000) {
      return `$${Math.round(amount / 1000)}k`;
    }
    return `$${amount}`;
  };

  const formatJobType = (type: string) => {
    return type
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <Card
      className="cursor-pointer transition-shadow duration-300 hover:shadow-lg"
      onClick={() => onClick?.(job)}
      role="article"
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="mb-1 text-lg font-semibold">{job.title}</h3>
            <p className="text-gray-600">{job.company}</p>
          </div>
          {job.featured && (
            <Badge variant="default" className="ml-2">
              Featured
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-wrap gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Briefcase className="h-4 w-4" />
            <span>{formatJobType(job.type)}</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="h-4 w-4" />
            <span>
              {formatSalary(job.salary.min)} - {formatSalary(job.salary.max)}
              {job.salary.period === 'yearly'
                ? '/year'
                : `/${job.salary.period}`}
            </span>
          </div>
          {job.applicants && (
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{job.applicants} applicants</span>
            </div>
          )}
        </div>

        <div className="mb-3 flex items-center gap-2">
          <Badge variant="secondary" className="capitalize">
            {job.remoteOption}
          </Badge>
          <Badge variant="outline" className="capitalize">
            {job.experienceLevel}
          </Badge>
        </div>

        <div className="flex flex-wrap gap-2">
          {job.tags.slice(0, 4).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {job.tags.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{job.tags.length - 4} more
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
