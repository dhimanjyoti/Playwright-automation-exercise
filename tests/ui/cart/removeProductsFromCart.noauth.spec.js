// @ts-check
import { test, expect } from "../../../src/fixtures/baseFixture.js";

test.describe("TC17: Remove Products From Cart", () => {
  test("Verify user can remove a product from the cart", async ({ pom }, testInfo) => {
    test.setTimeout(testInfo.timeout * 2);
    /** @type {string} */
    let removedProductName;

    await test.step("Steps 1-2: Navigate to home page and verify it is visible", async () => {
      await pom.basePage.navigateToAutomationExcercise();
      await pom.basePage.waitForHomePageToLoad();
      await expect(pom.basePage.homePageBanner).toBeVisible();
    });

    await test.step("Step 3: Click Products button", async () => {
      await pom.productPage.navigateToProductsPage();
    });

    await test.step("Step 4: Hover over first product and click Add to cart", async () => {
      await pom.cartPage.hoverAndAddProductToCart(0);
    });

    await test.step("Step 5: Click Continue Shopping", async () => {
      await pom.cartPage.clickContinueShopping();
    });

    await test.step("Step 6: Hover over second product and click Add to cart", async () => {
      await pom.cartPage.hoverAndAddProductToCart(1);
    });

    await test.step("Step 7: Click Cart button", async () => {
      await pom.cartPage.clickViewCartModal();
    });

    await test.step("Step 8: Verify cart page is displayed", async () => {
      await pom.cartPage.verifyCartIsDisplayed();
    });

    await test.step("Step 9: Verify cart has 2 products and record first product name", async () => {
      const cartItems = await pom.cartPage.getCartItems();
      expect(cartItems).toHaveLength(2);
      removedProductName = cartItems[0].name;
    });

    await test.step("Step 10: Click X button to remove first product", async () => {
      await pom.cartPage.removeCartItemByIndex(0);
    });

    await test.step("Step 11: Verify the removed product is no longer in the cart", async () => {
      const cartItemsAfter = await pom.cartPage.getCartItems();
      expect(cartItemsAfter).toHaveLength(1);
      expect(cartItemsAfter.map((i) => i.name)).not.toContain(removedProductName);
    });
  });
});
