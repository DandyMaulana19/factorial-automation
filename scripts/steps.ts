import { test, type Page } from "@playwright/test";

export const steps = async (
  page: Page,
  url: string,
  field: { selector: string; value: string },
  button: { selector: string },
  expectationMessage: string,
) => {
  await page.goto(url);
  await page.fill(field.selector, field.value);
  await page.click(button.selector);
  await page.waitForTimeout(1000);
  const result = await page.textContent("#resultDiv");
  test.expect(result).toContain(expectationMessage);
};
