// @ts-check
import { test, expect } from "../../../src/fixtures/baseFixture.js";
import { API_MESSAGES } from "../../../src/constants/message.js";
import { HTTP_STATUS } from "../../../src/constants/apiStatus.js";
import { assertApiResponseContract } from "../../../src/utils/apiAssertions.js";

test.describe("TC-11: POST To Create/Register User Account", () => {
  test("Valid registration payload creates a user", async ({
    api,
    factory,
    accountCleanup,
  }) => {
    const payload = factory.generateApiRegistrationPayload();
    accountCleanup.track(payload.email, payload.password);

    const response = await api.account.createAccount(payload);
    const responseBody = await assertApiResponseContract(
      response,
      HTTP_STATUS.CREATED,
    );

    await test.step("Verify the user-created message", async () => {
      expect(responseBody.message).toEqual(API_MESSAGES.USER_CREATED);
    });
  });
});
