import { expect, test } from '@playwright/test';

test.describe('Patient app smoke', () => {
  test('home page loads with title and heading', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    await expect(page).toHaveTitle(/MediCare\+ – Doctor Appointment System/);
    await expect(
      page.getByRole('heading', { name: 'MediCare+ Doctor Appointment System' }),
    ).toBeVisible();
  });
});
