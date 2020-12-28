import chai = require('chai')
const { expect } = chai
import { getInputs } from '../../utils/files'
import { getInstructions, runProgram,runProgramV2 } from './main'

describe('day 14', () => {
  beforeEach(function () {
    this.inputs = getInputs(14, { filepath: 'input.spec.txt' })
    this.instructions = getInstructions(this.inputs)
  })

  describe('part a examples', () => {
    it('should sum all values in memory', function () {
      const sum = runProgram(this.instructions)
      expect(sum).to.equal(165)
    })

    describe('multiple masks', function () {
      before(function () {
        this.inputs2 = getInputs(14, { filepath: 'input.spec2.txt' })
        this.instructions2 = getInstructions(this.inputs2)
      })

      it('should overwrite the memory space', function () {
        const sum = runProgram(this.instructions2)
        expect(sum).to.equal(104)
      })
    })
  })

  describe('part b examples', () => {
    beforeEach(function () {
      this.inputs3 = getInputs(14, { filepath: 'input.spec3.txt' })
      this.instructions3 = getInstructions(this.inputs3)
      console.log("🚀 ~ file: main.spec.ts ~ line 36 ~ this.instructions3", this.instructions3)
    })

    describe('running program v2', () => {
      it('should correctly return the result', function () {
        const result = runProgramV2(this.instructions3)
        expect(result).to.equal(208)
      })
    })
  })
})

// // "cannot redeclare block scoped variable 'getInputs'" https://stackoverflow.com/a/62912102
// export {};

export {};