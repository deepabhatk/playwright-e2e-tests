import { test, expect } from "@playwright/test";

test.describe("Make Appointment", async () => {
  test.beforeEach("Login with login credentials", async ({ page }) => {
    //Launch URL
    await page.goto("https://katalon-demo-cura.herokuapp.com/");

    //Click on Make Appoint,
    await expect(page.locator("h1")).toContainText("CURA Healthcare Service");
    await expect(page.locator("#btn-make-appointment")).toContainText(
      "Make Appointment",
    );
    await page.getByRole("link", { name: "Make Appointment" }).click();

    //Assert A Text
    await page.getByLabel("Username").fill("John Doe");
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.locator("h2")).toContainText("Make Appointment");
  });

  test("Should make an appointment with non-default values", async ({ page }) => {


    //Dropdown
    await page.getByLabel("Facility").selectOption("Hongkong CURA Healthcare Center");

    //CheckBox
    await page.getByRole("checkbox", { name: "Apply for hospital readmission" }).check();

    //Radiobutton
    await page.getByRole("radio", { name: "Medicaid" }).click();
        await page.pause()

    //Datefield
    await page.getByRole("textbox", { name: "Visit Date (Required)" }).click();
    await page.getByRole("textbox", { name: "Visit Date (Required)" }).fill("27/11/2027");
    // await page.getByRole("textbox", { name: "Visit Date (Required)" }).press("Enter");

    //Multiline comment input box
    await page.getByRole("textbox", { name: "Comment" }).click();
    await page.getByRole("textbox", { name: "Comment" }).fill("This is multiline generated bu Playwright codegen");

    //Button
    await page.getByRole("button", { name: "Book Appointment" }).click();

    //Assertion
    await expect(page.locator("h2")).toContainText("Appointment Confirmation");
    await expect(page.getByRole("link", { name: "Go to Homepage" })).toBeVisible();
  });
});
