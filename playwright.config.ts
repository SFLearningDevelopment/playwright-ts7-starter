import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for the TypeScript 7 starter.
 * Target: the public TodoMVC demo app that Playwright provides for practice.
 * Remember: Playwright does NOT type-check specs when it runs them —
 * that is done separately by `tsc --noEmit` (the "pretest" script and the CI gate).
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,          // fail CI if a test.only is left in
  retries: process.env.CI ? 2 : 0,       // retry on CI only
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'https://demo.playwright.dev/todomvc',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
