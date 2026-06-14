// @ts-check
import { test, expect } from "../../src/fixtures/baseFixture.js";
import { API_MESSAGES } from "../../src/constants/message.js";
import { HTTP_STATUS } from "../../src/constants/apiStatus.js";

test.describe("TC-11: POST To Create/Register User Account", () => {

  test("Valid full registration payload returns 201 and 'User created!' message", async ({ api, factory }) => {
    const payload = factory.generateApiRegistrationPayload();

    const response = await api.account.createAccount(payload);
    const responseBody = await response.json();

    await test.step("Verify response code is 201 and user created message is returned", async () => {
      expect(responseBody.responseCode).toBe(HTTP_STATUS.CREATED);
      expect(responseBody.message).toEqual(API_MESSAGES.USER_CREATED);
    });
  });

});
