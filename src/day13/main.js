const { getInputs } = require('../../utils/files')
const inputs = getInputs(13)

function findClosestBusTime (inputs) {
  const timestamp = Number(inputs[0])
  const busIds = inputs[1].split(',').filter(id => id !== 'x').map(Number)

  for(let busTime = timestamp; ;busTime++){ 
    const busId = busIds.reduce((acc, id) => {
      if(Number.isInteger(busTime / id)) {
        return id
      }
      return acc
    }, -1)

    if(busId > -1) {
      return {
        busId,
        busTime,
        timestamp
      }
    }
  }
}

function partASolution (inputs){ 
  const { busId, busTime, timestamp } = findClosestBusTime(inputs)

  return (busTime - timestamp) * busId
}

const a = () => {
  console.log(`a = ${partASolution(inputs)}`)
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
  partASolution,
  findClosestBusTime
}
