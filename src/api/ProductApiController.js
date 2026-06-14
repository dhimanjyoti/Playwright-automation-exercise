// @ts-check
import { BaseApiController } from "./BaseApiController.js";

export class ProductApiController extends BaseApiController {
  /**
   * @param {import('@playwright/test').APIRequestContext} request
   */
  constructor(request) {
    super(request); // This passes the request context up to the Base class
  }

  async getAllProducts() {
    return await this.request.get(`/api/productsList`, { 
      headers: this.defaultHeaders 
    });
  }

  async postToProductsList() {
    return await this.request.post(`/api/productsList`, { 
      headers: this.defaultHeaders 
    });
  }

  async getAllBrands() {
    return await this.request.get(`/api/brandsList`, { 
      headers: this.defaultHeaders 
    });
  }

  async putToBrandsList() {
    return await this.request.put(`/api/brandsList`, {
      headers: this.defaultHeaders
    });
  }

  /**
   * 
   * @param {String} searchTerm 
   * @returns 
   */

  async searchProduct(searchTerm) {
    return await this.request.post(`/api/searchProduct`, {
      form: { search_product: searchTerm }
    });
  }

  async searchProductWithNoParam() {
    return await this.request.post(`/api/searchProduct`);
  }
}