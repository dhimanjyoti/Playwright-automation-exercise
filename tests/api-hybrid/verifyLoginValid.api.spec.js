// @ts-check
import { test, expect } from "../../src/fixtures/baseFixture.js";
import { API_MESSAGES } from "../../src/constants/message.js";
import { HTTP_STATUS } from "../../src/constants/apiStatus.js";

test.describe("TC-7: POST To Verify Login with Valid Details", () => {

  test("Valid credentials return 200 and 'User exists!' message", async ({ api }) => {
    const email = /** @type {string} */ (process.env.USER_EMAIL);
    const password = /** @type {string} */ (process.env.PASSWORD);

    const response = await api.auth.verifyLogin(email, password);
    const responseBody = await response.json();

    await test.step("Verify response code is 200 and user exists message is returned", async () => {
      expect(responseBody.responseCode).toBe(HTTP_STATUS.OK);
      expect(responseBody.message).toEqual(API_MESSAGES.USER_EXISTS);
    });
  });

});
