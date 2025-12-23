import genDiff from '../src/genDiff.js'
import path from 'node:path'
import { expect, test } from '@jest/globals'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)

const expectedStylishResult = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`

const expectedPlainResult = `Property 'follow' was removed
Property 'proxy' was removed
Property 'timeout' was updated. From 50 to 20
Property 'verbose' was added with value: true`

const expectedJSONResult = `[{"key":"follow","value":false,"operation":"removed"},{"key":"host","value":"hexlet.io","operation":"unchanged"},{"key":"proxy","value":"123.234.53.22","operation":"removed"},{"key":"timeout","oldValue":50,"newValue":20,"operation":"changed"},{"key":"verbose","value":true,"operation":"added"}]`

test('genDiff JSON shows Stylish difference correctly', () => {
  const file1 = getFixturePath('file1.json')
  const file2 = getFixturePath('file2.json')

  expect(genDiff(file1, file2, 'stylish')).toEqual(expectedStylishResult)
})

test('genDiff YML shows Stylish difference correctly', () => {
  const file1 = getFixturePath('file1.yml')
  const file2 = getFixturePath('file2.yml')

  expect(genDiff(file1, file2, 'stylish')).toEqual(expectedStylishResult)
})

test('genDiff JSON shows Plain difference correctly', () => {
  const file1 = getFixturePath('file1.json')
  const file2 = getFixturePath('file2.json')

  expect(genDiff(file1, file2, 'plain')).toEqual(expectedPlainResult)
})

test('genDiff YML shows Plain difference correctly', () => {
  const file1 = getFixturePath('file1.yml')
  const file2 = getFixturePath('file2.yml')

  expect(genDiff(file1, file2, 'plain')).toEqual(expectedPlainResult)
})

test('genDiff JSON shows JSON difference correctly', () => {
  const file1 = getFixturePath('file1.json')
  const file2 = getFixturePath('file2.json')

  expect(genDiff(file1, file2, 'json')).toEqual(expectedJSONResult)
})

test('genDiff YML shows JSON difference correctly', () => {
  const file1 = getFixturePath('file1.yml')
  const file2 = getFixturePath('file2.yml')

  expect(genDiff(file1, file2, 'json')).toEqual(expectedJSONResult)
})
