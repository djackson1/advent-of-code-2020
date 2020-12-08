const { getInputs } = require('../../utils/files')
const inputs = getInputs(8)

const INSTRUCTIONS = {
  NOP: 'nop',
  ACC: 'acc',
  JMP: 'jmp'
}

function convertInputsToInstructions(inputs) {
  return inputs.map(input => {
    const [instruction, count] = input.split(' ')

    return {
      instruction,
      count: Number(count)
    }
  })
}

function runInstructions(instructions) {
  let acc = 0
  let head = 0

  const instructionsSeenMap = {}

  while (instructions[head]) {
    if (instructionsSeenMap[head]) {
      return {
        loop: true,
        acc
      }
    }

    const { instruction, count } = instructions[head]
    instructionsSeenMap[head] = true

    switch (instruction) {
      case INSTRUCTIONS.NOP: {
        head += 1
        break
      }

      case INSTRUCTIONS.ACC: {
        acc += count

        head += 1
        break
      }

      case INSTRUCTIONS.JMP: {

        head += count
      }
    }
  }

  return {
    loop: false,
    acc
  }
}

const a = () => {
  const instructions = convertInputsToInstructions(inputs)
  const { acc } = runInstructions(instructions)

  console.log(`a = ${acc}`)
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
  convertInputsToInstructions,
  runInstructions
}
