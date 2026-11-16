import { test, expect } from "@playwright/test";

test.describe("Inventory Feature", () => {
  test.beforeEach("Login with valid credentials", async ({ page }) => {
    //Launch the URL
    await page.goto("https://www.saucedemo.com/");

    //Enter User nameand password
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");

    //Click on login
    await page.locator('[data-test="login-button"]').click();

    //Assertion
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    await expect(page).toHaveURL(/.*\/inventory/);
  });

  test("Should confirm all prices are non-zero", async ({page}) => {

//Get list of Products

let productItems = page.locator(".inventory_item")
await expect(productItems).toHaveCount(6)

//Get Product NAMES AND PRICES

let productCount = await productItems.count()

let prcArr = []

for(let i=0 ; i< productCount; i++){
    let productParent = productItems.nth(i)

  //Get Product Name
   let productName = await productParent.locator(".inventory_item_name").innerText();
  
  //Get Product Price

  let productPrice = await productParent.locator(".inventory_item_price").innerText();
 
  prcArr.push(productPrice)

  console.log(`Product Name ${productName} Product Price ${productPrice}`);

  //await expect(productPrice).toBeGreaterThanOrEqual(0)

//   
}
// $29.99,$9.99,$15.99,$49.99,$7.99,$15.99

console.log(`Original Price Array: ${prcArr}`)

let modifiedPrice = prcArr.map((item) => parseFloat(item.replace("$","")))
console.log(`Updated Price Array: ${modifiedPrice}`)

let priceWithInValidVals = modifiedPrice.filter((item) => item <=0)

if(priceWithInValidVals.length > 0){
    console.log(`ERROR: The price contains non zero values, ${priceWithInValidVals}`)
}
else{
    console.log('INFO:All prices are non-zero')
}

expect(priceWithInValidVals).toHaveLength(0)







  });
});
