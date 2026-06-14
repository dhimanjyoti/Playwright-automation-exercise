# Framework Manifest (Context Diet for Claude)

> **AI INSTRUCTION:** Read this file to understand available Page Objects and API Controllers. DO NOT scan the `src/` directory directly to save context tokens.

## HomePage
**File:** `src/pages/dashboard/HomePage.js`

**Elements:**
- `recommendedItemsHeading` — `getByRole("heading", { name: "recommended items" })`; used to confirm the Recommended Items section is visible
- `firstRecommendedAddToCartBtn` — first `Add to cart` anchor in `#recommended-item-carousel .item.active`
- `firstRecommendedProductName` — `<p>` text of the first product in the active recommended carousel slide
- `subscriptionHeading` — `getByRole("heading", { name: "Subscription" })` in the page footer
- `scrollUpArrow` — `#scrollUp` floating anchor (fixed position, `display:none` until page is scrolled; revealed by site JS)
- `carouselHeadingText` — `#slider-carousel .item.active h2`; scoped to main banner carousel's active slide; always resolves to exactly one element regardless of carousel rotation

**Methods:**
- `scrollToRecommendedSection()` — scrolls `recommendedItemsHeading` into view via `scrollIntoViewIfNeeded()`
- `verifyRecommendedItemsSectionIsVisible()` — waits for `recommendedItemsHeading` to be visible
- `addFirstRecommendedItemToCart()` — reads product name, clicks Add to Cart on first active recommended item; returns `Promise<string>` (product name)
- `scrollToFooter()` — calls `subscriptionHeading.scrollIntoViewIfNeeded()` to reach the bottom of the page; no JS injection
- `clickScrollUpArrow()` — waits for `scrollUpArrow` to become visible (JS-triggered after scroll), then clicks it
- `scrollToTop()` — calls `homePageBanner.scrollIntoViewIfNeeded()` to programmatically return to the top without using the arrow button

---

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

## ProductPage
**File:** `src/pages/dashboard/productPage.js`

**Elements:**
- `allProductsHeading` — "All Products" heading; used to confirm Products page loaded
- `brandsSidebarHeading` — "Brands" h2 in `.left-sidebar`
- `brandProductsHeading` — h2 on a brand-products page (e.g. "Brand - Polo Products")

**Methods:**
- `navigateToProductsPage()` — clicks nav Products link, waits for `allProductsHeading`
- `captureAllTheAvailableProductDetailsAndSaveItToExcel()`
- `clickFirstViewProduct()`
- `getActualProductDetails()`
- `verifyBrandsSidebarIsVisible()` — waits for `brandsSidebarHeading`
- `clickBrandLink(brandName)` — clicks a brand link by substring name (e.g. "Polo", "H&M")
- `addProductToCartByIndex(index)` — dispatches click on `.productinfo a.add-to-cart` at given index; use on brand/category pages where ad iframes block pointer events
- `searchForProduct(searchTerm)` — navigates to `/products?search=<term>`, waits for `searchedProductsHeading` (direct URL avoids ad-blocked button)
- `verifySearchedProductsHeadingIsVisible()` — waits for `searchedProductsHeading`
- `verifySearchResultsAreVisible()` — waits for first `searchedProductCards`
- `getSearchedProductNames()` — returns `string[]` of all `.productinfo p` text contents on page
- `addAllSearchedProductsToCart()` — dispatches click on each `.productinfo a.add-to-cart`, dismisses modal via `force: true` "Continue Shopping" click after each

---

## ProductDetailPage
**File:** `src/pages/shopping/ProductDetailPage.js`

**Elements:**
- `writeYourReviewTab` — "Write Your Review" anchor tab on the product detail page
- `reviewNameInput` — `getByPlaceholder('Your Name')` in the review form
- `reviewEmailInput` — `getByPlaceholder('Email Address')` in the review form
- `reviewTextarea` — `getByPlaceholder('Add Review Here!')` in the review form
- `reviewSubmitButton` — `getByRole('button', { name: 'Submit' })`
- `reviewSuccessMessage` — `getByText('Thank you for your review.')` inline success alert

**Methods:**
- `verifyWriteYourReviewSectionIsVisible()` — waits for `writeYourReviewTab` to be visible
- `submitProductReview(name, email, reviewText)` — fills and submits the review form

---

## ContactUsPage
**File:** `src/pages/marketing/ContactUsPage.js`

**Methods:**
- `navigateToContactUsPage()`
- `fillContactUsForm(userName, emailAddress, subject, message)`
- `uploadFileToContactForm(filePath)`
- `handleDialogAndPreventNavigation()`
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

## CategoryPage
**File:** `src/pages/shopping/CategoryPage.js`

**Elements:**
- `categorySidebarHeading` — "Category" h2 in `.left-sidebar`
- `categoryProductsHeading` — h2 on the category products page (e.g. "Women - Dress Products")

**Methods:**
- `verifyCategorySidebarIsVisible()`
- `expandAndClickSubCategory(parentCategoryName, subCategoryName)`

---

## CartPage
**File:** `src/pages/shopping/CartPage.js`

**Elements:**
- `cartNavLink` — "Cart" link in the site banner; used by `navigateToCart()`

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
- `getCartItems()`
- `verifyProductIsInCart(productName)` — waits for a cart row with `.cart_description h4 a` matching `productName` to be visible

---

## CheckoutPage
**File:** `src/pages/shopping/CheckoutPage.js`

**Elements:**
- `addressDetailsHeading` — "Address Details" heading; used by `waitForPageReady()`
- `deliveryAddressHeading` — "Your delivery address" h3 inside `#address_delivery`
- `billingAddressHeading` — "Your billing address" h3 inside `#address_invoice`
- `reviewOrderHeading` — "Review Your Order" heading
- `deliveryAddressStreet` — `#address_delivery li.address_address1.address_address2` at `nth(1)` (skips company at nth(0))
- `deliveryAddressCityStateZip` — `#address_delivery li.address_city.address_state_name.address_postcode`
- `billingAddressStreet` — `#address_invoice li.address_address1.address_address2` at `nth(1)`
- `billingAddressCityStateZip` — `#address_invoice li.address_city.address_state_name.address_postcode`

**Methods:**
- `waitForPageReady()` — waits for `addressDetailsHeading` to be visible
- `enterComment(comment)` — fills the order comment textarea
- `placeOrder()` — clicks the Place Order link
- `verifyDeliveryAddress(addressFields)` — asserts `deliveryAddressStreet` toHaveText(STREETADDRESS) and `deliveryAddressCityStateZip` toHaveText(`${CITY} ${STATE} ${ZIPCODE}`); accepts `{ STREETADDRESS, CITY, STATE, ZIPCODE }`
- `verifyBillingAddress(addressFields)` — same assertion pair against `#address_invoice` block; accepts `{ STREETADDRESS, CITY, STATE, ZIPCODE }`

---

## PaymentPage
**File:** `src/pages/shopping/PaymentPage.js`

**Elements:**
- `orderSuccessHeading` — "Order Placed!" heading on payment confirmation page
- `orderConfirmedText` — "Congratulations! Your order has been confirmed!" paragraph
- `downloadInvoiceBtn` — `getByRole("link", { name: "Download Invoice" })` — triggers `/download_invoice/{id}` file stream

**Methods:**
- `fillPaymentDetails({ nameOnCard, cardNumber, cvc, expiryMonth, expiryYear })`
- `confirmOrder()` — clicks "Pay and Confirm Order" button
- `downloadInvoice()` — arms `page.waitForEvent("download")` before clicking `downloadInvoiceBtn`; returns `Promise<string | null>` (absolute path to downloaded artifact in Playwright temp dir)

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

