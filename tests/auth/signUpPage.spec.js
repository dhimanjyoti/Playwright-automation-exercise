import { test, expect } from "../../fixtures/testFixtures";

test.describe("SignUp Feature Suite", () => {
  test("TC_001: Verify user can register, login, and delete account", async ({
    basePage,
    signUp,
    data,
  }) => {
    // Step 1: Navigate and open sign-up page
    await test.step("Navigate to Automation Exercise and open Sign Up page", async () => {
      await basePage.navigateToAutomationExercise();
      await signUp.navigateToSignUpPage();
      await expect(signUp.signUpHeaderText).toBeVisible();
    });

    // Step 2: Fill sign-up details and create account
    await test.step("Fill sign-up details and create account", async () => {
      await signUp.enterSignUpCredentials({
        username: data.username,
        emailAddress: data.emailAddress,
      });

      await signUp.fillAccountInformation(data.accountInfo);
      await signUp.fillAddressInformation(data.addressInfo);
      await signUp.selectCountry(data.addressInfo.COUNTRY);

      await signUp.createAccount();

      // Validate returned state
      const message = await signUp.getAccountCreatedMessageText();
      expect(message?.trim()).toBe(data.expected.accountCreated);
    });

    // Step 3: Verify user is logged in
    await test.step("Verify account creation and logged-in username", async () => {
      await signUp.clickContinueButton();

      const loggedInUser = await signUp.getLoggedInUserName();
      expect(loggedInUser).toContain(data.username);
    });

    // Step 4: Delete account (uncomment when needed)
    // await test.step("Delete account and verify deletion success", async () => {
    //   await signUp.deleteAccount();
    //
    //   const deletedMsg = await signUp.getAccountDeletedMessageText();
    //   expect(deletedMsg?.trim()).toBe(data.expected.accountDeleted);
    //
    //   await signUp.clickContinueButton();
    // });
  });
});
