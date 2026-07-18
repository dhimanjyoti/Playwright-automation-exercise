// @ts-check
import { BasePage } from "../BasePage.js";
export class LoginPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    this.loginHeaderText = page.locator("h2", {
      hasText: "Login to your account",
    });
    this.emailInput = page.locator("[data-qa='login-email']");
    this.passwordInput = page.locator("[data-qa='login-password']");
    this.loginButton = page.locator("[data-qa='login-button']");
    this.errorMessage = page.locator(".login-form p");

    // For visual Test
    this.loginFormContainer = page.locator(".login-form");
  }

  /**
   * @returns {Promise<this>}
   */
  async navigateToLoginPage() {
    await this.openAuthPage();
    await this.loginHeaderText.waitFor({ state: "visible", timeout: 5000 });
    return this;
  }

  /**
   * Handles both positive and negative entry workflows.
   * @param {string} emailAddress
   * @param {string} password
   * @returns {Promise<this>}
   */
  async submitLoginDetails(emailAddress, password) {
    await this.emailInput.fill(emailAddress);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    return this;
  }

  /**
   * Returns the error message text displayed below the login form after a
   * failed login attempt.
   * @returns {Promise<string>}
   */
  async getInvalidLoginErrorText() {
    return await this.errorMessage.innerText();
  }

  /**
   * Getter to expose the visual boundary box safely to assertions
   * @returns {import('@playwright/test').Locator}
   */
  get visualFormContainer() {
    return this.loginFormContainer;
  }
}
