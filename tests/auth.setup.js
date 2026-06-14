// @ts-check
import { test as setup, expect } from "../src/fixtures/baseFixture.js";
import { userDataFactory } from "../src/utils/user-data-factory.js";

// Define where we want to save the session data
const authFile = ".auth/user.json";

setup("Authenticate and save state", async ({ pom, page }, testInfo) => {
  setup.setTimeout(testInfo.timeout * 2);
  const validUser = userDataFactory.getValidLoginCredentials();

  await setup.step("Navigate and Login", async () => {
    await pom.basePage.navigateToAutomationExcercise();
    await pom.loginPage.navigateToLoginPage();
    await pom.loginPage.submitLoginDetails(
      validUser.emailAddress,
      validUser.password,
    );
  });

  await setup.step("Verify login and save state", async () => {
    // Always assert the login actually worked before saving!
    const actualUsername = await pom.basePage.getLoggedInUsername();
    expect(actualUsername).toEqual(validUser.userName);

    // Save all cookies and local storage to the file
    await page.context().storageState({ path: authFile });
  });
});
