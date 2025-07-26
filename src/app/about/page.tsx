import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-8 text-4xl font-bold text-gray-900">
            About JairoJobs
          </h1>

          <div className="space-y-6 text-lg text-gray-700">
            <p>
              JairoJobs is your premier destination for finding the perfect job
              opportunity. We connect talented professionals with leading
              companies across various industries.
            </p>

            <p>
              Founded with the mission to simplify the job search process, we
              provide a seamless platform where job seekers can discover
              opportunities that match their skills, experience, and career
              aspirations.
            </p>

            <h2 className="mt-8 text-2xl font-semibold text-gray-900">
              Our Mission
            </h2>
            <p>
              To empower professionals to find meaningful work and help
              companies build exceptional teams by creating the most efficient
              and user-friendly job marketplace.
            </p>

            <h2 className="mt-8 text-2xl font-semibold text-gray-900">
              Why Choose JairoJobs?
            </h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>Curated job listings from verified companies</li>
              <li>Advanced search and filtering capabilities</li>
              <li>Personalized job recommendations</li>
              <li>Direct communication with employers</li>
              <li>Career resources and guidance</li>
            </ul>

            <div className="mt-12 flex gap-4">
              <Link href="/jobs">
                <Button size="lg">Browse Jobs</Button>
              </Link>
              <Link href="/">
                <Button variant="outline" size="lg">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
