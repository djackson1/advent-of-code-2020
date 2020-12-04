const { getInputs } = require('../../utils/files')
const inputs = getInputs(3)

const tree = '#'
// slope [R=3, D=1]

const a = () => {
  const width = inputs[0].length
  const height = inputs.length

  let count = 0
  const position = { x: 0, y: 0 }

  for (let i = 0; i < height - 1; i++) {
    position.x += 3
    position.y += 1

    const item = inputs[position.y][position.x % width]

    if (item === tree) {
      count += 1
    }
  }

  console.log(`a = ${count}`)
}

const b = () => {
  console.log(`b = ${'?'}`)
}

a()
b()
