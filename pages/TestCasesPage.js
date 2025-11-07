import { BasePage } from "./BasePage";
import { expect } from "@playwright/test";

export class TestCasesPage extends BasePage {
  constructor(page) {
    super(page);

    this.locators = {
      ...this.locators,
      testCasesLink: page.locator("//a[contains(text(),'Test Cases')]"),
      headerText: page.locator("h2.title.text-center b"),
    };
  }

  async navigateToTestCasesPage() {
    await this.locators.testCasesLink.click();
    await this.page.waitForURL(/test_cases/i);
    await expect(this.locators.headerText).toBeVisible();
    return this;
  }
}
