import { type FullConfig} from '@playwright/test';
import path from 'path';
import fs from "fs";


export default async function globalSetup(config:FullConfig) {

      console.log('[INFO] :Strating the global setup')
    if(process.env.RUNNER?.toUpperCase() === "LOCAL"){
    // Delete allure results
        console.log('[INFO] :Detecting local runs')
    const resultDir = path.resolve(process.cwd(), "allure-results");
    console.log(`>>resultDir: ${resultDir}`);
    if(fs.existsSync(resultDir)){
        fs.rmSync(resultDir,{ recursive : true, force : true});
        console.log('[INFO] : Allure results deleted for local run')
    }
    }
    
      console.log('[INFO] :Completed the global setup')

      //Set the login cookies global variable

      process.env.LOGIN_COOKIES = undefined
}