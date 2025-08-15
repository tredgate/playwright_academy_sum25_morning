// asserts_tests.spec.ts
// tests/learning/asserts
import { test, expect } from "@playwright/test";
import { LoginPage } from "../../../src/pages/pmtool/login_page.ts";
import { DashboardPage } from "../../../src/pages/pmtool/dashboard_page.ts";

test.describe("Asserts - Testing in Playwright", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage
      .openPmtool()
      .then((login) => login.login("pw_academy", "Playwright321!"));
  });

  test("toContainText Assert", async ({ page }) => {
    const dashboardHeader = page.locator("#welcome-page-header");
    // ? Pokud bychom odebrali await před expectem, kontrola proběhne okamžitě. Await vždy čeká na požadovaný stav nebo do timeoutu
    await expect(dashboardHeader, "Dashboard title containText").toContainText(
      "Vítej v testovací aplikaci"
    );
  });

  test("tohaveText Assert", async ({ page }) => {
    const dashboardHeader = page.locator("#welcome-page-header");
    await expect(dashboardHeader, "Dashboard title haveText").toHaveText(
      "Vítej v testovací aplikaci Tredgate Project"
    );
  });

  test("toBeVisible Assert", async ({ page }) => {
    const pageLogo = page.locator(".logo img");
    await expect(pageLogo, "Page logo is visible").toBeVisible();
  });

  test("toHaveValue Assert", async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.clickProjects();

    const searchInput = page.locator('[test_id="search_input"]');
    const searchValue = "Test";

    await searchInput.fill(searchValue);
    await expect(searchInput, "Search input toHaveValue").toHaveValue(
      searchValue
    );
  });

  test("Soft Assert Test", async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const dashboardHeader = page.locator("#welcome-page-header");

    await expect(dashboardHeader, "Dashboard header have text").toHaveText(
      "Vítej v testovací aplikaci"
    );

    await dashboardPage.clickProfile();
  });
});

test.describe("Negative Tests on Login Page", () => {
  test("Negative Assert", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.openPmtool();

    const usernameInput = page.locator("#username");
    const alert = page.locator(".alert");

    await expect(usernameInput, "Username input is visible").toBeVisible();
    await expect(alert, "Alert is not visible").not.toBeVisible();
  });
});

test("Page Objects Asserts", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage
    .openPmtool()
    .then((login) => login.pageHeaderHasText("Login"));
});
