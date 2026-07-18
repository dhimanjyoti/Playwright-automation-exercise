// @ts-check
import { test, expect } from "../../../src/fixtures/baseFixture.js";
import { CATEGORY_HEADINGS } from "../../../src/constants/message.js";

test.describe("TC18: View Category Products", () => {
  test("Verify user can browse products by category using the left sidebar", async ({
    pom,
  }) => {
    await test.step("Step 1-2: Navigate to home page and verify category sidebar is visible", async () => {
      await pom.basePage.navigateToAutomationExcercise();
      await pom.basePage.waitForHomePageToLoad();
      await pom.categoryPage.verifyCategorySidebarIsVisible();
    });

    await test.step("Step 3-4: Expand 'Women' category and click 'Dress' sub-category", async () => {
      await pom.categoryPage.expandAndClickSubCategory("Women", "Dress");
    });

    await test.step("Step 5: Verify the Women Dress category page is displayed", async () => {
      await expect(pom.categoryPage.categoryProductsHeading).toHaveText(
        CATEGORY_HEADINGS.WOMEN_DRESS,
      );
    });

    await test.step("Step 6-7: Expand 'Men' category, click 'Tshirts' and verify navigation", async () => {
      await pom.categoryPage.expandAndClickSubCategory("Men", "Tshirts");
      await expect(pom.categoryPage.categoryProductsHeading).toHaveText(
        CATEGORY_HEADINGS.MEN_TSHIRTS,
      );
    });
  });
});
