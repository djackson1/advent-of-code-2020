const chai = require('chai')
const { expect } = chai
const { getInputs } = require("../../utils/files");
const { convertInputsToInstructions, runInstructions, findCorruptedInstructionAccValue } = require('./main')

describe('day 08', () => {

  before(function () {
    this.inputs = getInputs(8, { filepath: 'input.spec.txt' })
    this.instructions = convertInputsToInstructions(this.inputs)
  })

  describe('part a examples', () => {
    it('should correctly terminate the infinite loop', function () {
      const result = runInstructions(this.instructions)

      expect(result.loop).to.be.true
      expect(result.acc).to.equal(5)
    })
  })

  describe('part b examples', () => {
    it('should find the corrupted instruction and terminate correctly', function () {
      expect(findCorruptedInstructionAccValue(this.instructions)).to.equal(8)
    })
  })
})
