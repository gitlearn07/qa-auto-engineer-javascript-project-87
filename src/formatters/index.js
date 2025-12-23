import plainFormatter from './plainFormatter.js'
import stylishFormatter from './stylishFormatter.js'
import jsonFormatter from './jsonFormatter.js'

const formatters = {
  plain: plainFormatter,
  stylish: stylishFormatter,
  json: jsonFormatter,
}

export default (output, format) => formatters[format](output)
