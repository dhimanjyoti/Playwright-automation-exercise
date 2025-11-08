import { test, expect } from "../../fixtures/testFixtures";

test.describe("Test Case Page Features", () => {
  test("TC_08: User can navigate to the Test Cases page", async ({
    basePage,
    testCasesPage,
  }) => {
    await test.step("Open home page", async () => {
      await basePage.navigateToAutomationExercise();
      await expect(await basePage.isHomePageLoaded()).toBeTruthy();
    });

    await test.step("Navigate to Test Cases page", async () => {
      await testCasesPage.navigateToTestCasesPage();

      // assert the page state
      expect(await testCasesPage.isTestCasesPageReady()).toBeTruthy();
    });
  });
});
