import { test, type Page, type Locator } from "@playwright/test";


/**
 * Take screenshot  of full page
 * 
 * @param page - Playwright Page object
 * @param screenshotName - Name of the screenshot file
 */
 async function takeFullPageScreenshot(page: Page, screenshotName: string) {
    const screenshot = await page.screenshot({ fullPage: true });


    //Attach it to the report
    await test.info().attach(screenshotName, {
        body: screenshot,
        contentType: "image/png",
    });

 }

     async   function takeElementScreenshot(element: Locator, screenshotName: string) {
        const screenshot = await element.screenshot();  

        //Attach it to the report   
        await test.info().attach(screenshotName, {
            body: screenshot,
            contentType: "image/png",
        });
    
}


export default {takeFullPageScreenshot, takeElementScreenshot}; 
 
