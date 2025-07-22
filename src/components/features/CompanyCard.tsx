import { Company } from '@/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  MapPin,
  Users,
  Calendar,
  Building2,
  ExternalLink,
  CheckCircle,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CompanyCardProps {
  company: Company;
}

export function CompanyCard({ company }: CompanyCardProps) {
  const formatEmployeeCount = () => {
    const min = company.employees.min.toLocaleString();
    const max = company.employees.max.toLocaleString();
    return `${min} - ${max} employees`;
  };

  const formatIndustry = () => {
    return company.industry.charAt(0).toUpperCase() + company.industry.slice(1);
  };

  const formatSize = () => {
    const sizeMap = {
      startup: 'Startup',
      small: 'Small company',
      medium: 'Medium company',
      large: 'Large company',
      enterprise: 'Enterprise',
    };
    return sizeMap[company.size];
  };

  return (
    <Card data-testid="company-card">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            {company.logo && (
              <div className="relative h-16 w-16">
                <Image
                  src={company.logo}
                  alt={company.name}
                  fill
                  className="rounded-lg object-contain"
                />
              </div>
            )}
            <div>
              <CardTitle className="flex items-center gap-2 text-xl">
                {company.name}
                {company.verified && (
                  <Badge variant="secondary" className="gap-1">
                    <CheckCircle className="h-3 w-3" />
                    Verified
                  </Badge>
                )}
              </CardTitle>
              <CardDescription data-testid="company-description">{company.description}</CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Company Details */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground" data-testid="company-industry">
            <Building2 className="h-4 w-4" />
            <span>{formatIndustry()}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground" data-testid="company-size">
            <Users className="h-4 w-4" />
            <span>{formatSize()}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{company.headquarters}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Founded {company.founded}</span>
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          <Users className="mr-2 inline h-4 w-4" />
          {formatEmployeeCount()}
        </div>

        {/* Tech Stack */}
        {company.techStack && company.techStack.length > 0 && (
          <div>
            <p className="mb-2 text-sm font-medium">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {company.techStack.slice(0, 5).map(tech => (
                <Badge key={tech} variant="outline">
                  {tech}
                </Badge>
              ))}
              {company.techStack.length > 5 && (
                <Badge variant="outline">
                  +{company.techStack.length - 5} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <Link
            href={company.website}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
            data-testid="company-website"
          >
            <Button variant="outline" className="w-full gap-2">
              <ExternalLink className="h-4 w-4" />
              Visit Website
            </Button>
          </Link>
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => {
              // Navigate to company jobs
              window.location.href = `/jobs?company=${encodeURIComponent(company.name)}`;
            }}
          >
            View All Jobs
          </Button>
        </div>

        {/* Social Links */}
        {company.socialLinks && (
          <div className="flex justify-center gap-2 pt-2">
            {company.socialLinks.linkedin && (
              <Link
                href={company.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </Link>
            )}
            {company.socialLinks.twitter && (
              <Link
                href={company.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.46 6c-.85.38-1.78.64-2.75.76 1-.6 1.76-1.55 2.12-2.68-.93.55-1.96.95-3.06 1.17-.88-.94-2.13-1.53-3.51-1.53-2.66 0-4.81 2.16-4.81 4.81 0 .38.04.75.13 1.1-4-.2-7.54-2.11-9.91-5.02-.41.71-.65 1.53-.65 2.4 0 1.67.85 3.14 2.14 4.01-.79-.03-1.53-.24-2.18-.6v.06c0 2.33 1.66 4.28 3.86 4.72-.4.11-.83.17-1.27.17-.31 0-.62-.03-.92-.08.62 1.92 2.39 3.31 4.49 3.35-1.65 1.29-3.72 2.06-5.97 2.06-.39 0-.77-.02-1.15-.07 2.13 1.36 4.65 2.16 7.37 2.16 8.84 0 13.68-7.33 13.68-13.68 0-.21 0-.42-.01-.62.94-.68 1.76-1.53 2.4-2.5z" />
                </svg>
              </Link>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
