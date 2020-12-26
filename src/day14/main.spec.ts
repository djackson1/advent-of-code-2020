import chai = require('chai')
const { expect } = chai
import { getInputs } from '../../utils/files'
import { getInstructions } from './main'

describe('day 14', () => {
  beforeEach(function () {
    this.inputs = getInputs(14, { filepath: 'input.spec.txt' })
    this.instructions = getInstructions(this.inputs)
    console.log("🚀 ~ file: main.spec.js ~ line 10 ~ this.instructions", this.instructions)
  })

  describe('part a examples', () => {
    // tests
    it('should sum all values in memory', function () {
      const sum = 0
      expect(sum).to.equal(165)
    })
  })

  describe('part b examples', () => {
    // tests
  })
})

// // "cannot redeclare block scoped variable 'getInputs'" https://stackoverflow.com/a/62912102
// export {};

export {};