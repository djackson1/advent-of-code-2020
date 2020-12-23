const { getInputs } = require('../../utils/files')

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

function findCorruptedInstructionAccValue(instructions) {

  for (let i = 0; i < instructions.length; i++) {
    const { count, instruction } = instructions[i]

    if ([INSTRUCTIONS.NOP, INSTRUCTIONS.JMP].includes(instruction)) {
      const before = instructions.slice(0, i)
      const after = instructions.slice(i + 1)

      const newInstructions = [
        ...before,
        ...[{
          instruction: (instruction === INSTRUCTIONS.NOP ? INSTRUCTIONS.JMP : INSTRUCTIONS.NOP),
          count
        }],
        ...after
      ]

      const result = runInstructions(newInstructions)

      if (!result.loop) {
        return result
      }
    }
  }
}

const a = () => {
  const inputs = getInputs(8)
  const instructions = convertInputsToInstructions(inputs)
  const { acc } = runInstructions(instructions)

  console.log(`a = ${acc}`)
}

const b = () => {
  const inputs = getInputs(8)
  const instructions = convertInputsToInstructions(inputs)
  const { acc } = findCorruptedInstructionAccValue(instructions)

  console.log(`b = ${acc}`)
}

// var runningAsScript = require.main === module
// if (runningAsScript) {
//   a();
//   b();
// }

module.exports = {
  a,
  b,
  convertInputsToInstructions,
  runInstructions,
  findCorruptedInstructionAccValue
}
