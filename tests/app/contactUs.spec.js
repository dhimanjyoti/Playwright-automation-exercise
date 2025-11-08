import { test, expect } from "../../fixtures/testFixtures";

test.describe("Contact Us form features", () => {
  test("TC_07: Verify that user is able to submit the Contact Us form", async ({
    basePage,
    login,
    contactUsPage,
    data,
    page,
  }) => {
    // Block ads
    await test.step("Block Ads", async () => {
      await page.route(/.*googleads.*/, (route) => route.abort());
    });

    // Navigate home and verify
    await test.step("Navigate to the Application URL and verify homepage", async () => {
      await basePage.navigateToAutomationExercise();

      const homeLoaded = await basePage.isHomePageLoaded();
      expect(homeLoaded).toBe(true);
    });

    // Go to Contact Us
    await test.step("Go to the Contact Us page and verify the title", async () => {
      await contactUsPage.navigateToContactPage();
    });

    // Fill form
    await test.step("Fill the contact form", async () => {
      await contactUsPage.fillFormDetails({
        username: data.username,
        emailAddress: data.emailAddress,
        contactFormData: data.contactFormData,
      });
    });

    // Upload file
    await test.step("Upload the contact file", async () => {
      await contactUsPage.uploadContactFile(data.contactFormData.filePath);
    });

    // First submit: dialog handler
    await test.step("Handle the dialog on first submit", async () => {
      await contactUsPage.handleDialogAndPreventNavigation();
    });

    // Second submit + success message
    await test.step("Submit form again & verify success message", async () => {
      const msg = await contactUsPage.submitAndGetSuccessMessage();
      expect(msg).toContain("Success");
    });

    // Back home
    await test.step("Navigate back to homePage", async () => {
      await contactUsPage.navigateBackToHome();
      const homeLoaded = await basePage.isHomePageLoaded();
      expect(homeLoaded).toBe(true);
    });
  });
});
