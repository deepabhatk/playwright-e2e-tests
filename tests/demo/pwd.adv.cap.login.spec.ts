import { test, expect } from "@playwright/test";
import pwHelper from "../helpers/pw-helper";
//1 .Go to the home page"https://katalon-demo-cura.herokuapp.com/""
//Assert if title is correct
//Assert if header is correct
//await

test.describe('Login functionality' , () =>{


  test.beforeEach("Go to login page", async ({page}) =>{

  //Launch URL
  await page.goto('https://katalon-demo-cura.herokuapp.com/', {timeout:60_000});

  //Click on Make Appoint,
  await expect(page.locator('h1')).toContainText('CURA Healthcare Service');


  
  await expect(page.locator('#btn-make-appointment')).toContainText('Make Appointment');
  await page.getByRole('link', { name: 'Make Appointment' }).click();

  });
test.only('Successful Login', async ({ page }) => {

//Assert A Text
//  let abc =  page.getByLabel('uurr');
await page.getByLabel('Username').fill('John Doe');
await page.getByLabel('Password').fill('ThisIsNotAPassword');
await page.getByRole('button', { name: 'Login' }).click();

await pwHelper.takeFullPageScreenshot(page, "login page");
await expect(page.locator('h2')).toContainText('Make Appointment');

});

test('Unsuccessful Login', async ({ page }) => {

//test.slow();//Tri[ples]
//test.setTimeout(120_000)
//Assert A Text
await page.getByLabel('Username').fill('John Doe');
await page.getByLabel('Password').fill('ThisIsNotAPassword');
await page.getByRole('button', { name: 'Login' }).click({timeout: 10_000});
await expect(page.locator('h2')).toContainText('Make Appointment',{timeout: 10_000});

});

test("Should do something", async ({page}) =>{

let makeAppointment = page.getByRole( "link", { name: "Make Appointment"});
console.log(`>> Type of locator: ${typeof makeAppointment} ,value of locator is : ${JSON.stringify(makeAppointment)}`);
await makeAppointment.click();
await expect(page.getByText("Please login to make")).toBeVisible();//Returns Promise<void>]
await page.getByRole('heading', { name: 'We Care About Your Health' }).click();
});





});
