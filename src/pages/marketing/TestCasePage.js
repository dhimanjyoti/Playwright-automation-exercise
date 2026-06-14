// @ts-check
import { BasePage } from "../BasePage.js";

export class TestCasesPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    this.testCasesLink = page.locator("a", { hasText: "Test Cases" });
    this.headerText = page.locator("h2.title.text-center b");
  }

  /**
   * Clicks the Test Cases nav link, waits for the URL to match /test_cases,
   * then waits for the page heading to be visible.
   * @returns {Promise<this>}
   */
  async navigateToTestCasesPage() {
    await this.testCasesLink.click();
    await this.page.waitForURL(/test_cases/i);
    await this.headerText.waitFor({ state: "visible", timeout: 5000 });
    return this;
  }

  /**
   * Returns the locator itself via a getter.
   * @returns {import('@playwright/test').Locator}
   */
  get testCasesHeaderLocator() {
    return this.headerText;
  }
}
