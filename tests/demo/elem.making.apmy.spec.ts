import { test, expect } from "@playwright/test";

test.describe("Make Appointment", async () => {
  test.beforeEach("Login with login credentials", async ({ page }) => {
    //Launch URL
    await page.goto("https://katalon-demo-cura.herokuapp.com/");

    //Click on Make Appoint,
    await expect(page.locator("h1")).toContainText("CURA Healthcare Service");

    //await page.getByRole("link", { name: "Make Appointment" }).click();//alt+shift+down arrow
    // await page.getByRole("link", { name: "Make Appointment" }).press("Enter");
    // await page.getByRole("link", { name: "Make Appointment" }).dblclick();
    //
    // await page.getByRole("link", { name: "Make Appointment" }).click({button :"right"});
    //  await page.getByRole("link", { name: "Make Appointment" }).hover();
    await page
      .getByRole("link", { name: "Make Appointment" })
      .click({ timeout: 10_000 });
    await expect(page.getByText("Please login to make")).toBeVisible();
    //@actions
    //✅1.Click /Clear before filling windows key and .
    //✅2.fill
    //✅3. press sequenctially. slow typing

    // await page.getByLabel("Username").clear();
     await page.getByLabel("Username").fill("John Doe");

    //Presssequentially
    // await page
    //   .getByLabel("Username")
    //   .pressSequentially("John Doe", { timeout: 300 });
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.locator("h2")).toContainText("Make Appointment");
  });

  test("Should make an appointment with non-default values", async ({ page }) => {

   //Dropdown
   //Assert default value
    await expect (page.getByLabel("Facility")).toHaveValue("Tokyo CURA Healthcare Center");
 
    await page.getByLabel("Facility").selectOption("Hongkong CURA Healthcare Center");

    //Select option by label or index
    await page.getByLabel("Facility").selectOption({ label : "Seoul CURA Healthcare Center"});
    await page.getByLabel("Facility").selectOption( {index : 0 });

    //To get count
    let dropDwnEle = await page.getByLabel("Facility").locator("option")

    await expect(dropDwnEle).toHaveCount(3);

    //To get Count 

    let listOfDropDownEle = await page.getByLabel("Facility").all()

    let listOfOptions = [];

    for(let val of listOfDropDownEle){
        let eleTxt = await val.textContent()
listOfOptions.push(eleTxt);
    }
    console.log(`List of Options :${listOfOptions}`);
    //CheckBox
    await page.getByRole("checkbox", { name: "Apply for hospital readmission" }).check();
    await page.getByRole("checkbox", { name: "Apply for hospital readmission" }).uncheck();

    //Radiobutton
    //Assert selected Radio button value
    await expect(page.getByText("Medicare")).toBeChecked();
    await page.getByRole("radio", { name: "Medicaid" }).click();
 await expect(page.getByText("Medicare")).not.toBeChecked();
    //Datefield
    await page.getByRole("textbox", { name: "Visit Date (Required)" }).click();
    await page.getByRole("textbox", { name: "Visit Date (Required)" }).fill("27/11/2027");
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
