import { expect, test } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { UserApi } from "../../../src/api/user_api.ts";

test("Register and Login via API Objects", async ({ request }) => {
  // * Příprava testovacích dat (pomocí faker)
  const username = faker.internet.username();
  const password = faker.internet.password();
  const email = faker.internet.email();
  const userApi = new UserApi(request);

  const registerResponse = await userApi.registerUser(
    username,
    password,
    email
  );
  const loginResponse = await userApi.loginUser(username, password);

  expect(registerResponse.status(), "Register Response is 201").toBe(201);
  expect(
    loginResponse.statusText(),
    "Login Response Status Text is 'Created'"
  ).toBe("Created");
});
