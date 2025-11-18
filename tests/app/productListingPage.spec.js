import { test, expect } from "../../fixtures/testFixtures";

test.describe("Add Product in Cart Featurs", () => {
  test("TC:13: Verify that user is able to Add Product in the cart", async ({
    basePage,
    productsPage,
    productListingPage,
    cartPage,
    page,
  }) => {
    // Block ads
    await test.step("Block Ads", async () => {
      await page.route(/.*googleads.*/, (route) => route.abort());
    });

    await test.step("Navigate to the Application and verify homePage", async () => {
      await basePage.navigateToAutomationExercise();

      const homeLoaded = await basePage.isHomePageLoaded();
      expect(homeLoaded).toBe(true);
    });
    // Capture product name from UI
    const firstProductName = await productListingPage.getProductNameByIndex(0);
    const secondProductName = await productListingPage.getProductNameByIndex(1);

    // Capture product price from UI
    const firstProductPrice = await productListingPage.getProductPriceByIndex(
      0
    );
    const secondProductPrice = await productListingPage.getProductPriceByIndex(
      1
    );

    await test.step("Go to the Product page and add 1st item to the cart", async () => {
      await productsPage.navigateToProductPage();

      await productListingPage.addFirstProductToCart();
      await productListingPage.continueShopping();
    });

    await test.step("Add second product to cart", async () => {
      await productListingPage.addSecondProductToCart();
      await productListingPage.goToCart();
    });

    await test.step("Verify both products appears in cart", async () => {
      const cartNames = await cartPage.getCartProductNames();
      expect(cartNames).toEqual(
        expect.arrayContaining([firstProductName, secondProductName])
      );
    });

    await test.step("Verify the product prices, quantity and total price of fist product", async () => {
      const price1 = await cartPage.getCartPriceByIndex(0);
      const qty1 = await cartPage.getCartQuantityByIndex(0);
      const total1 = await cartPage.getCartTotalPriceByIndex(0);

      expect(price1).toBe(firstProductPrice);
      expect(qty1).toBe(1);
      expect(total1).toBe(price1 * qty1);
    });

    await test.step("Verify price, quantity, and total of second product", async () => {
      const price2 = await cartPage.getCartPriceByIndex(1);
      const qty2 = await cartPage.getCartQuantityByIndex(1);
      const total2 = await cartPage.getCartTotalPriceByIndex(1);

      expect(price2).toBe(secondProductPrice);
      expect(qty2).toBe(1);
      expect(total2).toBe(price2 * qty2);
    });
  });
});
