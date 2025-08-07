// fluent_api_login_tests.spec.ts
// tests/learning/fluent-interface
import { test } from "@playwright/test";
import { LoginPage } from "../../../src/pages/pmtool/login_page.ts";

test("Fluent Interface - Login Test", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage
    .openPmtool()
    .then((login) => login.fillUsername("pw_academy"))
    .then((login) => login.fillPassword("Playwright321!"))
    .then((login) => login.clickLogin())
    .then((dashboard) => dashboard.clickProfile())
    .then((dashboard) => dashboard.clickLogout());
});
/*
Cvičení - vytvoření testu na ztrátu hesla pomocí Fluent API (⌛15:00)
Vytvořte nový test na ztrátu hesla (tests/exercises/lost_password_tests.spec.ts)
Vytvořte nový Page Object pro stránku ztráta hesla (lost_password_page.ts) ve složce: src/pages/pmtool
Vytvořte akce v novém objektu:
Vyplnění username: typeUsername(), 
lokátor: [name="username"]
Vyplnění e-mailu: typeEmail(), 
lokátor: [name="email"] 
Kliknutí na Send: clickSend(), 
lokátor: [type="submit"]
Kliknutí na tlačítko zpět: clickBack(), 
lokátor: #back-btn
Upravte Page Object LoginPage, vložte kliknutí na Lost Password:  clickPasswordForgotten(), lokátor: #forget_password 
Vytvořte testy:
Ztracené heslo end to end (username: lost_password_user, mail: lost_password@tredgate.cz)
Otevření stránky ztraceného hesla, návrat na login.

*/
