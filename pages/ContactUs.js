import { expect } from "@playwright/test";
import { preventFormSubmit, waitForFewSeconds } from "../utils/helper";

export class ContactUs {
  constructor(page) {
    this.page = page;

    // Locators
    this.contactUsBtn = page.locator("//a[normalize-space()='Contact us']");
    this.contactUsPageTitle = page.locator(
      "//h2[normalize-space()='Get In Touch']"
    );
    this.enterName = page.locator("[data-qa='name']");
    this.enterEmail = page.locator("[data-qa='email']");
    this.subject = page.locator("[data-qa='subject']");
    this.messageBox = page.locator("[data-qa='message']");
    this.chooseFile = page.locator("//input[@name='upload_file']");
    this.submitBtn = page.locator("[data-qa='submit-button']");
    this.successSubmitText = page.locator(".status.alert.alert-success");
    this.backToHomeBtn = page.locator(".btn.btn-success");
  }

  /**
   * Navigate to Contact page
   */
  async navigateToContactPage() {
    await this.contactUsBtn.click();
    await expect(this.contactUsPageTitle).toBeVisible();
    return this;
  }

  /**
   * Fills basic form details
   */
  async fillFormDetails({ username, emailAddress, contactFormData }) {
    await this.enterName.fill(username);
    await this.enterEmail.fill(emailAddress);
    await this.subject.fill(contactFormData.subject);
    await this.messageBox.fill(contactFormData.message);
    return this;
  }

  /**
   * Upload file
   */
  async uploadContactFile(filePath) {
    await this.chooseFile.setInputFiles(filePath);
    return this;
  }

  /**
   * Handles the JS dialog for "Press OK to proceed!"
   */
  async handleDialogAndPreventNavigation() {
    await preventFormSubmit(this.page);

    this.page.once("dialog", async (dialog) => {
      expect(dialog.type()).toBe("confirm");
      expect(dialog.message()).toContain("Press OK to proceed!");
      await dialog.accept();
    });

    await this.submitBtn.click();

    // helper
    await waitForFewSeconds(
      this.page,
      3,
      "waiting for dialog confirmation effect"
    );
    return this;
  }

  async submitAndGetSuccessMessage() {
    await this.submitBtn.click();

    // stability wait
    await this.successSubmitText.waitFor({ state: "visible" });

    const message = (await this.successSubmitText.textContent())?.trim();
    return message;
  }

  /**
   * Navigate back to Home
   */
  async navigateBackToHome() {
    await this.backToHomeBtn.click();
    await this.page.waitForURL("/");
    return this;
  }
}
