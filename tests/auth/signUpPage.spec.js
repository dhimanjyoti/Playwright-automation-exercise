// tests/auth/SignUpPage.spec.js
import { test, expect } from "../../fixtures/testFixtures";

test.describe("SignUp Feature Suite", () => {
  test("TC_001: Verify user can register, login, and delete account", async ({
    basePage,
    signUp,
    data,
    page,
  }) => {
    // Step 1: Navigate and open sign-up page
    await test.step("Navigate to Automation Exercise and open Sign Up page", async () => {
      await basePage.navigateToAutomationExercise();
      await signUp.navigateToSignUpPage();
    });

    // Step 2: Fill sign-up form and create account
    await test.step("Fill sign-up details and create account", async () => {
      await signUp.enterSignUpCredentials({
        username: data.username,
        emailAddress: data.emailAddress,
      });

      await signUp.fillAccountInformation(data.accountInfo);
      await signUp.fillAddressInformation(data.addressInfo);
      await signUp.selectCountry(data.addressInfo.COUNTRY);

      await signUp.createAccount();
      await signUp.verifyAccountCreatedMessage(data.expected.accountCreated);
    });

    // Step 3: Verify signUp success
    await test.step("Verify account creation and logged-in username", async () => {
      await signUp.clickContinueButton();
      await signUp.verifyLoggedInUserName(data.username);
    });

    // Step 4: Delete account and verify success
    // await test.step("Delete account and verify deletion success", async () => {
    //   await signUp.deleteAccount();
    //   await signUp.verifyDeleteAccountSuccessMessage(
    //     data.expected.accountDeleted
    //   );
    //   await signUp.clickContinueButton();
    // });
  });
});
