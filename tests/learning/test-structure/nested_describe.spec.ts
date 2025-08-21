/*
tests/learning/test-structure
nested_describe.spec.ts
*/

import { expect, test } from "@playwright/test";
import { LoginPage } from "../../../src/pages/pmtool/login_page.ts";
import { DashboardPage } from "../../../src/pages/pmtool/dashboard_page.ts";
test.describe("Testování vnořených describů", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.openPmtool();
  });

  test("První describe - loginPage", async ({ page }) => {
    const loginPage = new LoginPage(page);
    loginPage.pageHeaderHasText("Login");
  });

  // ? Vnořený Describe uvnitř jiného describe
  test.describe("Pmtool Dashboard Tests", () => {
    // ? beforeEach, který se přihlásí do Pmtool, ale bude probíhat jen pro testy uvnitř tohoto describe
    test.beforeEach(async ({ page }) => {
      const loginPage = new LoginPage(page);
      // ? Již není potřebujeme loginPage.openPmtool(), protože v předchozím beforeEach jsem již pmtool otevřeli
      loginPage.login("pw_academy", "Playwright321!");
    });

    test("Dashboard Header have text", async ({ page }) => {
      await expect(
        page.locator("#welcome-page-header"),
        "Dashboard Page Title Have Text"
      ).toHaveText("Vítej v testovací aplikaci Tredgate Project");
    });

    test("Logout from Pmtool", async ({ page }) => {
      const dashboardPage = new DashboardPage(page);
      await dashboardPage
        .clickProfile()
        .then((dashboard) => dashboard.clickLogout());
    });
  });
});
