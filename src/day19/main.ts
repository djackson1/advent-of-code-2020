const { getInputs } = require('../../utils/files')

const FileSegments = {
  RULES: 1,
  INPUT: 2,
};

export function extractFileDetails(inputs: string[]) {
  let segment = FileSegments.RULES
  const rules = []
  const messages = []

  inputs.forEach(input => {
    if (segment === FileSegments.RULES) {
      if (input === "") {
        segment = FileSegments.INPUT
      } else {
        rules.push(input)
      }
    } else {
      messages.push(input)
    }
  })

  return { rules, messages }
}

export function a(): void {
  const inputs = getInputs(19)
  console.log(`a = ${'?'}`)
}

export function b(): void {
  const inputs = getInputs(19)
  console.log(`b = ${'?'}`)
}
