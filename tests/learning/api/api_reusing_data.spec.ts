// api_reusing_data.spec.ts
// tests/learning/api
import { expect, test } from "@playwright/test";
import { fakerCS_CZ as faker } from "@faker-js/faker";

test("Reusing Data Between API Calls", async ({ request }) => {
  const username = faker.internet.username();
  const email = faker.internet.exampleEmail();
  const password = "123456";

  const regResponse = await request.post(
    "https://tegb-backend-877a0b063d29.herokuapp.com/eshop/register",
    {
      data: {
        username,
        email,
        password,
      },
    }
  );
  const regResponseBody = await regResponse.json();
  const userId = regResponseBody.userId;

  const userResponse = await request.get(
    "https://tegb-backend-877a0b063d29.herokuapp.com/eshop",
    {
      params: {
        userId,
      },
    }
  );
  const userResponseBody = await userResponse.json();
  expect(userResponseBody, "body.userId is defined").toHaveProperty("userId");
  expect(userResponseBody.username, "body.username have value").toBe(username);
  expect(userResponseBody.email, "body.email have value").toBe(email);
  expect(typeof userResponseBody.createdAt, "body.createdAt is a string").toBe(
    "string"
  );
  expect(userResponseBody, "body.updatedAt is defined").toHaveProperty(
    "updatedAt"
  );
  expect(userResponseBody.active, "body.active have value").toBe(1);
});

test("Login and using Token", async ({ request }) => {
  const authResponse = await request.post(
    "https://restful-booker.herokuapp.com/auth",
    {
      data: {
        username: "admin",
        password: "password123",
      },
    }
  );
  const authResponseBody = await authResponse.json();
  const token = authResponseBody.token;
  const updateBookingBody = {
    firstname: "James",
    lastname: "Brown",
    totalprice: 111,
    depositpaid: true,
    bookingdates: {
      checkin: "2018-01-01",
      checkout: "2019-01-01",
    },
    additionalneeds: "Breakfast",
  };
  const updateBookingHeaders = {
    Cookie: "token=" + token,
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  await request.put("https://restful-booker.herokuapp.com/booking/1284", {
    headers: updateBookingHeaders,
    data: updateBookingBody,
  });
});
