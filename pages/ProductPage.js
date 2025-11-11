import { expect } from "@playwright/test";
export class ProductPage {
  constructor(page) {
    this.page = page;

    //Navigation
    this.productPageLink = page.locator("//a[@href='/products']");

    // Headers
    this.productPageTitle = page.locator(
      "//h2[normalize-space()='All Products']"
    );

    // product Name
    this.productName = page.locator(
      "//div[@class='productinfo text-center']//p"
    );

    // View Product
    this.viewProduct = page.locator("//a[contains(text(),'View Product')]");

    // Product Details
    this.name = page.locator(".product-information h2");
    this.cateogry = page.locator(
      "//p[normalize-space()='Category: Women > Tops']"
    );
    this.price = page.locator("div[class='product-information'] span span");
    this.availability = page.locator("//b[normalize-space()='Availability:']");
    this.condition = page.locator("//b[normalize-space()='Condition:']");
    this.brand = page.locator("//b[normalize-space()='Brand:']");
  }

  async navigateToProductPage() {
    await this.productPageLink.click();
    await expect(this.productPageTitle).toBeVisible();
    return this;
  }

  async getAllProductNamesAndOpenFirst(page) {
    await this.productName.first().waitFor();

    // Grab all the names
    const names = await this.productName.allInnerTexts();
    const trimmed = names.map((n) => n.trim());

    // click on the 'View Product' button of the first product
    await this.viewProduct.first().click();
    return trimmed;
  }

  async isProductDetailsVisible() {
    await expect(this.name).toBeVisible();
    await expect(this.cateogry).toBeVisible();
    await expect(this.price).toBeVisible();
    await expect(this.availability).toBeVisible();
    await expect(this.condition).toBeVisible();
    await expect(this.brand).toBeVisible();
  }
}
