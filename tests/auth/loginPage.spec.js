import { test, expect } from "../../fixtures/testFixtures";

test.describe("Login Feature Suite", () => {
  test("TC_02: Verify that user is able to login with correct email & password", async ({
    basePage,
    login,
    data,
  }) => {
    // Step 1: Navigate and open login page
    await test.step("Navigate to Automation Exercise and open Login page", async () => {
      await basePage.navigateToAutomationExercise();
      await expect(await basePage.isHomePageLoaded()).toBeTruthy();

      await login.navigateToLoginPage();

      // Stability assertion
      await expect(login.loginHeaderText).toBeVisible();
    });

    // Step 2: Fill login credentials
    await test.step("Fill login details and submit form", async () => {
      await login.enterLoginCredentials({
        emailAddress: data.emailAddress,
        password: data.password,
      });
    });

    // Step 3: Verify login success
    await test.step("Verify successful login", async () => {
      const username = await login.fetchLoggedInUsername();
      expect(username).toContain(data.username);
    });
  });
});
