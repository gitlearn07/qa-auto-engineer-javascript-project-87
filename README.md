### Hexlet tests and linter status:
[![Actions Status](https://github.com/gitlearn07/qa-auto-engineer-javascript-project-87/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/gitlearn07/qa-auto-engineer-javascript-project-87/actions) [![Build and Push](https://github.com/gitlearn07/hexlet-difference-calculator/actions/workflows/build-and-test.yml/badge.svg)](https://github.com/gitlearn07/hexlet-difference-calculator/actions/workflows/build-and-test.yml) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=gitlearn07_hexlet-difference-calculator&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=gitlearn07_hexlet-difference-calculator)

# Difference Calculator
**Difference Calculator** is a command-line utility that compares two configuration files and shows the difference.

It supports input files in JSON and YAML (.yml / .yaml) and can output results in three formats:
- stylish (default)
- plain
- json

## Requirements
- Node.js (latest stable version)
- npm (comes with Node.js)

## Installation
1. Clone the repository:
```bash
  git clone https://github.com/YOUR_USERNAME/hexlet-difference-calculator.git
  cd hexlet-difference-calculator
```
2. Install dependencies:
```bash
  make install
```
3. Link the package globally:
```bash
  npm link
```

# Usage
Basic usage:
```bash
gendiff <filepath1> <filepath2>
```

Specify output format:
```bash
gendiff --format <stylish|plain|json> <filepath1> <filepath2>
```

# Examples:
### Stylish format (default)
```bash
$ gendiff --format stylish __fixtures__/file1.json __fixtures__/file2.yml
{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}
```
### Plain format
```bash
$ gendiff --format plain __fixtures__/file1.yaml __fixtures__/file2.json
Property 'follow' was removed
Property 'proxy' was removed
Property 'timeout' was updated. From 50 to 20
Property 'verbose' was added with value: true
```
### JSON format
```bash
$ gendiff --format json __fixtures__/file1.json __fixtures__/file2.json
[{"key":"follow","value":false,"operation":"removed"},{"key":"host","value":"hexlet.io","operation":"unchanged"},{"key":"proxy","value":"123.234.53.22","operation":"removed"},{"key":"timeout","oldValue":50,"newValue":20,"operation":"changed"},{"key":"verbose","value":true,"operation":"added"}]
```

