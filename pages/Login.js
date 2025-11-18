import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class Login extends BasePage {
  constructor(page) {
    super(page);

    this.loginHeaderText = page.locator(
      "//h2[normalize-space()='Login to your account']"
    );
    this.loginEmail = page.locator("[data-qa='login-email']");
    this.loginPassword = page.locator("[data-qa='login-password']");
    this.loginBtn = page.locator("[data-qa='login-button']");
    this.invalidLogin = page.locator(
      "//p[normalize-space()='Your email or password is incorrect!']"
    );
    this.logoutBtn = page.locator("a[href='/logout']");
  }

  async navigateToLoginPage() {
    await this.openAuthPage();
    await expect(this.loginHeaderText).toBeVisible();
    return this;
  }

  async enterLoginCredentials({ emailAddress, password }) {
    await this.loginEmail.fill(emailAddress);
    await this.loginPassword.fill(password);
    await this.loginBtn.click();
    return this;
  }

  async fetchLoggedInUsername() {
    return this.getLoggedInUsername(); //BasePage
  }

  async getInvalidLoginMessage() {
    await expect(this.invalidLogin).toBeVisible();
    return this.invalidLogin.textContent();
  }

  async logout() {
    await this.logoutBtn.click();
    await this.page.waitForURL(/login/i);
    return this;
  }

  async isLoggedOut() {
    return this.page.url().includes("/login");
  }
}
