import { test, expect } from "../../fixtures/testFixtures";

test.describe("Negative signUp Test", () => {
  test("TC_05: Verify that user is not able to register with a existing email Id", async ({
    basePage,
    signUp,
    data,
  }) => {
    await test.step("Navigate to the application and open login page", async () => {
      await basePage.navigateToAutomationExercise();
      await signUp.signUpWithExistingUser(data);
    });
    await test.step("Verify unsuccessful signUp", async () => {
      await signUp.expectInvalidSignUpMessage();
    });
  });
});
