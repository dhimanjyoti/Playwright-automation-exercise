# Codex Guidelines: Playwright Automation Framework

You are operating as an elite Senior SDET within a decoupled, enterprise-grade Playwright framework. Your contributions must strictly honor the architectural boundaries, dependency injection patterns, and hybrid module syntax established in this codebase.

---

## 1. Core Commands

Always verify your work or execute instructions using these exact project-scoped scripts:

- **Run All Tests:** `npm run test:all`
- **Run UI Tests:** `npm run test:ui`
- **Run API Tests:** `npm run test:api`
- **Execute specific file:** `npx playwright test tests/<folder>/<filename>.spec.js`

---

## 2. Module System Constraints (Hybrid Setup)

This framework uses a hybrid module system. You must strictly mirror the syntax depending on the file type you are editing or creating:

- **Source & Test Files (`src/pages/`, `tests/`):** Use **ES Modules (ESM)**. Use `import { ... } from "..."` and `export class ...`.
  - *Example:* `import { BasePage } from "../BasePage.js";`
  - *Example:* `export class LoginPage extends BasePage { ... }`
- **Configuration Files (Root level, `src/config/`):** Use **CommonJS**. Use `require()` and `module.exports =`.
  - *Example:* `const { defineConfig } = require("@playwright/test");`
  - *Example:* `module.exports = defineConfig({ ... });`

---

## 2.1. Type Safety & JSDoc Constraints (`// @ts-check`)

Every source file (`src/**/*.js`) and test file (`tests/**/*.js`) enforces vanilla JavaScript type safety using `// @ts-check`. You must strictly maintain this system:
- **Always Include the Header:** Every single file you create or update must start with `// @ts-check` on line 1.
- **Strict JSDoc Typing:** For every method added to a Page Object or test file, you MUST provide explicit JSDoc annotations defining parameter types and return types.
  - *Example (Page Object Locator Getter):*
    ```javascript
    /**
     * @returns {import('@playwright/test').Locator} The login button element.
     */
    get loginButton() { return this.page.locator('#submit'); }
    ```
- **External Framework Imports:** Use inline `import(...)` syntax inside your JSDoc types to reference native Playwright objects (`Locator`, `Page`) to prevent polluting file-level imports.

---

## 3. The Page Object Model (POM) Matrix

- **No Raw Locators in Tests:** Test scripts (`tests/**/*.js`) must contain zero raw element selections (`page.locator`, `page.getBy*`). All UI interactions and element definitions must live inside Page Objects (`src/pages/`).
- **No Direct Instantiation:** Never instantiate a Page Object class inside a test file via the `new` keyword. You must exclusively access pages through the centralized `POManager` via custom fixtures.
  - *Correct:* `await pom.loginPage.submitLoginDetails(email, password);`
  - *Incorrect:* `const loginPage = new LoginPage(page);`
- **Page Object Blueprint:** New page objects must extend `BasePage.js` and call `super(page)` in the constructor.

---

## 4. Execution, Data, & Auth Engineering

- **Authentication & State Management:** By default, UI tests run under the `chromium` project and inherit a global authenticated `storageState`. If a test case explicitly requires an unauthenticated, logged-out, or guest session (e.g., registration, explicit login page validation, or guest cart modifications), you MUST name the file with a `.noauth.spec.js` suffix. This automatically routes the file to a clean project environment and bypasses the global auth setup routine. Do NOT manually modify the `playwright.config.js` file arrays.
- **Timeout Management:** NEVER hardcode static timeouts at the file level (e.g., `test.describe.configure({ timeout: 90000 });`). Tests must rely on the global dynamic environment configurations. If a specific massive E2E flow requires extended time, inject `testInfo` and use the dynamic multiplier pattern inside the test block (`test.setTimeout(testInfo.timeout * 3);`).
- **Dynamic Payloads:** Never hardcode test emails, names, or volatile inputs. Always wrap payload generation through the `userDataFactory` utilizing `Faker.js` to ensure isolation during parallel runs.
- **Frozen Constants Only:** Do not pass hardcoded strings to test assertions. All expected UI messages, alerts, and state strings must be imported from the frozen constants module at `src/constants/message.js`.

---

## 5. Autonomous Verification & Context Management

1. **Architecture Routing:** If the user requests an API Test, API Mocking, or backend validation, you MUST immediately read `.codex/API_STANDARDS.md` and strictly follow the backend guidelines before writing any code.
2. **Token Conservation (Manifest Routing):** NEVER execute global workspace scans or read the entire `src/pages/` directory to find context. You must read `.codex/pom-manifest.md` first to see what methods and classes exist. Only open a specific `.js` file if you explicitly need to modify its locators or logic.
3. **DOM Scans First:** Before writing or debugging an orchestration block, invoke the Playwright MCP server to map out user-facing locators (`getByRole`, `getByText`, `getByLabel`). Avoid brittle CSS paths and completely forbid XPath.
4. **Autonomous Triage:** After generating or updating any test file, execute that specific test file locally using the exact `npx playwright test` command.
5. **Trace Evaluation:** If the test execution fails, do not ask the engineer for guidance. Inspect the terminal crash logs, re-verify the DOM state using the MCP server, adjust your selectors or timing handling, and re-run until you achieve a stable green build.

---

## 6. Black-Box Testing & DOM Integrity

- **No DOM Event Hijacking:** You must treat the frontend as a strict black box and interact with the application exactly as a real user experiences it. NEVER inject JavaScript via `page.evaluate()` to alter the application's internal business logic, hijack native form submissions, or tamper with the DOM event loop (e.g., explicitly injecting `e.preventDefault()`).
- **Native API Preference:** Always use Playwright's native browser APIs to handle events. For example, use `page.once('dialog', handler)` to gracefully intercept native window alerts or confirmations rather than freezing the DOM.
- **CSS Animation Handling:** Do not use hard waits (`page.waitForTimeout()`) to bypass CSS animations. Utilize `scrollIntoViewIfNeeded()`, Playwright's auto-retrying locators, or natively cast forced clicks (`.click({ force: true })`) to handle mid-animation interaction states cleanly without modifying the application code.

---

## 7. Production-Grade Assertion & Orchestration Engineering

- **Absolute Ban on Hard Sleeps:** The use of `page.waitForTimeout()` is strictly prohibited across all Page Objects, test specs, and configuration routines. All waiting strategies must be purely event-driven, leveraging auto-retrying web-first assertions, explicit network listener hooks (`page.waitForResponse()`), or target state bindings (`locator.waitFor({ state: 'attached' })`).
- **No Conditional Testing Logic:** Test scripts must be completely deterministic. Never implement dynamic conditional statements (`if/else`, ternary pathways, or `try/catch` UI fallbacks) inside a test block to handle varying runtime element visibility or optional site layouts. If a user flow branches based on data or authentication states, separate those distinct paths into isolated, dedicated test spec files.
- **Strategic Soft Assertions:** Differentiate between critical execution paths and cosmetic checks. Use standard hard `expect()` actions for business-critical gates (e.g., verifying a user successfully reached the checkout overview or authenticated cleanly). Use `expect.soft()` exclusively for non-blocking UI validations (e.g., verifying footer text variations, copyright dates, or non-disruptive alerts) to gather maximum layout failure context without prematurely stopping execution.
- **Aggressive State Teardowns:** Prevent backend data accumulation from polluting downstream parallel runs. If a test case performs configuration actions or mutates stateful data, orchestrate a dedicated teardown cleanup routine inside a `test.afterEach` or `test.afterAll` block. Whenever possible, bypass the UI and leverage backend API controllers to delete or revert test data objects directly.
