// @ts-check
import { test, expect } from "../../../src/fixtures/baseFixture.js";
import { API_MESSAGES } from "../../../src/constants/message.js";
import { HTTP_STATUS } from "../../../src/constants/apiStatus.js";
import { assertApiResponseContract } from "../../../src/utils/apiAssertions.js";

test.describe("TC-12: DELETE METHOD To Delete User Account", () => {
  test("Register and delete a temporary user", async ({
    api,
    factory,
    accountCleanup,
  }) => {
    const payload = factory.generateApiRegistrationPayload();
    accountCleanup.track(payload.email, payload.password);

    await test.step("Create the temporary account", async () => {
      const response = await api.account.createAccount(payload);
      await assertApiResponseContract(response, HTTP_STATUS.CREATED);
    });

    const response = await api.account.deleteAccount(
      payload.email,
      payload.password,
    );
    const responseBody = await assertApiResponseContract(
      response,
      HTTP_STATUS.OK,
    );

    await test.step("Verify the account-deleted message", async () => {
      expect(responseBody.message).toEqual(API_MESSAGES.ACCOUNT_DELETED);
      accountCleanup.markDeleted(payload.email);
    });
  });
});
