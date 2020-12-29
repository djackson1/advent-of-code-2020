const { getInputs } = require('../../utils/files')

export function a () {
  const inputs = getInputs(15)
  console.log(`a = ${'?'}`)
}

export function b () {
  const inputs = getInputs(15)
  console.log(`b = ${'?'}`)
}