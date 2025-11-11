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

export async function getRandomSearchKeyword(searchProducts) {
  const categories = Object.keys(searchProducts); // Women, Men, Kids
  const randomCategory =
    categories[Math.floor(Math.random() * categories.length)];

  const items = searchProducts[randomCategory]; // ["Dress", "Tops", ...]
  const randomItem = items[Math.floor(Math.random() * items.length)];

  return randomItem;
}
