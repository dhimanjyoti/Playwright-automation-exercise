// @ts-check
// Enables TypeScript checking in JS files for better editor support and catching mistakes.

import { defineConfig, devices } from "@playwright/test";
// Import Playwright configuration helper and predefined device settings.

import dotenv from "dotenv";
// Import dotenv to load environment variables from a .env file (for local development).

// Load environment variables ONLY when running locally
// In CI (GitHub Actions), environment variables come from GitHub Secrets.
if (!process.env.CI) {
  dotenv.config({ path: "./.env" });
}

// Safety check to ensure BASE_URL is defined.
// This prevents tests from running against an undefined URL.
if (!process.env.BASE_URL) {
  throw new Error("BASE_URL is not defined. Check env variables.");
}

// Temporary debug log (useful when verifying CI secrets are working)
// Remove this after confirming the pipeline works correctly.
console.log("Running tests against:", process.env.BASE_URL);

export default defineConfig({
  // Maximum time allowed for each test before Playwright marks it as failed.
  timeout: 60000, // 60 seconds

  // Folder where all test files are located
  testDir: "./tests",

  // Number of workers (parallel test runners)
  // In CI we run 2 workers to speed up tests
  // Locally Playwright decides automatically
  workers: process.env.CI ? 2 : undefined,

  // Number of retries if a test fails
  // Useful in CI where environments may be slower or unstable
  retries: process.env.CI ? 2 : 0,

  // Reporter used to generate test reports
  // "html" creates a visual test report you can open in a browser
  reporter: "html",

  use: {
    // Base URL used in tests
    // Example: page.goto('/login') → resolves to BASE_URL/login
    baseURL: process.env.BASE_URL,

    // Collect Playwright trace when a test fails on retry
    // Trace helps debug failures by recording screenshots, DOM, and network logs
    trace: "on-first-retry",

    // Capture screenshot only if a test fails
    screenshot: "only-on-failure",

    // Record video of the test execution
    // Very helpful for debugging CI failures
    video: "on",
  },

  // Configuration for Playwright expect assertions
  expect: {
    // Maximum time Playwright will wait for an assertion
    // Example: expect(locator).toBeVisible()
    timeout: 10000, // 10 seconds
  },

  // Projects allow running tests across multiple browsers/devices
  projects: [
    {
      name: "chromium", // Project name shown in reports

      use: {
        // Use Playwright's predefined Chrome desktop settings
        ...devices["Desktop Chrome"],

        // Headless mode:
        // - In CI → run headless (no visible browser)
        // - Locally → open browser window for easier debugging
        headless: process.env.CI ? true : false,
      },
    },

    // Additional browsers can be enabled if needed

    // Firefox testing
    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"], headless: false },
    // },

    // Safari/WebKit testing
    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"], headless: false },
    // },

    /* Mobile testing examples */

    // Chrome on mobile device
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },

    // Safari on iPhone
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Testing branded browsers */

    // Microsoft Edge
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },

    // Google Chrome stable channel
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Optional: start a local dev server before running tests */

  // This is useful when testing a local application
  // Playwright will start the server automatically before tests begin

  // webServer: {
  //   command: 'npm run start',  // command to start the app
  //   url: 'http://localhost:3000', // URL where the app will be available
  //   reuseExistingServer: !process.env.CI, // reuse server locally if already running
  // },
});
