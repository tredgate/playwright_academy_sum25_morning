import { test } from "@playwright/test";

test("iFrame Test", async ({ page }) => {
  await page.goto("https://tredgate.com/webtrain/web-actions.html");

  const frame = page.frameLocator('[data-testid="test-automation-iframe"]');
  await frame.locator("#name").fill("Jméno v iframe");
});
