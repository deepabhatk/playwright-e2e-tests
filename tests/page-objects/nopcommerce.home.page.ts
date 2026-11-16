    import  { expect, type Page } from "@playwright/test";
    import BasePage from "./base-page.js";
    import { log } from "../helpers/logger.js";

    export default class HomePage extends BasePage {

        //Constructor
constructor(page: Page) {
        super(page);
}

//Elements

get usernameInput() {
    return this.page.getByRole('textbox', { name: 'Email:' });
}

get passwordInput() {
    return this.page.getByRole('textbox', { name: 'Password:' });
}

get loginButton() {
    return this.page.getByRole('button', { name: 'Log in' });
}


//Methods


async loginToNopeCommerceApp(url : string , username: string, password: string) {
    
    await log("info", `>> Logging  to url: ${url}`);
    await this.navigateTo(url);
    await this.typeinto(this.usernameInput, username);
    await this.typeinto(this.passwordInput, password);
    await this.click(this.loginButton);
    
    await expect(this.page).toHaveURL(`${url}/admin/`);
    await log("info", `>> Home page is successfully launched: ${username}`);

}



//  await page.goto('https://admin-demo.nopcommerce.com/');

//   await page.getByRole('textbox', { name: 'Email:' }).fill('admin@yourstore.com');
//   await page.getByRole('textbox', { name: 'Password:' }).fill('admin');
//   await page.getByRole('button', { name: 'Log in' }).click();

//   await expect(page).toHaveURL('https://admin-demo.nopcommerce.com/admin/');




    }
