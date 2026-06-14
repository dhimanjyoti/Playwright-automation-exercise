// @ts-check
import { test, expect } from "../../src/fixtures/baseFixture.js";
import { HTTP_STATUS } from "../../src/constants/apiStatus.js";

test.describe("TC-14: GET User Account Detail By Email", () => {

  test("Fetch registered user detail by email — returns 200 and a populated user object", async ({ api, factory }) => {
    const payload = factory.generateApiRegistrationPayload();

    await test.step("Pre-condition: create the temporary account via POST /api/createAccount", async () => {
      const createResponse = await api.account.createAccount(payload);
      const createBody = await createResponse.json();
      expect(createBody.responseCode).toBe(HTTP_STATUS.CREATED);
    });

    const getResponse = await api.account.getUserDetailByEmail(payload.email);
    const getBody = await getResponse.json();

    await test.step("Verify response code is 200 and user detail block is returned", async () => {
      expect(getBody.responseCode).toBe(HTTP_STATUS.OK);
      expect(getBody.user).toBeDefined();
    });

    await test.step("Verify the returned user detail matches the registered profile", async () => {
      expect(getBody.user.email).toEqual(payload.email);
      expect(getBody.user.name).toEqual(payload.name);
    });
  });

});
