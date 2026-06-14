// @ts-check
export class BaseApiController {
  /**
   * @param {import('@playwright/test').APIRequestContext} request
   */
  constructor(request) {
    this.request = request;
    
    // Accept header only — Content-Type is set automatically by Playwright
    // based on the request body type (form vs JSON), so it must not be overridden here.
    this.defaultHeaders = {
      "Accept": "application/json",
    };
  }
}