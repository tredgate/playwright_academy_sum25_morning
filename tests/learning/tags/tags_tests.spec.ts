//tags_tests.spec.ts;
// tests/learning/tags
import { test } from "@playwright/test";
import { LoginPage } from "../../../src/pages/pmtool/login_page.ts";

test("Tag Test", { tag: "@mujTag" }, async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.openPmtool();
});

test("Without Tag Test", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.openPmtool();
});
