// @ts-check
import { test, expect } from "../../../src/fixtures/baseFixture.js";
import { SUCCESS_MESSAGES } from "../../../src/constants/message.js";

test.describe("TC21: Add Review on Product", () => {
  test("Verify user can submit a product review successfully", async ({
    pom,
    factory,
  }) => {
    const reviewPayload = factory.generateReviewPayload();

    await test.step("Step 1: Navigate to the home page", async () => {
      await pom.basePage.navigateToAutomationExcercise();
      await pom.basePage.waitForHomePageToLoad();
    });

    await test.step("Step 2-3: Click 'Products' nav link and verify 'ALL PRODUCTS' page", async () => {
      await pom.productPage.navigateToProductsPage();
      await expect(pom.productPage.allProductsHeading).toBeVisible();
    });

    await test.step("Step 4: Click 'View Product' for the first product in the list", async () => {
      await pom.productPage.clickFirstViewProduct();
    });

    await test.step("Step 5: Verify 'Write Your Review' section is visible", async () => {
      await pom.productDetailPage.verifyWriteYourReviewSectionIsVisible();
    });

    await test.step("Step 6-7: Fill review form and submit", async () => {
      await pom.productDetailPage.submitProductReview(
        reviewPayload.name,
        reviewPayload.email,
        reviewPayload.review,
      );
    });

    await test.step("Step 8: Verify review success message is displayed", async () => {
      await expect(pom.productDetailPage.reviewSuccessMessage).toBeVisible();
      await expect(pom.productDetailPage.reviewSuccessMessage).toHaveText(
        SUCCESS_MESSAGES.REVIEW_SUBMITTED,
      );
    });
  });
});
