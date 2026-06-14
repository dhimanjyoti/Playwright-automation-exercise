// @ts-check
import { test, expect } from "../../src/fixtures/baseFixture.js";
import { API_MESSAGES } from "../../src/constants/message.js";
import { HTTP_STATUS } from "../../src/constants/apiStatus.js";

test.describe("TC-10: POST To Verify Login with Invalid Details", () => {

  test("Non-existent credentials return 404 and 'User not found!' message", async ({ api, factory }) => {
    const { emailAddress, password } = factory.generateRandomInvalidCombo();

    const response = await api.auth.verifyLogin(emailAddress, password);
    const responseBody = await response.json();

    await test.step("Verify response code is 404 and user not found message is returned", async () => {
      expect(responseBody.responseCode).toBe(HTTP_STATUS.NOT_FOUND);
      expect(responseBody.message).toEqual(API_MESSAGES.USER_NOT_FOUND);
    });
  });

});
