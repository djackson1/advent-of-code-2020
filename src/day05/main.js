const { getInputs } = require('../../utils/files')
const inputs = getInputs(5)

function generateSeatID (seatStr) {
  const rowStr = seatStr.substring(0, 7)
  const colStr = seatStr.substring(7)

  const rowDigits = rowStr.split('').reverse().map(r => r === 'B' ? 1 : 0)
  // console.log("🚀 ~ file: main.js ~ line 9 ~ generateSeatID ~ rowDigits", rowDigits)
  const colDigits = colStr.split('').reverse().map(r => r === 'R' ? 1 : 0)
  // console.log("🚀 ~ file: main.js ~ line 11 ~ generateSeatID ~ colDigits", colDigits)

  const rowValue = rowDigits.reduce((acc, n, pow) => acc + n * Math.pow(2, pow), 0)
  const colValue = colDigits.reduce((acc, n, pow) => acc + n * Math.pow(2, pow), 0)

  return rowValue * 8 + colValue
}

const a = () => {
  console.log(`a = ${'?'}`)
}

const b = () => {
  console.log(`b = ${'?'}`)
}

a()
b()

module.exports = {
  generateSeatID
}