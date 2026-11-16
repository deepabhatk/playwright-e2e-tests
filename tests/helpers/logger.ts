import { test  } from "@playwright/test";
import  chalk  from "chalk";
type Level = "info" | "warn" | "error" | "log";

export async function log(level: Level, message: string) {
    const plainLine = `[${level.toUpperCase()}] ${message}`;
    let colouredline = plainLine;
    switch (level) {
        case "info":
            colouredline = chalk.blue(plainLine);
            break;
        case "warn":
            colouredline = chalk.yellow(plainLine);
            break;
        case "error":
            colouredline = chalk.red(plainLine);
            break;
       default:
    }
    console[level](colouredline);
    await test.step(plainLine, async () => {});
}