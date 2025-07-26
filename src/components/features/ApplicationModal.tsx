'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ApplicationSection } from './ApplicationSection';
import { Job } from '@/types';

interface ApplicationFormData {
  fullName: string;
  email: string;
  phone?: string;
  resume: File;
  coverLetter?: string;
}

interface ApplicationModalProps {
  job: Job;
  isAuthenticated?: boolean;
  hasApplied?: boolean;
  onApplicationSubmit?: (data: ApplicationFormData) => void | Promise<void>;
}

export function ApplicationModal({
  job,
  isAuthenticated = true,
  hasApplied = false,
  onApplicationSubmit,
}: ApplicationModalProps) {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (data: ApplicationFormData) => {
    // Call the parent's submit handler if provided
    if (onApplicationSubmit) {
      await onApplicationSubmit(data);
    }

    // Close the modal after successful submission
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="w-full sm:w-auto">
          Apply Now
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]"
        aria-describedby="application-form-description"
      >
        <DialogHeader>
          <DialogTitle>Apply for this position</DialogTitle>
        </DialogHeader>
        <div id="application-form-description" className="sr-only">
          Fill out the form below to apply for the {job.title} position at{' '}
          {job.company}
        </div>
        <ApplicationSection
          job={job}
          onSubmit={handleSubmit}
          isAuthenticated={isAuthenticated}
          hasApplied={hasApplied}
          hideTitle={true}
        />
      </DialogContent>
    </Dialog>
  );
}
