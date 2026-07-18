// @ts-check
import { test, expect } from "../../../src/fixtures/baseFixture.js";
import { API_MESSAGES } from "../../../src/constants/message.js";
import { HTTP_STATUS } from "../../../src/constants/apiStatus.js";
import { assertApiResponseContract } from "../../../src/utils/apiAssertions.js";

test.describe("TC-7: POST To Verify Login With Valid Details", () => {
  test("Valid credentials are accepted", async ({ api, factory }) => {
    const credentials = factory.getValidLoginCredentials();
    const response = await api.auth.verifyLogin(
      credentials.emailAddress,
      credentials.password,
    );
    const responseBody = await assertApiResponseContract(
      response,
      HTTP_STATUS.OK,
    );

    expect(responseBody.message).toEqual(API_MESSAGES.USER_EXISTS);
  });
});
