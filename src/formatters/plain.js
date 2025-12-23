export default (output) => {
  output = output.map((entry) => {
    if (entry.operation === 'added') {
      return `Property '${entry.key}' was added with value: ${entry.value}`
    }
    if (entry.operation === 'removed') {
      return `Property '${entry.key}' was removed`
    }
    if (entry.operation === 'changed') {
      return `Property '${entry.key}' was updated. From ${entry.oldValue} to ${entry.newValue}`
    }
    if (entry.operation === 'unchanged') {
      return null
    }
  })

  return output.filter(e => e).join('\n')
}
