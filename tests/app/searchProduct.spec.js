import { test, expect } from "../../fixtures/testFixtures";

test.describe("Search Functionality", () => {
  test("TC_10: Verify that user is able to search a product", async ({
    basePage,
    data,
    page,
    productsPage,
    searchFlow,
    searchProductPage,
  }) => {
    await test.step("Navigate to the application and verify homePage", async () => {
      await basePage.navigateToAutomationExercise();
      expect(await basePage.isHomePageLoaded()).toBe(true);
    });

    await test.step("Go to the Product Page and verify the URL", async () => {
      await productsPage.navigateToProductPage();
      await expect(page).toHaveURL(/\/products/);
    });

    // FLOW handles keyword generation + search + URL assertion
    const { keyword } = await test.step("Search a random product", async () => {
      return await searchFlow.searchRandomProduct(
        data.searchProducts.searchProductsKeyword
      );
    });

    await test.step("Verify all search results are relevant", async () => {
      await searchProductPage.assertSearchResultsRelevant(keyword);
    });
  });
});
