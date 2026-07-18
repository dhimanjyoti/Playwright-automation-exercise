// @ts-check
import { test, expect } from "../../../src/fixtures/baseFixture.js";
import { API_MESSAGES } from "../../../src/constants/message.js";
import { HTTP_STATUS } from "../../../src/constants/apiStatus.js";
import { assertApiResponseContract } from "../../../src/utils/apiAssertions.js";

test.describe("TC-9: DELETE To Verify Login", () => {
  test("DELETE is reported as unsupported", async ({ api }) => {
    const response = await api.auth.deleteVerifyLogin();
    const responseBody = await assertApiResponseContract(
      response,
      HTTP_STATUS.METHOD_NOT_ALLOWED,
    );

    expect(responseBody.message).toEqual(API_MESSAGES.UNSUPPORTED_METHOD);
  });
});
