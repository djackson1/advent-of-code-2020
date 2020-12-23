const { getInputs } = require('../../utils/files')

function findSumToAndMultiply(orderedLow, orderedHigh, desiredSum = 2020){
  for(let i = 0; i < orderedLow.length; i++){
    const low = orderedLow[i]

    for(let j = 0; j < orderedHigh.length; j++){
      const high = orderedHigh[j]

      const sum = low + high

      // if the sum matches
      if(sum === desiredSum) {
        return low * high
      }

      // if the sum of low plus the next highest number we have is less than
      // our desired sum, then we can skip to a new low number
      if(sum < desiredSum) continue;
    }
  }

  return -1
}

function getOrderedInputs (inputs) {
  const orderedHigh = inputs.sort((a, b) => b - a)
  const orderedLow = orderedHigh.reverse()

  return { orderedLow, orderedHigh }
}

function a () {
  const inputs = getInputs(1, { fn: Number })
  const { orderedLow, orderedHigh } = getOrderedInputs(inputs)
  const value = findSumToAndMultiply(orderedLow, orderedHigh)

  console.log(`day 01 a => ${value}`)
}

function find2020In3Inputs (orderedLow, orderedHigh) {
  for(let i = 0; i < orderedLow.length; i++){
    const low = orderedLow[i]
    const newSum = 2020 - low

    const newLowArr = orderedLow.slice(i + 1)
    
    const result = findSumToAndMultiply(newLowArr, orderedHigh, newSum)

    if(result > -1) {
      return result * low
    }
  }

  return -1
}


function b () {
  const inputs = getInputs(1, { fn: Number })
  const { orderedLow, orderedHigh } = getOrderedInputs(inputs)
  const value = find2020In3Inputs(orderedLow, orderedHigh)
  console.log(`day 01 b => ${value}`)
}

module.exports = {
  a,
  b,
  findSumToAndMultiply,
  getOrderedInputs,
  find2020In3Inputs
}