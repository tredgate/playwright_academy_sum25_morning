import { test } from "@playwright/test";

test("First Test", async ({ page }) => {
  await page.goto("https://tredgate.com/pmtool");
  await page.locator("#username").fill("pw_academy");
  await page.locator("#password").fill("Playwright321!");
  await page.locator(".btn").click();
});
/*

Vytvoř nový testovací soubor ve složce exercises: page_object_asserts_exercise.spec.ts
Vytvoř nový test:
Otevře PMTool
Přihlásí se
Zkontroluj:
Viditelnost profilového tlačítka, které používáme pro odhlášení.
Text názvu aplikace: TEG Project Management

* Testy budou vytvořené v Page Objektech, vytvoř do DashboardPage metodu na kontrolu.
*/
