// @ts-check
import { test, expect } from "../../../src/fixtures/baseFixture.js";
import { API_MESSAGES } from "../../../src/constants/message.js";
import { HTTP_STATUS } from "../../../src/constants/apiStatus.js";
import { assertApiResponseContract } from "../../../src/utils/apiAssertions.js";

test.describe("Products and Brands API Scenarios", () => {
  test("TC-1: GET all products", async ({ api }) => {
    const response = await api.product.getAllProducts();
    const responseBody = await assertApiResponseContract(
      response,
      HTTP_STATUS.OK,
    );

    expect(Array.isArray(responseBody.products)).toBe(true);
    expect(responseBody.products?.length).toBeGreaterThan(0);
  });

  test("TC-2: POST to products list is unsupported", async ({ api }) => {
    const response = await api.product.postToProductsList();
    const responseBody = await assertApiResponseContract(
      response,
      HTTP_STATUS.METHOD_NOT_ALLOWED,
    );

    expect(responseBody.message).toEqual(API_MESSAGES.UNSUPPORTED_METHOD);
  });

  test("TC-3: GET all brands", async ({ api }) => {
    const response = await api.product.getAllBrands();
    const responseBody = await assertApiResponseContract(
      response,
      HTTP_STATUS.OK,
    );

    expect(Array.isArray(responseBody.brands)).toBe(true);
    expect(responseBody.brands?.length).toBeGreaterThan(0);
  });

  test("TC-4: PUT to brands list is unsupported", async ({ api }) => {
    const response = await api.product.putToBrandsList();
    const responseBody = await assertApiResponseContract(
      response,
      HTTP_STATUS.METHOD_NOT_ALLOWED,
    );

    expect(responseBody.message).toEqual(API_MESSAGES.UNSUPPORTED_METHOD);
  });
});
