import { test, expect, devices } from "@playwright/test";
import constants from "../../data/constants.json";
import { log } from "../helpers/logger";

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

test("Should do something", async ({page}) =>{
await page.goto('https://katalon-demo-cura.herokuapp.com/'); //returns Promise<Response>

let makeAppointment = page.getByRole( "link", { name: "Make Appointment"});
console.log(`>> Type of locator: ${typeof makeAppointment} ,value of locator is : ${JSON.stringify(makeAppointment)}`);
await makeAppointment.click();
await expect(page.getByText("Please login to make")).toBeVisible();//Returns Promise<void>]
await page.getByRole('heading', { name: 'We Care About Your Health' }).click();
});

test("Should demo  devices", async ({page}, testInfo) =>{
console.log(` >> The lis of devices : ${Object.keys(devices)}`);
});

test("Should demo parallel run 1", {tag: '@demo'} ,async ({page}, testInfo) =>{
await page.goto('https://www.google.com')
});
test("Should demo parallel run 2", {tag: '@demo'} ,async ({page}, testInfo) =>{
await page.goto('https://www.google.com')
});
test("Should demo constant data"  ,async ({page}, testInfo) =>{
 console.log(`>> Constant Datas: ${JSON.stringify(constants.STATUSCODES)}`);
});

test.only("Should demo a click action"  ,async ({page}, testInfo) =>{
   
  
  //Default actions 
  // 
//   await page.goto('https://katalon-demo-cura.herokuapp.com/');
//   let ele = page.getByRole('link', { name: 'Make Appointment' });
//  await ele.click();

 //Base Page action
   await page.goto('https://katalon-demo-cura.herokuapp.com/');
  let element = page.getByRole('link', { name: 'Make Appointment' });
       try {
                await expect(element).toBeVisible({ timeout: 10_000 });   
                await element.click();
                await log("info", `>> Clicked on element: ${element}`);
            } catch (error) {
                await log("error", `>> Failed to click on element: ${element.toString()}, original error: ${error}`);
                throw error;
            }
});
});