import { expect } from "@playwright/test";
import { preventFormSubmit, waitForFewSeconds } from "../utils/helper";
const LOAD_STATE = "domcontentloaded"; // standardize page load waits
export class ContactUs {
  constructor(page) {
    this.page = page;
    this.locators = {
      contactUsBtn: page.locator("//a[normalize-space()='Contact us']"),
      contactUsPageTitle: page.locator(
        "//h2[normalize-space()='Get In Touch']"
      ),
      enterName: page.locator("[data-qa='name']"),
      enterEmail: page.locator("[data-qa='email']"),
      subject: page.locator("[data-qa='subject']"),
      messageBox: page.locator("[data-qa='message']"),
      chooseFile: page.locator("//input[@name='upload_file']"),
      submitBtn: page.locator("[data-qa='submit-button']"),
      successSubmitText: page.locator(".status.alert.alert-success"),
      backToHomeBtn: page.locator(".btn.btn-success"),
    };
  }

  async navigateToContactPageVerifyTitle() {
    await this.locators.contactUsBtn.click(),
      await expect(
        this.locators.contactUsPageTitle,
        "Header Text is not visibile as contact Us page didn't load"
      ).toBeVisible();
    await expect(this.page).toHaveURL(/contact_us/i);
  }

  async fillFormDetails({ username, emailAddress, contactFormData }) {
    await this.locators.enterName.fill(username);
    await this.locators.enterEmail.fill(emailAddress);
    await this.locators.subject.fill(contactFormData.subject);
    await this.locators.messageBox.fill(contactFormData.message);
  }
  async uploadContactFile(filePath) {
    // await this.locators.chooseFile.click();
    await this.locators.chooseFile.setInputFiles(filePath);
  }
  /**
   * First click: Prevents navigation and handles dialog
   */
  async handleDialogAndPreventNavigation() {
    await preventFormSubmit(this.page);

    this.page.once("dialog", async (dialog) => {
      expect(dialog.type()).toBe("confirm");
      expect(dialog.message()).toContain("Press OK to proceed!");
      await dialog.accept();
    });

    await this.locators.submitBtn.click();
    // wait for few seconds after clicking the button
    await waitForFewSeconds(
      this.page,
      3,
      "waiting for dialog confirmation effect"
    );
  }

  /**
   * Second click: Actually submits and shows success message
   */
  async verifyFormSubmitAndSuccessMessage() {
    await this.locators.submitBtn.click();

    await this.locators.successSubmitText.waitFor({ state: "attached" });
    const message = (
      await this.locators.successSubmitText.textContent()
    )?.trim();
    expect(message, "Success message should not be empty").toBeTruthy();
    return message;
  }

  async navigateBackToHome() {
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: LOAD_STATE }),
      this.locators.backToHomeBtn.click(),
    ]);
    await expect(this.page).toHaveURL("/");
  }
}
