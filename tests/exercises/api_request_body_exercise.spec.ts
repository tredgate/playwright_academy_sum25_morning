import { test } from "@playwright/test";
import { fakerCS_CZ as faker } from "@faker-js/faker";

test("Exercise: API with Body", async ({ request }) => {
  const username = faker.internet.username();
  const email = faker.internet.exampleEmail();

  await request.post(
    "https://tegb-backend-877a0b063d29.herokuapp.com/eshop/register",
    {
      data: {
        username,
        email,
        password: "123456",
      },
    }
  );
});
