// @ts-check
import { test, expect } from "../../src/fixtures/baseFixture.js";
import { API_MESSAGES } from "../../src/constants/message.js";
import { HTTP_STATUS } from "../../src/constants/apiStatus.js";

test.describe("TC-8: POST To Verify Login without email parameter", () => {

  test("Missing email param returns 400 with descriptive bad request message", async ({ api }) => {
    const password = /** @type {string} */ (process.env.PASSWORD);

    const response = await api.auth.verifyLoginWithoutEmail(password);
    const responseBody = await response.json();

    await test.step("Verify response code is 400 and missing parameter message is returned", async () => {
      expect(responseBody.responseCode).toBe(HTTP_STATUS.BAD_REQUEST);
      expect(responseBody.message).toEqual(API_MESSAGES.MISSING_LOGIN_PARAMS);
    });
  });

});
