import { test, expect } from "../../fixtures/testFixtures";

test.describe("Subscription Featurs", () => {
  test("TC_11: Verify that user is able to 'Subscribe' to the Application", async ({
    basePage,
    homePage,
    data,
    page,
  }) => {
    await test.step("Navigate to the application and verify homepage", async () => {
      await basePage.navigateToAutomationExercise();

      const homeLoaded = await basePage.isHomePageLoaded();
      expect(homeLoaded).toBe(true);
    });

    await test.step("Scroll to the 'Subscription' box and fill email address", async () => {
      await homePage.navigateToSubscriptionAndEnterEmailAdress(
        data.emailAddress
      );
    });

    await test.step("Verify success message", async () => {
      const msg = await homePage.isSuccessfullySubscribe();
      expect(msg?.trim()).toBe(data.successMessageData.successMessage);
    });
  });
});
