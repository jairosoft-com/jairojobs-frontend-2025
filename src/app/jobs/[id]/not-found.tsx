import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function JobNotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-gray-300">404</h1>
        <h2 className="mb-2 text-2xl font-semibold text-gray-900">
          Job Not Found
        </h2>
        <p className="mx-auto mb-8 max-w-md text-gray-600">
          Sorry, the job you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/jobs">
            <Button>View all jobs</Button>
          </Link>
          <Link href="/">
            <Button variant="outline">Go to Homepage</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
