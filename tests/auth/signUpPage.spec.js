import { test, expect } from "@playwright/test";
import { BasePage } from "../../pages/BasePage";
import { SignUp } from "../../pages/SignUp";
import { EXPECTED_MESSAGES, signUpTestData } from "../../utils/signUpTestData";
import * as dotenv from "dotenv";
dotenv.config({ path: "./.env", override: true });

test.describe("SignUp Features", () => {
  test("TC_001: Verify that user is able to SignUp to the Application.", async ({
    page,
  }) => {
    // create object
    const basePage = new BasePage(page);
    const signUp = new SignUp(page);

    // Consolidated object to pass signup/password details
    const signUpCredentails = {
      username: signUpTestData.MALE_USER.USERNAME,
      emailAdress: process.env.USEREMAIL,
    };

    // 1. Navigate and go to sign-up form
    await basePage.navigateToAutomationExcercise();
    await signUp.goToSignUpPage();

    // 2. Create the user
    await signUp.createNewUser(signUpCredentails);

    // Consolidate the data for account creation details
    // Merge the static MALE_USER data with the runtime secret (password)
    const fullAccountDetails = {
      ...signUpTestData.MALE_USER.ACCOUNT_INFO,
      PASSWORD: process.env.PASSWORD,
    };

    // 3. Enter the remaining account and adress information
    await signUp.createAccountInfo(fullAccountDetails);
    await signUp.createAddressInfo(signUpTestData.MALE_USER.ADDRESS_INFO);
    await signUp.selectCountry(signUpTestData.MALE_USER.ADDRESS_INFO.COUNTRY);
    await signUp.createAccount();

    // 1. Verify URL redirect (High-level check)
    await expect(page).toHaveURL(/account_created/);

    // 2. Verify the success message content (Detailed check) test
    const actualMessage = await signUp.verifyAccountCreationSuccessMessage();
    expect(actualMessage).toContain(EXPECTED_MESSAGES.SUCCESSFUL_CREATION);
  });
});
