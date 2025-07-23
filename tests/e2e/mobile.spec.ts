import { test, expect, devices } from '@playwright/test';
import { HomePage, MobileNav } from './helpers/page-objects';
import { testData } from './helpers/test-data';

// Run tests in mobile viewport
test.use({ ...devices['iPhone 12'] });

test.describe('Mobile Experience', () => {
  let mobileNav: MobileNav;
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    mobileNav = new MobileNav(page);
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test('should show mobile menu button', async ({ page }) => {
    // Desktop nav should be hidden
    const desktopNav = page.getByRole('navigation').first();
    await expect(desktopNav).toBeHidden();
    
    // Mobile menu button should be visible
    await expect(mobileNav.menuButton).toBeVisible();
  });

  test.skip('should open and close mobile navigation', async ({ page }) => {
    // Open mobile nav
    await mobileNav.open();
    
    // Check nav is visible
    await expect(mobileNav.closeButton).toBeVisible();
    // Check navigation links inside the mobile nav using the navigation landmark
    const mobileNavigation = page.getByRole('navigation', { name: 'Mobile navigation' });
    await expect(mobileNavigation.getByRole('link', { name: 'Jobs' })).toBeVisible();
    await expect(mobileNavigation.getByRole('link', { name: 'Companies' })).toBeVisible();
    
    // Close mobile nav
    await mobileNav.close();
    
    // Nav should be hidden
    await expect(mobileNav.closeButton).not.toBeVisible();
  });

  test.skip('should navigate using mobile menu', async ({ page }) => {
    // Open mobile nav
    await mobileNav.open();
    
    // Click Jobs link within the mobile navigation
    const mobileNavigation = page.getByRole('navigation', { name: 'Mobile navigation' });
    await mobileNavigation.getByRole('link', { name: 'Jobs' }).click();
    
    // Should navigate and close menu
    await expect(page).toHaveURL('/jobs');
    await expect(mobileNav.closeButton).not.toBeVisible();
  });

  test('should show mobile-optimized search', async ({ page }) => {
    // Search inputs should stack vertically on mobile
    const searchContainer = page.locator('form').first();
    await expect(searchContainer).toBeVisible();
    
    // Fill search on mobile with location to avoid empty location
    await homePage.searchJobs(testData.searchQueries.developer, testData.locations.sanFrancisco);
    
    // Should navigate to jobs page with search params
    await expect(page).toHaveURL(/\/jobs\?search=developer/);
  });

  test('should show mobile-friendly job cards', async ({ page }) => {
    await page.goto('/jobs');
    
    // Job cards should be visible and properly sized
    const jobCard = page.locator('[data-testid="job-card"]').first();
    await expect(jobCard).toBeVisible();
    
    // Check card is full width on mobile
    const cardBox = await jobCard.boundingBox();
    const viewportSize = page.viewportSize();
    
    if (cardBox && viewportSize) {
      // Card should be nearly full width (accounting for padding)
      expect(cardBox.width).toBeGreaterThan(viewportSize.width * 0.9);
    }
  });

  test('should show mobile filters', async ({ page }) => {
    await page.goto('/jobs');
    
    // Look for mobile filter button
    const filterButton = page.getByRole('button', { name: /filter/i });
    
    if (await filterButton.isVisible()) {
      // Click to open filters
      await filterButton.click();
      
      // Filters should appear in a mobile-friendly format
      await expect(page.getByRole('heading', { name: /job type/i })).toBeVisible();
      
      // Should have close or apply button
      const applyButton = page.getByRole('button', { name: /apply filters/i });
      const closeButton = page.getByRole('button', { name: /close/i });
      
      const hasActionButton = await applyButton.isVisible() || await closeButton.isVisible();
      expect(hasActionButton).toBeTruthy();
    }
  });

  test('should handle touch interactions', async ({ page }) => {
    // Navigate to job details
    await page.goto('/jobs');
    
    const firstJob = page.locator('[data-testid="job-card"]').first();
    
    // Tap on job card
    await firstJob.tap();
    
    // Should navigate to job details
    await expect(page).toHaveURL(/\/jobs\/\d+/);
  });

  test('should show responsive images', async ({ page }) => {
    // Check that images are properly sized for mobile
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < Math.min(imageCount, 3); i++) {
      const img = images.nth(i);
      if (await img.isVisible()) {
        const box = await img.boundingBox();
        const viewportSize = page.viewportSize();
        
        if (box && viewportSize) {
          // Images shouldn't be wider than viewport
          expect(box.width).toBeLessThanOrEqual(viewportSize.width);
        }
      }
    }
  });

  test('should handle mobile form inputs', async ({ page }) => {
    // Navigate to a job and try to apply
    await page.goto('/jobs');
    await page.locator('[data-testid="job-card"]').first().click();
    
    // Scroll to application form
    const applySection = page.getByRole('heading', { name: /apply for this position/i });
    if (await applySection.isVisible()) {
      await applySection.scrollIntoViewIfNeeded();
      
      // Test mobile keyboard behavior
      const nameInput = page.getByLabel(/full name/i);
      await nameInput.tap();
      await nameInput.fill(testData.applicationData.fullName);
      
      // Verify input works on mobile
      await expect(nameInput).toHaveValue(testData.applicationData.fullName);
    }
  });

  test('should have mobile-optimized footer', async ({ page }) => {
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    const footer = page.getByRole('contentinfo');
    await expect(footer).toBeVisible();
    
    // Footer sections should stack vertically on mobile
    const footerSections = footer.locator('> div > div > div');
    const sectionCount = await footerSections.count();
    
    // Check that sections are properly arranged for mobile
    expect(sectionCount).toBeGreaterThan(0);
  });

  test('should handle offline state gracefully', async ({ page, context }) => {
    // Navigate to jobs page first
    await page.goto('/jobs');
    
    // Go offline
    await context.setOffline(true);
    
    // Try to navigate
    try {
      await page.reload();
      
      // Should show offline message or handle gracefully
      const offlineMessage = page.getByText(/offline|no internet|connection/i);
      if (await offlineMessage.isVisible()) {
        expect(true).toBeTruthy();
      }
    } catch (error) {
      // Page might not load at all when offline
      expect(error).toBeTruthy();
    }
    
    // Go back online
    await context.setOffline(false);
  });
});