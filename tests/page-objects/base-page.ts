    import { expect, type Locator , type Page } from "@playwright/test";
    import { log } from "../helpers/logger.js";


    export default class BasePage {

        readonly page: Page;

        constructor(page: Page) {
            this.page = page;
        }


        async navigateTo(url: string) {
            await this.page.goto(url);
            await log("info", `>> Navigated to URL: ${url}`);
        }


        async click(element: Locator) {
            try {
                await expect(element).toBeVisible({ timeout: 10_000 });   
                await element.click();
                await log("info", `>> Clicked on element: ${element}`);
            } catch (error) {
                await log("error", `>> Failed to click on element: ${element.toString()}, original error: ${error}`);
                throw error;
            }
        }


        async typeinto(element: Locator, text: string) {
            try {
                await element.fill(text);
                await log("info", `>> Typed into element: ${element} with text: ${text}`);
            } catch (error) {
                await log("error", `>> Failed to type into element: ${element.toString()}, original error: ${error}`);
                throw error;
            }       







        }
    }