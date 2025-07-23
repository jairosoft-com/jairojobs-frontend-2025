'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Filter, X } from 'lucide-react';
import {
  JobFilters as JobFiltersType,
  JobType,
  ExperienceLevel,
  RemoteOption,
} from '@/types';
import {
  JOB_TYPE_OPTIONS,
  EXPERIENCE_LEVEL_OPTIONS,
  REMOTE_OPTION_OPTIONS,
  SALARY_RANGES,
} from '@/lib/utils/filters';

interface JobFiltersProps {
  filters: JobFiltersType;
  onFiltersChange: (filters: JobFiltersType) => void;
  isMobile?: boolean;
}

export function JobFilters({
  filters,
  onFiltersChange,
  isMobile = false,
}: JobFiltersProps) {
  const [localFilters, setLocalFilters] = useState<JobFiltersType>(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleJobTypeChange = (type: JobType, checked: boolean) => {
    const currentTypes = localFilters.type || [];
    const newTypes = checked
      ? [...currentTypes, type]
      : currentTypes.filter(t => t !== type);

    const newFilters = {
      ...localFilters,
      type: newTypes.length > 0 ? newTypes : undefined,
    };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleExperienceLevelChange = (
    level: ExperienceLevel,
    checked: boolean,
  ) => {
    const currentLevels = localFilters.experienceLevel || [];
    const newLevels = checked
      ? [...currentLevels, level]
      : currentLevels.filter(l => l !== level);

    const newFilters = {
      ...localFilters,
      experienceLevel: newLevels.length > 0 ? newLevels : undefined,
    };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleRemoteOptionChange = (option: RemoteOption, checked: boolean) => {
    const currentOptions = localFilters.remoteOption || [];
    const newOptions = checked
      ? [...currentOptions, option]
      : currentOptions.filter(o => o !== option);

    const newFilters = {
      ...localFilters,
      remoteOption: newOptions.length > 0 ? newOptions : undefined,
    };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleSalaryRangeChange = (value: string) => {
    const range = SALARY_RANGES.find(r => r.value === value);
    if (!range) return;

    const newFilters = {
      ...localFilters,
      salaryMin: range.min,
      salaryMax: range.max,
    };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleClearAll = () => {
    setLocalFilters({});
    onFiltersChange({});
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (localFilters.type?.length) count += localFilters.type.length;
    if (localFilters.experienceLevel?.length)
      count += localFilters.experienceLevel.length;
    if (localFilters.remoteOption?.length)
      count += localFilters.remoteOption.length;
    if (
      localFilters.salaryMin !== undefined ||
      localFilters.salaryMax !== undefined
    )
      count += 1;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();
  const currentSalaryRange =
    SALARY_RANGES.find(
      r => r.min === localFilters.salaryMin && r.max === localFilters.salaryMax,
    )?.value || '';

  const filterContent = (
    <div className="space-y-6">
      {activeFilterCount > 0 && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {activeFilterCount} filter{activeFilterCount !== 1 ? 's' : ''}{' '}
            active
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearAll}
            className="h-auto p-0 text-sm"
          >
            Clear all
          </Button>
        </div>
      )}

      {/* Job Type */}
      <div role="group" aria-label="Job Type">
        <h3 className="mb-3 text-sm font-semibold">Job Type</h3>
        <div className="space-y-2">
          {JOB_TYPE_OPTIONS.map(option => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={`job-type-${option.value}`}
                checked={localFilters.type?.includes(option.value) || false}
                onCheckedChange={checked =>
                  handleJobTypeChange(option.value, checked as boolean)
                }
              />
              <Label
                htmlFor={`job-type-${option.value}`}
                className="cursor-pointer text-sm font-normal"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Experience Level */}
      <div role="group" aria-label="Experience Level">
        <h3 className="mb-3 text-sm font-semibold">Experience Level</h3>
        <div className="space-y-2">
          {EXPERIENCE_LEVEL_OPTIONS.map(option => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={`exp-level-${option.value}`}
                checked={
                  localFilters.experienceLevel?.includes(option.value) || false
                }
                onCheckedChange={checked =>
                  handleExperienceLevelChange(option.value, checked as boolean)
                }
              />
              <Label
                htmlFor={`exp-level-${option.value}`}
                className="cursor-pointer text-sm font-normal"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Work Location */}
      <div role="group" aria-label="Location">
        <h3 className="mb-3 text-sm font-semibold">Work Location</h3>
        <div className="space-y-2">
          {REMOTE_OPTION_OPTIONS.map(option => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={`remote-option-${option.value}`}
                checked={
                  localFilters.remoteOption?.includes(option.value) || false
                }
                onCheckedChange={checked =>
                  handleRemoteOptionChange(option.value, checked as boolean)
                }
              />
              <Label
                htmlFor={`remote-option-${option.value}`}
                className="cursor-pointer text-sm font-normal"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Salary Range */}
      <div role="group" aria-label="Salary Range">
        <h3 className="mb-3 text-sm font-semibold">Salary Range</h3>
        <RadioGroup
          value={currentSalaryRange}
          onValueChange={handleSalaryRangeChange}
        >
          {SALARY_RANGES.map(range => (
            <div key={range.value} className="flex items-center space-x-2">
              <RadioGroupItem
                value={range.value}
                id={`salary-${range.value}`}
              />
              <Label
                htmlFor={`salary-${range.value}`}
                className="cursor-pointer text-sm font-normal"
              >
                {range.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                {activeFilterCount}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
            <SheetDescription>Narrow down your job search</SheetDescription>
          </SheetHeader>
          <div className="mt-6">{filterContent}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>
        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearAll}
            className="h-auto p-0 text-sm"
          >
            <X className="mr-1 h-3 w-3" />
            Clear all
          </Button>
        )}
      </div>
      {filterContent}
    </div>
  );
}
