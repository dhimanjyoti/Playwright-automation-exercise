// @ts-check

/**
 * Stores all static error messages across the application.
 * Object.freeze prevents tests from accidentally modifying the values.
 */
export const ERROR_MESSAGES = Object.freeze({
  AUTH: {
    INVALID_LOGIN: "Your email or password is incorrect!",
    EMAIL_ALREADY_EXISTS: "Email Address already exist!",
  },
  CHECKOUT: {
    EMPTY_CART: "Cart is empty! Click here to buy products.",
  },
});

export const SUCCESS_MESSAGES = Object.freeze({
  ACCOUNT_CREATED: "Account Created!",
  ACCOUNT_DELETED: "Account Deleted!",
  ORDER_PLACED: "Order Placed!",
  ORDER_CONFIRMED: "Congratulations! Your order has been confirmed!",
  CONTACT_SUBMITTED: "Success! Your details have been submitted successfully.",
  SUBSCRIPTION_SUCCESS: "You have been successfully subscribed!",
  REVIEW_SUBMITTED: "Thank you for your review.",
});

export const SECTION_HEADINGS = Object.freeze({
  SUBSCRIPTION: "Subscription",
});

export const ALERTS = Object.freeze({
  CONTACT_CONFIRM: "Press OK to proceed!",
});

export const API_MESSAGES = Object.freeze({
  UNSUPPORTED_METHOD: "This request method is not supported.",
  MISSING_SEARCH_PRODUCT: "Bad request, search_product parameter is missing in POST request.",
  USER_EXISTS: "User exists!",
  USER_NOT_FOUND: "User not found!",
  USER_CREATED: "User created!",
  ACCOUNT_DELETED: "Account deleted!",
  USER_UPDATED: "User updated!",
  MISSING_LOGIN_PARAMS: "Bad request, email or password parameter is missing in POST request.",
});

export const CART_DEFAULTS = Object.freeze({
  INITIAL_QUANTITY: "1",
});

export const CATEGORY_HEADINGS = Object.freeze({
  WOMEN_DRESS: "Women - Dress Products",
  MEN_TSHIRTS: "Men - Tshirts Products",
});

export const BRAND_HEADINGS = Object.freeze({
  POLO: "Brand - Polo Products",
  HM: "Brand - H&M Products",
});

export const SEARCH_HEADINGS = Object.freeze({
  SEARCHED_PRODUCTS: "Searched Products",
});
