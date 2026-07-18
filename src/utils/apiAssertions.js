// @ts-check
import { expect } from "@playwright/test";
import { API_CONTENT_TYPES, HTTP_STATUS } from "../constants/apiStatus.js";

/**
 * @typedef {Object} ApiResponseBody
 * @property {number} responseCode
 * @property {string} [message]
 * @property {Array<Record<string, unknown>>} [products]
 * @property {Array<Record<string, unknown>>} [brands]
 * @property {{ email?: string, name?: string, [key: string]: unknown }} [user]
 */

/**
 * Validates the service's transport contract and returns its parsed JSON body.
 * The API uses HTTP 200 and places business result codes inside `responseCode`.
 * @param {import('@playwright/test').APIResponse} response
 * @param {number} expectedResponseCode
 * @returns {Promise<ApiResponseBody>}
 */
export async function assertApiResponseContract(response, expectedResponseCode) {
  expect(response.status()).toBe(HTTP_STATUS.OK);
  expect(response.headers()["content-type"]).toContain(
    API_CONTENT_TYPES.LEGACY_JSON,
  );

  const body = /** @type {ApiResponseBody} */ (await response.json());
  expect(typeof body.responseCode).toBe("number");
  expect(body.responseCode).toBe(expectedResponseCode);
  return body;
}
