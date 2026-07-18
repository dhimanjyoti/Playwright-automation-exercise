// @ts-check
import { BasePage } from "../BasePage.js";
import { ExcelUtil } from "../../../src/utils/ExcelUtil.js";

export class ProductPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor(page) {
    super(page);

    // Locators
    this.productsPageLink = page.getByRole("banner").getByRole("link", { name: "Products" });
    this.productCards = page.locator(".productinfo.text-center");
    this.productName = "p";
    this.productPrice = "h2";
    this.viewProductLinks = page.getByRole("link", { name: "View Product" });

    this.detailsProductName = page.locator(".product-information h2");
    this.detailsProductPrice = page.locator(".product-information span span");
    this.allProductsHeading = page.getByRole("heading", { name: "All Products" });
    this.searchInput = page.getByPlaceholder("Search Product");
    this.searchButton = page.locator("#submit_search");

    /**
     * "Brands" h2 heading in the left sidebar on the Products page.
     * @type {import('@playwright/test').Locator}
     */
    this.brandsSidebarHeading = page
      .locator(".left-sidebar")
      .getByRole("heading", { name: "Brands" });

    /**
     * Main h2 heading on a brand-products page (e.g. "Brand - Polo Products").
     * @type {import('@playwright/test').Locator}
     */
    this.brandProductsHeading = page
      .getByRole("heading", { level: 2 })
      .filter({ hasText: "Brand -" });

    /**
     * The "Searched Products" h2 heading shown after a search is submitted.
     * @type {import('@playwright/test').Locator}
     */
    this.searchedProductsHeading = page.getByRole("heading", {
      name: "Searched Products",
    });

    /**
     * All product cards visible on the current page (All Products or search results).
     * @type {import('@playwright/test').Locator}
     */
    this.searchedProductCards = page.locator(".productinfo.text-center");
  }

  async navigateToProductsPage() {
    await this.productsPageLink.click();
    await this.allProductsHeading.waitFor({ state: "visible" });
    await this.page.waitForLoadState("load");
    return this;
  }

  async captureAllTheAvailableProductDetailsAndSaveItToExcel() {
    const productData = await this.productCards.evaluateAll(
      (cards, args) => {
        return cards.map((card) => {
          const priceText =
            card.querySelector(args.priceSel)?.textContent.trim() || "0";
          const nameText =
            card.querySelector(args.nameSel)?.textContent.trim() || "Unknown";

          return {
            "Product Name": nameText,
            "Product Price": priceText,
          };
        });
      },
      { priceSel: this.productPrice, nameSel: this.productName },
    );

    ExcelUtil.exportJsonToExcel(productData, "Automation_Products_List.xlsx");

    return productData;
  }

  async clickFirstViewProduct() {
    // .first() automatically targets the 0th index in the list
    await this.viewProductLinks.first().click();
    await this.page.waitForURL("**/product_details/**", { timeout: 15000 });
    return this;
  }

  async getActualProductDetails() {
    const rawName = await this.detailsProductName.textContent();
    const rawPrice = await this.detailsProductPrice.textContent();

    return {
      actualName: rawName?.trim() || "",
      actualPrice: rawPrice?.trim() || "",
    };
  }

  /**
   * Waits for the "Brands" heading in the left sidebar to be visible.
   * @returns {Promise<this>}
   */
  async verifyBrandsSidebarIsVisible() {
    await this.brandsSidebarHeading.waitFor({ state: "visible" });
    return this;
  }

  /**
   * Clicks a brand link in the left sidebar by brand name substring.
   * Links render as "(N) BrandName", so exact matching is disabled.
   *
   * @param {string} brandName - The brand name to click, e.g. "Polo" or "H&M".
   * @returns {Promise<this>}
   */
  async clickBrandLink(brandName) {
    const brandLink = this.page
      .locator(".left-sidebar")
      .getByRole("link", { name: brandName, exact: false });
    await brandLink.scrollIntoViewIfNeeded();
    await brandLink.click();
    return this;
  }

  /**
   * Types a search term into the search input and submits the form.
   * @param {string} searchTerm - The search keyword, e.g. "tshirt".
   * @returns {Promise<this>}
   */
  async searchForProduct(searchTerm) {
    await this.searchInput.fill(searchTerm);
    await this.searchButton.click();
    await this.searchedProductsHeading.waitFor({ state: "visible" });
    await this.page.waitForLoadState("load");
    return this;
  }

  /**
   * Waits for the "Searched Products" heading to be visible, confirming
   * the search results page has rendered.
   * @returns {Promise<this>}
   */
  async verifySearchedProductsHeadingIsVisible() {
    await this.searchedProductsHeading.waitFor({ state: "visible" });
    return this;
  }

  /**
   * Waits for at least one product card to be present in the search results.
   * @returns {Promise<this>}
   */
  async verifySearchResultsAreVisible() {
    await this.searchedProductCards.first().waitFor({ state: "visible" });
    return this;
  }

  /**
   * Collects and returns the name text of every product card currently visible.
   * @returns {Promise<string[]>}
   */
  async getSearchedProductNames() {
    await this.searchedProductCards.first().waitFor({ state: "visible" });
    return this.page.locator(".productinfo p").allTextContents();
  }

  /**
   * Adds every product in the current results to the cart and dismisses the
   * "Continue Shopping" modal between each product.
   * @returns {Promise<this>}
   */
  async addAllSearchedProductsToCart() {
    const addBtns = this.page.locator(".productinfo a.add-to-cart");
    const count = await addBtns.count();
    const continueBtn = this.page.getByRole("button", {
      name: "Continue Shopping",
    });
    for (let i = 0; i < count; i++) {
      await addBtns.nth(i).click();
      await continueBtn.waitFor({ state: "visible" });
      await continueBtn.click();
    }
    return this;
  }

  /**
   * Adds the product at the given 0-based index using its visible cart button.
   *
   * @param {number} index - 0-based product index on the current page.
   * @returns {Promise<this>}
   */
  async addProductToCartByIndex(index) {
    const addToCartBtn = this.page
      .locator(".productinfo a.add-to-cart")
      .nth(index);
    await this.page.waitForLoadState("domcontentloaded");
    await addToCartBtn.scrollIntoViewIfNeeded();
    await addToCartBtn.click();
    return this;
  }
}
