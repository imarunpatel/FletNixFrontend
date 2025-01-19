import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/auth/login');
    })

    test('should successfully login and navigate to the home page', async ({ page }) => {
        await page.fill('#email', 'arun@gmail.com');
        await page.fill('#password', '123456');

        await page.click('button[type="submit"]');

        await expect(page).toHaveURL('/')
    })

    test('should show error message on login failure', async ({ page }) => {
        await page.fill('#email', 'invaliduser@example.com');
        await page.fill('#password', 'wrongpassword');
    
        await page.click('button[type="submit"]');
    
        const errorMessage = page.locator('#error-msg');
        await expect(errorMessage).toHaveText('Bad credentials');
      });

});
