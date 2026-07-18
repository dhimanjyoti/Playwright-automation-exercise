// @ts-check
const { defineConfig, devices } = require("@playwright/test");
const baseConfig = require("./playwright.config.js");

module.exports = defineConfig(baseConfig, {
  testDir: "./tests/visual",
  workers: 1,
  projects: [
    {
      name: "chromium",
      testMatch: /.*\.visual\.spec\.js/,
      testIgnore: [],
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
});
