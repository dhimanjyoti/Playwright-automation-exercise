import { test, expect } from "../../fixtures/testFixtures";

test.describe("Product Page Functionality", () => {
  test("TC_09: Verify that user is able to navigate to the 'Product' and 'Product Details' page", async ({
    basePage,
    productsPage,
    page,
  }) => {
    await test.step("Navigate to the application URL and verify HomePage -", async () => {
      await basePage.navigateToAutomationExercise();

      const homeLoaded = await basePage.isHomePageLoaded();
      expect(homeLoaded).toBe(true);
    });

    await test.step("Go to the Product Page and verify the title", async () => {
      await productsPage.navigateToProductPage();
      await expect(page).toHaveURL(/\/products/);
    });

    await test.step("Verify the products list and click on the 'View Product' button", async () => {
      await productsPage.getAllProductNamesAndOpenFirst();
      await expect(page).toHaveURL(/\/product_details\/1/);
    });
    await test.step("Verify the product details is visible", async () => {
      await productsPage.isProductDetailsVisible();
    });
  });
});
