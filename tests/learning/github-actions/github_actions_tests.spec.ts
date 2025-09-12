// github_actions_tests.spec.ts
// tests/learning/github-actions

import { test } from "@playwright/test";
import { LoginPage } from "../../../src/pages/pmtool/login_page.ts";

test.describe(
  "GitHub Actions Tests with Tag",
  {
    tag: "@github-actions",
  },
  () => {
    let username: string;
    let password: string;

    test.beforeEach(async ({ page }) => {
      username = process.env.PMTOOL_USERNAME as string;
      password = process.env.PMTOOL_PASSWORD as string;
      const loginPage = new LoginPage(page);
      await loginPage.openPmtool();
    });

    test("Login to Pmtool", async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.login(username, password);
    });

    test("Login and logout - Pmtool", async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage
        .login(username, password)
        .then((dashboard) => dashboard.clickProfile())
        .then((dashboard) => dashboard.clickLogout());
    });
  }
);
