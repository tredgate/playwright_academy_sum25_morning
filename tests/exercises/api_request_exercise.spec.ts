import { test } from "@playwright/test";

test("Exercise: Call GET API", async ({ request }) => {
  await request.get("https://www.tredgate.cloud/courses");
});
