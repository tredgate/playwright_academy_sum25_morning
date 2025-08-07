import { test } from "@playwright/test";

test("First Test", async ({ page }) => {
  await page.goto("https://tredgate.com/pmtool");
  await page.locator("#username").fill("pw_academy");
  await page.locator("#password").fill("Playwright321!");
  await page.locator(".btn").click();
});
/*
Pokud jste minule necommitovali, nacommitujte, pushněte, vytvořte a dokončete PR, přepněte se do main, pullněte do mainu.
Vytvořte novou branch: fluent_api
*/
