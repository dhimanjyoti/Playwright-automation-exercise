// @ts-check
import { test, expect } from "../../src/fixtures/baseFixture.js";
import { API_MESSAGES } from "../../src/constants/message.js";
import { HTTP_STATUS } from "../../src/constants/apiStatus.js";

test.describe("Products and Brands API Scenarios", () => {
  
  test("TC-1: GET All Products List", async ({ api }) => {
    const response = await api.product.getAllProducts();
    const responseBody = await response.json();

    await test.step("Verify response code is 200 and returns products list", async () => {
      expect(responseBody.responseCode).toBe(HTTP_STATUS.OK);
      expect(responseBody.products).toBeDefined();
      expect(responseBody.products.length).toBeGreaterThan(0);
    });
  });

  test("TC-2: POST to Products List returns 405", async ({ api }) => {
    const response = await api.product.postToProductsList();
    const responseBody = await response.json();

    await test.step("Verify response code is 405 and unsupported message is returned", async () => {
      expect(responseBody.responseCode).toBe(HTTP_STATUS.METHOD_NOT_ALLOWED);
      expect(responseBody.message).toEqual(API_MESSAGES.UNSUPPORTED_METHOD);
    });
  });

  test("TC-3: GET All Brands List", async ({ api }) => {
    const response = await api.product.getAllBrands();
    const responseBody = await response.json();

    await test.step("Verify response code is 200 and returns brands list", async () => {
      expect(responseBody.responseCode).toBe(HTTP_STATUS.OK);
      expect(responseBody.brands).toBeDefined();
      expect(responseBody.brands.length).toBeGreaterThan(0);
    });
  });

  test("TC-4: PUT to Brands List returns 405", async ({ api }) => {
    const response = await api.product.putToBrandsList();
    const responseBody = await response.json();

    await test.step("Verify response code is 405 and unsupported message is returned", async () => {
      expect(responseBody.responseCode).toBe(HTTP_STATUS.METHOD_NOT_ALLOWED);
      expect(responseBody.message).toEqual(API_MESSAGES.UNSUPPORTED_METHOD);
    });
  });
});