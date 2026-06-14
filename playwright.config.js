// @ts-check
const { defineConfig, devices } = require("@playwright/test");
const dotenv = require("dotenv");
const { EnvResolver } = require("./src/config/EnvResolver.js");

// Load local SECRETS (passwords, emails) if we are NOT running in a CI environment.
if (!process.env.CI) {
  dotenv.config({ path: "./.env" });
}

// Load ROUTING DATA (URLs, timeouts) dynamically based on TEST_ENV
const envConfig = EnvResolver.getConfig();

if (!envConfig.BASE_URL) {
  throw new Error(
    "CRITICAL: BASE_URL is not defined. Please check your environment config JSON.",
  );
}

module.exports = defineConfig({
  timeout: envConfig.TIMEOUT || 60 * 1000,
  testDir: "./tests",

  workers: process.env.CI ? 2 : 2,
  retries:  1,
  reporter: process.env.CI
    ? [
        ["html"],
        ["github"],
        [
          "allure-playwright",
          { detail: true, outputFolder: "allure-results", suiteTitle: false },
        ],
      ]
    : [
        ["list"],
        ["html"],
        [
          "allure-playwright",
          { detail: true, outputFolder: "allure-results", suiteTitle: false },
        ],
      ],

  expect: {
    timeout: 10 * 1000,
  },

  use: {
    baseURL: envConfig.BASE_URL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    // retries: 2,
  },

  projects: [
    // Dedicated API Project
    {
      name: "api",
      testMatch: /.*\.api\.spec\.js/,
    },

    // Setup Project: Runs your auth.setup.js file first
    {
      name: "setup",
      testMatch: /.*\.setup\.js/,
    },

    {
      name: "chromium",
      // UI Browsers (Wait for setup, inject state, strictly ignore API, visual, and noauth files)
      testIgnore: [
        "**/api-hybrid/**",
        "**/visual/**",
        "**/*.noauth.spec.js", // <-- AUTOMATIC ESCAPE HATCH
      ],
      use: {
        ...devices["Desktop Chrome"],
        storageState: ".auth/user.json",
      },
      dependencies: ["setup"],
    },

    // {
    //   name: "firefox",
    //   testIgnore: [
    //     "**/api-hybrid/**",
    //     "**/visual/**",
    //     "**/*.noauth.spec.js", // <-- AUTOMATIC ESCAPE HATCH
    //   ],
    //   use: {
    //     ...devices["Desktop Firefox"],
    //     storageState: ".auth/user.json",
    //   },
    //   dependencies: ["setup"],
    // },

    // Fresh-context project: no auth setup, no pre-loaded storageState.
    // Automatically routes any file ending in .noauth.spec.js here.
    {
      name: "chromium-noauth",
      testMatch: ["**/*.noauth.spec.js"], 
      use: {
        ...devices["Desktop Chrome"],
      },
    },

    // FOR FIREFOX NO-AUTH
    // {
    //   name: "firefox-noauth",
    //   testMatch: ["**/*.noauth.spec.js"], // <-- AUTOMATIC ROUTING
    //   use: {
    //     ...devices["Desktop Firefox"],
    //   },
    // },
  ],
});