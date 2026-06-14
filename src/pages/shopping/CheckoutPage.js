// @ts-check
import { expect } from "@playwright/test";
import { BasePage } from "../BasePage.js";

/**
 * @typedef {Object} AddressFields
 * @property {string} STREETADDRESS
 * @property {string} CITY
 * @property {string} STATE
 * @property {string|number} ZIPCODE
 */

export class CheckoutPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    this.addressDetailsHeading = page.getByRole("heading", {
      name: "Address Details",
    });
    this.deliveryAddressHeading = page.getByRole("heading", {
      name: "Your delivery address",
    });
    this.billingAddressHeading = page.getByRole("heading", {
      name: "Your billing address",
    });
    this.reviewOrderHeading = page.getByRole("heading", {
      name: "Review Your Order",
    });
    this.commentTextarea = page.locator("textarea[name='message']");
    this.placeOrderLink = page.getByRole("link", { name: "Place Order" });

    // Delivery address — nth(1) skips the company li at index 0 to target address line 1
    this.deliveryAddressStreet = page
      .locator("#address_delivery li.address_address1.address_address2")
      .nth(1);
    this.deliveryAddressCityStateZip = page.locator(
      "#address_delivery li.address_city.address_state_name.address_postcode"
    );

    // Billing address — same positional convention as delivery
    this.billingAddressStreet = page
      .locator("#address_invoice li.address_address1.address_address2")
      .nth(1);
    this.billingAddressCityStateZip = page.locator(
      "#address_invoice li.address_city.address_state_name.address_postcode"
    );
  }

  /**
   * Waits for the Address Details heading to be visible, confirming the
   * checkout page has fully rendered.
   * @returns {Promise<this>}
   */
  async waitForPageReady() {
    await this.addressDetailsHeading.waitFor({ state: "visible" });
    return this;
  }

  /**
   * Types an order comment into the checkout message textarea.
   * @param {string} comment
   * @returns {Promise<this>}
   */
  async enterComment(comment) {
    await this.commentTextarea.fill(comment);
    return this;
  }

  /**
   * Clicks the Place Order link to proceed to the payment page.
   * @returns {Promise<this>}
   */
  async placeOrder() {
    await this.placeOrderLink.click();
    return this;
  }

  /**
   * Asserts that every tracked address field in the delivery block matches
   * the values provided during registration. Playwright normalises whitespace
   * in toHaveText(), so variations in spacing between city/state/zip are safe.
   * @param {AddressFields} addressFields
   * @returns {Promise<this>}
   */
  async verifyDeliveryAddress(addressFields) {
    const { STREETADDRESS, CITY, STATE, ZIPCODE } = addressFields;
    await expect(this.deliveryAddressStreet).toHaveText(STREETADDRESS);
    await expect(this.deliveryAddressCityStateZip).toHaveText(
      `${CITY} ${STATE} ${String(ZIPCODE)}`
    );
    return this;
  }

  /**
   * Asserts that every tracked address field in the billing block matches
   * the values provided during registration.
   * @param {AddressFields} addressFields
   * @returns {Promise<this>}
   */
  async verifyBillingAddress(addressFields) {
    const { STREETADDRESS, CITY, STATE, ZIPCODE } = addressFields;
    await expect(this.billingAddressStreet).toHaveText(STREETADDRESS);
    await expect(this.billingAddressCityStateZip).toHaveText(
      `${CITY} ${STATE} ${String(ZIPCODE)}`
    );
    return this;
  }
}
