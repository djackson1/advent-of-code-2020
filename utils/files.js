const fs = require('fs-extra')
const path = require('path')

const getDayString = day => {
  if (day < 10) return `0${day}`
  return `${day}`
}
const getInputsRaw = day => {
  const dayDir = path.resolve(__dirname, `../src/day${getDayString(day)}`, 'input.txt')
  return fs.readFileSync(dayDir, 'utf-8')
}

/**
 * @param {string} day
 * @param {boolean} splitByNewLine should the input be split by a newline
 * @param {boolean} splitByComma should the input be split by a comma
 */
const getInputs = (day, splitByNewLine = true, splitByComma = false) => {
  const inputs = getInputsRaw(day)

  if (splitByNewLine && splitByComma) {
    return inputs.split('\n').map(r => r.trim().split(','))
  } else if (splitByNewLine) {
    return inputs.split('\n')
  } else if (splitByComma) {
    return inputs.split(',')
  }

  return inputs
}

module.exports = {
  getInputsRaw,
  getInputs,
}
