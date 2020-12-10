const { getInputs } = require('../../utils/files')
const inputs = createSortedInputs(getInputs(10, { fn: Number }))

function createSortedInputs (input) {
  return [0, ...input].sort((i,j) => i - j)
}

function findAdapterJoltageDifference (inputs) {
  const diffs = inputs.map((a, id) => {
    const item2 = inputs[id + 1]

    // if no item we are at end of list, next increase is always the max of +3
    if(isNaN(item2)) return 3

    return item2 - a
  })
  
  const counts = diffs.reduce((acc, i) => {
    if(!acc[i]) acc[i] = 0
    acc[i] += 1

    return acc
  }, {} )
  
  return counts
}

const a = () => {
  const counts = findAdapterJoltageDifference(inputs)

  console.log(`a = ${counts[1] * counts[3]}`)
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
  createSortedInputs,
  findAdapterJoltageDifference
}
