import { test, expect } from "../../fixtures/testFixtures";

test.describe("Negative SignUp Test", () => {
  test("TC_05: Verify user is not able to register with an existing email ID", async ({
    basePage,
    signUp,
    data,
  }) => {
    await test.step("Navigate to the application and open Sign Up page", async () => {
      await basePage.navigateToAutomationExercise();
      await signUp.navigateToSignUpPage();
    });

    await test.step("Submit sign-up form with an already existing email", async () => {
      await signUp.enterSignUpCredentials({
        username: data.username,
        emailAddress: data.emailAddress, // existing email
      });
    });

    await test.step("Verify unsuccessful sign-up", async () => {
      const errorText = await signUp.getInvalidSignUpMessage();
      expect(errorText?.trim()).toBe(data.errorText.invalidSignUpText);
    });
  });
});
