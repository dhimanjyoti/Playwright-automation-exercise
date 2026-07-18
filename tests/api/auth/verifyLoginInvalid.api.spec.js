// @ts-check
import { test, expect } from "../../../src/fixtures/baseFixture.js";
import { API_MESSAGES } from "../../../src/constants/message.js";
import { HTTP_STATUS } from "../../../src/constants/apiStatus.js";
import { assertApiResponseContract } from "../../../src/utils/apiAssertions.js";

test.describe("TC-8: POST To Verify Login Without Email", () => {
  test("Missing email returns a bad-request body", async ({ api }) => {
    const password = process.env.PASSWORD ?? "missing-email-test-password";
    const response = await api.auth.verifyLoginWithoutEmail(password);
    const responseBody = await assertApiResponseContract(
      response,
      HTTP_STATUS.BAD_REQUEST,
    );

    expect(responseBody.message).toEqual(API_MESSAGES.MISSING_LOGIN_PARAMS);
  });
});
