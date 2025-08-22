import { test, expect } from "@playwright/test";

test.describe("Mouse Actions Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://tredgate.com/webtrain/web-actions.html");
  });

  test("Hover Test", async ({ page }) => {
    await page.locator("#hover-box").hover();
    await expect(
      page.locator('[data-testid="hover-message"]'),
      "Message is visible after hover"
    ).toBeVisible();
  });

  test("Drag and Drop", async ({ page }) => {
    const draggable = page.locator("#drag1");
    const dropzone = page.locator("#drop1");

    // ? Ujištění, že cíl je vidět v aktuálním zobrazení. Ideální situace je, že oba prvky jsou vidět.
    await dropzone.scrollIntoViewIfNeeded();

    await draggable.dragTo(dropzone);
    await expect(page.locator("#dropped-message")).toBeVisible();
  });

  test("Double Click", async ({ page }) => {
    await page.locator('[data-testid="double-click-box"]').dblclick();
    await expect(
      page.locator('[data-testid="double-click-box"]')
    ).toContainClass("action-active");
  });

  test("Click and Hold", async ({ page }) => {
    await page.locator(".hold-button").click({ delay: 2500 }); // Stiskne a bude držet 2,5 sekundy
  });
});
