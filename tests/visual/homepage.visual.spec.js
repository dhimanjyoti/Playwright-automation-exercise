// @ts-check
import { test, expect } from "../../src/fixtures/baseFixture.js";
import { blockAds } from "../../src/utils/networkInterceptor.js";

test.describe("Visual Regression Suite - Authentication Panel", () => {

  test.beforeEach(async ({ page, pom }) => {
    await blockAds(page);
    await pom.basePage.navigateToAutomationExcercise();
    await pom.basePage.waitForHomePageToLoad();
  });

  test("Verify Core Authentication Form Components", async ({ pom }) => {
    await test.step("Navigate to auth entry panel", async () => {
      await pom.loginPage.navigateToLoginPage();
    });

    await test.step("Isolate and validate login card target snapshot", async () => {
      const targetComponent = pom.loginPage.visualFormContainer;
      await targetComponent.waitFor({ state: "visible", timeout: 5000 });

      await expect(targetComponent).toHaveScreenshot({
        animations: "disabled",
        scale: "css",
        maxDiffPixels: 50,
      });
    });
  });
});
