// fixtures/testFixtures.js
import { test as base, expect } from "@playwright/test";
import * as dotenv from "dotenv";
import path from "path";
import { BasePage } from "../pages/BasePage";
import { SignUp } from "../pages/SignUp";
import { signUpTestData, EXPECTED_MESSAGES } from "../utils/signUpTestData.js";

// Load environment variables from project root
dotenv.config({ path: path.resolve(process.cwd(), ".env"), override: true });

export const test = base.extend({
  basePage: async ({ page }, use) => {
    await use(new BasePage(page));
  },

  signUp: async ({ page }, use) => {
    await use(new SignUp(page));
  },

  data: async ({}, use) => {
    const { MALE_USER } = signUpTestData;

    const data = {
      username: MALE_USER.USERNAME,
      emailAddress: process.env.USEREMAIL ?? "dummy@example.com",
      //   password: process.env.PASSWORD ?? "Default@123",

      accountInfo: {
        ...MALE_USER.ACCOUNT_INFO,
        PASSWORD: process.env.PASSWORD ?? "Default@123",
      },

      addressInfo: MALE_USER.ADDRESS_INFO,

      expected: {
        accountCreated: EXPECTED_MESSAGES.ACCOUNT_CREATED,
        accountDeleted: EXPECTED_MESSAGES.ACCOUNT_DELETED,
      },
    };

    console.log("🔐 Loaded PASSWORD:", data.PASSWORD); // ✅ Debug once

    await use(data);
  },

  expect: async ({}, use) => {
    await use(expect);
  },
});

export { expect };
