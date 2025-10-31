// pages/BasePage.js
export class BasePage {
  constructor(page) {
    this.page = page;
    this.locators = {
      appLogo: page.locator(".logo.pull-left"),
    };
  }

  /**
   * Navigate to the application base URL
   */
  async navigateToAutomationExercise() {
    const baseUrl = process.env.BASE_URL || "https://automationexercise.com";
    await this.page.goto(baseUrl, { waitUntil: "domcontentloaded" });
  }

  /**
   * Verify that the app logo is visible (basic sanity check)
   */
  async verifyAppLogoVisible() {
    await this.locators.appLogo.waitFor({ state: "visible" });
    return await this.locators.appLogo.isVisible();
  }

  /**
   * Retrieve the current page title
   */
  async getPageTitle() {
    return this.page.title();
  }
}
