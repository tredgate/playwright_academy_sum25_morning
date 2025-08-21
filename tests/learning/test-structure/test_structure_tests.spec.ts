// test_structure_tests.spec.ts
// tests/learning/test-structure
import { test } from "@playwright/test";
import { LoginPage } from "../../../src/pages/pmtool/login_page.ts";

test.describe("Test Suite - Login Pmtool", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    console.log("Běžím před každým testem");

    loginPage = new LoginPage(page);
    await loginPage.openPmtool();
  });

  test("Successful Login", async () => {
    await loginPage.login("pw_academy", "Playwright321!");
  });

  test("Failed login", async () => {
    await loginPage.login("pw_academy", "abcd");
  });
});
