// @ts-check
import { test, expect } from "../../../src/fixtures/baseFixture.js";
import { CART_DEFAULTS } from "../../../src/constants/message.js";

test.describe("TC12: Add Products in Cart", () => {
  test("Verify user can add two products to cart and validate prices, quantity and total", async ({
    pom,
  }, testInfo) => {
    test.setTimeout(testInfo.timeout * 3);
    /** @type {Awaited<ReturnType<typeof pom.cartPage.getCartItems>>} */
    let cartItems;

    await test.step("Step 1-3: Navigate to home page and verify it is visible", async () => {
      await pom.basePage.navigateToAutomationExcercise();
      await pom.basePage.waitForHomePageToLoad();
      await expect(pom.basePage.homePageBanner).toBeVisible();
    });

    await test.step("Step 3b: Clear any pre-existing cart items", async () => {
      await pom.cartPage.clearCart();
    });

    await test.step("Step 4: Click Products button", async () => {
      await pom.productPage.navigateToProductsPage();
    });

    await test.step("Step 5: Hover over first product and click Add to cart", async () => {
      await pom.cartPage.hoverAndAddProductToCart(0);
    });

    await test.step("Step 6: Click Continue Shopping", async () => {
      await pom.cartPage.clickContinueShopping();
    });

    await test.step("Step 7: Hover over second product and click Add to cart", async () => {
      await pom.cartPage.hoverAndAddProductToCart(1);
    });

    await test.step("Step 8: Click View Cart button", async () => {
      await pom.cartPage.clickViewCartModal();
    });

    await test.step("Step 9: Verify both products are added to Cart", async () => {
      await pom.cartPage.verifyCartIsDisplayed();
      cartItems = await pom.cartPage.getCartItems();
      expect(cartItems).toHaveLength(2);
    });

    await test.step("Step 10: Verify prices, quantity and total price of both products", async () => {
      for (const item of cartItems) {
        expect(item.name).toBeTruthy();
        expect(item.price).toBeTruthy();
        expect(item.quantity).toBe(CART_DEFAULTS.INITIAL_QUANTITY);
        expect(item.total).toBe(item.price);
      }
    });
  });
});
