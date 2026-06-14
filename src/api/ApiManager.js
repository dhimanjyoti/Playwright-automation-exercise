// @ts-check
import { ProductApiController } from "./ProductApiController.js";
import { AuthApiController } from "./AuthApiController.js";
import { AccountApiController } from "./AccountApiController.js";

export class ApiManager {
  /**
   * @param {import('@playwright/test').APIRequestContext} request
   */
  constructor(request) {
    this.request = request;
    this.product = new ProductApiController(this.request);
    this.auth = new AuthApiController(this.request);
    this.account = new AccountApiController(this.request);
  }
}