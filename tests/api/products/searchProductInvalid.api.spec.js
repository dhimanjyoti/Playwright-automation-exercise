// @ts-check
import { test, expect } from "../../../src/fixtures/baseFixture.js";
import { API_MESSAGES } from "../../../src/constants/message.js";
import { HTTP_STATUS } from "../../../src/constants/apiStatus.js";
import { assertApiResponseContract } from "../../../src/utils/apiAssertions.js";

test.describe("TC-6: POST To Search Product Without Parameter", () => {
  test("Missing search parameter returns a bad-request body", async ({ api }) => {
    const response = await api.product.searchProductWithNoParam();
    const responseBody = await assertApiResponseContract(
      response,
      HTTP_STATUS.BAD_REQUEST,
    );

    expect(responseBody.message).toEqual(API_MESSAGES.MISSING_SEARCH_PRODUCT);
  });
});
