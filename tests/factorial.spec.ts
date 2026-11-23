import test from "playwright/test";
import { steps } from "../scripts/steps";

test.describe("Positive Test Cases", () => {
  test("TC-001: Open Factorial Page", async ({ page }) => {
    await page.goto("/");
  });

  test("TC-002: Calculate Factorial of 5", async ({ page }) => {
    await page.goto("/");
    await page.fill("#number", "5");
    await page.click("#getFactorial");
    await page.waitForTimeout(1000);
    const result = await page.textContent("#resultDiv");
    test.expect(result).toContain("The factorial of 5 is: 120");
  });

  test("TC-003: Calculate Factorial of 0", async ({ page }) => {
    await page.goto("/");
    await page.fill("#number", "0");
    await page.click("#getFactorial");
    await page.waitForTimeout(1000);
    const result = await page.textContent("#resultDiv");
    test.expect(result).toContain("The factorial of 0 is: 1");
  });
});

test.describe("Negative Test Cases", () => {
  test("TC-004: Calculate Factorial of empty input", async ({ page }) => {
    await page.goto("/");
    await page.fill("#number", "");
    await page.click("#getFactorial");
    await page.waitForTimeout(1000);
    const result = await page.textContent("#resultDiv");
    test.expect(result).toContain("Please enter an integer");
  });

  test("TC-005: Calculate Factorial of negative number", async ({ page }) => {
    await page.goto("/");
    await page.fill("#number", "-5");
    await page.click("#getFactorial");
    const responsePromise = page.waitForResponse((response) =>
      response.url().includes("/factorial"),
    );
    const response = await responsePromise;
    test.expect(response.status()).toBe(500);
  });
});

test.describe("Reusable Steps Test Cases", () => {
  test("TC-006: Calculate Factorial using reusable steps", async ({ page }) => {
    await steps(
      page,
      "/",
      { selector: "#number", value: "5" },
      { selector: "#getFactorial" },
      "The factorial of 5 is: 120",
    );
  });
});
