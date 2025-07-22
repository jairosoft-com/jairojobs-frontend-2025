'use client';

import { SearchBar } from '@/components/features/SearchBar';
import { JobCard } from '@/components/features/JobCard';
import { getFeaturedJobs, jobCategories } from '@/lib/db/mockData';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const featuredJobs = getFeaturedJobs();

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-900 lg:text-5xl">
              Find Your Dream Job Today
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              Connect with top companies and discover opportunities that match
              your skills and aspirations
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            <SearchBar
              onSearch={params => {
                // For now, just navigate to the jobs page with search params
                const searchParams = new URLSearchParams();
                if (params.query) searchParams.set('q', params.query);
                if (params.location)
                  searchParams.set('location', params.location);
                window.location.href = `/jobs?${searchParams.toString()}`;
              }}
            />
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Popular searches:
              <Link
                href="/jobs?q=React"
                className="ml-2 text-primary hover:underline"
              >
                React
              </Link>
              ,
              <Link
                href="/jobs?q=Python"
                className="ml-2 text-primary hover:underline"
              >
                Python
              </Link>
              ,
              <Link
                href="/jobs?q=Remote"
                className="ml-2 text-primary hover:underline"
              >
                Remote
              </Link>
              ,
              <Link
                href="/jobs?q=Senior"
                className="ml-2 text-primary hover:underline"
              >
                Senior Developer
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-16" data-testid="featured-jobs">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-gray-900">Featured Jobs</h2>
            <Link href="/jobs?featured=true">
              <Button variant="ghost">
                View all jobs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredJobs.slice(0, 6).map(job => (
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
      </section>

      {/* Job Categories Section */}
      <section className="bg-gray-50 py-16" data-testid="job-categories">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              Browse by Category
            </h2>
            <p className="text-lg text-gray-600">
              Find the perfect role in your field
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {jobCategories.map(category => (
              <Link
                key={category.name}
                href={`/jobs?category=${category.name.toLowerCase()}`}
                className="group rounded-lg bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md"
                data-testid="category-card"
              >
                <div className="mb-3 text-4xl">{category.icon}</div>
                <h3 className="font-semibold text-gray-900 transition-colors group-hover:text-primary">
                  {category.name}
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  {category.count} jobs
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Your journey to a new career in 3 simple steps
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="mb-2 text-xl font-semibold">
                Create Your Profile
              </h3>
              <p className="text-gray-600">
                Sign up and showcase your skills, experience, and career goals
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Search & Apply</h3>
              <p className="text-gray-600">
                Browse thousands of opportunities and apply with one click
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Get Hired</h3>
              <p className="text-gray-600">
                Connect with employers and land your dream job
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" className="px-8">
              Get Started Now
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16 text-white">
        <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold">
            Ready to Take the Next Step?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl opacity-90">
            Join thousands of professionals who have found their perfect job
            through JairoJobs
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" variant="secondary">
              Post a Job
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white bg-white/10 text-white hover:bg-white/20"
            >
              Browse Jobs
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
