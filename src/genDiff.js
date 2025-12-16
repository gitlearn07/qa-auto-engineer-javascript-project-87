import path from 'node:path';
import { cwd } from 'node:process';
import fs from 'fs'
import _ from "lodash";

const getFilePath = fileName => path.resolve(cwd(), '__fixtures__', fileName)

const readFile = fileName => fs.readFileSync(getFilePath(fileName), 'utf-8')

export default (filepath1, filepath2, format) => {
    const fileFormat = format.split('.').at(-1);        

    const file1Json = JSON.parse(readFile(filepath1));
    const file2Json = JSON.parse(readFile(filepath2));

    const keys = [...Object.keys(file1Json), ...Object.keys(file2Json)];

    const uniqueKeys = Array.from(new Set(keys));

    const uniqueSortedKeys = _.sortBy(uniqueKeys)

    let output = uniqueSortedKeys.map(key => {
        if (!Object.hasOwn(file1Json, key)) {
            return `  + ${key}: ${file2Json[key]}`; 
        }

        if (!Object.hasOwn(file2Json, key)) {
            return `  - ${key}: ${file1Json[key]}`; 
        }

        if (file1Json[key] !== file2Json[key]) {
            return `  - ${key}: ${file1Json[key]}\n  + ${key}: ${file2Json[key]}`;
        } 
             
        return `    ${key}: ${file1Json[key]}`;
    })

    output = ['{', ...output, '}'].join('\n')
};