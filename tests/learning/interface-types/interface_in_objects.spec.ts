// tests/learning/interface-types/
// interface_in_objects.spec.ts

import { Page, test } from "@playwright/test";

interface PageObject {
  page: Page;
  url: string;

  goto(): Promise<this>;
  checkPageContent(): Promise<this>;
}

class HomePage implements PageObject {
  readonly page: Page;
  readonly url = "https://example.com";

  constructor(page: Page) {
    this.page = page;
  }

  async goto(): Promise<this> {
    await this.page.goto(this.url);
    return this;
  }

  async checkPageContent(): Promise<this> {
    // Testovací kroky
    return this;
  }
}

test("HomePage Test", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto().then((page) => page.checkPageContent());
});
