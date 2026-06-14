// @ts-check
import { test, expect } from "../../../src/fixtures/baseFixture.js";
import { ExcelUtil } from "../../../src/utils/ExcelUtil.js";

test.describe("Verify All Product and Product Details Page", () => {
  test("Verify that user is able to click on the 1st product from the product details page", async ({
    pom,
  }) => {
    await test.step("Navigate to Product Page", async () => {
      await pom.basePage.navigateToAutomationExcercise();
      await pom.productPage.navigateToProductsPage();
      await pom.productPage.captureAllTheAvailableProductDetailsAndSaveItToExcel();
      await pom.productPage.clickFirstViewProduct();
    });

    await test.step("Verify live product details against Excel data", async () => {
      // Get the expected data from the Excel file
      const excelData = ExcelUtil.readExcelToJson(
        "Automation_Products_List.xlsx",
      );
      const expectedProduct = excelData[0]; // index 0 is the first product

      expect(
        expectedProduct,
        "Ensure Excel data exists before verifying",
      ).toBeDefined();

      // Get the actual data from the UI using our clean POM method
      const { actualName, actualPrice } =
        await pom.productPage.getActualProductDetails();

      expect.soft(actualName).toBe(expectedProduct["Product Name"]);
      expect.soft(actualPrice).toBe(expectedProduct["Product Price"]);
    });
  });
});
