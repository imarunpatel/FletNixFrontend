import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // Path to your E2E test files
  timeout: 30000,
  retries: 1,
  use: {
    baseURL: 'http://localhost:4200', // Replace with your app's URL
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure', // Capture videos for failed tests
  },
});
