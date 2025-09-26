// tests/learning/multi-language/
// multi-language.spec.ts

import { expect, test } from "@playwright/test";
import { getTexts } from "../../../src/i18n/i18n.ts";

test("multi-language support", async ({ page }) => {
  await page.goto("https://tegb-frontend-88542200c6db.herokuapp.com/");
  const loginTexts = getTexts().login;
  await expect(page.locator("[data-testid='username-input']")).toHaveAttribute(
    "placeholder",
    loginTexts.usernamePlaceholder
  );
});
