// @ts-check
import { BasePage } from "./BasePage.js";
import { RegistrationPage } from "./auth/RegistrationPage.js";
import { LoginPage } from "./auth/LoginPage.js";
import { ContactUsPage } from "./marketing/ContactUsPage.js";
import { TestCasesPage } from "./marketing/TestCasePage.js";
import { HomePage } from "./dashboard/HomePage.js";
import { ProductPage } from "./dashboard/productPage.js";
import { CartPage } from "./shopping/CartPage.js";
import { CategoryPage } from "./shopping/CategoryPage.js";
import { CheckoutPage } from "./shopping/CheckoutPage.js";
import { PaymentPage } from "./shopping/PaymentPage.js";
import { ProductDetailPage } from "./shopping/ProductDetailPage.js";

export class POManager {
  // Store the isolated browser page context
  #page;

  // Tells the strict compiler these variables start as undefined
  // before they are instantiated in the getters.
  /** @type {BasePage | undefined} */
  #basePage;

  /** @type {HomePage | undefined} */
  #homePage;

  /** @type {RegistrationPage | undefined} */
  #registrationPage;

  /** @type {LoginPage | undefined} */
  #loginPage;

  /** @type {ContactUsPage | undefined} */
  #contactUsPage;

  /** @type {TestCasesPage | undefined} */
  #testCasePage;

  /** @type {ProductPage | undefined} */
  #productPage;

  /** @type {CartPage | undefined} */
  #cartPage;

  /** @type {CategoryPage | undefined} */
  #categoryPage;

  /** @type {CheckoutPage | undefined} */
  #checkoutPage;

  /** @type {PaymentPage | undefined} */
  #paymentPage;

  /** @type {ProductDetailPage | undefined} */
  #productDetailPage;

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.#page = page;
  }

  get basePage() {
    if (!this.#basePage) this.#basePage = new BasePage(this.#page);
    return this.#basePage;
  }

  get homePage() {
    if (!this.#homePage) this.#homePage = new HomePage(this.#page);
    return this.#homePage;
  }

  get registrationPage() {
    if (!this.#registrationPage)
      this.#registrationPage = new RegistrationPage(this.#page);
    return this.#registrationPage;
  }

  get loginPage() {
    if (!this.#loginPage) this.#loginPage = new LoginPage(this.#page);
    return this.#loginPage;
  }

  get contactUsPage() {
    if (!this.#contactUsPage)
      this.#contactUsPage = new ContactUsPage(this.#page);
    return this.#contactUsPage;
  }

  get testCasePage() {
    if (!this.#testCasePage) this.#testCasePage = new TestCasesPage(this.#page);
    return this.#testCasePage;
  }

  get productPage() {
    if (!this.#productPage) this.#productPage = new ProductPage(this.#page);
    return this.#productPage;
  }

  get cartPage() {
    if (!this.#cartPage) this.#cartPage = new CartPage(this.#page);
    return this.#cartPage;
  }

  get categoryPage() {
    if (!this.#categoryPage) this.#categoryPage = new CategoryPage(this.#page);
    return this.#categoryPage;
  }

  get checkoutPage() {
    if (!this.#checkoutPage) this.#checkoutPage = new CheckoutPage(this.#page);
    return this.#checkoutPage;
  }

  get paymentPage() {
    if (!this.#paymentPage) this.#paymentPage = new PaymentPage(this.#page);
    return this.#paymentPage;
  }

  get productDetailPage() {
    if (!this.#productDetailPage)
      this.#productDetailPage = new ProductDetailPage(this.#page);
    return this.#productDetailPage;
  }
}
