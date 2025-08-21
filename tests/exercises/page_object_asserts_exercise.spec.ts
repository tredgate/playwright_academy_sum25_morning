import { test } from "@playwright/test";
import { LoginPage } from "../../src/pages/pmtool/login_page.ts";

test("Exercise: Asserts in Page Objects", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage
    .openPmtool()
    .then((login) => login.login("pw_academy", "Playwright321!"))
    .then((dashboard) => dashboard.appNameHasText("TEG Project Management"));
});
