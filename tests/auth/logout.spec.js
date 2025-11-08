import { test, expect } from "../../fixtures/testFixtures";

test.describe("Logout Functionality", () => {
  test("TC_04: Verify user can successfully logout", async ({
    basePage,
    login,
    data,
  }) => {
    await test.step("Navigate to app and login", async () => {
      await basePage.navigateToAutomationExercise();
      await login.navigateToLoginPage();
      await login.enterLoginCredentials({
        emailAddress: data.emailAddress,
        password: data.password,
      });

      const username = await login.getLoggedInUsername();
      expect(username).toContain(data.username);
    });

    await test.step("Logout and verify", async () => {
      await login.logout();
      expect(await login.isLoggedOut()).toBeTruthy();
    });
  });
});
