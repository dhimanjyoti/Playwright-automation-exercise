// @ts-check
import { test, expect } from "../../src/fixtures/baseFixture.js";

test.describe("TC26: Verify Scroll Up without Arrow button and Scroll Down functionality", () => {
  test(
    "Scroll down to footer, verify Subscription heading, manually scroll back to top, verify carousel heading returns to viewport",
    async ({ pom }) => {
      await test.step("Step 1: Navigate to home page and verify banner loads", async () => {
        await pom.basePage.navigateToAutomationExcercise();
        await pom.basePage.waitForHomePageToLoad();
        await expect(pom.basePage.homePageBanner).toBeVisible();
      });

      await test.step("Step 2: Programmatically scroll down to the absolute bottom", async () => {
        await pom.homePage.scrollToFooter();
      });

      await test.step("Step 3: Verify SUBSCRIPTION heading in the footer is visible", async () => {
        await expect(pom.homePage.subscriptionHeading).toBeVisible();
      });

      await test.step("Step 4: Scroll back to the top without using the Arrow button", async () => {
        await pom.homePage.scrollToTop();
      });

      await test.step(
        "Step 5 (Core Gate): Verify carousel headline has re-entered the viewport",
        async () => {
          await expect(pom.homePage.carouselHeadingText).toBeInViewport();
        }
      );
    }
  );
});
