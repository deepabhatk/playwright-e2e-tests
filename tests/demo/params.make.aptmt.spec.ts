import { test, expect } from "@playwright/test";
import TestData from '../../data/test-data.js';
import fileHelper from "../helpers/file-helper.js";
import path from "path";


// const makeApptTestData = TestData.makeAppointmentTestData();
const csvFilePath = path.resolve(`${process.cwd()}/data/functional/make-apmnt-test-data.csv`);
const makeApptTestData = fileHelper.readCSV(csvFilePath);
for(const appData of makeApptTestData){
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

    //Get login cookies

    const loginCookies = await page.context().cookies();
    process.env.LOGIN_COOKIES = JSON.stringify(loginCookies);

    console.log(`>> Login cookies: ${JSON.stringify(loginCookies)}`);
    await expect(page.locator("h2")).toContainText("Make Appointment");
  });

  test(`${appData.testId}:Should make an appointment with non-default values`, async ({ page }, testInfo) => {

console.log(`>> Current config \n : ${JSON.stringify(testInfo.config)}`)
    //Dropdown
    await page.getByLabel("Facility").selectOption(appData.facility);

    //CheckBox
    await page.getByRole("checkbox", { name: "Apply for hospital readmission" }).check();

    //Radiobutton
    await page.getByText(appData.hcp).click();


    //Datefield
    await page.getByRole("textbox", { name: "Visit Date (Required)" }).click();
    await page.getByRole("textbox", { name: "Visit Date (Required)" }).fill(appData.visitDt);
    await page.getByRole("textbox", { name: "Visit Date (Required)" }).press("Enter");

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
}

