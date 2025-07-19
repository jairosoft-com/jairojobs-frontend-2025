import { test, expect } from '@playwright/test';

test('example', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page.getByText('Get started by editing')).toBeVisible();
});
