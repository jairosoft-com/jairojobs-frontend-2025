'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Upload, X, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Job } from '@/types';
import { cn } from '@/utils/cn';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const applicationSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  phone: z.string().optional(),
  resume: z
    .instanceof(File, { message: 'Resume is required' })
    .refine((file) => file.size <= MAX_FILE_SIZE, 'File size must be less than 5MB')
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file.type),
      'Only PDF, DOC, and DOCX files are allowed',
    ),
  coverLetter: z.string().max(1000).optional(),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

interface ApplicationSectionProps {
  job: Job;
  onSubmit: (data: ApplicationFormData) => void | Promise<void>;
  hasApplied?: boolean;
  isAuthenticated?: boolean;
}

export function ApplicationSection({
  job,
  onSubmit,
  hasApplied = false,
  isAuthenticated = true,
}: ApplicationSectionProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      coverLetter: '',
      resume: undefined as unknown as File,
    },
  });

  const isDeadlinePassed = job.applicationDeadline
    ? new Date(job.applicationDeadline) < new Date()
    : false;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file
      if (file.size > MAX_FILE_SIZE) {
        form.setError('resume', {
          message: 'File size must be less than 5MB',
        });
        return;
      }
      if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
        form.setError('resume', {
          message: 'Only PDF, DOC, and DOCX files are allowed',
        });
        return;
      }
      setSelectedFile(file);
      form.setValue('resume', file);
      form.clearErrors('resume');
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    form.setValue('resume', undefined as unknown as File);
  };

  const handleSubmit = async (data: ApplicationFormData) => {
    try {
      setIsSubmitting(true);
      await onSubmit(data);
      
      // Reset form on success
      form.reset();
      setSelectedFile(null);
      
      toast({
        title: 'Application submitted!',
        description: 'Your application has been sent successfully.',
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to submit application. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show login prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="rounded-lg border bg-card p-6 text-center">
        <h3 className="mb-2 text-lg font-semibold">Sign in required</h3>
        <p className="mb-4 text-muted-foreground">
          Please sign in to apply for this position
        </p>
        <Button asChild>
          <a href="/signin">Sign In to Apply</a>
        </Button>
      </div>
    );
  }

  // Show already applied state
  if (hasApplied) {
    return (
      <div className="rounded-lg border bg-card p-6 text-center">
        <CheckCircle2 className="mx-auto mb-3 h-12 w-12 text-green-600" />
        <h3 className="mb-2 text-lg font-semibold">Application submitted</h3>
        <p className="mb-4 text-muted-foreground">
          You have already applied for this position
        </p>
        <Button disabled variant="secondary">
          Already Applied
        </Button>
      </div>
    );
  }

  // Show deadline passed state
  if (isDeadlinePassed) {
    return (
      <div className="rounded-lg border bg-card p-6 text-center">
        <h3 className="mb-2 text-lg font-semibold">Applications closed</h3>
        <p className="mb-4 text-muted-foreground">
          The application deadline has passed
        </p>
        <Button disabled variant="secondary">
          Deadline Passed
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card p-6">
      <h2 className="mb-6 text-xl font-semibold">Apply for this position</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {/* Full Name */}
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Full Name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Email <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input type="email" placeholder="john@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="+1 (555) 123-4567" {...field} />
                </FormControl>
                <FormDescription>Optional</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Resume Upload */}
          <FormField
            control={form.control}
            name="resume"
            render={() => (
              <FormItem>
                <FormLabel>
                  Resume <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <div>
                    {!selectedFile ? (
                      <label
                        htmlFor="resume-upload"
                        className={cn(
                          'flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors hover:border-primary/50 hover:bg-muted/50',
                          form.formState.errors.resume && 'border-red-500',
                        )}
                      >
                        <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
                        <span className="text-sm font-medium">Upload Resume</span>
                        <span className="mt-1 text-xs text-muted-foreground">
                          PDF, DOC, or DOCX (max 5MB)
                        </span>
                        <input
                          id="resume-upload"
                          type="file"
                          className="sr-only"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          aria-label="Upload Resume"
                        />
                      </label>
                    ) : (
                      <div className="flex items-center justify-between rounded-lg border bg-muted/50 p-3">
                        <span className="text-sm font-medium">{selectedFile.name}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={removeFile}
                          aria-label="Remove file"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Cover Letter */}
          <FormField
            control={form.control}
            name="coverLetter"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cover Letter</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Textarea
                      placeholder="Tell us why you're interested in this position..."
                      className="min-h-[120px] resize-none"
                      maxLength={1000}
                      {...field}
                    />
                  </FormControl>
                  <span className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                    {field.value?.length || 0}/1000
                  </span>
                </div>
                <FormDescription>Optional</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </Button>
        </form>
      </Form>
    </div>
  );
}