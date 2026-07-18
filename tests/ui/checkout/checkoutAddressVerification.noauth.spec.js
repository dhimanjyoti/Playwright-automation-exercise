// @ts-check
import { test, expect } from "../../../src/fixtures/baseFixture.js";
import { SUCCESS_MESSAGES } from "../../../src/constants/message.js";

test.describe("TC23: Verify Address Details in Checkout Page", () => {
  test(
    "Register new user, add product to cart, verify delivery and billing addresses match registration data, then delete account",
    async ({ pom, factory, accountCleanup }, testInfo) => {
      test.setTimeout(testInfo.timeout * 3);

      const userData = factory.generateNewRegistrationUser("MALE_USER");
      accountCleanup.track(userData.emailAddress, userData.password);

      await test.step("Step 1: Navigate to home page and verify banner loads", async () => {
        await pom.basePage.navigateToAutomationExcercise();
        await pom.basePage.waitForHomePageToLoad();
        await expect(pom.basePage.homePageBanner).toBeVisible();
      });

      await test.step("Step 2: Click Signup/Login and fill all registration details", async () => {
        await pom.registrationPage.navigateToSignUpPage();
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

      await test.step("Step 3: Verify ACCOUNT CREATED and click Continue", async () => {
        await expect(pom.registrationPage.accountCreatedHeader).toBeVisible();
        await expect(pom.registrationPage.accountCreatedHeader).toHaveText(
          SUCCESS_MESSAGES.ACCOUNT_CREATED
        );
        await pom.basePage.clickContinue();
      });

      await test.step("Step 4: Verify Logged in as username header element", async () => {
        await expect(pom.basePage.loggedInUser).toBeVisible();
        await expect(pom.basePage.loggedInUser).toHaveText(userData.username);
      });

      await test.step("Step 5: Navigate to Products and add item to cart", async () => {
        await pom.productPage.navigateToProductsPage();
        await pom.cartPage.hoverAndAddProductToCart(0);
        await pom.cartPage.clickContinueShopping();
      });

      await test.step("Step 6-7: Navigate to Cart and verify cart page is displayed", async () => {
        await pom.cartPage.navigateToCart();
        await pom.cartPage.verifyCartIsDisplayed();
        await expect(pom.cartPage.cartBreadcrumb).toBeVisible();
      });

      await test.step("Step 8: Click Proceed To Checkout", async () => {
        await pom.cartPage.proceedToCheckout();
      });

      await test.step("Step 9: Wait for checkout address page to fully render", async () => {
        await pom.checkoutPage.waitForPageReady();
        await expect(pom.checkoutPage.addressDetailsHeading).toBeVisible();
      });

      await test.step(
        "Step 10 (Core Gate): Verify Delivery Address matches registration street, city, state, and zipcode",
        async () => {
          await pom.checkoutPage.verifyDeliveryAddress(userData.addressInfo);
        }
      );

      await test.step(
        "Step 11 (Core Gate): Verify Billing Address matches registration street, city, state, and zipcode",
        async () => {
          await pom.checkoutPage.verifyBillingAddress(userData.addressInfo);
        }
      );

      await test.step("Step 12: Delete account and verify ACCOUNT DELETED", async () => {
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
