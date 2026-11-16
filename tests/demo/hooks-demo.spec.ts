import {test, expect} from "@playwright/test"

test.beforeAll("Beforeall Hook", ()=>{
console.log(`--> Before all : file Scope`); //Shoud run just once per worker
});


test.beforeEach("Before each Hook", ()=>{
console.log(`--> Before each : file Scope`); //Shoud run brefore all tests in thos file
});

test.describe(" Test suite 1", () =>{

    test.beforeAll("Beforeall Hook", ()=>{
        console.log(`>> Suite1: Beforeall describe scope`);
    });

        test.beforeEach("BeforeEach Hook", ()=>{
        console.log(`>> Suite1: BeforeEach at describe level`);
    });

    test("Test one", async ({page}) => {

        console.log(`Running test one...`);
        await page.goto("https:www.google.com");
    });

    test("Test Two", async ({page}) => {

        console.log(`Running test two...`);
        await page.goto("https:www.amazon.com");
    });

    test("Test Three", async ({page}) => {

        console.log(`Running test three...`);
        await page.goto("https:www.flipkart.com");
    });

});
test.describe(" Test suite 2", () =>{



        test.beforeEach("BeforeEach Hook", ()=>{
        console.log(`>> Suite1: BeforeEach at describe level`);
    });

    test("Test one", async ({page}) => {

        console.log(`Running test one in Suite2...`);
        await page.goto("https:www.google.com");
    });

    test("Test Two", async ({page}) => {

        console.log(`Running test two in Suite2...`);
        await page.goto("https:www.amazon.com");
    });

    test("Test Three", async ({page}) => {

        console.log(`Running test three in Suite2...`);
        await page.goto("https:www.flipkart.com");
    });

});