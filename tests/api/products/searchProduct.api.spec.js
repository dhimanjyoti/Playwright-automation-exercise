// @ts-check
import { test, expect } from "../../../src/fixtures/baseFixture.js";
import { HTTP_STATUS } from "../../../src/constants/apiStatus.js";
import { assertApiResponseContract } from "../../../src/utils/apiAssertions.js";

const searchTerms = Object.freeze(["top", "tshirt", "jean"]);

test.describe("TC-5: POST To Search Product", () => {
  for (const searchTerm of searchTerms) {
    test(`Search for '${searchTerm}' returns products`, async ({ api }) => {
      const response = await api.product.searchProduct(searchTerm);
      const responseBody = await assertApiResponseContract(
        response,
        HTTP_STATUS.OK,
      );

      expect(Array.isArray(responseBody.products)).toBe(true);
      expect(responseBody.products?.length).toBeGreaterThan(0);
    });
  }
});
