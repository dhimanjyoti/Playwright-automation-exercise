// @ts-check
import { test, expect } from "../../../src/fixtures/baseFixture.js";
import { userDataFactory } from "../../../src/utils/user-data-factory.js";
import { ERROR_MESSAGES } from "../../../src/constants/message.js";
import { blockAds } from "../../../src/utils/networkInterceptor.js";

test.describe("Login to Automation Excercise Application", () => {

  test.beforeEach(async ({ pom, page }) => {
    // block the add when site is loading
    await blockAds(page);

    await test.step("Navigate to Automation Exercise and open Login page", async () => {
      await pom.basePage.navigateToAutomationExcercise();
      await pom.basePage.waitForHomePageToLoad();

      await pom.loginPage.navigateToLoginPage();
      await expect(pom.loginPage.loginHeaderText).toBeVisible();
    });
  });

  test("Verify that user is able to login with correct email & password", async ({
    pom,
  }, testInfo) => {
    test.setTimeout(testInfo.timeout * 2);
    const validUser = userDataFactory.getValidLoginCredentials();

    await test.step("Fill the login details and submit the form", async () => {
      await pom.loginPage.submitLoginDetails(
        validUser.emailAddress,
        validUser.password,
      );
    });

    await test.step("Verify successful login", async () => {
      const actualUsername = await pom.basePage.getLoggedInUsername();
      expect(actualUsername).toEqual(validUser.userName);
    });
  });

  test("Login User with incorrect email and password", async ({ pom }, testInfo) => {
    test.setTimeout(testInfo.timeout * 2);
    // To Generate completely unique random credentials every time
    const invalidUserDetails = userDataFactory.generateRandomInvalidCombo();

    await test.step("Enter Invalid Email and Password", async () => {
      await pom.loginPage.submitLoginDetails(
        invalidUserDetails.emailAddress,
        invalidUserDetails.password,
      );
    });

    await test.step("Verify Invalid Error Message", async () => {
      const actualErrorText = await pom.loginPage.getInvalidLoginErrorText();
      expect(actualErrorText).toEqual(ERROR_MESSAGES.AUTH.INVALID_LOGIN);
    });
  });
});
