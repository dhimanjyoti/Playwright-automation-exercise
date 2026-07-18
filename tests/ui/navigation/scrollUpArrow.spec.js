// @ts-check
import { test, expect } from "../../../src/fixtures/baseFixture.js";

test.describe("TC25: Verify Scroll Up using Arrow button and Scroll Down functionality", () => {
  test(
    "Scroll down to footer, verify Subscription heading, click scroll-up arrow, verify carousel heading returns to viewport",
    async ({ pom }) => {
      await test.step("Step 1: Navigate to home page and verify banner loads", async () => {
        await pom.basePage.navigateToAutomationExcercise();
        await pom.basePage.waitForHomePageToLoad();
        await expect(pom.basePage.homePageBanner).toBeVisible();
      });

      await test.step("Step 2: Scroll down to the absolute bottom of the page", async () => {
        await pom.homePage.scrollToFooter();
      });

      await test.step("Step 3: Verify SUBSCRIPTION heading in the footer is visible", async () => {
        await expect(pom.homePage.subscriptionHeading).toBeVisible();
      });

      await test.step("Step 4: Click the floating scroll-up Arrow button", async () => {
        await pom.homePage.clickScrollUpArrow();
      });

      await test.step(
        "Step 5 (Core Gate): Verify carousel headline is back in the viewport",
        async () => {
          await expect(pom.homePage.carouselHeadingText).toBeInViewport();
        }
      );
    }
  );
});
