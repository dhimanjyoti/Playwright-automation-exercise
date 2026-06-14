// @ts-check
import { BasePage } from "../BasePage.js";

export class HomePage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    this.recommendedItemsHeading = page.getByRole("heading", {
      name: "recommended items",
    });

    // Scoped to the active carousel slide to avoid clicking a hidden item
    this.firstRecommendedAddToCartBtn = page
      .locator("#recommended-item-carousel .item.active .add-to-cart")
      .first();

    this.firstRecommendedProductName = page
      .locator("#recommended-item-carousel .item.active .productinfo p")
      .first();

    // Footer subscription heading — visible at the bottom of every page
    this.subscriptionHeading = page.getByRole("heading", { name: "Subscription" });

    // Floating scroll-to-top arrow (initially display:none, shown by JS after scrolling down)
    this.scrollUpArrow = page.locator("#scrollUp");

    // Main banner carousel headline — scoped to #slider-carousel so the locator
    // always resolves to exactly one element (the currently active slide's h2).
    // All 3 slides in this carousel share the same heading text, so the active
    // class is the only reliable discriminator.
    this.carouselHeadingText = page.locator("#slider-carousel .item.active h2");
  }

  /**
   * Scrolls the Recommended Items heading into the viewport using native
   * Playwright scrolling — no hard waits, no JS injection.
   * @returns {Promise<this>}
   */
  async scrollToRecommendedSection() {
    await this.recommendedItemsHeading.scrollIntoViewIfNeeded();
    return this;
  }

  /**
   * Waits for the Recommended Items section heading to reach visible state.
   * @returns {Promise<this>}
   */
  async verifyRecommendedItemsSectionIsVisible() {
    await this.recommendedItemsHeading.waitFor({ state: "visible" });
    return this;
  }

  /**
   * Reads the product name from the first card in the active recommended
   * carousel slide, then clicks its Add to Cart button. Returns the captured
   * name so the caller can assert its presence in the cart.
   * @returns {Promise<string>}
   */
  async addFirstRecommendedItemToCart() {
    await this.firstRecommendedProductName.waitFor({ state: "visible" });
    const productName =
      (await this.firstRecommendedProductName.textContent())?.trim() ?? "";
    await this.firstRecommendedAddToCartBtn.scrollIntoViewIfNeeded();
    await this.firstRecommendedAddToCartBtn.click();
    return productName;
  }

  /**
   * Scrolls the page until the footer Subscription heading enters the viewport.
   * Using scrollIntoViewIfNeeded() on a real DOM node avoids page.evaluate()
   * JS injection while still reaching the bottom of the page layout.
   * @returns {Promise<this>}
   */
  async scrollToFooter() {
    await this.subscriptionHeading.scrollIntoViewIfNeeded();
    return this;
  }

  /**
   * Waits for the floating scroll-up arrow to transition from display:none
   * to visible (triggered by the page's JS scroll handler), then clicks it.
   * @returns {Promise<this>}
   */
  async clickScrollUpArrow() {
    await this.scrollUpArrow.waitFor({ state: "visible" });
    await this.scrollUpArrow.click();
    return this;
  }

  /**
   * Programmatically scrolls back to the very top of the page by bringing
   * the home page banner into view. Mirrors a user scrolling up to the
   * header without using the floating arrow shortcut.
   * @returns {Promise<this>}
   */
  async scrollToTop() {
    await this.homePageBanner.scrollIntoViewIfNeeded();
    return this;
  }
}
