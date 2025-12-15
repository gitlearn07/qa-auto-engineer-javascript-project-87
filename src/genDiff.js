import path from 'node:path';
import { cwd } from 'node:process';
import fs from 'fs'

export default (filepath1, filepath2, format) => {
    const fileFormat = format.split('.').at(-1);    

    const file1Json = JSON.parse(readFile(filepath1));
    const file2Json = JSON.parse(readFile(filepath2));
};

const getFilePath = fileName => path.resolve(cwd(), '__fixtures__', fileName)

const readFile = fileName => fs.readFileSync(getFilePath(fileName), 'utf-8')