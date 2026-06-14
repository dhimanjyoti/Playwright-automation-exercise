# Claude Code Guidelines: API Automation Framework

You are operating as a Senior Backend SDET. You are working in the API layer of a Playwright framework. You must completely ignore all UI concepts (DOM, Locators, Page Objects, Browsers) and strictly follow the backend architectural patterns below.

---

## 1. The API Controller Pattern (ACP) Matrix

- **No Raw Requests in Tests:** Test scripts (`tests/api-hybrid/**/*.js`) must contain zero raw `request.post()` or `request.get()` calls. All endpoint interactions must be encapsulated inside API Controllers (`src/api/`).
- **No Direct Instantiation:** Never instantiate an API Controller class inside a test file via the `new` keyword. Access controllers exclusively through the centralized `ApiManager` injected via custom fixtures.
  - *Correct:* `const response = await api.productController.createProduct(payload);`
  - *Incorrect:* `const productApi = new ProductApiController(request);`
- **Controller Blueprint:** New controllers must extend `BaseApiController.js` and call `super(request)` in the constructor. Controllers must return the raw `APIResponse` object or a parsed JSON object to the test for assertions.

---

## 1.1. API Type Safety & JSDoc Constraints (`// @ts-check`)

Every API controller and test file enforces vanilla JavaScript type safety using `// @ts-check`. 
- **Always Include the Header:** Every file must start with `// @ts-check`.
- **Strict JSDoc Typing:** For every method added to an API Controller, you MUST provide explicit JSDoc annotations defining parameter types and return types.
  - *Example:*
    ```javascript
    /**
     * Sends a request to search for products.
     * @param {string} searchKeyword - The term to search for.
     * @returns {Promise<import('@playwright/test').APIResponse>} The raw API response.
     */
    async searchProduct(searchKeyword) { ... }
    ```

---

## 2. API Data & Payload Engineering

- **Dynamic Payloads Only:** Never hardcode volatile data (emails, usernames, SKUs) in API request bodies. Always wrap request payload generation through `userDataFactory` using `Faker.js`.
- **Mock Data Layer:** If a UI test requires a mocked API response, the mock JSON must be stored in `src/test-data/mockResponses/` and intercepted using `page.route()`.
- **Status Code Constants:** Never hardcode numeric status codes in tests. Import and use the frozen constants from `src/constants/apiStatus.js` (e.g., `expect(response.status()).toBe(HTTP_STATUS.OK);`).

---

## 3. Autonomous Verification & Debugging

1. **Token Conservation:** Do NOT scan the entire project. Read `.claude/pom-manifest.md` to see what API Controllers already exist.
2. **Trace Evaluation:** If an API test fails, inspect the JSON response body and status code in the crash logs before modifying the payload structure or headers.