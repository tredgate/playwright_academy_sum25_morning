/*
tests/learning/more-tabs
more_tabs_tests.spec.ts
*/

import { test } from "@playwright/test";

test("Handling new Tab in browser", async ({ page }) => {
  await page.goto("https://tredgate.com/webtrain/web-actions.html");
  // ? Zapneme asynchronní čekání na otevření okna
  const pagePromise = page.waitForEvent("popup"); // ! Nesmí zde být await
  await page.locator('[data-testid="new-tab-link"]').click();
  const newPage = await pagePromise;
  await newPage.locator("#name").fill("Toto je v nové záložce");
  await page.locator('[data-testid="double-click-box"]').dblclick();
});

test("Create New Browser Tab", async ({ page }) => {
  await page.goto("https://tredgate.com/pmtool");
  await page.locator("#username").fill("pw_academy");
  await page.locator("#password").fill("Playwright321!");
  await page.locator(".btn").click();

  // * Založení nového okna
  const newPage = await page.context().newPage();
  await newPage.goto("https://tredgate.com/webtrain/registration.html");
  await newPage.locator("#name").fill("Nová záložka");

  await page.locator("#user_dropdown").click();
  await page.locator("#logout").click();
});
