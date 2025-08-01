// failing_tests.spec.ts
// tests/learning/failing

import { test } from "@playwright/test";

test.skip("Failing test", async ({ page }) => {
  await page.goto("https://tredgate.com/pmtool");
  await page.locator("#username222").fill("pw_academy");
});
