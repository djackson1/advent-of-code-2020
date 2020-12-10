const { getInputs } = require('../../utils/files')
const inputs = getInputs(10)

const arr = [0, 
  28,  33,  18,  42,  31,  14,  46,  20,  48,  47,  24,  23,  49,  45,  19,  38,  39,  11,  1,  32,  25,  35,  8,  17,  7,  9,  4,  2,  34,  10,  3
].sort((i,j) => i - j)
console.log("🚀 ~ file: main.js ~ line 5 ~ arr", arr)

const a = () => {
  const arr2 = arr.map((a, id) => {
    const item2 = arr[id + 1]

    if(isNaN(item2)) return 3

    return item2 - a
  }).reduce((acc, i) => {
    if(!acc[i]) acc[i] = 0
    acc[i] += 1

    return acc
  }, {} )

  console.log(`a = ${JSON.stringify(arr2)}`)
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
  b
}
