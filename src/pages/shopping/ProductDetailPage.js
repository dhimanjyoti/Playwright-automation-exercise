// @ts-check
import { BasePage } from "../BasePage.js";

export class ProductDetailPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    /**
     * The "Write Your Review" anchor tab visible on the product detail page.
     * @type {import('@playwright/test').Locator}
     */
    this.writeYourReviewTab = page.getByRole("link", { name: "Write Your Review" });

    // Scope all review form locators to the #reviews section to avoid
    // ambiguity with the subscription email input in the page footer.
    const reviewSection = page.locator("#reviews");

    /**
     * @type {import('@playwright/test').Locator}
     */
    this.reviewNameInput = reviewSection.getByPlaceholder("Your Name");

    /**
     * @type {import('@playwright/test').Locator}
     */
    this.reviewEmailInput = reviewSection.getByPlaceholder("Email Address");

    /**
     * @type {import('@playwright/test').Locator}
     */
    this.reviewTextarea = reviewSection.getByPlaceholder("Add Review Here!");

    /**
     * @type {import('@playwright/test').Locator}
     */
    this.reviewSubmitButton = reviewSection.getByRole("button", { name: "Submit" });

    /**
     * Inline success alert shown after the review is submitted successfully.
     * @type {import('@playwright/test').Locator}
     */
    this.reviewSuccessMessage = reviewSection.getByText("Thank you for your review.");
  }

  /**
   * Waits for the "Write Your Review" tab to be visible on the product detail page.
   * @returns {Promise<this>}
   */
  async verifyWriteYourReviewSectionIsVisible() {
    await this.writeYourReviewTab.waitFor({ state: "visible" });
    return this;
  }

  /**
   * Fills all review form fields and submits the form.
   * @param {string} name - The reviewer's display name.
   * @param {string} email - The reviewer's email address.
   * @param {string} reviewText - The body text of the review.
   * @returns {Promise<this>}
   */
  async submitProductReview(name, email, reviewText) {
    await this.reviewNameInput.fill(name);
    await this.reviewEmailInput.fill(email);
    await this.reviewTextarea.fill(reviewText);
    await this.reviewSubmitButton.click();
    return this;
  }
}
