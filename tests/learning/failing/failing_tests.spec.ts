import { expect, test } from "@playwright/test";

test.describe("Failing Tests", () => {
  test("Failing test", async ({ page }) => {
    await page.goto("https://tredgate.com/pmtool");
    await page.locator("#username222").fill("pw_academy");
  });

  test("Failing assert", async ({ page }) => {
    page.goto("https://tredgate.com/pmtool");
    page.locator("#username").fill("test");
    page.locator("#password").fill("test");
    page.locator(".btn").click();
    await expect(page.locator("#not_existing")).toBeVisible();
  });
});
