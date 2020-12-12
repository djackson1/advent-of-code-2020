const chai = require('chai')
const { expect } = chai
const { getInputs } = require('../../utils/files')
const { countOccupiedSeats, countOccupiedSeatsUnlimitedLength, iterateGrid, PART_B_DEFAULTS } = require('./main')

describe('day 11', () => {
  beforeEach(function () {
    this.inputs = getInputs(11, { filepath: 'input.spec.txt' })
  })

  describe('part a examples', () => {
    it('should stabilize and count the occupied seats', function () {
      const unoccupied = countOccupiedSeats(this.inputs)
      expect(unoccupied).to.equal(37)
    })
  })

  describe('part b examples', () => {
    it('should stabilize and count the occupied seats', function () {
      const unoccupied = countOccupiedSeatsUnlimitedLength(this.inputs)
      expect(unoccupied).to.equal(26)
    })

    describe('single iterations', () => {
      beforeEach(function () {
        this.inputs2a = getInputs(11, { filepath: 'input2a.spec.txt' })
        this.inputs2b = getInputs(11, { filepath: 'input2b.spec.txt' })
      })

      it('should correctly iterate with unlimited directions', function () {
        const newGrid = iterateGrid(this.inputs2a, PART_B_DEFAULTS)
        expect(newGrid.join('')).to.equal(this.inputs2b.join(''))
      })
    })
  })
})
