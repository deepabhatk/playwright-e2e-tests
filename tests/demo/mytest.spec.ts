import { test, expect } from "@playwright/test";
//1 .Go to the home page"https://katalon-demo-cura.herokuapp.com/""
//Assert if title is correct
//Assert if header is correct
//await

test.describe('Login functionality' , () =>{


  //test.beforeEach()
test('Successful Login', async ({ page }) => {


  //Launch URL
  await page.goto('https://katalon-demo-cura.herokuapp.com/');

  //Click on Make Appoint,
  await expect(page.locator('h1')).toContainText('CURA Healthcare Service');
  await expect(page.locator('#btn-make-appointment')).toContainText('Make Appointment');
  await page.getByRole('link', { name: 'Make Appointment' }).click();


//Assert A Text
await page.getByLabel('Username').fill('John Doe');
await page.getByLabel('Password').fill('ThisIsNotAPassword');
await page.getByRole('button', { name: 'Login' }).click();
await expect(page.locator('h2')).toContainText('Make Appointment');

});

test('Unsuccessful Login', async ({ page }) => {


  //Launch URL
  await page.goto('https://katalon-demo-cura.herokuapp.com/');

  //Click on Make Appoint,
  await expect(page.locator('h1')).toContainText('CURA Healthcare Service');
  await expect(page.locator('#btn-make-appointment')).toContainText('Make Appointment');
  await page.getByRole('link', { name: 'Make Appointment' }).click();


//Assert A Text
await page.getByLabel('Username').fill('John Doe');
await page.getByLabel('Password').fill('ThisIsNotAPassword');
await page.getByRole('button', { name: 'Login' }).click();
await expect(page.locator('h2')).toContainText('Make Appointment');

});

test.only("Should do something", async ({page}) =>{
await page.goto('https://katalon-demo-cura.herokuapp.com/'); //returns Promise<Response>

let makeAppointment = page.getByRole( "link", { name: "Make Appointment"});
console.log(`>> Type of locator: ${typeof makeAppointment} ,value of locator is : ${JSON.stringify(makeAppointment)}`);
await makeAppointment.click();
await expect(page.getByText("Please login to make")).toBeVisible();//Returns Promise<void>]
await page.getByRole('heading', { name: 'We Care About Your Health' }).click();
});

});
