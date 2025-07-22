'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, useCallback, Suspense } from 'react';
import { JobCard } from '@/components/features/JobCard';
import { JobFilters } from '@/components/features/JobFilters';
import { JobsPagination } from '@/components/features/JobsPagination';
import { SearchBar } from '@/components/features/SearchBar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  filterJobs,
  sortJobs,
  paginateJobs,
  SortOption,
} from '@/lib/db/mockData';
import {
  JobFilters as JobFiltersType,
  JobType,
  ExperienceLevel,
  RemoteOption,
} from '@/types';
import { SORT_OPTIONS, ITEMS_PER_PAGE_OPTIONS } from '@/lib/utils/filters';

function JobsContent() {
  const searchParams = useSearchParams();

  // Parse initial filters from URL
  const getInitialFilters = (): JobFiltersType => {
    const filters: JobFiltersType = {};

    const search = searchParams.get('q');
    if (search) filters.search = search;

    const location = searchParams.get('location');
    if (location) filters.location = location;

    const types = searchParams.get('type');
    if (types) filters.type = types.split(',') as JobType[];

    const levels = searchParams.get('level');
    if (levels)
      filters.experienceLevel = levels.split(',') as ExperienceLevel[];

    const remote = searchParams.get('remote');
    if (remote) filters.remoteOption = remote.split(',') as RemoteOption[];

    const salaryMin = searchParams.get('salaryMin');
    if (salaryMin) filters.salaryMin = parseInt(salaryMin);

    const salaryMax = searchParams.get('salaryMax');
    if (salaryMax) filters.salaryMax = parseInt(salaryMax);

    return filters;
  };

  const [filters, setFilters] = useState<JobFiltersType>(getInitialFilters());
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.search) params.set('q', filters.search);
    if (filters.location) params.set('location', filters.location);
    if (filters.type?.length) params.set('type', filters.type.join(','));
    if (filters.experienceLevel?.length)
      params.set('level', filters.experienceLevel.join(','));
    if (filters.remoteOption?.length)
      params.set('remote', filters.remoteOption.join(','));
    if (filters.salaryMin)
      params.set('salaryMin', filters.salaryMin.toString());
    if (filters.salaryMax)
      params.set('salaryMax', filters.salaryMax.toString());

    const newUrl = params.toString() ? `?${params.toString()}` : '/jobs';
    window.history.replaceState({}, '', newUrl);
  }, [filters]);

  // Filter, sort, and paginate jobs
  const filteredJobs = filterJobs(filters);
  const sortedJobs = sortJobs(filteredJobs, sortBy);
  const paginatedData = paginateJobs(sortedJobs, currentPage, itemsPerPage);

  const handleFiltersChange = useCallback((newFilters: JobFiltersType) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  }, []);

  const handleSearch = useCallback(
    (searchParams: { query: string; location: string }) => {
      setFilters(prev => ({
        ...prev,
        search: searchParams.query,
        location: searchParams.location,
      }));
      setCurrentPage(1);
    },
    [],
  );

  const handleSortChange = (value: string) => {
    setSortBy(value as SortOption);
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(parseInt(value));
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <SearchBar
            onSearch={handleSearch}
            defaultQuery={filters.search || ''}
            defaultLocation={filters.location || ''}
          />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Filters Sidebar - Desktop */}
          <aside className="hidden lg:block">
            <div className="sticky top-4">
              <JobFilters
                filters={filters}
                onFiltersChange={handleFiltersChange}
              />
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            {/* Results Header */}
            <div className="mb-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  {/* Mobile Filters Button */}
                  <div className="lg:hidden">
                    <JobFilters
                      filters={filters}
                      onFiltersChange={handleFiltersChange}
                      isMobile={true}
                    />
                  </div>

                  <h1 className="text-2xl font-semibold text-gray-900">
                    {paginatedData.totalJobs}{' '}
                    {paginatedData.totalJobs === 1 ? 'job' : 'jobs'} found
                  </h1>
                </div>

                <div className="flex gap-4">
                  {/* Sort Dropdown */}
                  <Select value={sortBy} onValueChange={handleSortChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      {SORT_OPTIONS.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Items per page */}
                  <Select
                    value={itemsPerPage.toString()}
                    onValueChange={handleItemsPerPageChange}
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ITEMS_PER_PAGE_OPTIONS.map(option => (
                        <SelectItem
                          key={option.value}
                          value={option.value.toString()}
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Job Listings */}
            {paginatedData.jobs.length > 0 ? (
              <>
                <div className="mb-8 space-y-4">
                  {paginatedData.jobs.map(job => (
                    <JobCard
                      key={job.id}
                      job={job}
                      onClick={() => {
                        window.location.href = `/jobs/${job.id}`;
                      }}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {paginatedData.totalPages > 1 && (
                  <JobsPagination
                    currentPage={paginatedData.currentPage}
                    totalPages={paginatedData.totalPages}
                    onPageChange={setCurrentPage}
                  />
                )}
              </>
            ) : (
              <div className="py-12 text-center">
                <p className="mb-4 text-lg text-gray-600">
                  No jobs found matching your criteria
                </p>
                <p className="text-gray-500">
                  Try adjusting your filters or search terms
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function JobsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-gray-900"></div>
            <p className="mt-4 text-gray-600">Loading jobs...</p>
          </div>
        </div>
      }
    >
      <JobsContent />
    </Suspense>
  );
}
