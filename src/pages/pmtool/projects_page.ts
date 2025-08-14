import { Locator, Page } from "@playwright/test";
import { CreateNewProjectModal } from "./projects/create_new_project_modal.ts";

export class ProjectsPage {
  readonly page: Page;
  readonly addProjectButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addProjectButton = page.locator('//button[@test_id="Add Project"]');
  }

  async clickAddProject(): Promise<CreateNewProjectModal> {
    await this.page.waitForTimeout(1000); // ! Toto není doporučená praktika! Implicitní čekání (čekání na tvrdo) používáje jen když nemáme jinou alternativu (ukážeme si v rámci lekce, kde budeme provádět kontroly)
    await this.addProjectButton.click();
    return new CreateNewProjectModal(this.page);
  }
}
