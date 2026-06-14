// @ts-check
import { BasePage } from "../BasePage.js";

export class CartPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    this.cartNavLink = page.getByRole("banner").getByRole("link", { name: "Cart" });

    this.addToCartFirstProduct = page
      .locator(".productinfo.text-center a.add-to-cart")
      .first();
    this.continueShoppingBtn = page.getByRole("button", {
      name: "Continue Shopping",
    });
    this.cartBreadcrumb = page.locator("li", { hasText: "Shopping Cart" });
    this.proceedToCheckoutBtn = page.locator(".btn.btn-default.check_out");
    this.checkoutModalHeading = page.getByRole("heading", { name: "Checkout" });
    this.registerLoginLink = page.getByRole("link", {
      name: "Register / Login",
    });

    // Footer subscription elements
    this.subscriptionHeading = page.getByRole("heading", { name: "Subscription" });
    this.subscriptionEmailInput = page.locator("#susbscribe_email");
    this.subscriptionArrowBtn = page.locator("#subscribe");
    this.subscriptionSuccessAlert = page.locator("#success-subscribe .alert-success");

    // Hover-based product add-to-cart (Products listing page)
    this.productImageWrappers = page.locator(".product-image-wrapper");

    // "View Cart" link inside the add-to-cart confirmation modal
    this.viewCartModalBtn = page.locator("#cartModal a[href='/view_cart']");

    // Cart product rows for verification
    this.cartProductRows = page.locator("#cart_info tbody tr");

    // Empty cart confirmation span (visible after all items are removed)
    this.emptyCartSpan = page.locator("#empty_cart");
  }

  /**
   * Hovers over the first product on the products listing page, adds it to
   * the cart, then dismisses the confirmation modal via "Continue Shopping".
   * @returns {Promise<this>}
   */
  async addFirstProductToCartAndContinue() {
    const firstWrapper = this.productImageWrappers.first();
    await firstWrapper.hover();
    const overlayBtn = firstWrapper.locator(".product-overlay a.add-to-cart");
    await overlayBtn.waitFor({ state: "visible" });
    await overlayBtn.click();
    await this.continueShoppingBtn.waitFor({ state: "visible" });
    await this.continueShoppingBtn.click();
    return this;
  }

  /**
   * Clicks the Cart nav link in the site banner and waits for the cart
   * breadcrumb to confirm the cart page has loaded.
   * @returns {Promise<this>}
   */
  async navigateToCart() {
    await this.cartNavLink.click();
    await this.cartBreadcrumb.waitFor({ state: "visible" });
    return this;
  }

  /**
   * Waits for the cart page breadcrumb to be visible, confirming the cart
   * page is displayed.
   * @returns {Promise<this>}
   */
  async verifyCartIsDisplayed() {
    await this.cartBreadcrumb.waitFor({ state: "visible" });
    return this;
  }

  /**
   * Waits for the DOM to be ready then clicks the Proceed to Checkout button.
   * If the page has already redirected to /checkout, returns early to avoid
   * double-clicking the in-page checkout button.
   * @returns {Promise<this>}
   */
  async proceedToCheckout() {
    // domcontentloaded guarantees jQuery's $(document).ready() has fired,
    // which is when the click handler is bound. Without this the button is
    // visible before scripts execute (hydration trap) and the modal never opens.
    await this.page.waitForLoadState("domcontentloaded");
    // When the user is already logged in the server redirects /view_cart →
    // /checkout automatically. In that case we are already where we need to be
    // and must NOT click again (doing so would fire the checkout-page button
    // and skip ahead to Payment).
    if (this.page.url().includes("/checkout")) {
      return this;
    }
    await this.proceedToCheckoutBtn.waitFor({ state: "visible" });
    await this.proceedToCheckoutBtn.click();
    return this;
  }

  /**
   * Waits for the checkout modal to open, then clicks the Register/Login link
   * inside it to redirect to the auth page.
   * @returns {Promise<this>}
   */
  async clickRegisterLoginFromModal() {
    // Wait for the modal heading to confirm the checkout modal opened first
    await this.checkoutModalHeading.waitFor({ state: "visible" });
    await this.registerLoginLink.waitFor({ state: "visible" });
    await this.registerLoginLink.click();
    return this;
  }

  /**
   * Scrolls the page until the Subscription heading in the footer is in view.
   * @returns {Promise<this>}
   */
  async scrollToFooter() {
    await this.subscriptionHeading.scrollIntoViewIfNeeded();
    return this;
  }

  /**
   * @param {string} email
   */
  async subscribeWithEmail(email) {
    await this.subscriptionEmailInput.fill(email);
    await this.subscriptionArrowBtn.click();
    return this;
  }

  /**
   * Hovers over the product card at the given 0-based index to reveal the
   * overlay, then clicks the "Add to cart" button inside that overlay.
   * @param {number} index
   */
  async hoverAndAddProductToCart(index) {
    const wrapper = this.productImageWrappers.nth(index);
    await wrapper.scrollIntoViewIfNeeded();
    await wrapper.hover();
    const overlayBtn = wrapper.locator(".product-overlay a.add-to-cart");
    // await overlayBtn.waitFor({ state: "visible" });
    await overlayBtn.click();
    return this;
  }

  /**
   * Waits for the "Continue Shopping" modal button to be visible and clicks it.
   * @returns {Promise<this>}
   */
  async clickContinueShopping() {
    await this.continueShoppingBtn.waitFor({ state: "visible" });
    await this.continueShoppingBtn.click();
    return this;
  }

  /**
 * Waits for and clicks the "View Cart" link inside the add-to-cart
 * confirmation modal and waits for navigation to the cart page.
 * @returns {Promise<this>}
 */
async clickViewCartModal() {
  await this.viewCartModalBtn.waitFor({ state: "visible" });

  await Promise.all([
    this.page.waitForURL("**/view_cart"),
    this.viewCartModalBtn.click(),
  ]);

  return this;
}

  /**
   * Clicks the 'X' delete button for the cart row at the given 0-based index,
   * then waits for that row to be removed from the DOM.
   * @param {number} index
   */
  /**
 * Clicks the 'X' delete button for the cart row at the given 0-based index,
 * then waits for that row to be removed from the DOM.
 * @param {number} index
 */
async removeCartItemByIndex(index) {
  const row = this.cartProductRows.nth(index);

  await row.waitFor({ state: "visible" });

  const rowId = await row.getAttribute("id");

  if (!rowId) {
    throw new Error("Cart row does not have an id attribute");
  }

  const deleteBtn = row.locator(".cart_quantity_delete");

  // Ensure the button itself is in view
  await deleteBtn.scrollIntoViewIfNeeded();

  await this.page.pause();

  // Optional debugging
  const box = await deleteBtn.boundingBox();
  console.log("Delete button bounding box:", box);

  await deleteBtn.click();

  await this.page.locator(`#${rowId}`).waitFor({
    state: "detached",
  });

  return this;
}

  /**
   * Waits for the empty-cart message to become visible after all items are removed.
   */
  async verifyCartIsEmpty() {
    await this.emptyCartSpan.waitFor({ state: "visible" });
    return this;
  }

  /**
   * Navigates to the cart and removes all items if any are present,
   * leaving the cart in a clean state for the next test.
   * @returns {Promise<this>}
   */
  async clearCart() {
    await this.navigateToCart();
    await this.page.waitForLoadState("domcontentloaded");
    const isEmpty = await this.emptyCartSpan.isVisible();
    if (isEmpty) return this;
    let count = await this.cartProductRows.count();
    while (count > 0) {
      await this.removeCartItemByIndex(0);
      count = await this.cartProductRows.count();
    }
    await this.page.reload();
    await this.emptyCartSpan.waitFor({ state: "visible" });
    return this;
  }

  /**
   * Waits for the cart table to show a row whose product name matches the
   * provided text. Throws if the product is not found within the default timeout.
   * @param {string} productName
   * @returns {Promise<this>}
   */
  async verifyProductIsInCart(productName) {
    const nameLocator = this.cartProductRows
      .locator(".cart_description h4 a")
      .filter({ hasText: productName });
    await nameLocator.waitFor({ state: "visible" });
    return this;
  }

  /**
   * Returns an array of all rows in the cart table with their details.
   * @returns {Promise<Array<{name: string, price: string, quantity: string, total: string}>>}
   */
  async getCartItems() {
    await this.cartProductRows.first().waitFor({ state: "visible" });
    const count = await this.cartProductRows.count();
    const items = [];
    for (let i = 0; i < count; i++) {
      const row = this.cartProductRows.nth(i);
      const name = (await row.locator(".cart_description h4 a").textContent())?.trim() ?? "";
      const price = (await row.locator(".cart_price p").textContent())?.trim() ?? "";
      const quantity = (await row.locator(".cart_quantity button").textContent())?.trim() ?? "";
      const total = (await row.locator(".cart_total p").textContent())?.trim() ?? "";
      items.push({ name, price, quantity, total });
    }
    return items;
  }
}
