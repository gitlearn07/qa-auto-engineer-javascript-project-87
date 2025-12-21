import path from 'node:path'
import { cwd } from 'node:process'
import fs from 'fs'
import _ from 'lodash'
import parser from './parsers'

const getFilePath = filePath => path.resolve(cwd(), filePath)

const readFile = filePath => fs.readFileSync(getFilePath(filePath), 'utf-8')

export default (filePath1, filePath2, format) => {
  const fileExtension = path.extname(filePath1)

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

  output = formatOutput(output, format)

  return output
}

const formatOutput = (output, format) => {
  if (format === 'stylish') {
    output = output.map((entry) => {
      if (entry.operation === 'added') {
        return `  + ${entry.key}: ${entry.value}`
      }
      if (entry.operation === 'removed') {
        return `  - ${entry.key}: ${entry.value}`
      }
      if (entry.operation === 'changed') {
        return `  - ${entry.key}: ${entry.oldValue}\n  + ${entry.key}: ${entry.newValue}`
      }
      if (entry.operation === 'unchanged') {
        return `    ${entry.key}: ${entry.value}`
      }
    })
    return ['{', ...output, '}'].join('\n')
  }
}
