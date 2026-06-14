// @ts-check
import { test, expect } from "../../src/fixtures/baseFixture.js";
import { API_MESSAGES } from "../../src/constants/message.js";
import { HTTP_STATUS } from "../../src/constants/apiStatus.js";

test.describe("TC-9: DELETE To Verify Login", () => {

  test("DELETE to /api/verifyLogin returns 405 and unsupported method message", async ({ api }) => {
    const response = await api.auth.deleteVerifyLogin();
    const responseBody = await response.json();

    await test.step("Verify response code is 405 and unsupported method message is returned", async () => {
      expect(responseBody.responseCode).toBe(HTTP_STATUS.METHOD_NOT_ALLOWED);
      expect(responseBody.message).toEqual(API_MESSAGES.UNSUPPORTED_METHOD);
    });
  });

});
