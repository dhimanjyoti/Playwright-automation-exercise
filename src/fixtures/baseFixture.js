// @ts-check
import { test as base, expect } from "@playwright/test";
import { POManager } from "../pages/POManager.js";
import { ApiManager } from "../api/ApiManager.js"; // <-- 1. Import ApiManager
import { userDataFactory } from "../utils/user-data-factory.js";
import { blockAds } from "../utils/networkInterceptor.js";
import { HTTP_STATUS } from "../constants/apiStatus.js";

import contactData from "../test-data/marketing/contactFormData.json";
import registrationData from "../test-data/auth/registrationData.json";
import paymentData from "../test-data/shopping/paymentData.json";

/**
 * @typedef {Object} DataFixture
 * @property {{ contact: typeof contactData }} marketing
 * @property {{ registration: typeof registrationData }} auth
 * @property {{ payment: typeof paymentData }} shopping
 */

/**
 * Define CustomFixtures so the compiler knows what we are injecting
 * @typedef {Object} CustomFixtures
 * @property {import('../pages/POManager.js').POManager} pom
 * @property {import('../api/ApiManager.js').ApiManager} api // <-- 2. Add API to Types
 * @property {DataFixture} data
 * @property {typeof userDataFactory} factory
 * @property {{ track(email: string, password: string): void, markDeleted(email: string): void }} accountCleanup
 */

/** * Extend the base Playwright test with our custom fixtures
 * @type {import('@playwright/test').TestType<import('@playwright/test').PlaywrightTestArgs & import('@playwright/test').PlaywrightTestOptions & CustomFixtures, import('@playwright/test').PlaywrightWorkerArgs & import('@playwright/test').PlaywrightWorkerOptions>}
 */
export const test = base.extend({
  pom: async ({ page }, use) => {
    await blockAds(page);

    const pomManager = new POManager(page);
    await use(pomManager);
  },

  // 3. Inject the API Manager using the built-in Playwright 'request' context
  api: async ({ request }, use) => {
    const apiManager = new ApiManager(request);
    await use(apiManager);
  },

  data: async ({}, use) => {
    await use({
      marketing: {
        contact: contactData,
      },
      auth: {
        registration: registrationData,
      },
      shopping: {
        payment: paymentData,
      },
    });
  },

  /**
   * Provides dynamic data tools (Faker, .env variables) directly to the test.
   */
  factory: async ({}, use) => {
    await use(userDataFactory);
  },

  accountCleanup: async ({ api }, use) => {
    /** @type {Map<string, string>} */
    const accounts = new Map();

    await use({
      track(email, password) {
        accounts.set(email, password);
      },
      markDeleted(email) {
        accounts.delete(email);
      },
    });

    for (const [email, password] of accounts) {
      const response = await api.account.deleteAccount(email, password);
      const body = /** @type {{ responseCode?: number }} */ (
        await response.json()
      );
      const responseCode = /** @type {200 | 404} */ (body.responseCode ?? 0);
      const cleanupSucceeded =
        response.status() === HTTP_STATUS.OK &&
        [HTTP_STATUS.OK, HTTP_STATUS.NOT_FOUND].includes(responseCode);

      if (!cleanupSucceeded) {
        throw new Error(`Failed to clean up API test account: ${email}`);
      }
    }
  },
});

export { expect };
