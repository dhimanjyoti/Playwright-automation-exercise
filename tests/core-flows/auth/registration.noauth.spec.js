// @ts-check
import { test, expect } from "../../../src/fixtures/baseFixture.js";
import registrationData from "../../../src/test-data/auth/registrationData.json";

const userProfiles = /** @type {("MALE_USER" | "FEMALE_USER")[]} */ (
  Object.keys(registrationData)
);

test.describe("Register user into automation exercise application", () => {
  for (const gender of userProfiles) {
    test(`TC:01: Verify user is able to register as a ${gender}`, async ({
      pom,
      factory,
    }, testInfo) => {
      test.setTimeout(testInfo.timeout * 3);
      const data = factory.generateNewRegistrationUser(gender);

      await test.step("Navigate to the Automation Exercise and open Sign up page", async () => {
        await pom.basePage.navigateToAutomationExcercise();
        await pom.registrationPage.navigateToSignUpPage();
        await expect(pom.registrationPage.signUpHeaderText).toBeVisible();
      });

      await test.step("Fill out initial registration credentials", async () => {
        await pom.registrationPage.enterSignUpCredentials(
          data.username,
          data.emailAddress,
        );
      });

      await test.step("Fill out detailed account and address information", async () => {
        await pom.registrationPage.fillAccountInformation(data.accountInfo);
        await pom.registrationPage.fillAddressInformation(data.addressInfo);
        await pom.registrationPage.selectCountry(data.addressInfo.COUNTRY);
      });

      await test.step("Submit form and verify account creation", async () => {
        await pom.registrationPage.createAccount();
      });
    });
  }
});
