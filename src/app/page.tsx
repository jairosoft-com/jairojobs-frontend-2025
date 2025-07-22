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
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Find Your Dream Job Today
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Connect with top companies and discover opportunities that match your skills and aspirations
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <SearchBar 
              onSearch={(params) => {
                // For now, just navigate to the jobs page with search params
                const searchParams = new URLSearchParams();
                if (params.query) searchParams.set('q', params.query);
                if (params.location) searchParams.set('location', params.location);
                window.location.href = `/jobs?${searchParams.toString()}`;
              }}
            />
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Popular searches: 
              <Link href="/jobs?q=React" className="ml-2 text-primary hover:underline">React</Link>,
              <Link href="/jobs?q=Python" className="ml-2 text-primary hover:underline">Python</Link>,
              <Link href="/jobs?q=Remote" className="ml-2 text-primary hover:underline">Remote</Link>,
              <Link href="/jobs?q=Senior" className="ml-2 text-primary hover:underline">Senior Developer</Link>
            </p>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Jobs</h2>
            <Link href="/jobs?featured=true">
              <Button variant="ghost">
                View all jobs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredJobs.slice(0, 6).map((job) => (
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
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse by Category</h2>
            <p className="text-lg text-gray-600">Find the perfect role in your field</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {jobCategories.map((category) => (
              <Link
                key={category.name}
                href={`/jobs?category=${category.name.toLowerCase()}`}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center group"
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{category.count} jobs</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600">Your journey to a new career in 3 simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Create Your Profile</h3>
              <p className="text-gray-600">Sign up and showcase your skills, experience, and career goals</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Search & Apply</h3>
              <p className="text-gray-600">Browse thousands of opportunities and apply with one click</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Hired</h3>
              <p className="text-gray-600">Connect with employers and land your dream job</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="px-8">
              Get Started Now
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Take the Next Step?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of professionals who have found their perfect job through JairoJobs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Post a Job
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 border-white text-white">
              Browse Jobs
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}