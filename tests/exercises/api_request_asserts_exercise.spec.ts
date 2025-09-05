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

/*
Cvičení (⌛8:00)
Vytvořte nový test, který otestuje request:
Složka: tests/exercise
Test: api_request_asserts_exercise.spec.ts
Url: https://tegb-backend-877a0b063d29.herokuapp.com/eshop/4

Zkontrolujte:
Body obsahuje property:
userId
Typ properties:
active: number
Hodnoty:
username == petrfifka

Response body:
{
    "userId": 4,
    "username": "petrfifka",
    "email": "petr.fifka@tredgate.cz",
    "createdAt": "2023-10-24",
    "updatedAt": null,
    "active": 1
}
*/
