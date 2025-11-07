import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";

const LOAD_STATE = "domcontentloaded"; // standardize page load waits

export class SignUp extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
    this.locators = {
      // Keep the BasePage locators
      ...this.locators,
      // Sign Header Text
      signUpHeaderText: page.locator(
        "//h2[normalize-space()='New User Signup!']"
      ),

      // Sign-up form
      userNameInput: page.locator("[data-qa='signup-name']"),
      userEmailInput: page.locator("[data-qa='signup-email']"),
      signUpBtn: page.locator("[data-qa='signup-button']"),

      // Account details
      selectTitle: page.locator("[data-qa='title']"),
      passwordInput: page.locator("[data-qa='password']"),
      birthDayDropdown: page.locator("[data-qa='days']"),
      birthMonthDropdown: page.locator("[data-qa='months']"),
      birthYearDropdown: page.locator("[data-qa='years']"),

      // Address section
      firstNameInput: page.locator("[data-qa='first_name']"),
      lastNameInput: page.locator("[data-qa='last_name']"),
      companyInput: page.locator("[data-qa='company']"),
      addressLine1Input: page.locator("[data-qa='address']"),
      addressLine2Input: page.locator("[data-qa='address2']"),
      countryDropdown: page.locator("[data-qa='country']"),
      stateInput: page.locator("[data-qa='state']"),
      cityInput: page.locator("[data-qa='city']"),
      zipcodeInput: page.locator("[data-qa='zipcode']"),
      mobileInput: page.locator("[data-qa='mobile_number']"),

      // Buttons
      createAccountBtn: page.locator("[data-qa='create-account']"),
      continueBtn: page.locator("[data-qa='continue-button']"),
      deleteAccountBtn: page.locator("//a[contains(.,'Delete Account')]"),

      // Verification elements
      accountCreatedMsg: page.locator("[data-qa='account-created'] b"),
      accountDeletedMsg: page.locator("[data-qa='account-deleted'] b"),

      // invalid SignUp
      invalidSignUp: page.locator(
        "//p[normalize-space()='Email Address already exist!']"
      ),
    };
  }

  /**
   * Navigate to Sign Up page
   */
  async navigateToSignUpPage() {
    await this.openAuthPage();
    await expect(
      this.locators.signUpHeaderText,
      "Home Page did not load"
    ).toBeVisible();
    await expect(this.page).toHaveURL(/login/i);
  }

  /**
   * Fill sign up credentials (username + email)
   */
  async enterSignUpCredentials({ username, emailAddress }) {
    await this.locators.userNameInput.fill(username);
    await this.locators.userEmailInput.fill(emailAddress);

    await Promise.all([
      this.page.waitForNavigation({ waitUntil: LOAD_STATE }),
      this.locators.signUpBtn.click(),
    ]);
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
    await this.locators.selectTitle.locator(`[value='${TITLE}']`).check();
    await this.locators.passwordInput.fill(PASSWORD);
    await this.locators.birthDayDropdown.selectOption(BIRTHDATE.toString());
    await this.locators.birthMonthDropdown.selectOption(BIRTHMONTH.toString());
    await this.locators.birthYearDropdown.selectOption(BIRTHYEAR.toString());
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
    await this.locators.firstNameInput.fill(FIRST_NAME);
    await this.locators.lastNameInput.fill(LAST_NAME);
    await this.locators.companyInput.fill(COMPANY);
    await this.locators.addressLine1Input.fill(STREETADDRESS);
    await this.locators.addressLine2Input.fill(HOMEADRESS);
    await this.locators.stateInput.fill(STATE);
    await this.locators.cityInput.fill(CITY);
    await this.locators.zipcodeInput.fill(ZIPCODE.toString());
    await this.locators.mobileInput.fill(MOBILENUMBER.toString());
  }

  /**
   * Select country from dropdown
   */
  async selectCountry(countryName) {
    await this.locators.countryDropdown.selectOption({ label: countryName });
  }

  /**
   * Create account and wait for navigation
   */
  async createAccount() {
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: LOAD_STATE }),
      this.locators.createAccountBtn.click(),
    ]);
    await expect(this.page).toHaveURL(/account_created/i);
  }

  /**
   * Verify success message after account creation
   */
  async verifyAccountCreatedMessage(expectedText) {
    await expect(this.locators.accountCreatedMsg).toBeVisible();
    await expect(this.locators.accountCreatedMsg).toHaveText(expectedText);
  }

  /**
   * Click continue button after account creation
   */
  async clickContinueButton() {
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: LOAD_STATE }),
      this.locators.continueBtn.click(),
    ]);
    await expect(this.page).toHaveURL("/");
  }

  /**
   * Verify logged-in user's name matches expected
   */
  async verifyLoggedInUserName(expectedName) {
    const actual = await this.verifyUserName();
    expect(actual).toContain(expectedName);
  }

  /**
   * Delete account and wait for redirect
   */
  async deleteAccount() {
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: LOAD_STATE }),
      this.locators.deleteAccountBtn.click(),
    ]);
  }

  /**
   * Verify success message after account deletion
   */
  async verifyDeleteAccountSuccessMessage(expectedText) {
    await expect(this.locators.accountDeletedMsg).toBeVisible();
    await expect(this.locators.accountDeletedMsg).toHaveText(expectedText);
  }

  async signUpWithExistingUser({ username, emailAddress }) {
    await this.navigateToSignUpPage();
    await this.enterSignUpCredentials({ username, emailAddress });
  }

  async expectInvalidSignUpMessage() {
    await expect(this.locators.invalidSignUp).toBeVisible();
    return await this.locators.invalidSignUp.textContent();
  }
}
