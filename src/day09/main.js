
const { getInputs } = require('../../utils/files')

function canTargetBeSummed(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
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

function findEncryptionWeakness(input, target) {
  let min = 0
  let max = 0
  let count = input[0]

  while (max !== input.length) {
    if (count === target) {
      const range = input.slice(min, max).sort((a, b) => b - a)
      return range[0] + range[range.length - 1]
    }

    if (count < target) {
      max += 1
      count += input[max]
    }

    if (count > target) {
      count -= input[min]
      min += 1
    }
  }

  return -1
}

const PART_A_ANSWER = 133015568
const a = () => {
  const inputs = getInputs(9, { fn: Number })
  const invalidNumber = findInvalidNumber(inputs, 25)

  console.log(`a = ${invalidNumber}`)
}

const b = () => {
  const inputs = getInputs(9, { fn: Number })
  const encryptionWeakness = findEncryptionWeakness(inputs, PART_A_ANSWER)
  console.log(`b = ${encryptionWeakness}`)
}

// var runningAsScript = require.main === module
// if (runningAsScript) {
//   a();
//   b();
// }

module.exports = {
  a,
  b,
  canTargetBeSummed,
  findEncryptionWeakness,
  findInvalidNumber
}
