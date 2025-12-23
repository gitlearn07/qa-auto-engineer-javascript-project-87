import genDiff from '../src/genDiff.js'
import path from 'node:path'
import { expect, test, describe } from '@jest/globals'
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

describe('Comparing JSON files', () => {
  test('genDiff JSON shows Stylish difference correctly', () => {
    const fixturePath1 = getFixturePath('file1.json')
    const fixturePath2 = getFixturePath('file2.json')

    expect(genDiff(fixturePath1, fixturePath2, 'stylish')).toEqual(expectedStylishResult)
  })

  test('genDiff JSON shows Plain difference correctly', () => {
    const fixturePath1 = getFixturePath('file1.json')
    const fixturePath2 = getFixturePath('file2.json')

    expect(genDiff(fixturePath1, fixturePath2, 'plain')).toEqual(expectedPlainResult)
  })

  test('genDiff JSON shows JSON difference correctly', () => {
    const fixturePath1 = getFixturePath('file1.json')
    const fixturePath2 = getFixturePath('file2.json')

    expect(genDiff(fixturePath1, fixturePath2, 'json')).toEqual(expectedJSONResult)
  })
})

describe('Comparing YML files', () => {
  test('genDiff YML shows Stylish difference correctly', () => {
    const fixturePath1 = getFixturePath('file1.yml')
    const fixturePath2 = getFixturePath('file2.yml')

    expect(genDiff(fixturePath1, fixturePath2, 'stylish')).toEqual(expectedStylishResult)
  })

  test('genDiff YML shows Plain difference correctly', () => {
    const fixturePath1 = getFixturePath('file1.yml')
    const fixturePath2 = getFixturePath('file2.yml')

    expect(genDiff(fixturePath1, fixturePath2, 'plain')).toEqual(expectedPlainResult)
  })

  test('genDiff YML shows JSON difference correctly', () => {
    const fixturePath1 = getFixturePath('file1.yml')
    const fixturePath2 = getFixturePath('file2.yml')

    expect(genDiff(fixturePath1, fixturePath2, 'json')).toEqual(expectedJSONResult)
  })
})

describe('Comparing JSON with YML files', () => {
  test('genDiff JSON with YML shows Stylish difference correctly', () => {
    const fixturePath1 = getFixturePath('file1.json')
    const fixturePath2 = getFixturePath('file2.yml')

    expect(genDiff(fixturePath1, fixturePath2, 'stylish')).toEqual(expectedStylishResult)
  })

  test('genDiff JSON with YML shows Plain difference correctly', () => {
    const fixturePath1 = getFixturePath('file1.json')
    const fixturePath2 = getFixturePath('file2.yml')

    expect(genDiff(fixturePath1, fixturePath2, 'plain')).toEqual(expectedPlainResult)
  })

  test('genDiff JSON with YML shows JSON difference correctly', () => {
    const fixturePath1 = getFixturePath('file1.json')
    const fixturePath2 = getFixturePath('file2.yml')

    expect(genDiff(fixturePath1, fixturePath2, 'json')).toEqual(expectedJSONResult)
  })
})
