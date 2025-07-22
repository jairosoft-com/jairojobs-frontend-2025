'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle 
} from '@/components/ui/sheet';
import { cn } from '@/utils/cn';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { href: '/jobs', label: 'Jobs' },
  { href: '/companies', label: 'Companies' },
  { href: '/resources', label: 'Resources' },
  { href: '/about', label: 'About' },
];

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();

  // Close menu on route change
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  // Handle Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="w-80 p-0 lg:hidden">
          <SheetHeader className="border-b px-6 py-4">
            <div className="flex items-center justify-between">
              <SheetTitle asChild>
                <Link href="/" className="text-2xl font-bold text-primary">
                  JairoJobs
                </Link>
              </SheetTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
          </SheetHeader>

          <nav
            className="flex flex-col p-6"
            aria-label="Mobile navigation"
            role="navigation"
          >
            {/* Main Navigation */}
            <div className="space-y-1">
              {navItems.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'block rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-gray-100',
                    pathname === item.href
                      ? 'bg-gray-100 text-primary'
                      : 'text-gray-700',
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Divider */}
            <div className="my-6 border-t" />

            {/* For Employers Section */}
            <div className="mb-6">
              <p className="mb-3 px-3 text-sm font-medium text-gray-500">
                For Employers
              </p>
              <Link
                href="/post-job"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 transition-colors hover:bg-gray-100"
              >
                Post a Job
              </Link>
            </div>

            {/* Auth Buttons */}
            <div className="space-y-3">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/signin">Sign In</Link>
              </Button>
              <Button className="w-full" asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
  );
}