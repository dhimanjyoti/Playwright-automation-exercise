// @ts-check
import { test, expect } from "../../../src/fixtures/baseFixture.js";
import { API_MESSAGES } from "../../../src/constants/message.js";
import { HTTP_STATUS } from "../../../src/constants/apiStatus.js";
import { assertApiResponseContract } from "../../../src/utils/apiAssertions.js";

test.describe("TC-10: POST To Verify Login With Invalid Details", () => {
  test("Unknown credentials return a not-found body", async ({ api, factory }) => {
    const { emailAddress, password } = factory.generateRandomInvalidCombo();
    const response = await api.auth.verifyLogin(emailAddress, password);
    const responseBody = await assertApiResponseContract(
      response,
      HTTP_STATUS.NOT_FOUND,
    );

    expect(responseBody.message).toEqual(API_MESSAGES.USER_NOT_FOUND);
  });
});
