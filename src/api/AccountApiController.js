// @ts-check
import { BaseApiController } from "./BaseApiController.js";

/**
 * @typedef {Object} CreateAccountPayload
 * @property {string} name
 * @property {string} email
 * @property {string} password
 * @property {string} title
 * @property {number} birth_date
 * @property {number} birth_month
 * @property {number} birth_year
 * @property {string} firstname
 * @property {string} lastname
 * @property {string} company
 * @property {string} address1
 * @property {string} address2
 * @property {string} country
 * @property {string} zipcode
 * @property {string} state
 * @property {string} city
 * @property {string} mobile_number
 */

export class AccountApiController extends BaseApiController {
  /**
   * @param {import('@playwright/test').APIRequestContext} request
   */
  constructor(request) {
    super(request);
  }

  /**
   * Creates a new user account via POST /api/createAccount.
   * @param {CreateAccountPayload} payload - Full user registration payload.
   * @returns {Promise<import('@playwright/test').APIResponse>} The raw API response.
   */
  async createAccount(payload) {
    return await this.request.post(`/api/createAccount`, {
      form: payload,
      headers: this.defaultHeaders,
    });
  }

  /**
   * Deletes an existing user account via DELETE /api/deleteAccount.
   * @param {string} email - The registered email address of the account to delete.
   * @param {string} password - The password of the account to delete.
   * @returns {Promise<import('@playwright/test').APIResponse>} The raw API response.
   */
  async deleteAccount(email, password) {
    return await this.request.delete(`/api/deleteAccount`, {
      form: { email, password },
      headers: this.defaultHeaders,
    });
  }

  /**
   * Updates an existing user account via PUT /api/updateAccount.
   * The email field is the account identifier; all other fields are overwritten.
   * @param {CreateAccountPayload} payload - Full updated profile payload containing the registered email.
   * @returns {Promise<import('@playwright/test').APIResponse>} The raw API response.
   */
  async updateAccount(payload) {
    return await this.request.put(`/api/updateAccount`, {
      form: payload,
      headers: this.defaultHeaders,
    });
  }

  /**
   * Retrieves full user details via GET /api/getUserDetailByEmail.
   * @param {string} email - The email address used to look up the account.
   * @returns {Promise<import('@playwright/test').APIResponse>} The raw API response containing the user detail object.
   */
  async getUserDetailByEmail(email) {
    return await this.request.get(`/api/getUserDetailByEmail`, {
      params: { email },
      headers: this.defaultHeaders,
    });
  }
}
