// @ts-check
import { test, expect } from "../../src/fixtures/baseFixture.js";
import { API_MESSAGES } from "../../src/constants/message.js";
import { HTTP_STATUS } from "../../src/constants/apiStatus.js";

test.describe("TC-6: POST To Search Product Without search_product Parameter", () => {

  test("Missing search_product param returns 400 with descriptive error message", async ({ api }) => {
    const response = await api.product.searchProductWithNoParam();
    const responseBody = await response.json();

    await test.step("Verify response code is 400 and error message is returned", async () => {
      expect(responseBody.responseCode).toBe(HTTP_STATUS.BAD_REQUEST);
      expect(responseBody.message).toEqual(API_MESSAGES.MISSING_SEARCH_PRODUCT);
    });
  });

});
