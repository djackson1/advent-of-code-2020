const { getInputs } = require('../../utils/files')

function generateSeatID (seatStr) {
  const rowStr = seatStr.substring(0, 7)
  const colStr = seatStr.substring(7)

  const rowDigits = rowStr.split('').reverse().map(r => r === 'B' ? 1 : 0)
  const colDigits = colStr.split('').reverse().map(r => r === 'R' ? 1 : 0)

  const rowValue = rowDigits.reduce((acc, n, pow) => acc + n * Math.pow(2, pow), 0)
  const colValue = colDigits.reduce((acc, n, pow) => acc + n * Math.pow(2, pow), 0)

  return rowValue * 8 + colValue
}

const a = () => {
  const inputs = getInputs(5)
  const largestSeatId = inputs.reduce((largestId, seatStr) => {
    const seatId = generateSeatID(seatStr)

    if(seatId > largestId) return seatId

    return largestId
  }, 0)

  console.log(`a = ${largestSeatId}`)
}

function getMissingSeatId (seatList) {
  let lastSeatId = seatList[0]

  for(let i = 1; i < seatList.length; i++){
    const seatId = seatList[i]

    if(seatId - lastSeatId !== 1) return seatId - 1

    lastSeatId = seatId
  }
}

const b = () => {
  const inputs = getInputs(5)
  const seatList = inputs.reduce((acc, seatStr) => {
    const seatId = generateSeatID(seatStr)
    acc.push(seatId)
    return acc
  }, [])
  seatList.sort((a, b) => a - b)
  
  const missingSeatId = getMissingSeatId(seatList)
  
  console.log(`b = ${missingSeatId}`)
}

// var runningAsScript = require.main === module
// if (runningAsScript) {
//   a();
//   b();
// }

module.exports = {
  generateSeatID
}