// fixtures/testFixtures.js

import { test as base, expect } from "@playwright/test";
import * as dotenv from "dotenv";
import path from "path";

// Utility to block ad networks before page loads
import { blockAds } from "../utils/networkBlocker.js";

// Page Objects
import { BasePage } from "../pages/BasePage";
import { SignUp } from "../pages/SignUp";
import { Login } from "../pages/Login.js";
import { ContactUs } from "../pages/ContactUs.js";
import { TestCasesPage } from "../pages/TestCasesPage.js";

// Test Data
import {
  signUpTestData,
  EXPECTED_MESSAGES,
} from "../test-data/signUpTestData.js";

import { invalidErrorText } from "../test-data/invalidSignUpLoginTestData.js";
import { contactFormData } from "../test-data/contactUsFormData.js";

// Utilities
import { loginDataFactory } from "../utils/dataFactory.js";

/**
 * Load environment variables only when running locally.
 * In CI (GitHub Actions) environment variables are provided via secrets.
 */
if (!process.env.CI) {
  dotenv.config({ path: path.resolve(process.cwd(), ".env") });
}

/**
 * Extend Playwright test with custom fixtures
 */
export const test = base.extend({
  /**
   * Override Playwright page fixture
   * Purpose: Block ads before page loads to avoid UI interference
   */
  page: async ({ page }, use) => {
    await blockAds(page);
    await use(page);
  },

  /**
   * Base Page Object
   */
  basePage: async ({ page }, use) => {
    await use(new BasePage(page));
  },

  /**
   * SignUp Page Object
   */
  signUp: async ({ page }, use) => {
    await use(new SignUp(page));
  },

  /**
   * Login Page Object
   */
  login: async ({ page }, use) => {
    await use(new Login(page));
  },

  /**
   * Contact Us Page Object
   */
  contactUsPage: async ({ page }, use) => {
    await use(new ContactUs(page));
  },

  /**
   * Test Cases Page Object
   */
  testCasesPage: async ({ page }, use) => {
    await use(new TestCasesPage(page));
  },

  /**
   * Static test data fixture
   */
  data: async ({}, use) => {
    const { MALE_USER } = signUpTestData;

    const data = {
      username: MALE_USER.USERNAME,

      emailAddress: process.env.USEREMAIL ?? "dummy@example.com",

      password: process.env.PASSWORD ?? "Default@123",

      accountInfo: {
        ...MALE_USER.ACCOUNT_INFO,
        PASSWORD: process.env.PASSWORD ?? "Default@123",
      },

      addressInfo: MALE_USER.ADDRESS_INFO,

      expected: {
        accountCreated: EXPECTED_MESSAGES.ACCOUNT_CREATED,
        accountDeleted: EXPECTED_MESSAGES.ACCOUNT_DELETED,
      },

      errorText: {
        invalidSignUpText: invalidErrorText.INVALID_SIGNUP_TEXT,
        invalidLoginText: invalidErrorText.INVALID_LOGIN_TEXT,
      },

      contactFormData: {
        subject: contactFormData.subject,
        message: contactFormData.letter,
        filePath: contactFormData.validFile,
      },
    };

    await use(data);
  },

  /**
   * Random user generator
   * Used for tests requiring unique email/username
   */
  randomUser: async ({}, use) => {
    const user = loginDataFactory.generateRandomUser();

    await use({
      username: user.username,
      emailAddress: user.emailAddress,
      password: process.env.PASSWORD ?? "Default@123",
    });
  },

  /**
   * Custom expect fixture
   * Keeps expect accessible inside tests
   */
  expect: async ({}, use) => {
    await use(expect);
  },
});

/**
 * Export expect for test files
 */
export { expect };
