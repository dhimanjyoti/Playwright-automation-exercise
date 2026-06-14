// @ts-check
import { test, expect } from "../../src/fixtures/baseFixture.js";
import { API_MESSAGES } from "../../src/constants/message.js";
import { HTTP_STATUS } from "../../src/constants/apiStatus.js";

test.describe("TC-13: PUT METHOD To Update User Account", () => {

  test("Register a temporary user then update its profile — returns 200 and 'User updated!' message", async ({ api, factory }) => {
    const initialPayload = factory.generateApiRegistrationPayload();

    await test.step("Pre-condition: create the temporary account via POST /api/createAccount", async () => {
      const createResponse = await api.account.createAccount(initialPayload);
      const createBody = await createResponse.json();
      expect(createBody.responseCode).toBe(HTTP_STATUS.CREATED);
    });

    // Build update payload: fresh randomised profile fields but same email (identifier) and password
    const updatePayload = {
      ...factory.generateApiRegistrationPayload(),
      email: initialPayload.email,
      password: initialPayload.password,
    };

    const updateResponse = await api.account.updateAccount(updatePayload);
    const updateBody = await updateResponse.json();

    await test.step("Verify response code is 200 and user updated message is returned", async () => {
      expect(updateBody.responseCode).toBe(HTTP_STATUS.OK);
      expect(updateBody.message).toEqual(API_MESSAGES.USER_UPDATED);
    });
  });

});
