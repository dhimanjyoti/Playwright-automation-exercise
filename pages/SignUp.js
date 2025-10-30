export class SignUp {
  constructor(page) {
    this.page = page;
    this.locators = {
      signUpLink: page.locator("//a[normalize-space()='Signup / Login']"),
      userName: page.locator("[data-qa='signup-name']"),
      userEmail: page.locator("[data-qa='signup-email']"),
      signUpBtn: page.locator("[data-qa='signup-button']"),
      selectTitle: page.locator("[data-qa='title']"),
      userPassword: page.locator("[data-qa='password']"),
      birthdayDate: page.locator("[data-qa='days']"),
      birthdayMonth: page.locator("[data-qa='months']"),
      birthdayYear: page.locator("[data-qa='years']"),
      firstName: page.locator("[data-qa='first_name']"),
      lastName: page.locator("[data-qa='last_name']"),
      companyName: page.locator("[data-qa='company']"),
      userAdress: page.locator("[data-qa='address']"),
      userAdress2: page.locator("[data-qa='address2']"),
      countrySelect: page.locator("[data-qa='country']"),
      countryOptions: page.locator("[data-qa='country'] option"),
      state: page.locator("[data-qa='state']"),
      city: page.locator("[data-qa='city']"),
      zipcode: page.locator("[data-qa='zipcode']"),
      mobileNumber: page.locator("[data-qa='mobile_number']"),
      createAccountBtn: page.locator("[data-qa='create-account']"),
      verifyAccountCreation: page.locator("[data-qa='account-created'] b"),
    };
  }

  async goToSignUpPage() {
    await this.locators.signUpLink.click();
  }

  async createNewUser({ username, emailAdress }) {
    await this.locators.userName.fill(username);
    await this.locators.userEmail.fill(emailAdress);
    await this.locators.signUpBtn.click();
    // await this.page.waitForLoadState("networkidle");
  }

  async createAccountInfo({
    TITLE,
    PASSWORD,
    BIRTHDATE,
    BIRTHMONTH,
    BIRTHYEAR,
  }) {
    await this.locators.selectTitle.locator(`[value='${TITLE}']`).check();
    await this.locators.userPassword.fill(PASSWORD);
    await this.locators.birthdayDate.selectOption(BIRTHDATE.toString());
    await this.locators.birthdayMonth.selectOption(BIRTHMONTH.toString());
    await this.locators.birthdayYear.selectOption(BIRTHYEAR.toString());
  }

  async fillAddressFields({
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
    await this.locators.firstName.fill(FIRST_NAME);
    await this.locators.lastName.fill(LAST_NAME);
    await this.locators.companyName.fill(COMPANY);
    await this.locators.userAdress.fill(STREETADDRESS);
    await this.locators.userAdress2.fill(HOMEADRESS);
    await this.locators.state.fill(STATE);
    await this.locators.city.fill(CITY);
    await this.locators.zipcode.fill(ZIPCODE.toString());
    await this.locators.mobileNumber.fill(MOBILENUMBER.toString());
  }

  async selectCountry(countryName) {
    // countryOptions indicate the all country locators
    // country select specify the select tag.
    const options = await this.locators.countryOptions.all();
    for (const option of options) {
      const value = (await option.textContent())?.trim();
      if (value && value.includes(countryName)) {
        await this.locators.countrySelect.selectOption({ value });
        return;
      }
    }
    throw new Error(`Country "${countryName}" not found in dropdown`);
  }

  async createAddressInfo(data) {
    await this.fillAddressFields(data);
  }

  async createAccount() {
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: "domcontentloaded" }),
      this.locators.createAccountBtn.click(),
    ]);
  }

  async verifyAccountCreationSuccessMessage() {
    await this.locators.verifyAccountCreation.waitFor({ state: "visible" });
    return this.locators.verifyAccountCreation.textContent();
  }
}
