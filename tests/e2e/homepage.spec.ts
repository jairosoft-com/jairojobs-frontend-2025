import { test, expect } from '@playwright/test';
import { HomePage } from './helpers/page-objects';
import { testData } from './helpers/test-data';

test.describe('Homepage', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test('should load homepage with all key sections', async ({ page }) => {
    // Check hero section
    await expect(
      page.getByRole('heading', { name: /find your dream job/i }),
    ).toBeVisible();
    await expect(
      page.getByText(/discover thousands of job opportunities/i),
    ).toBeVisible();

    // Check search bar
    await expect(homePage.searchInput).toBeVisible();
    await expect(homePage.locationInput).toBeVisible();
    await expect(homePage.searchButton).toBeVisible();

    // Check featured jobs section
    await expect(
      page.getByRole('heading', { name: /featured jobs/i }),
    ).toBeVisible();
    const featuredJobs = page.locator('[data-testid="job-card"]');
    await expect(featuredJobs).toHaveCount(6); // Based on mock data

    // Check categories section
    await expect(
      page.getByRole('heading', { name: /explore by category/i }),
    ).toBeVisible();
    const categories = page.locator('[data-testid="category-card"]');
    await expect(categories.first()).toBeVisible();
  });

  test('should navigate to jobs page when searching', async ({ page }) => {
    await homePage.searchJobs(
      testData.searchQueries.developer,
      testData.locations.sanFrancisco,
    );

    // Should navigate to jobs page with search params
    await expect(page).toHaveURL(
      /\/jobs\?search=developer&location=(San\+Francisco|San%20Francisco)/,
    );

    // Should show search results
    await expect(
      page.getByRole('heading', { name: /job listings/i }),
    ).toBeVisible();
  });

  test('should navigate to jobs page when clicking view all jobs', async ({
    page,
  }) => {
    const viewAllButton = page.getByRole('link', { name: /view all jobs/i });
    await viewAllButton.click();

    await expect(page).toHaveURL('/jobs');
    await expect(
      page.getByRole('heading', { name: /job listings/i }),
    ).toBeVisible();
  });

  test('should navigate to job details when clicking featured job', async ({
    page,
  }) => {
    const firstFeaturedJob = page.locator('[data-testid="job-card"]').first();
    const jobTitle = await firstFeaturedJob.locator('h3').textContent();

    await firstFeaturedJob.click();

    // Should navigate to job details page
    await expect(page).toHaveURL(/\/jobs\/\d+/);

    // Should show job title
    await expect(
      page.getByRole('heading', { name: jobTitle || '' }),
    ).toBeVisible();
  });

  test('should navigate to jobs page with category filter', async ({
    page,
  }) => {
    const categoryCard = page.locator('[data-testid="category-card"]').first();

    // Debug: Check the href attribute
    const href = await categoryCard.getAttribute('href');
    console.log('Category card href:', href);

    await categoryCard.click();

    // Wait a bit for navigation
    await page.waitForTimeout(1000);

    // Debug: Check current URL
    const currentUrl = page.url();
    console.log('Current URL after click:', currentUrl);

    // Should navigate to jobs page with category filter
    await expect(page).toHaveURL(/\/jobs\?category=/);
  });

  test('should have working navigation links', async ({ page }) => {
    // Get header navigation
    const headerNav = page.getByRole('navigation').first();

    // Test Jobs link
    await headerNav.getByRole('link', { name: 'Jobs' }).click();
    await expect(page).toHaveURL('/jobs');

    // Go back home
    await page.getByRole('link', { name: 'JairoJobs' }).click();
    await expect(page).toHaveURL('/');

    // Test Companies link
    await headerNav.getByRole('link', { name: 'Companies' }).click();
    await expect(page).toHaveURL('/companies');

    // Go back home again
    await page.getByRole('link', { name: 'JairoJobs' }).click();
    await expect(page).toHaveURL('/');

    // Test About link
    await headerNav.getByRole('link', { name: 'About' }).click();
    await expect(page).toHaveURL('/about');
  });

  test('should have footer with all links', async ({ page }) => {
    // Scroll to footer
    await page.getByRole('contentinfo').scrollIntoViewIfNeeded();

    // Check footer sections
    await expect(
      page.getByRole('heading', { name: /quick links/i }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: /for job seekers/i }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: /for employers/i }),
    ).toBeVisible();

    // Check social links
    const socialLinks = page.getByRole('contentinfo').locator('a[aria-label]');
    await expect(socialLinks).toHaveCount(4); // Twitter, LinkedIn, Facebook, Instagram
  });

  test('should show quick stats', async ({ page }) => {
    const statsSection = page.locator('[data-testid="stats-section"]');

    if (await statsSection.isVisible()) {
      await expect(statsSection.getByText(/active jobs/i)).toBeVisible();
      await expect(statsSection.getByText(/companies/i)).toBeVisible();
      await expect(statsSection.getByText(/job seekers/i)).toBeVisible();
    }
  });
});
