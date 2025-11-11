import { expect } from "@playwright/test";

export class SearchProduct {
  constructor(page) {
    this.page = page;

    this.searchInputBox = page.locator("input[id='search_product']");
    this.searchBtn = page.locator("button[id='submit_search']");
    this.searchProductPageTitle = page.locator(".title.text-center");
    this.searchProductName = page.locator(".productinfo.text-center p");
  }

  async searchProductandVerifySearchedPageTitle(productName) {
    await this.searchInputBox.fill(productName);

    await Promise.all([
      this.page.waitForURL(/search=/i), // wait for navigation
      this.searchBtn.click(),
    ]);
  }

  async assertSearchURL() {
    await expect(this.page).toHaveURL(/\/products\?search=/i);
  }

  async assertSearchResultsRelevant(keyword) {
    const searchKey = keyword.toLowerCase();

    const titles = (await this.searchProductName.allInnerTexts()).map((t) =>
      t.trim().toLowerCase()
    );

    for (const title of titles) {
      await expect(
        title.includes(searchKey),
        `Expected "${title}" to contain "${searchKey}"`
      ).toBeTruthy();
    }
  }
}
