import { expect } from "@playwright/test";
const LOAD_STATE = "domcontentloaded"; // standardize page load waits
export class BasePage {
  constructor(page) {
    this.page = page;
    this.locators = {
      // Navigation
      authLink: page.locator("//a[normalize-space()='Signup / Login']"),
      appLogo: page.locator(".logo.pull-left"),
      loggedInUser: page.locator("//a[contains(.,'Logged in as')]/b"),
      homePageBanner: page.locator(
        "//div[@class='item active']//h2[normalize-space()='Full-Fledged practice website for Automation Engineers']"
      ),
    };
  }

  /**
   * Navigate to the application base URL
   */
  async navigateToAutomationExercise() {
    const baseUrl = process.env.BASE_URL || "https://automationexercise.com";
    await this.page.goto(baseUrl, { waitUntil: "domcontentloaded" });
  }

  async openAuthPage() {
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: LOAD_STATE }),
      this.locators.authLink.click(),
    ]);
  }

  async verifyHomePage() {
    await expect(
      this.locators.homePageBanner,
      "Home Page did not load"
    ).toBeVisible();
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

  async verifyUserName() {
    await expect(
      this.locators.loggedInUser,
      "User is not logged in"
    ).toBeVisible();

    const text = await this.locators.loggedInUser.textContent();
    return text.trim();
  }
}
