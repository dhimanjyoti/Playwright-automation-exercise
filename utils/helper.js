// A reusable utility function
export async function preventFormSubmit(page, formSelector = "form") {
  await page.evaluate((selector) => {
    const form = document.querySelector(selector);
    if (form) {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
      });
    }
  }, formSelector);
}

export async function waitForFewSeconds(page, seconds = 2, reason = "") {
  console.log(`Waiting for ${seconds}s ${reason ? `(${reason})` : ""}`);
  await page.waitForTimeout(seconds * 1000);
}
