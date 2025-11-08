import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SignUp extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
    // Headers
    this.signUpHeaderText = page.locator(
      "//h2[normalize-space()='New User Signup!']"
    );

    // Sign Up Form
    this.userNameInput = page.locator("[data-qa='signup-name']");
    this.userEmailInput = page.locator("[data-qa='signup-email']");
    this.signUpBtn = page.locator("[data-qa='signup-button']");

    // Account details
    this.selectTitle = page.locator("[data-qa='title']");
    this.passwordInput = page.locator("[data-qa='password']");
    this.birthDayDropdown = page.locator("[data-qa='days']");
    this.birthMonthDropdown = page.locator("[data-qa='months']");
    this.birthYearDropdown = page.locator("[data-qa='years']");

    // Address
    this.firstNameInput = page.locator("[data-qa='first_name']");
    this.lastNameInput = page.locator("[data-qa='last_name']");
    this.companyInput = page.locator("[data-qa='company']");
    this.addressLine1Input = page.locator("[data-qa='address']");
    this.addressLine2Input = page.locator("[data-qa='address2']");
    this.countryDropdown = page.locator("[data-qa='country']");
    this.stateInput = page.locator("[data-qa='state']");
    this.cityInput = page.locator("[data-qa='city']");
    this.zipcodeInput = page.locator("[data-qa='zipcode']");
    this.mobileInput = page.locator("[data-qa='mobile_number']");

    // Buttons
    this.createAccountBtn = page.locator("[data-qa='create-account']");
    this.continueBtn = page.locator("[data-qa='continue-button']");
    this.deleteAccountBtn = page.locator("//a[contains(.,'Delete Account')]");

    // Verification Locators
    this.accountCreatedMsg = page.locator("[data-qa='account-created'] b");
    this.accountDeletedMsg = page.locator("[data-qa='account-deleted'] b");
    this.invalidSignUp = page.locator(
      "//p[normalize-space()='Email Address already exist!']"
    );
  }

  /**
   * Navigate to Sign Up page
   */
  async navigateToSignUpPage() {
    await this.openAuthPage();
    await expect(this.signUpHeaderText).toBeVisible(); // stability wait allowed
    return this;
  }

  /**
   * Fill sign up credentials (username + email)
   */
  async enterSignUpCredentials({ username, emailAddress }) {
    await this.userNameInput.fill(username);
    await this.userEmailInput.fill(emailAddress);
    await this.signUpBtn.click();
    return this;
  }

  /**
   * Fill basic account information (title, password, DOB)
   */
  async fillAccountInformation({
    TITLE,
    PASSWORD,
    BIRTHDATE,
    BIRTHMONTH,
    BIRTHYEAR,
  }) {
    await this.selectTitle.locator(`[value='${TITLE}']`).check();
    await this.passwordInput.fill(PASSWORD);
    await this.birthDayDropdown.selectOption(BIRTHDATE.toString());
    await this.birthMonthDropdown.selectOption(BIRTHMONTH.toString());
    await this.birthYearDropdown.selectOption(BIRTHYEAR.toString());
    return this;
  }

  /**
   * Fill address, contact, and company details
   */
  async fillAddressInformation({
    FIRST_NAME,
    LAST_NAME,
    COMPANY,
    STREETADDRESS,
    HOMEADRESS,
    STATE,
    CITY,
    ZIPCODE,
    MOBILENUMBER,
  }) {
    await this.firstNameInput.fill(FIRST_NAME);
    await this.lastNameInput.fill(LAST_NAME);
    await this.companyInput.fill(COMPANY);
    await this.addressLine1Input.fill(STREETADDRESS);
    await this.addressLine2Input.fill(HOMEADRESS);
    await this.stateInput.fill(STATE);
    await this.cityInput.fill(CITY);
    await this.zipcodeInput.fill(ZIPCODE.toString());
    await this.mobileInput.fill(MOBILENUMBER.toString());
    return this;
  }

  /**
   * Select country from dropdown
   */
  async selectCountry(countryName) {
    await this.countryDropdown.selectOption({ label: countryName });
    return this;
  }

  /**
   * Create account and wait for navigation
   */
  async createAccount() {
    await this.createAccountBtn.click();
    await this.page.waitForURL(/account_created/i);
    return this;
  }

  /**
   * Verify success message after account creation
   */
  async getAccountCreatedMessageText() {
    await expect(this.accountCreatedMsg).toBeVisible(); // stability
    return this.accountCreatedMsg.textContent();
  }

  /**
   * Click continue button after account creation
   */
  async clickContinueButton() {
    await this.continueBtn.click();
    await this.page.waitForURL("/");
    return this;
  }

  /**
   * Verify logged-in user's name matches expected
   */
  async getLoggedInUserName() {
    return this.getLoggedInUsername(); // from BasePage
  }

  /**
   * Delete account and wait for redirect
   */
  async deleteAccount() {
    await this.deleteAccountBtn.click();
    await this.page.waitForURL(/account_deleted/i);
    return this;
  }

  /**
   * Verify success message after account deletion
   */
  async getAccountDeletedMessageText() {
    await expect(this.accountDeletedMsg).toBeVisible(); // stability
    return this.accountDeletedMsg.textContent();
  }

  async signUpWithExistingUser({ username, emailAddress }) {
    await this.navigateToSignUpPage();
    await this.enterSignUpCredentials({ username, emailAddress });
    return this;
  }

  async getInvalidSignUpMessage() {
    await expect(this.invalidSignUp).toBeVisible();
    return this.invalidSignUp.textContent();
  }
}
