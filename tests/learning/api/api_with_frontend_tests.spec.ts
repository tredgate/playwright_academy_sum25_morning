import { expect, test } from "@playwright/test";

test.describe("Frontend with API Tests", () => {
  test("Login API Check", async ({ page }) => {
    await page.goto("http://localhost:3001/");
    await page.locator('[data-testid="username"]').fill("fifka_petr");
    await page.locator('[data-testid="password"]').fill("Tredgate2023#");
    // ? Těsně před posláním API (v tomto případě kliknutí na login tlačítko) spustíme odchycení a čekání na dokončení - bez awaitu a uložíme si Promise do proměnné
    const responsePromise = page.waitForResponse(/\/auth\/login/);
    // ? Kliknutí provolá API
    await page.locator('[data-testid="log_in"]').click();
    // ? Čekáme na dokončení (přijetí response) requestu
    await responsePromise;
    await page.locator('[data-testid="logout_button"]').click();
  });

  // ? SIT - System Integration Testing: https://en.wikipedia.org/wiki/System_integration_testing
  // ? Jedná se o testování integrací (API) na frontendu - testujeme request i response část
  test("Intercepted API Login Tests (SIT)", async ({ page }) => {
    const username = "fifka_petr";
    const password = "Tredgate2023#";

    await page.goto("http://localhost:3001/");
    await page.locator('[data-testid="username"]').fill(username);
    await page.locator('[data-testid="password"]').fill(password);
    const responsePromise = page.waitForResponse(/\/auth\/login/);
    await page.locator('[data-testid="log_in"]').click();
    const loginResponse = await responsePromise;
    const loginRequest = loginResponse.request();

    await test.step("Login Request Checks", async () => {
      expect(loginRequest.method(), "Login Request Method is POST").toBe(
        "POST"
      );

      const requestBody = loginRequest.postDataJSON(); // ? postDataJSON je podobná metoda jako response.json()
      // * Testování existence properties
      expect(requestBody, "Login Request body.username exist").toHaveProperty(
        "username"
      );
      // ? toBeDefined provádí velice podobnou kontrolu jako toHaveProperty - je to alternativa
      expect(
        requestBody.password,
        "Login Request body.password exist"
      ).toBeDefined();

      // * Testování datových typů properties
      expect(
        typeof requestBody.username,
        "Login Request body.username is a String"
      ).toBe("string");
      expect(
        typeof requestBody.password,
        "Login Request body.password is a String"
      ).toBe("string");

      // * Testování správných hodnot v body
      expect(
        requestBody.username,
        "Login Request body.username have Value"
      ).toBe(username);
      expect(
        requestBody.password,
        "Login Request body.password have Value"
      ).toBe(password);
    });

    await test.step("Login Response Checks", async () => {
      // * Kontrola statusu response
      expect(loginResponse.status(), "Login Response Status is 201").toBe(201);
      expect(
        loginResponse.statusText(),
        "Login Response Status Text is Created"
      ).toBe("Created");

      // * Kontrola struktury response
      const responseBody = await loginResponse.json();
      expect(
        responseBody.access_token,
        "Login Response body.access_token exist"
      ).toBeDefined();
      expect(
        responseBody.refresh_token,
        "Login Response body.refresh_token exist"
      ).toBeDefined();
      expect(
        typeof responseBody.access_token,
        "Login Response body.access_token is a String"
      ).toBe("string");
      expect(
        typeof responseBody.refresh_token,
        "Login Response body.refresh_token is a String"
      ).toBe("string");
    });
  });
});
