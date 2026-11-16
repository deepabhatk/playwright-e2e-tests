import { baseConfig } from '../playwright.config.ts';
import { defineConfig } from '@playwright/test';
import { EnvConfig } from '../tests/helpers/config-fixtures.ts';
import path from 'path/win32';

export default defineConfig<EnvConfig>({

    ...baseConfig,//load the base config and override the required values uding use   
    testDir : path.resolve(process.cwd(), "./tests"),
    use: {
        ...baseConfig.use,
        envName: "test",
        appURL:"https://katalon-demo-cura.herokuapp.com",
         nopCommerceWebURL:"https://admin-demo.nopcommerce.com",
         apiURL:"https://reqres.in/api",
        dbConfig:{
            server: "",
            dbname: "",
            connectionStr: "",


        },

    },
});