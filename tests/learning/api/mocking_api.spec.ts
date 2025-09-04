import { expect, test } from "@playwright/test";

// ? Vytvoření JSON, který bude použitý pro MOCK (nahradíme response.body accounts API)
const mockedJson = [
  {
    _id: "123456",
    userId: 25,
    accountId: 25,
    balance: 250,
    transactionLimits: {
      dailyLimit: 10000,
      monthlyLimit: 50000,
      _id: "654321",
    },
    accountType: "MOCK ÚČET - umíme mockovat",
    loginHistory: [],
    transactionHistory: [],
    createdAt: "2025-09-04T06:00:00.000Z",
    __v: 0,
  },
];

test("TEG#B Accounts mock", async ({ page }) => {
  // * Nastavení odchycení API a MOCKu
  await page.route("*/**/accounts/user/**", async (interceptedApi) => {
    console.log("Mockujeme API accounts");
    await interceptedApi.fulfill({ json: mockedJson });
  });

  const username = "fifka_petr";
  const password = "Tredgate2023#";

  await page.goto("http://localhost:3001/");
  await page.locator('[data-testid="username"]').fill(username);
  await page.locator('[data-testid="password"]').fill(password);
  const responsePromise = page.waitForResponse(/\/auth\/login/);
  await page.locator('[data-testid="log_in"]').click();
  await responsePromise;
  await page.locator('[data-testid="accounts_section_link"]').click();
  await expect(
    page.locator('[data-testid="loader"]'),
    "Wait for loader to vanish"
  ).toBeHidden();
  await expect(page.locator('[data-testid="title"]')).toHaveText("Account");
});
