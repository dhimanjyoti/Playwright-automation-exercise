// @ts-check
import { test, expect } from "../../../src/fixtures/baseFixture.js";
import { SUCCESS_MESSAGES } from "../../../src/constants/message.js";

test.describe("TC24: Download Invoice after Purchase Order", () => {
  test(
    "Add product as guest, register during checkout, place order, download invoice, then delete account",
    async ({ pom, factory, data, accountCleanup }, testInfo) => {
      test.setTimeout(testInfo.timeout * 3);

      const userData = factory.generateNewRegistrationUser("MALE_USER");
      accountCleanup.track(userData.emailAddress, userData.password);
      const card = data.shopping.payment.MOCK_VISA_CARD;
      const paymentDetails = {
        nameOnCard: `${userData.addressInfo.FIRST_NAME} ${userData.addressInfo.LAST_NAME}`,
        cardNumber: card.CARD_NUMBER,
        cvc: card.CVC,
        expiryMonth: card.EXPIRY_MONTH,
        expiryYear: card.EXPIRY_YEAR,
      };

      await test.step("Step 1: Navigate to home page and verify banner loads", async () => {
        await pom.basePage.navigateToAutomationExcercise();
        await pom.basePage.waitForHomePageToLoad();
        await expect(pom.basePage.homePageBanner).toBeVisible();
      });

      await test.step("Step 2: Add a product to the cart and verify cart page", async () => {
        await pom.cartPage.addFirstProductToCartAndContinue();
        await pom.cartPage.navigateToCart();
        await pom.cartPage.verifyCartIsDisplayed();
        await expect(pom.cartPage.cartBreadcrumb).toBeVisible();
      });

      await test.step("Step 3: Proceed To Checkout and click Register / Login from modal", async () => {
        await pom.cartPage.proceedToCheckout();
        await pom.cartPage.clickRegisterLoginFromModal();
      });

      await test.step("Step 4: Fill registration details and create account", async () => {
        await expect(pom.registrationPage.signUpHeaderText).toBeVisible();
        await pom.registrationPage.enterSignUpCredentials(
          userData.username,
          userData.emailAddress
        );
        await pom.registrationPage.fillAccountInformation(userData.accountInfo);
        await pom.registrationPage.fillAddressInformation(userData.addressInfo);
        await pom.registrationPage.selectCountry(userData.addressInfo.COUNTRY);
        await pom.registrationPage.createAccount();
      });

      await test.step("Step 5: Verify ACCOUNT CREATED and click Continue", async () => {
        await expect(pom.registrationPage.accountCreatedHeader).toBeVisible();
        await expect(pom.registrationPage.accountCreatedHeader).toHaveText(
          SUCCESS_MESSAGES.ACCOUNT_CREATED
        );
        await pom.basePage.clickContinue();
      });

      await test.step("Step 6: Verify Logged in as username header element", async () => {
        await expect(pom.basePage.loggedInUser).toBeVisible();
        await expect(pom.basePage.loggedInUser).toHaveText(userData.username);
      });

      await test.step("Step 7: Return to Cart and Proceed To Checkout", async () => {
        await pom.cartPage.navigateToCart();
        await pom.cartPage.proceedToCheckout();
      });

      await test.step("Step 8: Verify address overview layout on checkout page", async () => {
        await pom.checkoutPage.waitForPageReady();
        await expect(pom.checkoutPage.addressDetailsHeading).toBeVisible();
        await expect(pom.checkoutPage.deliveryAddressHeading).toBeVisible();
        await expect(pom.checkoutPage.billingAddressHeading).toBeVisible();
        await expect(pom.checkoutPage.reviewOrderHeading).toBeVisible();
      });

      await test.step("Step 9: Enter comment and place order", async () => {
        await pom.checkoutPage.enterComment("Automation test order - please process");
        await pom.checkoutPage.placeOrder();
      });

      await test.step("Step 10: Fill payment form and confirm order", async () => {
        await pom.paymentPage.fillPaymentDetails(paymentDetails);
        await pom.paymentPage.confirmOrder();
      });

      await test.step("Step 11: Verify order success heading matches frozen constant", async () => {
        await expect(pom.paymentPage.orderSuccessHeading).toBeVisible();
        await expect(pom.paymentPage.orderSuccessHeading).toHaveText(
          SUCCESS_MESSAGES.ORDER_PLACED
        );
        await expect(pom.paymentPage.orderConfirmedText).toBeVisible();
      });

      await test.step(
        "Step 12 (Core Gate): Intercept download event, trigger Download Invoice, verify file path is non-null",
        async () => {
          const invoicePath = await pom.paymentPage.downloadInvoice();
          expect(invoicePath).not.toBeNull();
        }
      );

      await test.step("Step 13: Click Continue to return from order confirmation", async () => {
        await pom.basePage.clickContinue();
      });

      await test.step("Step 14: Delete account and verify ACCOUNT DELETED", async () => {
        await pom.basePage.deleteAccount();
        await expect(pom.basePage.accountDeletedHeading).toBeVisible();
        await expect(pom.basePage.accountDeletedHeading).toHaveText(
          SUCCESS_MESSAGES.ACCOUNT_DELETED
        );
        accountCleanup.markDeleted(userData.emailAddress);
        await pom.basePage.clickContinue();
      });
    }
  );
});
