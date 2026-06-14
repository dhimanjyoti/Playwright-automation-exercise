// @ts-check
import { test, expect } from "../../src/fixtures/baseFixture.js";
import { SUCCESS_MESSAGES } from "../../src/constants/message.js";

test.describe("TC10: Verify user can place an order by registering during checkout", () => {
  test("Register during checkout and successfully place an order", async (
    { pom, factory, data },
    testInfo // testInfo to access environment timeouts
  ) => {
    // Dynamically multiply the global timeout for this specific long-running E2E test
    test.setTimeout(testInfo.timeout * 3);

    const userData = factory.generateNewRegistrationUser("MALE_USER");
    const card = data.shopping.payment.MOCK_VISA_CARD;
    const paymentDetails = {
      nameOnCard: `${userData.addressInfo.FIRST_NAME} ${userData.addressInfo.LAST_NAME}`,
      cardNumber: card.CARD_NUMBER,
      cvc: card.CVC,
      expiryMonth: card.EXPIRY_MONTH,
      expiryYear: card.EXPIRY_YEAR,
    };

    await test.step("Step 1-2: Navigate to home page and verify it is visible", async () => {
      await pom.basePage.navigateToAutomationExcercise();
      await pom.basePage.waitForHomePageToLoad();
      await expect(pom.basePage.homePageBanner).toBeVisible();
    });

    await test.step("Step 3: Add a product to cart and click Cart button", async () => {
      await pom.cartPage.addFirstProductToCartAndContinue();
      await pom.cartPage.navigateToCart();
    });

    await test.step("Step 4: Verify cart page is displayed and click Proceed To Checkout", async () => {
      await pom.cartPage.verifyCartIsDisplayed();
      await expect(pom.cartPage.cartBreadcrumb).toBeVisible();
      await pom.cartPage.proceedToCheckout();
    });

    await test.step("Step 5: Click Register / Login from the checkout modal", async () => {
      await pom.cartPage.clickRegisterLoginFromModal();
    });

    await test.step("Step 6: Fill signup details and create account", async () => {
      await expect(pom.registrationPage.signUpHeaderText).toBeVisible();
      await pom.registrationPage.enterSignUpCredentials(
        userData.username,
        userData.emailAddress,
      );
      await pom.registrationPage.fillAccountInformation(userData.accountInfo);
      await pom.registrationPage.fillAddressInformation(userData.addressInfo);
      await pom.registrationPage.selectCountry(userData.addressInfo.COUNTRY);
      await pom.registrationPage.createAccount();
    });

    await test.step("Step 7: Verify ACCOUNT CREATED and click Continue", async () => {
      await expect(pom.registrationPage.accountCreatedHeader).toBeVisible();
      await expect(pom.registrationPage.accountCreatedHeader).toHaveText(
        SUCCESS_MESSAGES.ACCOUNT_CREATED,
      );
      await pom.basePage.clickContinue();
    });

    await test.step("Step 8: Verify Logged in as username at top", async () => {
      await expect(pom.basePage.loggedInUser).toBeVisible();
      await expect(pom.basePage.loggedInUser).toHaveText(
        userData.username,
      );
    });

    await test.step("Step 9: Return to Cart and click Proceed To Checkout", async () => {
      await pom.cartPage.navigateToCart();
      await pom.cartPage.proceedToCheckout();
    });

    await test.step("Step 10: Verify Address Details and Review Order", async () => {
      await pom.checkoutPage.waitForPageReady();
      await expect(pom.checkoutPage.addressDetailsHeading).toBeVisible();
      await expect(pom.checkoutPage.deliveryAddressHeading).toBeVisible();
      await expect(pom.checkoutPage.billingAddressHeading).toBeVisible();
      await expect(pom.checkoutPage.reviewOrderHeading).toBeVisible();
    });

    await test.step("Step 11: Enter order comment and click Place Order", async () => {
      await pom.checkoutPage.enterComment(
        "Automation test order - please process",
      );
      await pom.checkoutPage.placeOrder();
    });

    await test.step("Step 12: Enter payment details and confirm order", async () => {
      await pom.paymentPage.fillPaymentDetails(paymentDetails);
      await pom.paymentPage.confirmOrder();
    });

    await test.step("Step 13: Verify order placed successfully", async () => {
      await expect(pom.paymentPage.orderSuccessHeading).toBeVisible();
      await expect(pom.paymentPage.orderSuccessHeading).toHaveText(
        SUCCESS_MESSAGES.ORDER_PLACED,
      );
      await expect(pom.paymentPage.orderConfirmedText).toBeVisible();
    });

    await test.step("Step 14: Delete account and verify ACCOUNT DELETED", async () => {
      await pom.basePage.deleteAccount();
      await expect(pom.basePage.accountDeletedHeading).toBeVisible();
      await expect(pom.basePage.accountDeletedHeading).toHaveText(
        SUCCESS_MESSAGES.ACCOUNT_DELETED,
      );
      await pom.basePage.clickContinue();
    });
  });
});