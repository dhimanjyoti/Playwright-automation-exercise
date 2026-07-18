// @ts-check
import { test, expect } from "../../../src/fixtures/baseFixture.js";
import { userDataFactory } from "../../../src/utils/user-data-factory.js";
import { SUCCESS_MESSAGES } from "../../../src/constants/message.js";
import path from "path";
import contactData from "../../../src/test-data/marketing/contactFormData.json";

test.describe("Contact Form Functionality", () => {
  test("Verify that user is able to fillup the contact form", async ({
    pom,
  }, testInfo) => {
    test.setTimeout(testInfo.timeout * 1);
    const validUserData = userDataFactory.generateNewRegistrationUser();

    const uploadFilePath = path.resolve(
      process.cwd(),
      "src/test-data/upload",
      contactData.uploadFileName,
    );

    await test.step("Navigate to Contact Us Page", async () => {
      await pom.basePage.navigateToAutomationExcercise();
      await pom.contactUsPage.navigateToContactUsPage();
      await expect(pom.contactUsPage.contactHeaderText).toBeVisible();
    });

    await test.step("Fill out contact form fields", async () => {
      await pom.contactUsPage.fillContactUsForm(
        validUserData.username,
        validUserData.emailAddress,
        contactData.subject,
        contactData.message,
      );
    });

   await test.step("Upload the contact file", async () => {
      await pom.contactUsPage.uploadFileToContactForm(uploadFilePath);
    });

    // We removed the fake "prevent navigation" step entirely.
    await test.step("Submit form, accept dialog, and verify success message", async () => {
      const msg = await pom.contactUsPage.submitAndGetSuccessMessage();
      
      expect(msg).toContain("Success");
      expect(msg).toEqual(SUCCESS_MESSAGES.CONTACT_SUBMITTED);
    });

    await test.step("Navigate back to homePage", async () => {
      await pom.contactUsPage.navigateBackToHome();
      await expect(pom.basePage.homePageBanner).toBeVisible();
    });
  });
});
