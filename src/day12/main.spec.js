const chai = require('chai')
const { expect } = chai
const { getInputs } = require('../../utils/files')
const { extractInstructions, moveShip } = require('./main')

describe('day 12', () => {
  beforeEach(function () {
    this.inputs = getInputs(12, { filepath: 'input.spec.txt' })
    this.instructions = extractInstructions(this.inputs)
  })

  describe('part a examples', () => {
    it('should correctly move the ship', function () {
      const position = moveShip(this.instructions)
      const distance = Math.abs(position.x) + Math.abs(position.y)

      expect(distance).to.equal(25)
    })
  })

  describe('part b examples', () => {
    // tests
  })
})
