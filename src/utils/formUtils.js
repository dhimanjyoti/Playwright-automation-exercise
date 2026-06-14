// @ts-check

/**
 * Arms a one-shot dismiss handler on the next confirm dialog so the form
 * does not submit and the page does not navigate. After the caller verifies
 * the dialog properties, dismissing (returning false to confirm()) is the
 * network-level approach to prevent navigation on this site.
 *
 * Caller is responsible for registering assertions in a separate page.once()
 * BEFORE calling this function.
 * @param {import('@playwright/test').Page} page
 * @returns {Promise<void>}
 */
export async function preventFormSubmit(page) {
  await page.route("**/contact_us", async (route) => {
    // Safety net: if a POST somehow bypasses the dialog dismiss,
    // abort the navigation so the page state is preserved.
    if (route.request().method() === "POST") {
      await page.unroute("**/contact_us");
      await route.abort();
    } else {
      await route.continue();
    }
  });
}
