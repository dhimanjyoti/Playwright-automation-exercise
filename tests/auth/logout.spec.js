import { test, expect } from "../../fixtures/testFixtures";

test.describe("Logout Functionality", () => {
  test("TC_04: Verify that user is able to successfully logout from the Application.", async ({
    basePage,
    login,
    data,
  }) => {
    await test.step("Navigate to the application", async () => {
      await basePage.navigateToAutomationExercise();
      await login.loginWithValidUser(data);
    });
    await test.step("Logout and verify", async () => {
      await login.logout();
      await login.verifyLogoutSuccessful();
    });
  });
});
