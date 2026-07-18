// @ts-check
import { BasePage } from "../BasePage.js";

export class CategoryPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    /**
     * The "Category" h2 heading in the left sidebar — used to confirm the sidebar
     * is rendered on the current page.
     * @type {import('@playwright/test').Locator}
     */
    this.categorySidebarHeading = page
      .locator(".left-sidebar")
      .getByRole("heading", { name: "Category" });

    /**
     * The main h2 heading on a category-products page (e.g. "Women - Dress Products").
     * @type {import('@playwright/test').Locator}
     */
    this.categoryProductsHeading = page
      .getByRole("heading", { level: 2 })
      .filter({ hasText: "Products" });
  }

  /**
   * Waits for the Category section heading in the left sidebar to be visible,
   * confirming the sidebar has rendered.
   * @returns {Promise<this>}
   */
  async verifyCategorySidebarIsVisible() {
    await this.categorySidebarHeading.waitFor({ state: "visible" });
    return this;
  }

  /**
   * Expands a parent-category accordion panel in the left sidebar and clicks
   * the specified sub-category link.
   *
   * The accordion toggle links use `href="#<CategoryName>"` and the expandable
   * panels carry the matching `id="<CategoryName>"`, so the category name string
   * doubles as both the selector target and the human-readable label.
   *
   * @param {string} parentCategoryName - Accordion toggle to expand, e.g. "Women" or "Men".
   * @param {string} subCategoryName    - Sub-category link to click, e.g. "Dress" or "Tshirts".
   * @returns {Promise<this>}
   */
  async expandAndClickSubCategory(parentCategoryName, subCategoryName) {
    // Ensure the Bootstrap accordion JS is fully initialized before interacting.
    await this.page.waitForLoadState("domcontentloaded");

    const toggle = this.page.locator(
      `.left-sidebar a[href="#${parentCategoryName}"]`,
    );
    await toggle.scrollIntoViewIfNeeded();
    await toggle.click();

    const subLink = this.page
      .locator(`#${parentCategoryName}`)
      .getByRole("link", { name: subCategoryName });
    await subLink.waitFor({ state: "visible" });
    await subLink.click();
    return this;
  }
}
