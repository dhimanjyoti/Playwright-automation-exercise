import { getRandomSearchKeyword } from "../utils/helper.js";

export class SearchFlow {
  constructor({ searchProductPage }) {
    this.searchProductPage = searchProductPage;
  }

  async searchRandomProduct(searchProducts) {
    const keyword = await getRandomSearchKeyword(searchProducts);

    await this.searchProductPage.searchProductandVerifySearchedPageTitle(
      keyword
    );

    return { keyword };
  }
}
