import { test, expect, request } from "@playwright/test";
import { log } from "../helpers/logger";
import constants from "../../data/constants.json";
import TestData from "../../data/test-data";
import fileHelper from "../helpers/file-helper";

test.describe("API Test for GET users", () => {


    let envConfig = undefined;
    test.beforeEach("Get the environment config", async ({request}, testInfo) => {
         envConfig = testInfo.project.use as any;
        await log("info", `>> Test is running in \n : ${envConfig.envName} environment with URL: ${envConfig.apiURL}`);
    })




  //GET Method
  test("Should get the list of users from reqres.in", async ({ request }) => {
    // Make a Get call
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
    expect(responseBody).toHaveProperty("page", 2);
    expect(responseBody).toHaveProperty("per_page", 6);
    expect(responseBody).toHaveProperty("total", 12);
    expect(responseBody).toHaveProperty("total_pages", 2);
    expect(responseBody).toHaveProperty("data");
    expect(Array.isArray(responseBody.data)).toBe(true);
    expect(responseBody.data.length).toBe(6);


    fileHelper.writeFile(`${process.cwd()}/data/api-res/users-list.json`, JSON.stringify(responseBody, undefined, 4));
  });
  //POST Method
  test("Should create a new user", async ({ request }) => {
    const payload = TestData.apiUserCreatioonTestData()[0];


    // Make a Post call
    await log(
      "info",
      ">> Making a POST call to ${envConfig.apiURL} API to create a new user",
    );
    const res = await request.post(`${envConfig.apiURL}${constants.REQ_RES_ENPOINTS.POST_CREATE_USER}`, {
      headers: {
      "x-api-key": process.env.RES_RES_API_KEY,
        "Content-Type": "application/json",
      },
      data: payload,
    });

    //Assert the status code

    expect(res.status()).toBe(201);
    await log(
      "info",
      ">> POST call to ${envConfig.apiURL} API to create a new user is successful with status code: ${res.status()}",
    );

    //Get the created user from the response body and assert the values
    //Assert the response body
    const responseBody = await res.json();
    log("info", `Created user: ${JSON.stringify(responseBody)}`);
  });
});
/**Post
 * var request = require('request');
var options = {
  'method': 'POST',
  'url': 'https://reqres.in/api/users',
  'headers': {
    'x-api-key': 'reqres_95b1e378c1974780a9a54876e7c4e950',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "name": "Alex",
    "job": "Thomas",
    "id": "1234",
    "createdAt": "2026-11-15 T01:35:49.8766"
  })

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});

 
 * var request = require('request');
var options = {
  'method': 'GET',
  'url': 'https://reqres.in/api/users?page=2',
  'headers': {
    'x-api-key': 'reqres_95b1e378c1974780a9a54876e7c4e950'
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
*/
