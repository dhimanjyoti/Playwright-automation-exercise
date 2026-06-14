// @ts-check
import { BasePage } from "../BasePage.js";
import { SUCCESS_MESSAGES } from "../../constants/message.js";

export class RegistrationPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    // Headers
    this.signUpHeaderText = page.locator("h2", { hasText: "New User Signup!" });

    // Dynamic locator using the central constants file
    this.accountCreatedHeader = page.locator("h2", {
      hasText: SUCCESS_MESSAGES.ACCOUNT_CREATED,
    });

    // Sign Up Form
    this.userNameInput = page.locator("input[placeholder='Name']");
    this.userEmailInput = page.locator("[data-qa='signup-email']");
    this.signUpBtn = page.locator("[data-qa='signup-button']");

    // Account details
    this.passwordInput = page.locator("[data-qa='password']");
    this.birthDayDropdown = page.locator("[data-qa='days']");
    this.birthMonthDropdown = page.locator("[data-qa='months']");
    this.birthYearDropdown = page.locator("[data-qa='years']");

    // Address
    this.firstNameInput = page.locator("[data-qa='first_name']");
    this.lastNameInput = page.locator("[data-qa='last_name']");
    this.companyNameInput = page.locator("[data-qa='company']");
    this.addressLine1Input = page.locator("[data-qa='address']");
    this.addressLine2Input = page.locator("[data-qa='address2']");
    this.selectCountryDropdown = page.locator("[data-qa='country']");
    this.stateInput = page.locator("[data-qa='state']");
    this.cityInput = page.locator("[data-qa='city']");
    this.zipCodeInput = page.locator("[data-qa='zipcode']");
    this.mobileNumberInput = page.locator("[data-qa='mobile_number']");

    // Buttons
    this.createBtn = page.locator("[data-qa='create-account']");
    this.clickContinueBtn = page.locator("[data-qa='continue-button']");
  }

  /**
   * Dynamic locator for the title radio button.
   * @param {string} titleValue
   * @returns {import('@playwright/test').Locator}
   */
  getTitleRadioButton(titleValue) {
    return this.page.locator(`label:has(input[value='${titleValue}'])`);
  }

  /**
   * Clicks the Signup/Login header link then waits for the signup header to
   * confirm the authentication page has loaded.
   * @returns {Promise<this>}
   */
  async navigateToSignUpPage() {
    await this.openAuthPage();
    await this.signUpHeaderText.waitFor({ state: "visible", timeout: 5000 });
    return this;
  }

  /**
   * JSDoc configuration -
   * @param {string} emailAddress
   * @param {string} userName
   */
  async enterSignUpCredentials(userName, emailAddress) {
    await this.userNameInput.fill(userName);
    await this.userEmailInput.fill(emailAddress);
    await this.signUpBtn.click();
    return this;
  }

  /**
   * Fills the account details section of the registration form.
   * * @param {Object} accountInfo -
   * @param {string} accountInfo.TITLE - e.g., 'Mr' or 'Mrs'
   * @param {string} accountInfo.PASSWORD
   * @param {number | string} accountInfo.BIRTHDATE
   * @param {number | string} accountInfo.BIRTHMONTH
   * @param {number | string} accountInfo.BIRTHYEAR
   * @returns {Promise<this>}
   */
  async fillAccountInformation({
    TITLE,
    PASSWORD,
    BIRTHDATE,
    BIRTHMONTH,
    BIRTHYEAR,
  }) {
    await this.getTitleRadioButton(TITLE).click();
    await this.passwordInput.fill(PASSWORD);
    await this.birthDayDropdown.selectOption(BIRTHDATE.toString());
    await this.birthMonthDropdown.selectOption(BIRTHMONTH.toString());
    await this.birthYearDropdown.selectOption(BIRTHYEAR.toString());
    return this;
  }

  /**
   * Fills the address details section of the registration form.
   * @param {Object} addressInfo - The parent object containing the address data
   * @param {string} addressInfo.FIRST_NAME
   * @param {string} addressInfo.LAST_NAME
   * @param {string} addressInfo.COMPANY
   * @param {string} addressInfo.STREETADDRESS
   * @param {string} addressInfo.HOMEADRESS
   * @param {string} addressInfo.STATE
   * @param {string} addressInfo.CITY
   * @param {number | string} addressInfo.ZIPCODE
   * @param {number | string} addressInfo.MOBILENUMBER
   * @returns {Promise<this>}
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
    await this.companyNameInput.fill(COMPANY);
    await this.addressLine1Input.fill(STREETADDRESS);
    await this.addressLine2Input.fill(HOMEADRESS);
    await this.stateInput.fill(STATE);
    await this.cityInput.fill(CITY);
    await this.zipCodeInput.fill(ZIPCODE.toString());
    await this.mobileNumberInput.fill(MOBILENUMBER.toString());
    return this;
  }

  /** * Selects the user's country from the dropdown list.
   * @param {string} countryName
   * @returns {Promise<this>}
   */
  async selectCountry(countryName) {
    await this.selectCountryDropdown.selectOption({ label: countryName });
    return this;
  }

  /**
   * Clicks the Create Account button and waits for the Account Created
   * confirmation heading to be visible.
   * @returns {Promise<this>}
   */
  async createAccount() {
    await this.createBtn.click();
    await this.accountCreatedHeader.waitFor({ state: "visible" });
    return this;
  }


  /**
   * Clicks the Continue button shown on the Account Created confirmation page.
   * @returns {Promise<this>}
   */
  async clikContinueBtn() {
    await this.clickContinueBtn.click();
    return this;
  }
}
