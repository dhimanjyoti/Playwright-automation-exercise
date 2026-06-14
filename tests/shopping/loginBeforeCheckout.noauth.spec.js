// @ts-check
import { test, expect } from "../../src/fixtures/baseFixture.js";
import { SUCCESS_MESSAGES } from "../../src/constants/message.js";

test.describe("TC16: Place Order: Login before Checkout", () => {
  test("Login with pre-registered account, place order and delete account", async (
    { pom, factory, data },
    testInfo
  ) => {
    test.setTimeout(testInfo.timeout * 4);

    const userData = factory.generateNewRegistrationUser("MALE_USER");
    const card = data.shopping.payment.MOCK_VISA_CARD;
    const paymentDetails = {
      nameOnCard: `${userData.addressInfo.FIRST_NAME} ${userData.addressInfo.LAST_NAME}`,
      cardNumber: card.CARD_NUMBER,
      cvc: card.CVC,
      expiryMonth: card.EXPIRY_MONTH,
      expiryYear: card.EXPIRY_YEAR,
    };

    await test.step("Pre-condition: Register a fresh account to ensure test isolation", async () => {
      await pom.basePage.navigateToAutomationExcercise();
      await pom.registrationPage.navigateToSignUpPage();
      await pom.registrationPage.enterSignUpCredentials(userData.username, userData.emailAddress);
      await pom.registrationPage.fillAccountInformation(userData.accountInfo);
      await pom.registrationPage.fillAddressInformation(userData.addressInfo);
      await pom.registrationPage.selectCountry(userData.addressInfo.COUNTRY);
      await pom.registrationPage.createAccount();
      await pom.registrationPage.clikContinueBtn();
      await pom.basePage.logout();
    });

    await test.step("Step 1-2: Navigate to home page and verify it is visible", async () => {
      await pom.basePage.navigateToAutomationExcercise();
      await pom.basePage.waitForHomePageToLoad();
      // FIXED: Removed .elements and () since it's a direct property now
      await expect(pom.basePage.homePageBanner).toBeVisible(); 
    });

    await test.step("Step 3-4: Click Signup/Login and fill login credentials", async () => {
      await pom.loginPage.navigateToLoginPage();
      await expect(pom.loginPage.loginHeaderText).toBeVisible();
      await pom.loginPage.submitLoginDetails(userData.emailAddress, userData.password);
    });

    await test.step("Step 5: Verify Logged in as username at top", async () => {
      // FIXED: Removed .elements and ()
      await expect(pom.basePage.loggedInUser).toBeVisible();
      await expect(pom.basePage.loggedInUser).toHaveText(userData.username);
    });

    await test.step("Step 6: Navigate to Products and add a product to cart", async () => {
      await pom.productPage.navigateToProductsPage();
      await pom.cartPage.hoverAndAddProductToCart(0);
      await pom.cartPage.clickContinueShopping();
    });

    await test.step("Step 7: Click Cart button", async () => {
      await pom.cartPage.navigateToCart();
    });

    await test.step("Step 8: Verify that cart page is displayed", async () => {
      await pom.cartPage.verifyCartIsDisplayed();
      await expect(pom.cartPage.cartBreadcrumb).toBeVisible();
    });

    await test.step("Step 9: Click Proceed To Checkout", async () => {
      await pom.cartPage.proceedToCheckout();
    });

    await test.step("Step 10: Verify Address Details and Review Your Order", async () => {
      await pom.checkoutPage.waitForPageReady();
      await expect(pom.checkoutPage.addressDetailsHeading).toBeVisible();
      await expect(pom.checkoutPage.deliveryAddressHeading).toBeVisible();
      await expect(pom.checkoutPage.billingAddressHeading).toBeVisible();
      await expect(pom.checkoutPage.reviewOrderHeading).toBeVisible();
    });

    await test.step("Step 11: Enter description in comment and click Place Order", async () => {
      await pom.checkoutPage.enterComment("Automation test order - please process");
      await pom.checkoutPage.placeOrder();
    });

    await test.step("Step 12-13: Enter payment details and click Pay and Confirm Order", async () => {
      await pom.paymentPage.fillPaymentDetails(paymentDetails);
      await pom.paymentPage.confirmOrder();
    });

    await test.step("Step 14: Verify order placed successfully", async () => {
      await expect(pom.paymentPage.orderSuccessHeading).toBeVisible();
      await expect(pom.paymentPage.orderSuccessHeading).toHaveText(
        SUCCESS_MESSAGES.ORDER_PLACED,
      );
      await expect(pom.paymentPage.orderConfirmedText).toBeVisible();
    });

    await test.step("Step 15-16: Delete account and verify ACCOUNT DELETED", async () => {
      await pom.basePage.deleteAccount();
      // FIXED: Removed .elements and ()
      await expect(pom.basePage.accountDeletedHeading).toBeVisible();
      await expect(pom.basePage.accountDeletedHeading).toHaveText(
        SUCCESS_MESSAGES.ACCOUNT_DELETED,
      );
      await pom.basePage.clickContinue();
    });
  });
});