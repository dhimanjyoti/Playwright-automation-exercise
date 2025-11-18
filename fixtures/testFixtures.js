// fixtures/testFixtures.js
import { test as base, expect } from "@playwright/test";
import * as dotenv from "dotenv";
import path from "path";
import { BasePage } from "../pages/BasePage";
import { SignUp } from "../pages/SignUp";
import { Login } from "../pages/Login.js";
import {
  signUpTestData,
  EXPECTED_MESSAGES,
} from "../test-data/signUpTestData.js";
import { invalidErrorText } from "../test-data/invalidSignUpLoginTestData.js";
import { contactFormData } from "../test-data/contactUsFormData.js";
import { ContactUs } from "../pages/ContactUs.js";
import { TestCasesPage } from "../pages/TestCasesPage.js";
import { ProductPage } from "../pages/ProductPage.js";
import searchProducts from "../test-data/searchProducts.json" assert { type: "json" };
import successMessageData from "../test-data/successMessageData.json" assert { type: "json" };
import { SearchProduct } from "../pages/SearchProduct.js";
import { SearchFlow } from "../flows/searchFlow.js";
import { HomePage } from "../pages/HomePage.js";
import { CartPage } from "../pages/CartPage.js";
import { ProductListingPage } from "../pages/ProductListingPage.js";

// Load environment variables from project root
dotenv.config({ path: path.resolve(process.cwd(), ".env"), override: true });

export const test = base.extend({
  basePage: async ({ page }, use) => {
    await use(new BasePage(page));
  },

  signUp: async ({ page }, use) => {
    await use(new SignUp(page));
  },

  login: async ({ page }, use) => {
    await use(new Login(page));
  },

  contactUsPage: async ({ page }, use) => {
    await use(new ContactUs(page));
  },

  testCasesPage: async ({ page }, use) => {
    await use(new TestCasesPage(page));
  },

  productsPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },

  searchProductPage: async ({ page }, use) => {
    await use(new SearchProduct(page));
  },

  searchFlow: async ({ searchProductPage }, use) => {
    await use(new SearchFlow({ searchProductPage }));
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  productListingPage: async ({ page }, use) => {
    await use(new ProductListingPage(page));
  },

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

      searchProducts,
      successMessageData,
    };

    await use(data);
  },

  expect: async ({}, use) => {
    await use(expect);
  },
});

export { expect };
