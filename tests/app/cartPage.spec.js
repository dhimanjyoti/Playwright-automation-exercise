import { test, expect } from "../../fixtures/testFixtures";

test.describe("Subscribe Features in the Cart Page", () => {
  test("TC_12: Verify that user is able to subscribe from the 'Cart' Page", async ({
    basePage,
    homePage,
    cartPage,
    data,
  }) => {
    await test.step("Navigate to the application", async () => {
      await basePage.navigateToAutomationExercise();

      const homeLoaded = await basePage.isHomePageLoaded();
      expect(homeLoaded).toBe(true);
    });

    await test.step("Fill the subscription box", async () => {
      await homePage.subscribe(data.emailAddress);
    });

    await test.step("Verify success message", async () => {
      const msg = await cartPage.getSubscriptionSuccessMessage();
      expect(msg?.trim()).toBe(data.successMessageData.successMessage);
    });
  });
});
