import { expect } from "@playwright/test";

export class HomePage {
  constructor(page) {
    this.page = page;

    this.subscriptionBox = page.locator("#susbscribe_email");
    this.subscribeBtn = page.locator("#subscribe");
    this.successAlertMessage = page.locator(".alert-success.alert");
  }

  async navigateToSubscriptionAndEnterEmailAdress(emailAddress) {
    await this.subscriptionBox.waitFor({ state: "visible" });
    await this.subscriptionBox.scrollIntoViewIfNeeded();
    await this.subscriptionBox.fill(emailAddress);
    await this.subscribeBtn.click();
    return this;
  }

  async isSuccessfullySubscribe() {
    await this.successAlertMessage.waitFor({ state: "visible" });
    await expect(this.successAlertMessage).toBeVisible();
    return this.successAlertMessage.textContent();
  }
}
