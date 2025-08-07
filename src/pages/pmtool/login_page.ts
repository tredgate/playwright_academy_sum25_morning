// login_page.ts
// src/pages/pmtool

import { Locator, Page } from "@playwright/test";
import { DashboardPage } from "./dashboard_page.ts";
import { LostPasswordPage } from "./lost_password_page.ts";

export class LoginPage {
  readonly page: Page;
  readonly url = "https://tredgate.com/pmtool"; // ? Jen na první stránce (PO), kde budeme otvírat aplikaci
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly lostPasswordAnchor: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator("#username"); // ! V případě nastavování lokátorů, nedáváme await před page
    this.passwordInput = page.locator("#password");
    this.loginButton = page.locator(".btn");
    this.lostPasswordAnchor = page.locator("//a[@id='forget_password']");
  }

  // Při vytváření metod doporučím přístup začít s atomickými (malými) metodami s jedním krokem a pak vytvářet sdružující metody
  // Například: typeUsername - jeden krok, login - sdružení více kroků
  // Atomické metody používáme, když danou funkcionalitu testujeme a sdružující metody například pro preconditions jiných testů

  async openPmtool(): Promise<this> {
    await this.page.goto(this.url);
    return this;
  }

  // ! Testovací data NIKDY nedáváme do metod, ale posíláme je parametrems
  async fillUsername(username: string): Promise<this> {
    await this.usernameInput.fill(username);
    return this;
  }

  async fillPassword(password: string): Promise<this> {
    await this.passwordInput.fill(password);
    return this;
  }

  async clickLogin(): Promise<DashboardPage> {
    await this.loginButton.click();
    return new DashboardPage(this.page);
  }

  async login(username: string, password: string): Promise<DashboardPage> {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLogin();
    return new DashboardPage(this.page);
  }

  async clickPasswordForgotten(): Promise<LostPasswordPage> {
    await this.lostPasswordAnchor.click();
    return new LostPasswordPage(this.page);
  }
}
