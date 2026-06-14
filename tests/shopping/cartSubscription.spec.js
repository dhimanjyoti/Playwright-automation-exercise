// @ts-check
import { test, expect } from "../../src/fixtures/baseFixture.js";
import { SUCCESS_MESSAGES, SECTION_HEADINGS } from "../../src/constants/message.js";

test.describe("TC11: Verify Subscription in Cart page", () => {
  test("Verify subscription functionality in the cart page footer", async ({
    pom,
    factory,
  }) => {
    const { emailAddress } = factory.generateRandomInvalidCombo();

    await test.step("Step 1-2: Navigate to home page and verify it is visible", async () => {
      await pom.basePage.navigateToAutomationExcercise();
      await pom.basePage.waitForHomePageToLoad();
      await expect(pom.basePage.homePageBanner).toBeVisible();
    });

    await test.step("Step 3: Click Cart button", async () => {
      await pom.cartPage.navigateToCart();
    });

    await test.step("Step 4: Scroll down to the footer", async () => {
      await pom.cartPage.scrollToFooter();
    });

    await test.step("Step 5: Verify 'SUBSCRIPTION' text is visible", async () => {
      await expect(pom.cartPage.subscriptionHeading).toBeVisible();
      await expect(pom.cartPage.subscriptionHeading).toHaveText(
        SECTION_HEADINGS.SUBSCRIPTION,
      );
    });

    await test.step("Step 6: Enter email and click the arrow button", async () => {
      await pom.cartPage.subscribeWithEmail(emailAddress);
    });

    await test.step("Step 7: Verify subscription success message", async () => {
      await expect(pom.cartPage.subscriptionSuccessAlert).toBeVisible();
      await expect(pom.cartPage.subscriptionSuccessAlert).toHaveText(
        SUCCESS_MESSAGES.SUBSCRIPTION_SUCCESS,
      );
    });
  });
});
