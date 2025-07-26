import { test, expect } from '@playwright/test';
import { JobsPage, JobDetailsPage } from './helpers/page-objects';

test.describe('Job Details Page', () => {
  let jobDetailsPage: JobDetailsPage;

  test.beforeEach(async ({ page }) => {
    jobDetailsPage = new JobDetailsPage(page);

    // Navigate to jobs page and click first job
    const jobsPage = new JobsPage(page);
    await page.goto('/jobs');
    await jobsPage.clickJobCard(0);
  });

  test('should display all job information', async ({ page }) => {
    // Check job header information
    await expect(jobDetailsPage.jobTitle).toBeVisible();
    await expect(jobDetailsPage.companyName).toBeVisible();

    // Check job badges (type, experience, location)
    await expect(page.getByTestId('job-type-badge')).toBeVisible();
    await expect(page.getByTestId('experience-badge')).toBeVisible();
    await expect(page.getByTestId('location-badge')).toBeVisible();

    // Check salary if available
    const salary = page.getByTestId('salary-range');
    if (await salary.isVisible()) {
      await expect(salary).toContainText('$');
    }

    // Check action buttons
    await expect(jobDetailsPage.applyButton).toBeVisible();
    await expect(jobDetailsPage.saveButton).toBeVisible();
  });

  test('should display job description sections', async ({ page }) => {
    // Check all description sections
    await expect(
      page.getByRole('heading', { name: /about the role/i }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: /requirements/i }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: /responsibilities/i }),
    ).toBeVisible();

    // Check for benefits if available
    const benefitsHeading = page.getByRole('heading', { name: /benefits/i });
    if (await benefitsHeading.isVisible()) {
      // Look for benefit list items within the card containing Benefits heading
      const benefitsList = page
        .locator('h2:has-text("Benefits")')
        .locator('..')
        .locator('..')
        .locator('ul li');
      await expect(benefitsList.first()).toBeVisible();
    }

    // Check for skills/tags
    const skillTags = page.locator('[data-testid="skill-tag"]');
    await expect(skillTags.first()).toBeVisible();
  });

  test('should display company information', async ({ page }) => {
    // Check company card is visible
    await expect(jobDetailsPage.companyCard).toBeVisible();

    // Check company details
    await expect(page.getByTestId('company-description')).toBeVisible();
    await expect(page.getByTestId('company-industry')).toBeVisible();
    await expect(page.getByTestId('company-size')).toBeVisible();

    // Check website link if available
    const websiteLink = page.getByRole('link', { name: /visit website/i });
    if (await websiteLink.isVisible()) {
      await expect(websiteLink).toHaveAttribute('href', /^https?:\/\//);
    }
  });

  test('should display related jobs', async ({ page }) => {
    // Scroll to related jobs section
    await jobDetailsPage.relatedJobs.scrollIntoViewIfNeeded();

    // Check related jobs are visible
    await expect(
      page.getByRole('heading', { name: /similar positions/i }),
    ).toBeVisible();

    const relatedJobCards = jobDetailsPage.relatedJobs.locator(
      '[data-testid="job-card"]',
    );
    await expect(relatedJobCards.first()).toBeVisible();

    // Should show up to 4 related jobs
    const count = await relatedJobCards.count();
    expect(count).toBeGreaterThan(0);
    expect(count).toBeLessThanOrEqual(4);
  });

  test('should navigate back to jobs listing', async ({ page }) => {
    // Click back button or breadcrumb
    const backButton = page.getByRole('link', { name: /back to jobs/i });
    if (await backButton.isVisible()) {
      await backButton.click();
      await expect(page).toHaveURL('/jobs');
    }
  });

  test.skip('should handle job not found', async ({ page }) => {
    // Skip: Navigation issues with non-existent job IDs in Firefox and WebKit
    // Navigate directly to non-existent job
    await page.goto('/jobs/999999', { waitUntil: 'networkidle' });
    
    // Wait for the page to fully load
    await page.waitForLoadState('domcontentloaded');
    
    // Should show 404 or job not found message
    const notFoundText = page.locator('text=/job not found/i, text=/404/i').first();
    await expect(notFoundText).toBeVisible({ timeout: 10000 });

    // Should have link to jobs page
    const jobsLink = page.getByRole('link', { name: /view all jobs/i });
    await expect(jobsLink).toBeVisible();
  });

  test('should show application deadline warning', async ({ page }) => {
    // Check for deadline warning if deadline is soon
    const deadlineWarning = page.getByText(/application deadline/i);

    if (await deadlineWarning.isVisible()) {
      // Should show warning style
      await expect(deadlineWarning).toHaveClass(
        /warning|alert|text-orange|text-red/,
      );
    }
  });

  test('should handle share functionality', async ({ page }) => {
    // Check for share button
    const shareButton = page.getByRole('button', { name: /share/i });

    if (await shareButton.isVisible()) {
      await shareButton.click();

      // Should show share options or copy link
      const copyLinkButton = page.getByRole('button', { name: /copy link/i });
      if (await copyLinkButton.isVisible()) {
        await copyLinkButton.click();

        // Should show success message
        await expect(page.getByText(/copied/i)).toBeVisible();
      }
    }
  });

  test('should update browser title', async ({ page }) => {
    // Wait for job details page to load
    await page.waitForSelector('h1', { state: 'visible' });
    
    // The browser title should contain job title, company name and JairoJobs
    const pageTitle = await page.title();
    
    // Verify title contains expected parts
    expect(pageTitle).toContain('at');
    expect(pageTitle).toContain('JairoJobs');
    expect(pageTitle).toMatch(/\w+ at \w+ - JairoJobs/);
  });
});
