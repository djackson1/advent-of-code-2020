const chai = require('chai')
const { expect } = chai
const { getInputs } = require('../../utils/files')
const { getInstructions } = require('./main')

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
