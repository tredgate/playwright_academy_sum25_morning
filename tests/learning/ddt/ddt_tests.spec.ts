import { expect, test } from "@playwright/test";
import newProjectDataJson from "../../../src/assets/new_project_data.json";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { LoginPage } from "../../../src/pages/pmtool/login_page.ts";

test.describe("Data Driven Tests", () => {
  newProjectDataJson.forEach((projectData, index) => {
    test(`${index + 1} DDT: Create project ${projectData.description}`, async ({
      page,
    }) => {
      const projectName = `${projectData.name_prefix}${faker.number.int({
        max: 100000,
      })}`;
      const startDate = getStartDate(projectData.start_date, "YYYY-MM-DD");
      const todayDateProjectInfo = dayjs().format("DD/MM/YYYY");
      const startDateProjectInfo = getStartDate(
        projectData.start_date,
        "DD/MM/YYYY"
      );

      console.log("Project Name: " + projectName);
      console.log("Start Date: " + startDate);

      const loginPage = new LoginPage(page);
      await loginPage
        .openPmtool()
        .then((login) => login.login("pw_academy", "Playwright321!"))
        .then((dashboard) => dashboard.clickProjects())
        .then((projects) => projects.clickAddProject())
        .then((newProject) =>
          newProject.selectPriorityByLabel(projectData.priority)
        )
        .then((newProject) =>
          newProject.selectStatusByLabel(projectData.status)
        )
        .then((newProject) => newProject.fillName(projectName))
        .then((newProject) => newProject.fillStartDate(startDate))
        .then((newProject) => newProject.clickSave())
        .then((projectTasks) => projectTasks.clickProjectInfo())
        .then((projectInfo) =>
          projectInfo.dateAddedHaveText(todayDateProjectInfo)
        )
        .then((projectInfo) =>
          projectInfo.startDateHaveText(startDateProjectInfo)
        )
        .then((projectInfo) => projectInfo.projectTitleHaveText(projectName))
        .then((projectInfo) =>
          projectInfo.prirorityHaveText(projectData.priority)
        )
        .then((projectInfo) => projectInfo.statusHaveText(projectData.status));
    });
  });
});

function getStartDate(startDateString: string, dateFormat: string): string {
  let startDate = ""; // ? Prázdný string - bez toho by nám nešel return (mohl by být undefined) - my ale řešíme uvnitř switch
  switch (startDateString) {
    case "today":
      startDate = dayjs().format(dateFormat);
      break;
    case "yesterday":
      startDate = dayjs().subtract(1, "day").format(dateFormat);
      break;
    case "tomorrow":
      startDate = dayjs().add(1, "day").format(dateFormat);
      break;
    default:
      expect(
        false,
        `Error: startDateString: ${startDateString} is not supported. Use: 'today', 'yesterday' or 'tomorrow'`
      ).toBe(true);
  }
  return startDate;
}
