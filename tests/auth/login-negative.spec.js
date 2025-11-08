import { test, expect } from "../../fixtures/testFixtures";
import { loginDataFactory } from "../../utils/dataFactory";

test.describe("Negative Login Test", () => {
  test("TC_03: Verify user cannot login with invalid email or password", async ({
    basePage,
    login,
    data,
  }) => {
    // Step 1: Navigate and open login page
    await test.step("Navigate to the application and open Login page", async () => {
      await basePage.navigateToAutomationExercise();

      // Assert using state exposure
      await expect(await basePage.isHomePageLoaded()).toBeTruthy();

      await login.navigateToLoginPage();

      await expect(login.loginHeaderText).toBeVisible();
    });

    // Step 2: Fill login details
    await test.step("Enter invalid login details and submit", async () => {
      await login.enterLoginCredentials(loginDataFactory.randomInvalidCombo());
    });

    // Step 3: Verify negative login scenario
    await test.step("Verify error message for invalid login", async () => {
      const msg = await login.getInvalidLoginMessage();
      expect(msg?.trim()).toBe(data.errorText.invalidLoginText);
    });
  });
});
