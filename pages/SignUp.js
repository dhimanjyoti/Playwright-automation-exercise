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
      country: page.locator("[data-qa='country'] option"),
      state: page.locator("[data-qa='state']"),
      city: page.locator("[data-qa='city']"),
      zipcode: page.locator("[data-qa='zipcode']"),
      mobileNumber: page.locator("[data-qa='mobile_number']"),
    };
  }

  async goToSignUpPage() {
    await this.locators.signUpLink.click();
    await this.page.waitForLoadState("networkidle");
  }

  async createNewUser(username, emailAdress) {
    await this.locators.userName.fill(username);
    await this.locators.userEmail.fill(emailAdress);
    await this.locators.signUpBtn.click();
    await this.page.waitForLoadState("networkidle");
  }

  async createAccountInfo({ title, password, day, month, year }) {
    await this.page.locator(`[data-qa="title"][value="${title}"]`).click();
    await this.locators.userPassword.fill(password);
    await this.locators.birthdayDate.selectOption(day);
    await this.locators.birthdayMonth.selectOption(month);
    await this.locators.birthdayYear.selectOption(year);
  }

  async fillAddressFields({
    firstName,
    lastName,
    company,
    streetAddress,
    homeAdress,
    city,
    zipcode,
    mobileNumber,
  }) {
    await this.locators.firstName.fill(firstName);
    await this.locators.lastName.fill(lastName);
    await this.locators.companyName.fill(company);
    await this.locators.userAdress.fill(streetAddress);
    await this.locators.userAdress2.fill(homeAdress);
    await this.locators.city.fill(city);
    await this.locators.zipcode.fill(zipcode);
    await this.locators.mobileNumber.fill(mobileNumber);
  }

  async selectCountry(countryName) {
    const countries = await this.locators.country.all();
    for (const country of countries) {
      const value = (await country.textContent())?.trim();
      if (value && value.includes(countryName)) {
        await country.click();
        return;
      }
    }
    throw new Error(`Country "${countryName}" not found in dropdown`);
  }

  async createAddressInfo(data) {
    await this.fillAddressFields(data);
    await this.selectCountry(data.countryName);
  }
}
