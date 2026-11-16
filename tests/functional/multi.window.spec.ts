import { expect, test } from "@playwright/test";

test("should open multiple windows and return to the parent", async ({
  page,
}) => {
  await page.goto("https://the-internet.herokuapp.com/");
  await page.getByRole("link", { name: "Multiple Windows" }).click();

  const firstWindowPromise = page.waitForEvent("popup");
  await page.getByRole("link", { name: "Click Here" }).click();
  const firstWindow = await firstWindowPromise;
  await expect(firstWindow.locator("h3")).toHaveText("New Window");

  const secondWindowPromise = page.waitForEvent("popup");
  await page.getByRole("link", { name: "Click Here" }).click();
  const secondWindow = await secondWindowPromise;
  await expect(secondWindow.locator("h3")).toHaveText("New Window");

  await page.bringToFront();
  await expect(page).toHaveURL("https://the-internet.herokuapp.com/windows");
});
