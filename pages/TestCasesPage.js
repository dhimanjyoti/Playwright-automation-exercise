import { BasePage } from "./BasePage";

export class TestCasesPage extends BasePage {
  constructor(page) {
    super(page);

    // Locators
    this.testCasesLink = page.locator("//a[contains(text(),'Test Cases')]");
    this.headerText = page.locator("h2.title.text-center b");
  }

  /**
   *  Clean navigation to Test Cases page
   */
  async navigateToTestCasesPage() {
    await this.testCasesLink.click();
    await this.page.waitForURL(/test_cases/i);
    return this;
  }

  async isTestCasesPageReady() {
    return this.headerText.isVisible();
  }
}
