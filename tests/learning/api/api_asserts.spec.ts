// api_asserts.spec.ts
// tests/learning/api
import { expect, test } from "@playwright/test";

test("Assert Response Status 200 OK", async ({ request }) => {
  const response = await request.get(
    "https://tegb-backend-877a0b063d29.herokuapp.com/eshop/454"
  );
  expect(response.status(), "Eshop User Response is 200").toBe(200);
});

test("Assert Response Header", async ({ request }) => {
  const response = await request.get(
    "https://tegb-backend-877a0b063d29.herokuapp.com/train"
  );
  // Získání hlaviček z response
  const headers = response.headers();
  const contentType = headers["content-type"];
  expect(contentType, "Header content-type have value").toBe(
    "application/json; charset=utf-8"
  );
  expect(contentType, "Header content-type contains value").toContain(
    "application/json"
  );
});

test("Response Body Asserts", async ({ request }) => {
  const response = await request.get(
    "https://tegb-backend-877a0b063d29.herokuapp.com/train"
  );

  // ? Získání body odpovědi
  const responseBody = await response.json();

  expect(responseBody, "body.timestamp is defined").toHaveProperty("timestamp");
  expect(typeof responseBody.id, "body.id is a Number").toBe("number");
  expect(responseBody.message, "body.message have value").toBe(
    "TEG#B Training GET request successful"
  );
  expect(responseBody.message, "body.message contain value").toContain(
    "TEG#B Training"
  );
});
