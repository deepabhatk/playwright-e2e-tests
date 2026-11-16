    import { test, expect } from "@playwright/test";
    import { log } from "../helpers/logger";
    import HomePage from "../page-objects/nopcommerce.home.page.js";
    import CustomerListPage from "../page-objects/nopcommerce.customerList.page ";
    import constants from "../../data/constants.json";

    test.describe("E2E Customer Search Tests", () => {

    test("E2E_TC001: Search the expernal cutomer in customer portal", async ({ page,request }, testInfo) => {
        const envConfig = testInfo.project.use as any;
        /** 1.Get the list of users/ */
        await log(
              "info",
              ">> Making a GET call to ${envConfig.apiURL} API to get the list of users",
            );
            const res = await request.get(`${envConfig.apiURL}${constants.REQ_RES_ENPOINTS.GET_USERS_LIST}`, {
              headers: {
                "x-api-key": process.env.RES_RES_API_KEY,
              },
            });
        
            //Assert the status code
        
            expect(res.status()).toBe(200);
            await log(
              "info",
              ">> GET call to ${envConfig.apiURL} API to get the list of users is successful with status code: ${res.status()}",
            );
        
            //Get list of users from the response body and assert the values
            //Assert the response body
            const responseBody = await res.json();
            log("info", `List of users: ${JSON.stringify(responseBody)}`);
        await log("info", `>> Test is running in \n : ${envConfig.envName} environment with URL: ${envConfig.appURL}`);

        // Step 2 Login to the web
        const homePage = new HomePage(page);
        await homePage.loginToNopeCommerceApp(envConfig.nopCommerceWebURL, process.env.NOP_COMMERCE_TEST_USER_NAME, process.env.NOP_COMMERCE_TEST_PASSWORD);



    // //Customer Search


const USER_DATA = responseBody.data;
    // const USER_DATA = {
    //     firstName: "Victoria",
    //     lastName: "Terces"
    // };
    const customerListPage = new CustomerListPage(page);
    await customerListPage.goToCustomerListPage(`${envConfig.nopCommerceWebURL}/Admin/Customer/List`);
    //Iterate over the list of users

    for ( const user of USER_DATA) {
    let  customerNotFound = await customerListPage.searchCustomerByName(user.first_name, user.last_name);
    if(customerNotFound) {
        await log("info", `>> The given user ${user.first_name} ${user.last_name} is not found by firstname: ${user.first_name} and lastname: ${user.last_name  }`);
    }
else{
    await log("warn", `>> The given user ${user.first_name} ${user.last_name} is found by firstname: ${user.first_name} and lastname: ${user.last_name } is found`);
}
    }
    });

});