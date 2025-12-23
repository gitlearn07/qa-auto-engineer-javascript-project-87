import path from 'node:path'
import { cwd } from 'node:process'
import fs from 'fs'
import _ from 'lodash'
import parser from './parsers.js'
import formatter from './formatters/index.js'

const getFilePath = filePath => path.resolve(cwd(), filePath)

const readFile = filePath => fs.readFileSync(getFilePath(filePath), 'utf-8')

export default (filePath1, filePath2, format = 'stylish') => {
  const fileExtension = path.extname(filePath1).slice(1)

  const obj1 = parser(readFile(filePath1), fileExtension)
  const obj2 = parser(readFile(filePath2), fileExtension)

  const keys = [...Object.keys(obj1), ...Object.keys(obj2)]

  const uniqueKeys = Array.from(new Set(keys))

  const uniqueSortedKeys = _.sortBy(uniqueKeys)

  let output = uniqueSortedKeys.map((key) => {
    if (!Object.hasOwn(obj1, key)) {
      return {
        key: key,
        value: obj2[key],
        operation: 'added',
      }
    }

    if (!Object.hasOwn(obj2, key)) {
      return {
        key: key,
        value: obj1[key],
        operation: 'removed',
      }
    }

    if (obj1[key] !== obj2[key]) {
      return {
        key: key,
        oldValue: obj1[key],
        newValue: obj2[key],
        operation: 'changed',
      }
    }

    return {
      key: key,
      value: obj1[key],
      operation: 'unchanged',
    }
  })
  output = formatter(output, format)

  return output
}
