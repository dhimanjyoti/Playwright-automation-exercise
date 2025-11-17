import { HomePage } from "./HomePage";

export class CartPage extends HomePage {
  constructor(page) {
    super(page);
    this.page = page;

    // Locators
    this.cartPageLink = page.locator("//a[normalize-space()='Cart']");
    this.subscribeBtn = page.locator("#susbscribe_email");
    this.successAlertMessage = page.locator(".alert-success.alert");
  }

  async navigateToCartPage() {
    await this.cartPageLink.click();
    await this.page.waitForURL(/view_cart/i);
    return this;
  }

  async subscribeWithEmail(emailAddress) {
    return await this.subscribe(emailAddress);
  }

  async isSubscribe() {
    return await this.getSubscriptionSuccessMessage();
  }
}
