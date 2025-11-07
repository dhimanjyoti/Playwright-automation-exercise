import { test, expect } from "../../fixtures/testFixtures";

test.describe("Login Feature Suite", () => {
  test("TC_02: Verify that user is able to login to the Application with correct email and password", async ({
    basePage,
    login,
    data,
    page,
  }) => {
    // Step 1: Navigate and open login page
    await test.step("Navigate to Automation Exercise and open Login page", async () => {
      await basePage.navigateToAutomationExercise();
      await basePage.verifyHomePage();
      await login.navigateToLoginPage();
    });
    // Step 2: fil the login details and click login
    await test.step("Fill the login Details and click on the 'login' Button", async () => {
      await login.enterLoginCredentails({
        emailAddress: data.emailAddress,
        password: data.password,
      });
      // Step 3: Verify login success
      await test.step("Verify successful login", async () => {
        const username = await login.verifySuccessfulLogin();
        expect(username).toContain(data.username);
      });
    });
  });
});
