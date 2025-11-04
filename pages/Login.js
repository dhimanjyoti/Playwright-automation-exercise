import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";

const LOAD_STATE = "domcontentloaded"; // standardize page load waits
export class Login extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
    this.locators = {
      // Keep the BasePage locators
      ...this.locators,
      homePageBanner: page.locator(
        "//div[@class='item active']//h2[normalize-space()='Full-Fledged practice website for Automation Engineers']"
      ),
      loginHeaderText: page.locator(
        "//h2[normalize-space()='Login to your account']"
      ),
      loginEmail: page.locator("[data-qa='login-email']"),
      loginPassword: page.locator("[data-qa='login-password']"),
      loginBtn: page.locator("[data-qa='login-button']"),
      invalidLogin: page.locator(
        "//p[normalize-space()='Your email or password is incorrect!']"
      ),
      logoutBtn: page.locator("a[href='/logout']"),
    };
  }

  async verifyHomePage() {
    await expect(
      this.locators.homePageBanner,
      "Home Page did not load"
    ).toBeVisible();
  }

  async navigateToLoginPage() {
    await this.openAuthPage();
    await expect(
      this.locators.loginHeaderText,
      "Header Text is not visibile as page didn't load"
    ).toBeVisible();
    await expect(this.page).toHaveURL(/login/i);
  }

  /**
   *
   * @param {enter user email address} loginEmail
   * @param {enter user login password and click on the 'Login' button} loginPassword
   */
  async enterLoginCredentails({ emailAddress, password }) {
    await this.locators.loginEmail.fill(emailAddress);
    await this.locators.loginPassword.fill(password);

    await Promise.all([
      this.page.waitForNavigation({ waitUntil: LOAD_STATE }),
      this.locators.loginBtn.click(),
    ]);
  }
  async verifySuccessfulLogin() {
    return await this.verifyUserName();
  }

  async expectInvalidLoginMessage() {
    await expect(this.locators.invalidLogin).toBeVisible();
    return await this.locators.invalidLogin.textContent();
  }

  async loginWithValidUser({ emailAddress, password }) {
    await this.verifyHomePage();
    await this.navigateToLoginPage();
    await this.enterLoginCredentails({ emailAddress, password });
    await this.verifySuccessfulLogin();
  }

  async logout() {
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: LOAD_STATE }),
      this.locators.logoutBtn.click(),
    ]);
  }

  async verifyLogoutSuccessful() {
    await expect(this.page).toHaveURL("/login");
  }
}
