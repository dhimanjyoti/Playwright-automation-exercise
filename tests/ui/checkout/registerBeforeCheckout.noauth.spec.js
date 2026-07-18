// @ts-check
import { test, expect } from "../../../src/fixtures/baseFixture.js";
import { SUCCESS_MESSAGES } from "../../../src/constants/message.js";

test.describe("TC15: Place Order: Register before Checkout", () => {
  test("Register an account before adding to cart, place order and delete account", async (
    { pom, factory, data, accountCleanup },
    testInfo
  ) => {
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

    await test.step("Step 1-2: Navigate to home page and verify it is visible", async () => {
      await pom.basePage.navigateToAutomationExcercise();
      await pom.basePage.waitForHomePageToLoad();
      await expect(pom.basePage.homePageBanner).toBeVisible();
    });

    await test.step("Step 3-4: Click Signup/Login and fill all registration details", async () => {
      await pom.registrationPage.navigateToSignUpPage();
      await expect(pom.registrationPage.signUpHeaderText).toBeVisible();
      await pom.registrationPage.enterSignUpCredentials(userData.username, userData.emailAddress);
      await pom.registrationPage.fillAccountInformation(userData.accountInfo);
      await pom.registrationPage.fillAddressInformation(userData.addressInfo);
      await pom.registrationPage.selectCountry(userData.addressInfo.COUNTRY);
      await pom.registrationPage.createAccount();
    });

    await test.step("Step 5: Verify ACCOUNT CREATED and click Continue", async () => {
      await expect(pom.registrationPage.accountCreatedHeader).toBeVisible();
      await expect(pom.registrationPage.accountCreatedHeader).toHaveText(
        SUCCESS_MESSAGES.ACCOUNT_CREATED,
      );
      await pom.basePage.clickContinue();
    });

    await test.step("Step 6: Verify Logged in as username at top", async () => {
      await expect(pom.basePage.loggedInUser).toBeVisible();
      await expect(pom.basePage.loggedInUser).toHaveText(userData.username);
    });

    await test.step("Step 7: Navigate to Products and add a product to cart", async () => {
      await pom.productPage.navigateToProductsPage();
      await pom.cartPage.hoverAndAddProductToCart(0);
      await pom.cartPage.clickContinueShopping();
    });

    await test.step("Step 8: Click Cart button", async () => {
      await pom.cartPage.navigateToCart();
    });

    await test.step("Step 9: Verify cart page is displayed", async () => {
      await pom.cartPage.verifyCartIsDisplayed();
      await expect(pom.cartPage.cartBreadcrumb).toBeVisible();
    });

    await test.step("Step 10: Click Proceed To Checkout", async () => {
      await pom.cartPage.proceedToCheckout();
    });

    await test.step("Step 11: Verify Address Details and Review Your Order", async () => {
      await pom.checkoutPage.waitForPageReady();
      await expect(pom.checkoutPage.addressDetailsHeading).toBeVisible();
      await expect(pom.checkoutPage.deliveryAddressHeading).toBeVisible();
      await expect(pom.checkoutPage.billingAddressHeading).toBeVisible();
      await expect(pom.checkoutPage.reviewOrderHeading).toBeVisible();
    });

    await test.step("Step 12: Enter description in comment and click Place Order", async () => {
      await pom.checkoutPage.enterComment("Automation test order - please process");
      await pom.checkoutPage.placeOrder();
    });

    await test.step("Step 13: Enter payment details: Name, Card Number, CVC, Expiration date", async () => {
      await pom.paymentPage.fillPaymentDetails(paymentDetails);
    });

    await test.step("Step 14: Click Pay and Confirm Order", async () => {
      await pom.paymentPage.confirmOrder();
    });

    await test.step("Step 15: Verify order placed successfully", async () => {
      await expect(pom.paymentPage.orderSuccessHeading).toBeVisible();
      await expect(pom.paymentPage.orderSuccessHeading).toHaveText(
        SUCCESS_MESSAGES.ORDER_PLACED,
      );
      await expect(pom.paymentPage.orderConfirmedText).toBeVisible();
    });

    await test.step("Step 16-17: Delete account and verify ACCOUNT DELETED", async () => {
      await pom.basePage.deleteAccount();
      await expect(pom.basePage.accountDeletedHeading).toBeVisible();
      await expect(pom.basePage.accountDeletedHeading).toHaveText(
        SUCCESS_MESSAGES.ACCOUNT_DELETED,
      );
      accountCleanup.markDeleted(userData.emailAddress);
      await pom.basePage.clickContinue();
    });
  });
});
