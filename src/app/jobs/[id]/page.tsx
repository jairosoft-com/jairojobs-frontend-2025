import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage,
  BreadcrumbSeparator 
} from '@/components/ui/breadcrumb';
import { JobDetailsHeader } from '@/components/features/JobDetailsHeader';
import { CompanyCard } from '@/components/features/CompanyCard';
import { JobDescription } from '@/components/features/JobDescription';
import { RelatedJobs } from '@/components/features/RelatedJobs';
import { getJobById, getCompanyById, getRelatedJobs } from '@/lib/db/mockData';

interface JobDetailsPageProps {
  params: {
    id: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: JobDetailsPageProps): Promise<Metadata> {
  const job = getJobById(params.id);
  
  if (!job) {
    return {
      title: 'Job Not Found - JairoJobs',
    };
  }

  const company = getCompanyById(job.companyId);

  return {
    title: `${job.title} at ${company?.name || job.company} - JairoJobs`,
    description: job.description.substring(0, 160) + '...',
    openGraph: {
      title: `${job.title} at ${company?.name || job.company}`,
      description: job.description.substring(0, 160) + '...',
      type: 'website',
    },
  };
}

export default function JobDetailsPage({ params }: JobDetailsPageProps) {
  const job = getJobById(params.id);
  
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
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                <RelatedJobs 
                  jobs={relatedJobs} 
                  title="Similar Jobs"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Apply Button - Sticky at bottom */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-10">
        <button 
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-6 rounded-md font-medium transition-colors"
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