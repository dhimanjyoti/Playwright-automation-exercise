// @ts-check
import { test, expect } from "../../src/fixtures/baseFixture.js";
import { API_MESSAGES } from "../../src/constants/message.js";
import { HTTP_STATUS } from "../../src/constants/apiStatus.js";

test.describe("TC-12: DELETE METHOD To Delete User Account", () => {

  test("Register a temporary user then delete it — returns 200 and 'Account deleted!' message", async ({ api, factory }) => {
    const payload = factory.generateApiRegistrationPayload();

    await test.step("Pre-condition: create the temporary account via POST /api/createAccount", async () => {
      const createResponse = await api.account.createAccount(payload);
      const createBody = await createResponse.json();
      expect(createBody.responseCode).toBe(HTTP_STATUS.CREATED);
    });

    const deleteResponse = await api.account.deleteAccount(payload.email, payload.password);
    const deleteBody = await deleteResponse.json();

    await test.step("Verify response code is 200 and account deleted message is returned", async () => {
      expect(deleteBody.responseCode).toBe(HTTP_STATUS.OK);
      expect(deleteBody.message).toEqual(API_MESSAGES.ACCOUNT_DELETED);
    });
  });

});
