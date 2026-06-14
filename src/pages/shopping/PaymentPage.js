// @ts-check
import { BasePage } from "../BasePage.js";

export class PaymentPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    this.nameOnCardInput = page.locator("[data-qa='name-on-card']");
    this.cardNumberInput = page.locator("[data-qa='card-number']");
    this.cvcInput = page.locator("[data-qa='cvc']");
    this.expiryMonthInput = page.locator("[data-qa='expiry-month']");
    this.expiryYearInput = page.locator("[data-qa='expiry-year']");
    this.payConfirmBtn = page.getByRole("button", {
      name: "Pay and Confirm Order",
    });
    this.orderSuccessHeading = page.getByRole("heading", { name: "Order Placed!" });
    this.orderConfirmedText = page.getByText(
      "Congratulations! Your order has been confirmed!",
    );
    this.downloadInvoiceBtn = page.getByRole("link", { name: "Download Invoice" });
  }

  /**
   * @param {{ nameOnCard: string, cardNumber: string, cvc: string, expiryMonth: string, expiryYear: string }} details
   */
  async fillPaymentDetails({ nameOnCard, cardNumber, cvc, expiryMonth, expiryYear }) {
    await this.nameOnCardInput.fill(nameOnCard);
    await this.cardNumberInput.fill(cardNumber);
    await this.cvcInput.fill(cvc);
    await this.expiryMonthInput.fill(expiryMonth);
    await this.expiryYearInput.fill(expiryYear);
    return this;
  }

  /**
   * Clicks the "Pay and Confirm Order" button to submit the payment.
   * @returns {Promise<this>}
   */
  async confirmOrder() {
    await this.payConfirmBtn.click();
    return this;
  }

  /**
   * Arms Playwright's native download listener before triggering the click so
   * the streaming event is never missed. Awaits the full file transfer and
   * returns the absolute path to the artifact in the Playwright temp directory.
   * @returns {Promise<string | null>}
   */
  async downloadInvoice() {
    const downloadPromise = this.page.waitForEvent("download");
    await this.downloadInvoiceBtn.click();
    const download = await downloadPromise;
    return download.path();
  }
}
