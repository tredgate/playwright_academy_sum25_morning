import { test, expect } from "@playwright/test";
import { LoginPage } from "../../src/pages/pmtool/login_page.ts";

test("Exercise: add project form", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage
    .openPmtool()
    .then((login) => login.login("pw_academy", "Playwright321!"))
    .then((dashboard) => dashboard.clickProjects());

  const projectsTable = page.locator(".table-scrollable table");
  await expect(projectsTable, "Projects table is visible").toBeVisible();
  await page.locator('//button[@test_id="Add Project"]').click();

  const nameInput = page.locator('//div[@data-testid="Name"]/input');
  const saveButton = page.locator('//button[@type="submit"]');

  await expect(nameInput, "Name input is visible").toBeVisible();
  await expect(saveButton, "Save button have text").toHaveText("Save");
});
