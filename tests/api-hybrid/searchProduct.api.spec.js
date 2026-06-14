// @ts-check
import { test, expect } from "../../src/fixtures/baseFixture.js";
import { HTTP_STATUS } from "../../src/constants/apiStatus.js";

test.describe("TC-5: POST To Search Product", () => {

  test("Search by keyword 'top' returns matched products list", async ({ api }) => {
    const response = await api.product.searchProduct("top");
    const responseBody = await response.json();

    await test.step("Verify response code is 200 and searched products are returned", async () => {
      expect(responseBody.responseCode).toBe(HTTP_STATUS.OK);
      expect(responseBody.products).toBeDefined();
      expect(responseBody.products.length).toBeGreaterThan(0);
    });
  });

  test("Search by keyword 'tshirt' returns matched products list", async ({ api }) => {
    const response = await api.product.searchProduct("tshirt");
    const responseBody = await response.json();

    await test.step("Verify response code is 200 and searched products are returned", async () => {
      expect(responseBody.responseCode).toBe(HTTP_STATUS.OK);
      expect(responseBody.products).toBeDefined();
      expect(responseBody.products.length).toBeGreaterThan(0);
    });
  });

  test("Search by keyword 'jean' returns matched products list", async ({ api }) => {
    const response = await api.product.searchProduct("jean");
    const responseBody = await response.json();

    await test.step("Verify response code is 200 and searched products are returned", async () => {
      expect(responseBody.responseCode).toBe(HTTP_STATUS.OK);
      expect(responseBody.products).toBeDefined();
      expect(responseBody.products.length).toBeGreaterThan(0);
    });
  });

});
