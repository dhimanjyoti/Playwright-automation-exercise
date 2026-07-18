// @ts-check
import { test, expect } from "../../../src/fixtures/baseFixture.js";
import { HTTP_STATUS } from "../../../src/constants/apiStatus.js";
import { assertApiResponseContract } from "../../../src/utils/apiAssertions.js";

test.describe("TC-14: GET User Account Detail By Email", () => {
  test("Fetch the profile of a temporary registered user", async ({
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

    const response = await api.account.getUserDetailByEmail(payload.email);
    const responseBody = await assertApiResponseContract(
      response,
      HTTP_STATUS.OK,
    );

    await test.step("Verify the returned profile", async () => {
      expect(responseBody.user).toBeDefined();
      expect(responseBody.user?.email).toEqual(payload.email);
      expect(responseBody.user?.name).toEqual(payload.name);
    });
  });
});
