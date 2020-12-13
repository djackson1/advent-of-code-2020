const chai = require('chai')
const { expect } = chai
const { getInputs } = require('../../utils/files')
const { partASolution } = require('./main')

describe('day 13', () => {
  beforeEach(function () {
    this.inputs = getInputs(13, { filepath: 'input.spec.txt' })
  })

  describe('part a examples', () => {
    it('should find the closest bus time', function () {
      const minutes = partASolution(this.inputs)
      expect(minutes).to.equal(295)
    })
  })

  describe('part b examples', () => {
    // tests
  })
})
