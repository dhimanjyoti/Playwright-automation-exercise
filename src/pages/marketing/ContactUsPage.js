// @ts-check
import { expect } from "@playwright/test";
import { BasePage } from "../BasePage.js";
import { ALERTS } from "../../constants/message.js";

export class ContactUsPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    this.contactUsLink = page.locator("a[href='/contact_us']");
    this.contactHeaderText = page.locator("h2", { hasText: "Contact Us" });

    // Form Fields
    this.nameInputField = page.locator("[data-qa='name']");
    this.emailInputField = page.locator("[data-qa='email']");
    this.subjectInputField = page.locator("[data-qa='subject']");
    this.messageInputBox = page.locator("[data-qa='message']");

    // File Upload & Submit
    this.uploadFileInput = page.locator("input[name='upload_file']");
    this.submitBtn = page.locator("[data-qa='submit-button']");

    this.successSubmitText = page.locator(".status.alert.alert-success");
    this.backToHomeBtn = page.locator(".btn.btn-success");
    this.successMessage = page.locator(".status");
  }

  /**
   * Clicks the Contact Us nav link and waits for the Contact Us page header
   * to confirm navigation has completed.
   * @returns {Promise<this>}
   */
  async navigateToContactUsPage() {
    await this.contactUsLink.click();
    await this.contactHeaderText.waitFor({ state: "visible", timeout: 5000 });
    await this.page.waitForLoadState("load");
    return this;
  }

  /**
   * Fills the standard text fields of the contact form.
   * @param {string} userName
   * @param {string} emailAddress
   * @param {string} subject
   * @param {string} message
   * @returns {Promise<this>}
   */
  async fillContactUsForm(userName, emailAddress, subject, message) {
    await this.nameInputField.fill(userName);
    await this.emailInputField.fill(emailAddress);
    await this.subjectInputField.fill(subject);
    await this.messageInputBox.fill(message);
    return this;
  }

  /**
   * Upload document/file to the contact form.
   * @param {string} filePath - Absolute path to the file
   * @returns {Promise<this>}
   */
  async uploadFileToContactForm(filePath) {
    await this.uploadFileInput.setInputFiles(filePath);
    return this;
  }

  /**
   * Submits the contact form, natively handles the browser confirmation dialog,
   * and waits for the page to process and display the success banner.
   * @returns {Promise<string>} The text content of the success message.
   */
  async submitAndGetSuccessMessage() {
    const dialogHandled = new Promise((resolve, reject) => {
      this.page.once("dialog", async (dialog) => {
        try {
          expect(dialog.type()).toBe("confirm");
          expect(dialog.message()).toContain(ALERTS.CONTACT_CONFIRM);
          await dialog.accept();
          resolve(undefined);
        } catch (error) {
          reject(error);
        }
      });
    });

    await this.submitBtn.scrollIntoViewIfNeeded();
    await Promise.all([this.submitBtn.click(), dialogHandled]);

    await this.successSubmitText.waitFor({ state: "visible" });

    const message = await this.successSubmitText.textContent();
    return message ? message.trim() : "";
  }

  /**
   * Navigates back home via UI controls.
   * @returns {Promise<this>}
   */
  async navigateBackToHome() {
    await this.backToHomeBtn.click();
    await this.page.waitForURL("/");
    return this;
  }
}
