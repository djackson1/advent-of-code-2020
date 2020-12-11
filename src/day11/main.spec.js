const chai = require('chai')
const { expect } = chai
const { getInputs } = require('../../utils/files')
const { countOccupiedSeats } = require('./main')

describe('day 11', () => {
  beforeEach(function () {
    this.inputs = getInputs(11, { filepath: 'input.spec.txt' })
  })

  describe('part a examples', () => {
    it('should stabilize and count the occupied seats', function () {
      const unoccupied = countOccupiedSeats(this.inputs)
      expect(unoccupied).to.equal(37)
    })
    // tests
  })

  describe('part b examples', () => {
    // tests
  })
})
