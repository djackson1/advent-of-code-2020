const { getInputs } = require('../../utils/files')
const inputs = getInputs(9, { fn: Number })

function canTargetBeSummed(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      console.log("I", arr[i], "J", arr[j], "T", arr[i] + arr[j])

      if (arr[i] + arr[j] === target) return true
    }
  }

  return false
}

function findInvalidNumber(input, premableSize) {
  for (let i = 0; i < input.length - premableSize; i++) {
    const inputWindow = input.slice(i, i + premableSize)
    const target = input[premableSize + i]

    const isValid = canTargetBeSummed(inputWindow, target)

    if (!isValid) {
      return target
    }
  }

  return -1
}

const a = () => {
  console.log(`a = ${'?'}`)
}

const b = () => {
  console.log(`b = ${'?'}`)
}

var runningAsScript = require.main === module
if (runningAsScript) {
  a();
  b();
}

module.exports = {
  a,
  b,
  canTargetBeSummed,
  findInvalidNumber
}
