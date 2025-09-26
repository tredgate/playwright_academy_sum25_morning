import { expect, test } from "@playwright/test";

test("Exercise: testing api body", async ({ request }) => {
  const response = await request.get(
    "https://tegb-backend-877a0b063d29.herokuapp.com/eshop/4"
  );
  const responseBody = await response.json();
  expect(responseBody, "body.userId is defined").toHaveProperty("userId");
  expect(typeof responseBody.active, "body.active is a number").toBe("number");
  expect(responseBody.username, "body.username have value").toBe("petrfifka");
});
