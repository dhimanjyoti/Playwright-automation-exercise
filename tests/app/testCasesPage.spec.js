import { test } from "../../fixtures/testFixtures";

test.describe("Test Case Page Features", () => {
  test("User can navigate to the Test Cases page", async ({
    basePage,
    testCasesPage,
  }) => {
    await test.step("Open home page", async () => {
      await basePage.navigateToAutomationExercise();
      await basePage.verifyHomePage();
    });

    await test.step("Navigate to Test Cases page", async () => {
      await testCasesPage.navigateToTestCasesPage(); // includes verification
    });
  });
});
