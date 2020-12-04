const { getInputs } = require('../../utils/files')
const inputs = getInputs(3)
const width = inputs[0].length
const height = inputs.length

const tree = '#'

function countTreesAtSlope(dx, dy) {
  let count = 0
  const position = { x: 0, y: 0 }

  for (let i = 0; i < height - 1; i++) {
    position.x += dx
    position.y += dy

    if (inputs[position.y]) {
      const item = inputs[position.y][position.x % width]

      if (item === tree) {
        count += 1
      }
    }
  }

  return count
}

// slope = [3,1]
const a = () => {
  const count = countTreesAtSlope(3, 1)

  console.log(`a = ${count}`)
}

const b = () => {
  const slopes = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]]

  const treeCount = slopes.reduce((acc, [dx, dy]) => {
    const count = countTreesAtSlope(dx, dy)
    return acc * count
  }, 1)

  console.log(`b = ${treeCount}`)
}

a()
b()
