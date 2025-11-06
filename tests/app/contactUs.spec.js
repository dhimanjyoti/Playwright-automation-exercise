import { test, expect } from "../../fixtures/testFixtures";

test.describe("Contact Us form features", () => {
  test("TC_07: Verify that user is able to submit the contact Us form", async ({
    basePage,
    login,
    contactUsPage,
    data,
    page,
  }) => {
    await test.step("Block the Add", async () => {
      await page.route(/.*googleads.*/, (route) => {
        route.abort();
      });
    });

    await test.step("Navigation to the Application URL and verify homepage", async () => {
      await basePage.navigateToAutomationExercise();
      await login.verifyHomePage();
    });

    await test.step("Go to the Contact Us page and verify the title", async () => {
      await contactUsPage.navigateToContactPageVerifyTitle();
    });
    await test.step("Fill the contact form", async () => {
      await contactUsPage.fillFormDetails(data);
    });

    await test.step("Upload the contact file", async () => {
      await contactUsPage.uploadContactFile(data.contactFormData.filePath);
    });
    await test.step("Handle the dialog first (1st submit)", async () => {
      await contactUsPage.handleDialogAndPreventNavigation();
      await page.waitForTimeout(3000);
    });

    await test.step("Submit form and verify success (second submit)", async () => {
      await contactUsPage.verifyFormSubmitAndSuccessMessage();
    });
    await test.step("Navigate back to homePage", async () => {
      await contactUsPage.navigateBackToHome();
    });
  });
});
