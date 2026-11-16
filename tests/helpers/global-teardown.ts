import { FullConfig } from "@playwright/test";
import { exec } from "child_process";


export default async function globalTeardown(config: FullConfig) {
  console.log("[INFO] :Strating the global teardown process");
  // if (process.env.RUNNER?.toUpperCase() === "LOCAL") {
  //   console.log("[INFO] :Detecting local runs -Starting Allure Server");
  //   exec("allure serve", (error, stdout, stderr) => {
  //     if (error) {
  //       console.error("ERROR: Starting Allure server", error.message);
  //     }
  //   });
  // }

  console.log("[INFO] :Completed  the global  teardown process");
}
