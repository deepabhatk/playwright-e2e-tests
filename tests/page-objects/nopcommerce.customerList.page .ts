    import  { expect, type Page } from "@playwright/test";
    import BasePage from "./base-page.js";
    import { log } from "../helpers/logger.js";

    export default class CustList extends BasePage {

        //Constructor
constructor(page: Page) {
        super(page);
}

//Elements

get firstNameInputBox() {
    return this.page.getByRole('textbox', { name: 'First name' });
}

get lastNameInputBox() {
    return this.page.getByRole('textbox', { name: 'Last name' });
}
get searchBtn() {
    return this.page.getByRole('button', { name: 'Search' });
}

get noDataAvailableCell() {
    return this.page.locator("[id=search-customers]")
}


//Methods


async goToCustomerListPage(cutomerListPage : string ) {
    

    await this.navigateTo(cutomerListPage);
   
}


async searchCustomerByName(firstName : string, lastName : string) : Promise<Boolean> {
    await log("info", `>> Searching customer by firstname: ${firstName} and lastname: ${lastName}`);
    
    //Search Action
    await this.typeinto(this.firstNameInputBox, firstName);
    await this.typeinto(this.lastNameInputBox, lastName);
    await this.click(this.searchBtn);   
    await this.page.waitForTimeout(2000); //Wait for 2 seconds for search results to load

    //Assertion
    let customerNotFound =await this.noDataAvailableCell.isVisible();
    if(customerNotFound){
        await log("info", `>> Customer is not found by firstname: ${firstName} and lastname: ${lastName}`);
    }
    await log("info", `>> Customer is found by firstname: ${firstName} and lastname: ${lastName}`);
    return !customerNotFound;
}



}
