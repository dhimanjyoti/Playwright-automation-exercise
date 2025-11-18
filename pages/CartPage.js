import { HomePage } from "./HomePage";

export class CartPage extends HomePage {
  constructor(page) {
    super(page);
    this.page = page;

    // Locators
    this.cartPageLink = page.locator("//a[normalize-space()='Cart']");
    this.subscribeBtn = page.locator("#susbscribe_email");
    this.cartProductName = page.locator(".cart_description h4 a");
    this.cartProductPrice = page.locator(".cart_price p");
    this.cartProductQuantity = page.locator(".cart_quantity button");
    this.cartProductTotalPrice = page.locator(".cart_total p");
    this.successAlertMessage = page.locator(".alert-success.alert");
  }

  async navigateToCartPage() {
    await this.cartPageLink.click();
    await this.page.waitForURL(/view_cart/i);
    return this;
  }

  async getCartProductNames() {
    const names = await this.cartProductName.allInnerTexts();
    return names.map((n) => n.trim());
  }

  async getCartPriceByIndex(index) {
    const text = await this.cartProductPrice.nth(index).innerText();
    return Number(text.replace(/[^0-9.]/g, ""));
  }

  async getCartQuantityByIndex(index) {
    const text = await this.cartProductQuantity.nth(index).innerText();
    return Number(text.trim());
  }

  async getCartTotalPriceByIndex(index) {
    const text = await this.cartProductTotalPrice.nth(index).innerText();
    return Number(text.replace(/[^0-9.]/g, ""));
  }

  async subscribeWithEmail(emailAddress) {
    return await this.subscribe(emailAddress);
  }

  async isSubscribe() {
    return await this.getSubscriptionSuccessMessage();
  }
}
