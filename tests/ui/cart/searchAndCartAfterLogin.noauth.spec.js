// @ts-check
import { test, expect } from "../../../src/fixtures/baseFixture.js";
import { SEARCH_HEADINGS } from "../../../src/constants/message.js";

test.describe("TC20: Search Products and Verify Cart After Login", () => {
  test("Verify searched products persist in cart after user logs in", async ({
    pom,
  }) => {
    await test.step("Step 1-3: Navigate to home page then search for 'tshirt' products", async () => {
      await pom.basePage.navigateToAutomationExcercise();
      await pom.basePage.waitForHomePageToLoad();
      await pom.productPage.navigateToProductsPage();
      await pom.productPage.searchForProduct("tshirt");
    });

    await test.step("Step 4: Verify 'Searched Products' heading is visible and results are present", async () => {
      await expect(pom.productPage.searchedProductsHeading).toBeVisible();
      await expect(pom.productPage.searchedProductsHeading).toHaveText(
        SEARCH_HEADINGS.SEARCHED_PRODUCTS,
      );
      await pom.productPage.verifySearchResultsAreVisible();
    });

    /** @type {string[]} */
    let preLoginCartNames = [];

    await test.step("Step 5: Capture searched product names then add all to cart", async () => {
      preLoginCartNames = await pom.productPage.getSearchedProductNames();
      expect(preLoginCartNames.length).toBeGreaterThan(0);
      await pom.productPage.addAllSearchedProductsToCart();
    });

    await test.step("Step 6: Navigate to Cart and verify products are present", async () => {
      await pom.cartPage.navigateToCart();
      await pom.cartPage.verifyCartIsDisplayed();
      const cartItems = await pom.cartPage.getCartItems();
      expect(cartItems.length).toBe(preLoginCartNames.length);
    });

    await test.step("Step 7: Navigate to Login page and submit valid credentials", async () => {
      await pom.basePage.openAuthPage();
      await pom.loginPage.submitLoginDetails(
        process.env.USER_EMAIL ?? "",
        process.env.PASSWORD ?? "",
      );
    });

    await test.step("Step 8: Navigate back to the Cart page after login", async () => {
      await pom.cartPage.navigateToCart();
      await pom.cartPage.verifyCartIsDisplayed();
    });

    await test.step("Step 9: Verify every searched product is still present in the cart after login", async () => {
      const postLoginCartItems = await pom.cartPage.getCartItems();
      // The authenticated account may merge its own pre-existing cart items,
      // so the count can be >= the pre-login count. What matters is that ALL
      // products added from the search results are still visible.
      expect(postLoginCartItems.length).toBeGreaterThanOrEqual(
        preLoginCartNames.length,
      );
      const postLoginNames = postLoginCartItems.map((item) => item.name);
      for (const name of preLoginCartNames) {
        expect(postLoginNames).toContain(name);
      }
    });
  });
});
