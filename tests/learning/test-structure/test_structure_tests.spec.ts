// test_structure_tests.spec.ts
// tests/learning/test-structure
import { test } from "@playwright/test";
import { LoginPage } from "../../../src/pages/pmtool/login_page.ts";

test.describe("Test Suite - Login Pmtool", () => {
  test("Successful Login", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage
      .openPmtool()
      .then((login) => login.login("pw_academy", "Playwright321!"));
  });

  test("Failed login", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage
      .openPmtool()
      .then((login) => login.login("pw_academy", "abcd"));
  });
});
