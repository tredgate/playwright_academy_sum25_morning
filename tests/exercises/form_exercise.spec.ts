import { expect, test } from "@playwright/test";

test("Exercise: fill form", async ({ page }) => {
  await page.goto("https://tredgate.com/webtrain/contact.html");
  await page.locator('[data-testid="input-name"]').fill("Petr Test");
  await page.locator('[data-testid="input-email"]').fill("petr@example.org");
  await page.locator('[data-testid="input-contact-date"]').fill("2025-08-30");
  await page.locator('[data-testid="select-role"]').selectOption("student");
  await page.locator('[data-testid="textarea-comments"]').fill("Komentář bla");
  await page.locator('[data-testid="checkbox-newsletter"]').check();
  await page.locator('[data-testid="button-submit"]').click();
  await expect(page.locator('[data-testid="success-box"]')).toBeVisible();
});
