import Link from 'next/link';
import { Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h2 className="mb-2 text-2xl font-bold text-primary">JairoJobs</h2>
            <p className="mb-4 text-gray-600">Find your dream job</p>
            <p className="text-sm text-gray-500">
              Connecting talented professionals with amazing opportunities.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold text-gray-900">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 transition-colors hover:text-primary"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 transition-colors hover:text-primary"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 transition-colors hover:text-primary"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 transition-colors hover:text-primary"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* For Job Seekers */}
          <div>
            <h3 className="mb-4 font-semibold text-gray-900">
              For Job Seekers
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/jobs"
                  className="text-gray-600 transition-colors hover:text-primary"
                >
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link
                  href="/companies"
                  className="text-gray-600 transition-colors hover:text-primary"
                >
                  Companies
                </Link>
              </li>
              <li>
                <Link
                  href="/career-advice"
                  className="text-gray-600 transition-colors hover:text-primary"
                >
                  Career Advice
                </Link>
              </li>
              <li>
                <Link
                  href="/salary-guide"
                  className="text-gray-600 transition-colors hover:text-primary"
                >
                  Salary Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h3 className="mb-4 font-semibold text-gray-900">For Employers</h3>
            <ul className="mb-6 space-y-2">
              <li>
                <Link
                  href="/post-job"
                  className="text-gray-600 transition-colors hover:text-primary"
                >
                  Post a Job
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-gray-600 transition-colors hover:text-primary"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/employer-resources"
                  className="text-gray-600 transition-colors hover:text-primary"
                >
                  Resources
                </Link>
              </li>
            </ul>

            {/* Social Links */}
            <h3 className="mb-4 font-semibold text-gray-900">Follow Us</h3>
            <div className="flex space-x-4">
              <Link
                href="https://linkedin.com"
                className="text-gray-400 transition-colors hover:text-primary"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="https://twitter.com"
                className="text-gray-400 transition-colors hover:text-primary"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="https://facebook.com"
                className="text-gray-400 transition-colors hover:text-primary"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="https://instagram.com"
                className="text-gray-400 transition-colors hover:text-primary"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-center text-sm text-gray-500">
            © {currentYear} JairoJobs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
