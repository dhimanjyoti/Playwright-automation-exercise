// @ts-check
import { BaseApiController } from "./BaseApiController.js";

export class ProductApiController extends BaseApiController {
  /**
   * @param {import('@playwright/test').APIRequestContext} request
   */
  constructor(request) {
    super(request);
  }

  /**
   * @returns {Promise<import('@playwright/test').APIResponse>}
   */
  async getAllProducts() {
    return await this.request.get("/api/productsList", {
      headers: this.defaultHeaders,
    });
  }

  /**
   * @returns {Promise<import('@playwright/test').APIResponse>}
   */
  async postToProductsList() {
    return await this.request.post("/api/productsList", {
      headers: this.defaultHeaders,
    });
  }

  /**
   * @returns {Promise<import('@playwright/test').APIResponse>}
   */
  async getAllBrands() {
    return await this.request.get("/api/brandsList", {
      headers: this.defaultHeaders,
    });
  }

  /**
   * @returns {Promise<import('@playwright/test').APIResponse>}
   */
  async putToBrandsList() {
    return await this.request.put("/api/brandsList", {
      headers: this.defaultHeaders,
    });
  }

  /**
   * @param {string} searchTerm
   * @returns {Promise<import('@playwright/test').APIResponse>}
   */
  async searchProduct(searchTerm) {
    return await this.request.post("/api/searchProduct", {
      form: { search_product: searchTerm },
      headers: this.defaultHeaders,
    });
  }

  /**
   * @returns {Promise<import('@playwright/test').APIResponse>}
   */
  async searchProductWithNoParam() {
    return await this.request.post("/api/searchProduct", {
      headers: this.defaultHeaders,
    });
  }
}
