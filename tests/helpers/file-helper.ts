
import fs from "fs"
import path from "path"
import { parse } from "csv-parse/sync"
import { log } from "./logger"


function readCSV(filepath:string) : any []{
    //Read a file

    const csvDataStr = fs.readFileSync(filepath, { encoding: "utf-8" })
    //Parse the CSV data into an array of objects
const csvDataArr = parse(csvDataStr, {
    columns: true,
    skip_empty_lines: true,
    trim:true
})

return csvDataArr;
}

function readFile(filepath:string) : any {

    if(!fs.existsSync(filepath)){
        throw new Error(`File not found: ${filepath}`);
    }
    log("info", `>> Reading file: ${filepath}`);
    return fs.readFileSync(filepath, { encoding: "utf-8" });
}

function writeFile(filepath:string, data:any) : void {
    log("info", `>> Writing file: ${filepath}`);
    try{
    fs.writeFileSync(filepath, data, { encoding: "utf-8" });
    }catch(err){
        log("error", `>> Error writing file: ${filepath}. Error: ${err}`);
        throw err;
    }   
}

export default {readCSV, readFile, writeFile}    