// tests/learning/page-objects
// page_objects_tests.spec.ts
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

/*
Cvičení - Vytvořte nový test a PageObject výkazy ⌛15:00
Vytvořte složku: tests/exercises a v ní: page_objects_exercise.spec.ts vytvořte nový test: PageObjects Exercise - Login and Logout
Ve složce src/pages/pmtool Vytvořte nový Page Object pro domovskou stránku (dashboard_page.ts).
Page Object bude obsahovat:
Klik na profilovou sekci (clickProfile), lokátor: #user_dropdown
Klik na odhlášení (clickLogout), lokátor: #logout
Do testu vložte otevření PMTool, přihlášení a následně odhlášení.

*/
