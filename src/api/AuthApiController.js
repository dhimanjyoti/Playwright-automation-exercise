// @ts-check
import { BaseApiController } from "./BaseApiController.js";

export class AuthApiController extends BaseApiController {
  /**
   * @param {import('@playwright/test').APIRequestContext} request
   */
  constructor(request) {
    super(request);
  }

  /**
   * Verifies login credentials via the POST /api/verifyLogin endpoint.
   * @param {string} email - The registered user's email address.
   * @param {string} password - The registered user's password.
   * @returns {Promise<import('@playwright/test').APIResponse>} The raw API response.
   */
  async verifyLogin(email, password) {
    return await this.request.post(`/api/verifyLogin`, {
      form: { email, password }
    });
  }

  /**
   * Posts to /api/verifyLogin with only password — omits the email parameter to trigger a 400 response.
   * @param {string} password - The user's password.
   * @returns {Promise<import('@playwright/test').APIResponse>} The raw API response.
   */
  async verifyLoginWithoutEmail(password) {
    return await this.request.post(`/api/verifyLogin`, {
      form: { password }
    });
  }

  /**
   * Sends a DELETE request to /api/verifyLogin to verify the endpoint rejects unsupported HTTP methods.
   * @returns {Promise<import('@playwright/test').APIResponse>} The raw API response.
   */
  async deleteVerifyLogin() {
    return await this.request.delete(`/api/verifyLogin`);
  }
}
