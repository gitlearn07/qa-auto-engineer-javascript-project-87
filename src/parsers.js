import yaml from 'js-yaml'

const parsers = {
  json: JSON.parse,
  yml: yaml.load,
  yaml: yaml.load,
}

export default (fileContent, fileExtension) => parsers[fileExtension](fileContent)
