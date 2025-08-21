import { expect, Locator, Page } from "@playwright/test";
import { LoginPage } from "./login_page.ts";
import { ProjectsPage } from "./projects_page.ts";

export class DashboardPage {
  readonly page: Page;
  readonly profileButton: Locator;
  readonly logoutButton: Locator;
  readonly projectsButton: Locator;
  readonly appNameAnchor: Locator;

  constructor(page: Page) {
    this.page = page;
    this.profileButton = page.locator("#user_dropdown");
    this.logoutButton = page.locator("#logout");
    this.projectsButton = page.locator('//li[@id="Projects"]');
    this.appNameAnchor = page.locator(".navbar-brand");
  }

  async appNameHasText(appName: string): Promise<this> {
    await expect(this.appNameAnchor, "App name have text").toHaveText(appName);
    return this;
  }

  async clickProfile(): Promise<this> {
    await this.profileButton.click();
    return this;
  }

  async clickLogout(): Promise<LoginPage> {
    await this.logoutButton.click();
    return new LoginPage(this.page);
  }

  async clickProjects(): Promise<ProjectsPage> {
    await this.projectsButton.click();
    return new ProjectsPage(this.page);
  }
}
/*

4. část - vytvoření testu
⌛10:00
Složka
projekt/tests/exercises
Soubor
exercise_add_project.spec.ts
Kroky
Přihlášení
Kliknutí na Projects
Vytvoření projektu (name pomocí Faker)
Odhlášení

*/
