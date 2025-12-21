import yaml from 'js-yaml'

export default (fileContent, fileExtension) => {
  if (fileExtension === '.json') {
    return JSON.parse(fileContent)
  }
  if (fileExtension === '.yml' || fileExtension === '.yaml')
    return yaml.load(fileContent)
}
