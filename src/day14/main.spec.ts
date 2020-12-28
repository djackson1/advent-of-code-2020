import chai = require('chai')
const { expect } = chai
import { getInputs } from '../../utils/files'
import { getInstructions, runProgram } from './main'

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
        console.log("🚀 ~ file: main.spec.ts ~ line 23 ~ this.instructions2", this.instructions2)
      })

      it('should overwrite the memory space', function () {
        const sum = runProgram(this.instructions2)
        expect(sum).to.equal(104)
      })
    })
  })

  describe('part b examples', () => {
    // tests
  })
})

// // "cannot redeclare block scoped variable 'getInputs'" https://stackoverflow.com/a/62912102
// export {};

export {};