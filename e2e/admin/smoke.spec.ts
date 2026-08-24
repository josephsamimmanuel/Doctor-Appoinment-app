import { expect, test } from '@playwright/test';

test.describe('Admin app smoke', () => {
  test('dashboard loads with sidebar navigation', async ({ page }, testInfo) => {
    await page.goto('http://localhost:5174/');

    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

    const sidebar = page.locator('#sidebar');
    await expect(sidebar).toBeAttached();

    // Sidebar is hidden below 1024px in admin CSS; desktop projects assert visibility.
    const isMobileProject = testInfo.project.name.includes('Mobile');
    if (!isMobileProject) {
      await expect(sidebar).toBeVisible();
      await expect(page.getByRole('navigation', { name: 'Admin navigation' })).toBeVisible();
    }
  });
});
