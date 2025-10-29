export class BasePage {
  constructor(page) {
    this.page = page;
    this.locators = {
      appLogo: page.locator(".logo.pull-left"),
    };
  }

  // Navigate to the application url
  async navigateToAutomationExcercise() {
    await this.page.goto("/");
  }

  async getPageTitle() {
    return await this.page.title();
  }
}
