import { ProductPage } from "./ProductPage";

export class ProductListingPage extends ProductPage {
  constructor(page) {
    super(page);
    this.page = page;

    // Navigation Store the selector string, NOT the locator:
    this.addProductToCart = ".overlay-content a:has-text('Add to cart')";

    this.continueShoppingBtn = page.locator(
      "//button[normalize-space()='Continue Shopping']"
    );
    this.viewCartLink = page.locator("//a[normalize-space()='View Cart']");
    this.productPrice = page.locator(
      "//div[@class='productinfo text-center']//h2"
    );
    this.productInfo = page.locator(".single-products");
  }

  async waitForProductsToLoad() {
    await this.page.waitForURL(/products/i);
    await this.productInfo.first().waitFor({ state: "visible" });
    await this.page.waitForLoadState("networkidle");
  }

  async hoverAndAddToCartByIndex(index) {
    const product = this.productInfo.nth(index);
    await product.scrollIntoViewIfNeeded();

    await product.hover();
    const addBtn = product.locator(this.addProductToCart).first();

    await addBtn.waitFor({ state: "visible" });
    await addBtn.click();
  }

  async addFirstProductToCart() {
    await this.hoverAndAddToCartByIndex(0);
  }

  async getProductNameByIndex(index) {
    const name = await this.productName.nth(index).innerText();
    return name.trim();
  }

  async getProductPriceByIndex(index) {
    const priceText = await this.productPrice.nth(index).innerText();
    return Number(priceText.replace(/[^0-9.]/g, ""));
  }

  async continueShopping() {
    await this.continueShoppingBtn.click();
  }

  async addSecondProductToCart() {
    await this.hoverAndAddToCartByIndex(1);
  }

  async goToCart() {
    await this.viewCartLink.click();
    await this.page.waitForURL(/view_cart/i);
    return this;
  }
}
