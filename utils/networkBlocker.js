export async function blockAds(page) {
  await page.route("**/*", (route) => {
    const url = route.request().url();

    const blockedDomains = [
      "doubleclick",
      "googlesyndication",
      "google-analytics",
      "googleads",
      "adsystem",
      "adservice",
      "amazon-adsystem",
    ];

    if (blockedDomains.some((domain) => url.includes(domain))) {
      return route.abort();
    }

    route.continue();
  });
}
