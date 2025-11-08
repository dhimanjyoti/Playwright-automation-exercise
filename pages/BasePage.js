import { expect } from "@playwright/test";

export class BasePage {
  constructor(page) {
    this.page = page;
    // Navigation
    this.authLink = page.locator("//a[normalize-space()='Signup / Login']");
    this.loggedInUser = page.locator("//a[contains(.,'Logged in as')]/b");

    // Branding
    this.appLogo = page.locator(".logo.pull-left");

    // Home Page Banner
    this.homePageBanner = page.locator(
      "//div[@class='item active']//h2[normalize-space()='Full-Fledged practice website for Automation Engineers']"
    );
  }

  /**
   * Navigate to the application base URL
   */
  async navigateToAutomationExercise() {
    const baseUrl = process.env.BASE_URL || "https://automationexercise.com";
    await this.page.goto(baseUrl, { waitUntil: "domcontentloaded" });
  }

  async openAuthPage() {
    await this.authLink.click();
    await this.page.waitForURL(/login|signup|signup_login/i);
    return this;
  }

  async isHomePageLoaded() {
    return this.homePageBanner.isVisible();
  }

  /**
   * Verify that the app logo is visible (basic sanity check)
   */
  async isAppLogoVisible() {
    await this.appLogo.waitFor({ state: "visible" });
    return this.appLogo.isVisible();
  }

  /**
   * Retrieve the current page title
   */
  async getPageTitle() {
    return this.page.title();
  }

  async getLoggedInUsername() {
    await expect(this.loggedInUser).toBeVisible();
    const text = await this.loggedInUser.textContent();
    return text?.trim();
  }
}
