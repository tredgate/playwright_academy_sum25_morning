import { test } from "@playwright/test";
import { LoginPage } from "../../../src/pages/pmtool/login_page.ts";

test("Page Objects Tests", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.openPmtool();
  await loginPage.fillUsername("pw_academy");
  await loginPage.fillPassword("Playwright321!");
  await loginPage.clickLogin();
});

test("Page Objects - general method", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.openPmtool();
  await loginPage.login("pw_academy", "Playwright321!");
});
