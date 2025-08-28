import { expect, Locator, Page } from "@playwright/test";
import { CreateNewProjectModal } from "./projects/create_new_project_modal.ts";

export class ProjectsPage {
  readonly page: Page;
  readonly addProjectButton: Locator;
  readonly projectsTable: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addProjectButton = page.locator('//button[@test_id="Add Project"]');
    this.projectsTable = page.locator("#slimScroll table");
  }

  async clickAddProject(): Promise<CreateNewProjectModal> {
    // await this.page.waitForTimeout(1000); // ! Toto není doporučená praktika! Implicitní čekání (čekání na tvrdo) používáje jen když nemáme jinou alternativu (ukážeme si v rámci lekce, kde budeme provádět kontroly)
    await expect(this.projectsTable).toBeVisible();
    await this.addProjectButton.click();
    return new CreateNewProjectModal(this.page);
  }
}
