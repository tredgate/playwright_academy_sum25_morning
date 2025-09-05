import { expect, Locator, Page } from "@playwright/test";

export class ProjectInfoPage {
  readonly page: Page;
  readonly dateAddedValueTd: Locator;
  readonly priorityValueTd: Locator;
  readonly statusValueTd: Locator;
  readonly startDateValueTd: Locator;
  readonly projectTitleDiv: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dateAddedValueTd = page.locator('//th[text()="Date Added"]/../td');
    this.priorityValueTd = page.locator('//th[text()="Priority"]/..//div');
    this.statusValueTd = page.locator('//th[text()="Status"]/..//div');
    this.startDateValueTd = page.locator('//th[text()="Start Date"]/../td');
    this.projectTitleDiv = page.locator(".portlet-title div.caption");
  }

  async dateAddedHaveText(dateAdded: string): Promise<this> {
    await expect
      .soft(this.dateAddedValueTd, "Date Added Contain Text")
      .toContainText(dateAdded);
    return this;
  }

  async prirorityHaveText(priority: string): Promise<this> {
    await expect
      .soft(this.priorityValueTd, "Priority Have Text")
      .toHaveText(priority);
    return this;
  }

  async statusHaveText(status: string): Promise<this> {
    await expect
      .soft(this.statusValueTd, "Status Have Text")
      .toHaveText(status);
    return this;
  }

  async startDateHaveText(startDate: string): Promise<this> {
    await expect
      .soft(this.startDateValueTd, "Start Date Have Text")
      .toHaveText(startDate);
    return this;
  }

  async projectTitleHaveText(projectTitle: string): Promise<this> {
    await expect
      .soft(this.projectTitleDiv, "Project Title have Text")
      .toHaveText(projectTitle);
    return this;
  }
}
