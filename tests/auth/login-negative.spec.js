import { test, expect } from "../../fixtures/testFixtures";
import { loginDataFactory } from "../../utils/dataFactory";

test.describe("Negative Login Test", () => {
  test("TC_03: Verify that user is not able to login to the application with the invalid 'Email' and 'Password'", async ({
    basePage,
    login,
    data,
  }) => {
    await test.step("Navigate to the application and open login page", async () => {
      await basePage.navigateToAutomationExercise();
      await login.verifyHomePage();
      await login.navigateToLoginPage();
    });

    await test.step("Fill the login details and click Login", async () => {
      await login.enterLoginCredentails(loginDataFactory.randomInvalidCombo());

      await test.step("Verify login email or password are incorrect!", async () => {
        const message = await login.expectInvalidLoginMessage();
        expect(message.trim()).toBe(data.errorText.invalidText);
      });
    });
  });
});
