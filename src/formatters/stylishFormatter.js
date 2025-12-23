export default (output) => {
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
