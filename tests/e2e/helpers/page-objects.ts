import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly locationInput: Locator;
  readonly searchButton: Locator;
  readonly featuredJobsSection: Locator;
  readonly categoriesSection: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByPlaceholder('Search job title, keywords, or company');
    this.locationInput = page.getByPlaceholder('City, state, or remote');
    this.searchButton = page.getByRole('button', { name: /search/i });
    this.featuredJobsSection = page.getByTestId('featured-jobs');
    this.categoriesSection = page.getByTestId('job-categories');
  }

  async goto() {
    await this.page.goto('/');
  }

  async searchJobs(query: string, location?: string) {
    await this.searchInput.fill(query);
    if (location) {
      await this.locationInput.fill(location);
    }
    await this.searchButton.click();
  }
}

export class JobsPage {
  readonly page: Page;
  readonly jobCards: Locator;
  readonly filters: {
    jobType: Locator;
    experienceLevel: Locator;
    location: Locator;
    salaryRange: Locator;
    clearAll: Locator;
  };
  readonly pagination: Locator;
  readonly resultsCount: Locator;

  constructor(page: Page) {
    this.page = page;
    this.jobCards = page.locator('[data-testid="job-card"]');
    this.filters = {
      jobType: page.getByRole('group', { name: /job type/i }),
      experienceLevel: page.getByRole('group', { name: /experience level/i }),
      location: page.getByRole('group', { name: /location/i }),
      salaryRange: page.getByRole('group', { name: /salary range/i }),
      clearAll: page.getByRole('button', { name: /clear all/i }),
    };
    this.pagination = page.getByRole('navigation', { name: /pagination/i });
    this.resultsCount = page.getByTestId('results-count');
  }

  async selectJobTypeFilter(type: string) {
    await this.filters.jobType.getByLabel(type).check();
  }

  async selectExperienceFilter(level: string) {
    await this.filters.experienceLevel.getByLabel(level).check();
  }

  async goToPage(pageNumber: number) {
    await this.pagination.getByRole('button', { name: pageNumber.toString() }).click();
  }

  async clickJobCard(index: number) {
    await this.jobCards.nth(index).click();
  }
}

export class JobDetailsPage {
  readonly page: Page;
  readonly jobTitle: Locator;
  readonly companyName: Locator;
  readonly applyButton: Locator;
  readonly saveButton: Locator;
  readonly jobDescription: Locator;
  readonly companyCard: Locator;
  readonly relatedJobs: Locator;
  readonly applicationForm: {
    fullName: Locator;
    email: Locator;
    phone: Locator;
    resumeUpload: Locator;
    coverLetter: Locator;
    submitButton: Locator;
  };

  constructor(page: Page) {
    this.page = page;
    this.jobTitle = page.getByRole('heading', { level: 1 });
    this.companyName = page.getByTestId('company-name');
    this.applyButton = page.getByRole('button', { name: /apply now/i });
    this.saveButton = page.getByRole('button', { name: /save job/i });
    this.jobDescription = page.getByTestId('job-description');
    this.companyCard = page.getByTestId('company-card');
    this.relatedJobs = page.getByTestId('related-jobs');
    this.applicationForm = {
      fullName: page.getByLabel(/full name/i),
      email: page.getByLabel(/email/i),
      phone: page.getByLabel(/phone/i),
      resumeUpload: page.getByLabel(/upload resume/i),
      coverLetter: page.getByLabel(/cover letter/i),
      submitButton: page.getByRole('button', { name: /submit application/i }),
    };
  }

  async fillApplicationForm(data: {
    fullName: string;
    email: string;
    phone?: string;
    coverLetter?: string;
    resumePath?: string;
  }) {
    await this.applicationForm.fullName.fill(data.fullName);
    await this.applicationForm.email.fill(data.email);
    if (data.phone) {
      await this.applicationForm.phone.fill(data.phone);
    }
    if (data.coverLetter) {
      await this.applicationForm.coverLetter.fill(data.coverLetter);
    }
    if (data.resumePath) {
      await this.applicationForm.resumeUpload.setInputFiles(data.resumePath);
    }
  }
}

export class MobileNav {
  readonly page: Page;
  readonly menuButton: Locator;
  readonly closeButton: Locator;
  readonly navLinks: Locator;
  readonly signInButton: Locator;
  readonly signUpButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menuButton = page.getByRole('button', { name: /menu/i });
    this.closeButton = page.getByRole('button', { name: /close/i });
    this.navLinks = page.getByRole('navigation').locator('a');
    this.signInButton = page.getByRole('link', { name: /sign in/i });
    this.signUpButton = page.getByRole('link', { name: /sign up/i });
  }

  async open() {
    await this.menuButton.click();
  }

  async close() {
    await this.closeButton.click();
  }
}