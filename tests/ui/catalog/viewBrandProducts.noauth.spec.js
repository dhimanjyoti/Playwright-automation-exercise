// @ts-check
import { test, expect } from "../../../src/fixtures/baseFixture.js";
import { BRAND_HEADINGS } from "../../../src/constants/message.js";

test.describe("TC19: View & Cart Brand Products", () => {
  test("Verify user can browse brand products from the left sidebar and add to cart", async ({
    pom,
  }, testInfo) => {
    test.setTimeout(testInfo.timeout * 3);
    await test.step("Step 1-2: Navigate to home page and then to the Products page", async () => {
      await pom.basePage.navigateToAutomationExcercise();
      await pom.basePage.waitForHomePageToLoad();
      await pom.productPage.navigateToProductsPage();
    });

    await test.step("Step 3: Verify Brands section is visible in the left sidebar", async () => {
      await pom.productPage.verifyBrandsSidebarIsVisible();
    });

    await test.step("Step 4-5: Click 'Polo' brand link and verify brand products page heading", async () => {
      await pom.productPage.clickBrandLink("Polo");
      await expect(pom.productPage.brandProductsHeading).toHaveText(
        BRAND_HEADINGS.POLO,
      );
    });

    await test.step("Step 6-7: Click 'H&M' brand from sidebar and verify brand products page heading", async () => {
      await pom.productPage.clickBrandLink("H&M");
      await expect(pom.productPage.brandProductsHeading).toHaveText(
        BRAND_HEADINGS.HM,
      );
    });

    await test.step("Step 8-9: Add first brand product to cart and verify cart contains it", async () => {
      await pom.productPage.addProductToCartByIndex(0);
      await pom.cartPage.clickViewCartModal();
      const cartItems = await pom.cartPage.getCartItems();
      expect(cartItems.length).toBeGreaterThan(0);
    });
  });
});
