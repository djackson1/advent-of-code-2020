const { getInputs } = require('../../utils/files')

function parseInputs () {
  const inputs = getInputs(2)

  return inputs.map(i => {
    const values = i.split(/ |: |-/g)

    return values.map(value => {
      return !isNaN(value) ? Number(value) : value
    })
  })
}

function a () {
  const inputs = parseInputs()


  const validPasswordCount = inputs.reduce((acc, input) => {
    const [min, max, char, password] = input
    // console.log("🚀 ~ file: main.js ~ line 22 ~ validPasswords ~ password", password)

    const count = password.split(char).length - 1

    if(count >= min && count <= max) {
      return acc + 1
    }

    return acc
  }, 0)

  console.log(`day 01 a => ${validPasswordCount}`)
}


// function b () {
//   const { orderedLow, orderedHigh } = getOrderedInputs()
//   const value = find2020In3Inputs(orderedLow, orderedHigh)
//   console.log(`day 01 b => ${value}`)
// }

a()
b()