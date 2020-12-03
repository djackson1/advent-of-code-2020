const { getInputs } = require('../../utils/files')

function find2020andMultiply(inputs){
  const orderedHigh = inputs.sort((a, b) => b - a)
  const orderedLow = orderedHigh.reverse()

  for(let i = 0; i < orderedLow.length; i++){
    const low = orderedLow[i]

    for(let j = 0; j < orderedHigh.length; j++){
      const high = orderedHigh[j]

      const sum = low + high

      // if the sum matches
      if(sum === 2020) {
        return low * high
      }

      // if the sum of low plus the next highest number we have is less than
      // our desired sum, then we can skip to a new low number
      if(sum < 2020) continue;
    }
  }

  return -1
}

function a () {
  const inputs = getInputs(1).map(Number)

  const value = find2020andMultiply(inputs)

  console.log(`day 01 a => ${value}`)
}

a()