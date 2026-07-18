# Framework Manifest (Codex and Claude)

> **AGENT INSTRUCTION:** Read this file to understand available Page Objects and API Controllers. Do not scan the entire `src/` directory when this manifest provides the required routing context.

## LoginPage
**File:** `src/pages/auth/LoginPage.js`

**Methods:**
- `navigateToLoginPage()`
- `submitLoginDetails(emailAddress, password)`
- `getInvalidLoginErrorText()`
- `visualFormContainer()`

---

## RegistrationPage
**File:** `src/pages/auth/RegistrationPage.js`

**Methods:**
- `getTitleRadioButton(titleValue)`
- `navigateToSignUpPage()`
- `enterSignUpCredentials(userName, emailAddress)`
- `fillAccountInformation({ TITLE, PASSWORD, BIRTHDATE, BIRTHMONTH, BIRTHYEAR, })`
- `fillAddressInformation({ FIRST_NAME, LAST_NAME, COMPANY, STREETADDRESS, HOMEADRESS, STATE, CITY, ZIPCODE, MOBILENUMBER, })`
- `selectCountry(countryName)`
- `createAccount()`
- `clikContinueBtn()`

---

## BasePage
**File:** `src/pages/BasePage.js`

**Methods:**
- `navigateToAutomationExcercise()`
- `waitForHomePageToLoad()`
- `openAuthPage()`
- `getLoggedInUsername()`
- `logout()`
- `deleteAccount()`
- `clickContinue()`

---

## HomePage
**File:** `src/pages/dashboard/HomePage.js`

**Methods:**
- `scrollToRecommendedSection()`
- `verifyRecommendedItemsSectionIsVisible()`
- `addFirstRecommendedItemToCart()`
- `scrollToFooter()`
- `clickScrollUpArrow()`
- `scrollToTop()`

---

## ProductPage
**File:** `src/pages/dashboard/productPage.js`

**Methods:**
- `navigateToProductsPage()`
- `captureAllTheAvailableProductDetailsAndSaveItToExcel()`
- `clickFirstViewProduct()`
- `getActualProductDetails()`
- `verifyBrandsSidebarIsVisible()`
- `clickBrandLink(brandName)`
- `searchForProduct(searchTerm)`
- `verifySearchedProductsHeadingIsVisible()`
- `verifySearchResultsAreVisible()`
- `getSearchedProductNames()`
- `addAllSearchedProductsToCart()`
- `addProductToCartByIndex(index)`

---

## ContactUsPage
**File:** `src/pages/marketing/ContactUsPage.js`

**Methods:**
- `navigateToContactUsPage()`
- `fillContactUsForm(userName, emailAddress, subject, message)`
- `uploadFileToContactForm(filePath)`
- `submitAndGetSuccessMessage()`
- `navigateBackToHome()`

---

## TestCasesPage
**File:** `src/pages/marketing/TestCasePage.js`

**Methods:**
- `navigateToTestCasesPage()`
- `testCasesHeaderLocator()`

---

## POManager
**File:** `src/pages/POManager.js`

**Methods:**
- `basePage()`
- `homePage()`
- `registrationPage()`
- `loginPage()`
- `contactUsPage()`
- `testCasePage()`
- `productPage()`
- `cartPage()`
- `categoryPage()`
- `checkoutPage()`
- `paymentPage()`
- `productDetailPage()`

---

## CartPage
**File:** `src/pages/shopping/CartPage.js`

**Methods:**
- `addFirstProductToCartAndContinue()`
- `navigateToCart()`
- `verifyCartIsDisplayed()`
- `proceedToCheckout()`
- `clickRegisterLoginFromModal()`
- `scrollToFooter()`
- `subscribeWithEmail(email)`
- `hoverAndAddProductToCart(index)`
- `clickContinueShopping()`
- `clickViewCartModal()`
- `removeCartItemByIndex(index)`
- `verifyCartIsEmpty()`
- `clearCart()`
- `verifyProductIsInCart(productName)`
- `getCartItems()`

---

## CategoryPage
**File:** `src/pages/shopping/CategoryPage.js`

**Methods:**
- `verifyCategorySidebarIsVisible()`
- `expandAndClickSubCategory(parentCategoryName, subCategoryName)`

---

## CheckoutPage
**File:** `src/pages/shopping/CheckoutPage.js`

**Methods:**
- `waitForPageReady()`
- `enterComment(comment)`
- `placeOrder()`
- `verifyDeliveryAddress(addressFields)`
- `verifyBillingAddress(addressFields)`

---

## PaymentPage
**File:** `src/pages/shopping/PaymentPage.js`

**Methods:**
- `fillPaymentDetails({ nameOnCard, cardNumber, cvc, expiryMonth, expiryYear })`
- `confirmOrder()`
- `downloadInvoice()`

---

## ProductDetailPage
**File:** `src/pages/shopping/ProductDetailPage.js`

**Methods:**
- `verifyWriteYourReviewSectionIsVisible()`
- `submitProductReview(name, email, reviewText)`

---

## AccountApiController
**File:** `src/api/AccountApiController.js`

**Methods:**
- `createAccount(payload)`
- `deleteAccount(email, password)`
- `updateAccount(payload)`
- `getUserDetailByEmail(email)`

---

## ApiManager
**File:** `src/api/ApiManager.js`

**Methods:**
- *(No custom methods detected)*

---

## AuthApiController
**File:** `src/api/AuthApiController.js`

**Methods:**
- `verifyLogin(email, password)`
- `verifyLoginWithoutEmail(password)`
- `deleteVerifyLogin()`

---

## BaseApiController
**File:** `src/api/BaseApiController.js`

**Methods:**
- *(No custom methods detected)*

---

## ProductApiController
**File:** `src/api/ProductApiController.js`

**Methods:**
- `getAllProducts()`
- `postToProductsList()`
- `getAllBrands()`
- `putToBrandsList()`
- `searchProduct(searchTerm)`
- `searchProductWithNoParam()`

---
