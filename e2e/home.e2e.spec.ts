import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page, context }) => {
    await page.goto('/auth/login');

    await page.fill('#email', 'arun@gmail.com');
    await page.fill('#password', '123456');
    await page.click('button[type="submit"]');

    await page.waitForURL('/');

    await page.goto('/');
  });

  test('should display table data correctly', async ({ page }) => {
    const tableRows = page.locator('table tbody tr');

    await expect(tableRows).toHaveCount(15);

    const firstRow = tableRows.nth(0);
    await expect(firstRow).toContainText('Dick Johnson Is Dead');
    await expect(firstRow).toContainText('2020');

    const secondRow = tableRows.nth(1);
    await expect(secondRow).toContainText('Blood & Water');
    await expect(secondRow).toContainText('2021');
  });

  test('should filter table correctly', async ({page}) => {

    await page.fill('#table-search', 'The Starling');

    const tableRows = page.locator('table tbody tr');

    await expect(tableRows).toHaveCount(1);

    const firstRow = tableRows.nth(0);
    await expect(firstRow).toContainText('The Starling');
    await expect(firstRow).toContainText('2021');
  })
});
