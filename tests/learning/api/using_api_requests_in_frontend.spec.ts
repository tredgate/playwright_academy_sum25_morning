// using_api_requests_in_frontend.spec.ts
// tests/learning/api

import { expect, test } from "@playwright/test";
import { faker } from "@faker-js/faker";

test.describe("Using API requests in Frontend", () => {
  test("Register and Login via API to app", async ({ page, request }) => {
    // * Příprava testovacích dat (pomocí faker)
    const username = faker.internet.username();
    const password = faker.internet.password();
    const email = faker.internet.email();

    // * Registrace uživatele pomocí API: POST http://localhost:3000/user/register
    const registerResponse = await request.post(
      "http://localhost:3000/user/register",
      {
        data: {
          username,
          password,
          email,
        },
      }
    );
    expect(registerResponse.status(), "Register Response have Status 201").toBe(
      201
    );

    // * Přihlášení uživatele pomocí API
    const loginResponse = await request.post(
      "http://localhost:3000/auth/login",
      {
        data: {
          username,
          password,
        },
      }
    );
    // * Vytažení klíče pro přihlášení (token)
    const loginBody = await loginResponse.json();
    const accessToken = loginBody.access_token;

    // * Nastavení cookie s access_token
    await page.context().addCookies([
      {
        name: "access_token",
        value: accessToken,
        path: "/",
        domain: "localhost", // ! Pozor, může se měnit dle použitého prostředí
      },
    ]);

    // * Otevření stránky (měli bychom být přihlášení - máme nastavený access_token)
    await page.goto("http://localhost:3001/app");
    await page.locator('[data-testid="logout_button"]').click();
  });
});
