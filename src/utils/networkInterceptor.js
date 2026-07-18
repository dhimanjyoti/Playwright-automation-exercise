// @ts-check
/**
 * Utility function to block ads, tracking, and unwanted network requests.
 * @param {import('@playwright/test').Page} page - Playwright page context
 */
export async function blockAds(page) {
  const blockedResources = [
    // Google / DoubleClick ecosystem
    "google-analytics.com",
    "googletagmanager.com",
    "doubleclick.net",
    "adservice.google",
    "googleads",
    "googlesyndication",
    // Amazon
    "amazon-adsystem.com",
    // AppNexus / Xandr
    "adnxs.com",
    // Ad networks observed on automationexercise.com
    "popads.net",
    "popcash.net",
    "adsterra.com",
    "mgid.com",
    "exoclick.com",
    "trafficjunky.net",
    "juicyads.com",
    "hilltopads.net",
    "adcash.com",
    "propellerads.com",
    "clickadu.com",
  ];

  await page.route("**/*", async (route) => {
    const url = route.request().url();
    const shouldBlock = blockedResources.some((resource) =>
      url.includes(resource),
    );

    if (shouldBlock) {
      await route.abort();
    } else {
      await route.continue();
    }
  });
}
