// @ts-check
import { test, expect } from "../../../src/fixtures/baseFixture.js";
import { API_MESSAGES } from "../../../src/constants/message.js";
import { HTTP_STATUS } from "../../../src/constants/apiStatus.js";
import { assertApiResponseContract } from "../../../src/utils/apiAssertions.js";

test.describe("TC-13: PUT METHOD To Update User Account", () => {
  test("Register and update a temporary user", async ({
    api,
    factory,
    accountCleanup,
  }) => {
    const initialPayload = factory.generateApiRegistrationPayload();
    accountCleanup.track(initialPayload.email, initialPayload.password);

    await test.step("Create the temporary account", async () => {
      const response = await api.account.createAccount(initialPayload);
      await assertApiResponseContract(response, HTTP_STATUS.CREATED);
    });

    const updatePayload = {
      ...factory.generateApiRegistrationPayload(),
      email: initialPayload.email,
      password: initialPayload.password,
    };

    const response = await api.account.updateAccount(updatePayload);
    const responseBody = await assertApiResponseContract(
      response,
      HTTP_STATUS.OK,
    );

    await test.step("Verify the user-updated message", async () => {
      expect(responseBody.message).toEqual(API_MESSAGES.USER_UPDATED);
    });
  });
});
