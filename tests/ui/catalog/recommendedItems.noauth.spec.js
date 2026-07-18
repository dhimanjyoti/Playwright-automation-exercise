// @ts-check
import { test, expect } from "../../../src/fixtures/baseFixture.js";

test.describe("TC22: Add to Cart from Recommended Items", () => {
  test(
    "Verify user can add a recommended item to the cart",
    async ({ pom }, testInfo) => {
      test.setTimeout(testInfo.timeout * 2);
      /** @type {string} */
      let addedProductName;

      await test.step("Steps 1-2: Navigate to home page and verify it is loaded", async () => {
        await pom.basePage.navigateToAutomationExcercise();
        await pom.basePage.waitForHomePageToLoad();
        await expect(pom.basePage.homePageBanner).toBeVisible();
      });

      await test.step("Step 3: Scroll to bottom and verify RECOMMENDED ITEMS section is visible", async () => {
        await pom.homePage.scrollToRecommendedSection();
        await pom.homePage.verifyRecommendedItemsSectionIsVisible();
        await expect(pom.homePage.recommendedItemsHeading).toBeVisible();
      });

      await test.step("Step 4: Add first recommended item to cart and capture product name", async () => {
        addedProductName = await pom.homePage.addFirstRecommendedItemToCart();
      });

      await test.step("Step 5: Click View Cart from the confirmation modal", async () => {
        await pom.cartPage.clickViewCartModal();
      });

      await test.step("Step 6: Verify the added product is displayed in the cart", async () => {
        await pom.cartPage.verifyCartIsDisplayed();
        await pom.cartPage.verifyProductIsInCart(addedProductName);
      });
    }
  );
});
