import {test as base} from "@playwright/test";

export type EnvConfig = {
    envName: string;
    appURL: string;
    dbConfig: {};
    nopCommerceWebURL : string;
    
    apiURL: string;
};


//default values for the config
export const test = base.extend<EnvConfig>({
    envName: ["local", { option: true }], 
    nopCommerceWebURL: ["<provideURL>", { option: true }],
    appURL: ["<provideURL>", { option: true }],
    dbConfig: [{}, { option: true }],
    apiURL: ["<provideURL>", { option: true }],
}); 