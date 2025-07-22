import { test, expect } from '@playwright/test';
import { HomePage, JobsPage } from './helpers/page-objects';
import { testData } from './helpers/test-data';

test.describe('Job Search and Filtering', () => {
  let jobsPage: JobsPage;

  test.beforeEach(async ({ page }) => {
    jobsPage = new JobsPage(page);
    await page.goto('/jobs');
  });

  test('should display all jobs by default', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /job listings/i })).toBeVisible();
    
    // Should show job cards
    const jobCards = jobsPage.jobCards;
    await expect(jobCards.first()).toBeVisible();
    await expect(jobCards).toHaveCount(20); // Default per page
  });

  test('should filter by job type', async ({ page }) => {
    // Select full-time filter
    await jobsPage.selectJobTypeFilter('Full-time');
    
    // Wait for filtered results
    await page.waitForLoadState('networkidle');
    
    // Check that all visible jobs are full-time
    const jobTypes = page.locator('[data-testid="job-card"] .badge:has-text("Full-time")');
    const jobCardsCount = await jobsPage.jobCards.count();
    const fullTimeCount = await jobTypes.count();
    
    expect(fullTimeCount).toBe(jobCardsCount);
  });

  test('should filter by experience level', async ({ page }) => {
    // Select senior level filter
    await jobsPage.selectExperienceFilter('Senior');
    
    // Wait for filtered results
    await page.waitForLoadState('networkidle');
    
    // Check that jobs match the filter
    const seniorJobs = page.locator('[data-testid="job-card"] .badge:has-text("Senior")');
    await expect(seniorJobs.first()).toBeVisible();
  });

  test('should filter by multiple criteria', async ({ page }) => {
    // Apply multiple filters
    await jobsPage.selectJobTypeFilter('Full-time');
    await jobsPage.selectExperienceFilter('Senior');
    
    // Select location filter if available
    const locationCheckbox = jobsPage.filters.location.getByLabel('San Francisco, CA');
    if (await locationCheckbox.isVisible()) {
      await locationCheckbox.check();
    }
    
    // Wait for filtered results
    await page.waitForLoadState('networkidle');
    
    // Verify results are filtered
    const jobCards = await jobsPage.jobCards.count();
    expect(jobCards).toBeGreaterThan(0);
    expect(jobCards).toBeLessThanOrEqual(20);
  });

  test('should clear all filters', async ({ page }) => {
    // Apply some filters
    await jobsPage.selectJobTypeFilter('Full-time');
    await jobsPage.selectExperienceFilter('Senior');
    
    // Get count with filters
    await page.waitForLoadState('networkidle');
    const filteredCount = await jobsPage.jobCards.count();
    
    // Clear all filters
    await jobsPage.filters.clearAll.click();
    
    // Wait for unfiltered results
    await page.waitForLoadState('networkidle');
    const unfilteredCount = await jobsPage.jobCards.count();
    
    // Should have more results after clearing filters
    expect(unfilteredCount).toBeGreaterThanOrEqual(filteredCount);
  });

  test('should search by keyword', async ({ page }) => {
    const homePage = new HomePage(page);
    await page.goto('/');
    
    // Search for developer jobs
    await homePage.searchJobs(testData.searchQueries.developer);
    
    // Should navigate to jobs page with search query
    await expect(page).toHaveURL(/\/jobs\?search=developer/);
    
    // Should show relevant results
    const jobTitles = page.locator('[data-testid="job-card"] h3');
    const titles = await jobTitles.allTextContents();
    
    // At least some titles should contain 'developer' or related terms
    const relevantTitles = titles.filter(title => 
      title.toLowerCase().includes('developer') ||
      title.toLowerCase().includes('engineer') ||
      title.toLowerCase().includes('software')
    );
    
    expect(relevantTitles.length).toBeGreaterThan(0);
  });

  test('should search by location', async ({ page }) => {
    const homePage = new HomePage(page);
    await page.goto('/');
    
    // Search for jobs in San Francisco
    await homePage.searchJobs('', testData.locations.sanFrancisco);
    
    // Should show jobs in San Francisco
    const locations = page.locator('[data-testid="job-card"] [data-testid="job-location"]');
    const locationTexts = await locations.allTextContents();
    
    const sfJobs = locationTexts.filter(loc => 
      loc.includes('San Francisco') || loc.includes('SF')
    );
    
    expect(sfJobs.length).toBeGreaterThan(0);
  });

  test('should handle pagination', async ({ page }) => {
    // Check pagination is visible
    await expect(jobsPage.pagination).toBeVisible();
    
    // Go to page 2
    await jobsPage.goToPage(2);
    
    // URL should update
    await expect(page).toHaveURL(/page=2/);
    
    // Should show different jobs
    const firstJobTitle = await jobsPage.jobCards.first().locator('h3').textContent();
    
    // Go back to page 1
    await jobsPage.goToPage(1);
    
    // First job should be different
    const newFirstJobTitle = await jobsPage.jobCards.first().locator('h3').textContent();
    expect(firstJobTitle).not.toBe(newFirstJobTitle);
  });

  test('should show no results message', async ({ page }) => {
    const homePage = new HomePage(page);
    await page.goto('/');
    
    // Search for something that won't return results
    await homePage.searchJobs('xyzabc123456');
    
    // Should show no results message
    await expect(page.getByText(/no jobs found/i)).toBeVisible();
    await expect(page.getByText(/try adjusting your filters/i)).toBeVisible();
  });

  test('should persist filters in URL', async ({ page }) => {
    // Apply filters
    await jobsPage.selectJobTypeFilter('Full-time');
    await jobsPage.selectExperienceFilter('Senior');
    
    // Check URL has filter params
    await expect(page).toHaveURL(/types.*=.*full-time/);
    await expect(page).toHaveURL(/experienceLevels.*=.*senior/);
    
    // Reload page
    await page.reload();
    
    // Filters should still be applied
    const fullTimeCheckbox = jobsPage.filters.jobType.getByLabel('Full-time');
    const seniorCheckbox = jobsPage.filters.experienceLevel.getByLabel('Senior');
    
    await expect(fullTimeCheckbox).toBeChecked();
    await expect(seniorCheckbox).toBeChecked();
  });
});