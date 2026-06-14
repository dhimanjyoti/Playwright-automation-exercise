// @ts-check

export class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Locators for the HomePage / Base Header navigation
    this.authLink = page.getByRole("link", { name: "Signup / Login" });
    this.homePageBanner = page.getByAltText("Website for automation practice");
    
    // Locates the <b> tag inside the "Logged in as" anchor link
    this.loggedInUser = page.locator("a", { hasText: "Logged in as" }).locator("b");
    
    this.logOutBtn = page.locator("a[href='/logout']");
    this.deleteAccountLink = page.locator("a[href='/delete_account']");
    this.accountDeletedHeading = page.getByRole("heading", { name: "Account Deleted!" });
    this.continueBtn = page.locator("[data-qa='continue-button']");
  }

  /**
   * Navigates to the base URL of the application.
   * @returns {Promise<void>}
   */
  async navigateToAutomationExcercise() {
    await this.page.goto("/", { waitUntil: "domcontentloaded" });
  }

  /**
   * Waits for the primary home page banner to become visible.
   * @returns {Promise<this>}
   */
  async waitForHomePageToLoad() {
    await this.homePageBanner.waitFor({ state: "visible" });
    return this;
  }

  /**
   * Clicks the Authentication link in the header.
   * @returns {Promise<this>}
   */
  async openAuthPage() {
    await this.authLink.click();
    return this;
  }

  /**
   * Retrieves the username text of the currently logged-in user.
   * @returns {Promise<string>}
   */
  async getLoggedInUsername() {
    const text = await this.loggedInUser.textContent();
    return text ? text.trim() : "";
  }

  /**
   * Clicks the Logout button in the header.
   * @returns {Promise<this>}
   */
  async logout() {
    await this.logOutBtn.click();
    return this;
  }

  /**
   * Clicks the Delete Account link in the header.
   * @returns {Promise<this>}
   */
  async deleteAccount() {
    await this.deleteAccountLink.click();
    return this;
  }

  /**
   * Clicks the Continue button (usually seen after account creation or deletion).
   * @returns {Promise<this>}
   */
  async clickContinue() {
    await this.continueBtn.click({ force: true });
    return this;
  }
}