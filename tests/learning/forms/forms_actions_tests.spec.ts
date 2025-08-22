import { test } from "@playwright/test";
import path from "path";

test.describe("Forms Actions", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://tredgate.com/webtrain/registration.html");
  });

  test("fill and pressSequentially Test", async ({ page }) => {
    const nameInput = page.locator("#name");
    await nameInput.fill("Start");
    await nameInput.fill("End");
    await nameInput.pressSequentially("Kde toto bude?");
    // ? Smazání hodnota pole - není potřeba u fill:
    await nameInput.clear();
    await nameInput.pressSequentially("ABCD", { delay: 500 }); // ? Zpomalení odezvy mezi stisky kláves
  });

  test("Select Test", async ({ page }) => {
    const genderSelect = page.locator("#gender");
    await genderSelect.selectOption("male"); // ? Výběr ze selectu pomocí option value
    await genderSelect.selectOption({ label: "Female" }); // ? Výběr ze selectu pomocí option texts
  });

  test("Checkbox, Radio Buttons check()", async ({ page }) => {
    await page.locator("#contact-phone").check();
    await page.locator("#interests-sports").check();
    await page.locator("#interests-sports").uncheck();
  });

  test("Date fill Test", async ({ page }) => {
    await page.locator("#date-of-birth").fill("2000-05-17");
  });

  test("File Upload Test", async ({ page }) => {
    const uploadFile = path.resolve(
      __dirname,
      "../../../src/assets/upload_file.txt"
    );
    // require("../../../src/assets/upload_file.txt"); // ? require pro upload nepoužíváme, VS Code nám ale našeptává cestu, kdežto path.resolve ne, můžeme jej použít jako pomocníka a následně ho smažeme.
    const fileChooserPromise = page.waitForEvent("filechooser"); // ! Nesmíme použít await, jinak se nám test zasekne
    await page.locator("#file-upload").click();
    const fileChooser = await fileChooserPromise; // ? Odchytím událost (výběr upload souboru) a uložím si toto okno do proměnné
    await fileChooser.setFiles(uploadFile);

    await page.waitForTimeout(1000);
  });

  test("Slider - range test", async ({ page }) => {
    const experienceSlider = page.locator("#experience");
    await experienceSlider.fill("4");
    await experienceSlider.fill("1");
    await experienceSlider.fill("10");
  });
});
