import plainFormatter from './plain.js'
import stylishFormatter from './stylish.js'

const formatters = {
  plain: plainFormatter,
  stylish: stylishFormatter,
}

export default (output, format) => formatters[format](output)
