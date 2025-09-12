import { expect, test } from "@playwright/test";
import path from "path";
import { LoginPage } from "../../../src/pages/pmtool/login_page.ts";

test.describe("Visual Tests", () => {
  test(
    "Simple Visual Test",
    {
      tag: "@github-actions",
    },
    async ({ page }) => {
      await page.goto("https://tredgate.com/webtrain/web-actions.html");
      await expect(page).toHaveScreenshot("simple_test.png");
    }
  );

  test.skip("Failing Visual Test", async ({ page }) => {
    await page.goto("https://tredgate.com/webtrain/dynamic-content.html");
    await expect(page).toHaveScreenshot("failing_test.png");
  });

  test("Full Page Visual Test", async ({ page }) => {
    await page.goto("https://tredgate.com/webtrain/web-actions.html");
    await expect(page).toHaveScreenshot("all_page.png", {
      fullPage: true,
    });
  });

  test("maxDiffPixelRatio Test", async ({ page }) => {
    await page.goto("https://tredgate.com/webtrain/web-actions.html");
    await expect(page).toHaveScreenshot("low_sensitivity.png", {
      maxDiffPixels: 500, // ? Snížení citlivosti - rozdíly do 500 px budou ignorovány
    });
    await expect(page).toHaveScreenshot("low_sensitivity_ratio.png", {
      maxDiffPixelRatio: 0.001, // ? Snížení citlivosti - rozdíly do 0,1 % budou ignorovaný
    });
  });

  test("Masking Elements", async ({ page }) => {
    await page.goto("https://tredgate.com/webtrain/web-actions.html");
    await expect(page).toHaveScreenshot("masked_element.png", {
      fullPage: true,
      mask: [page.locator("#main-nav a"), page.locator("#hover-box")],
    });
  });

  test("Hiding Elements with CSS", async ({ page }) => {
    await page.goto("https://tredgate.com/webtrain/dynamic-content.html");
    await expect(page).toHaveScreenshot("hidden_elements.png", {
      fullPage: true,
      stylePath: path.resolve(
        __dirname,
        "../../../src/assets/visual_tests.css" // Cesta k CSS, který skryje dynamické prvky na stránce pomocí   visibility: hidden; display: none;
      ),
    });
  });

  test("Elements visual tests", async ({ page }) => {
    await page.goto("https://tredgate.com/webtrain/index.html");

    // * Kontrola sekce (boxu)
    await expect(page.locator("//form/..")).toHaveScreenshot("box_test.png");

    // * Kontrola obrázku
    await expect(page.locator("#playwright-logo")).toHaveScreenshot(
      "image_test.png"
    );

    // * Kontrolu prvku (input/tlačítko)
    await expect(page.locator('//input[@id="age"]/..')).toHaveScreenshot(
      "input_test.png"
    );
  });

  test("Visual Checks in PageObjects", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const username = process.env.PMTOOL_USERNAME as string;
    const password = process.env.PMTOOL_PASSWORD as string;

    await loginPage
      .openPmtool()
      .then((login) => login.login(username, password))
      .then((dashboard) => dashboard.clickProfile())
      .then((dashboard) => dashboard.clickLogout())
      .then((login) => login.emptyLoginFormVisualCheck());
  });
});
