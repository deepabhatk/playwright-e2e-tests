import test, { expect } from "@playwright/test";

test.only('Successful Login', async ({ page }) => {


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