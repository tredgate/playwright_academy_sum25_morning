import { test } from "@playwright/test";
import { LoginPage } from "../../src/pages/pmtool/login_page.ts";
import { faker } from "@faker-js/faker";

test("Exercise: Add Project", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const projectName =
    faker.animal.petName() + faker.number.int({ min: 0, max: 10000 });

  await loginPage
    .openPmtool()
    .then((login) => login.login("pw_academy", "Playwright321!"))
    .then((dashboard) => dashboard.clickProjects())
    .then((projects) => projects.clickAddProject())
    .then((addNewProject) => addNewProject.fillName(projectName))
    .then((addNewProject) => addNewProject.clickSave())
    .then((tasks) => tasks.clickProfile())
    .then((tasks) => tasks.clickLogout());
});
