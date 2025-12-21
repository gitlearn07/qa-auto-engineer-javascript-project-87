import genDiff from '../src/genDiff.js'
import path from 'node:path'
import { expect, test, beforeAll } from '@jest/globals'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)

let expectedResult
beforeAll(() => {
  expectedResult = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`
})

test('genDiff JSON shows Stylish difference correctly', () => {
  const file1 = getFixturePath('file1.json')
  const file2 = getFixturePath('file2.json')

  expect(genDiff(file1, file2, 'stylish')).toEqual(expectedResult)
})

test('genDiff YML shows Stylish difference correctly', () => {
  const file1 = getFixturePath('file1.yml')
  const file2 = getFixturePath('file2.yml')

  expect(genDiff(file1, file2, 'stylish')).toEqual(expectedResult)
})
