const chai = require('chai')
const { expect } = chai
const { getInputs } = require('../../utils/files')
const { partASolution, findSubsequentDepartureTimes } = require('./main')

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
    it.skip('should find the correct timestamp for subsequent bus departures', function () {
      this.timeout(20000); 
      const departureTime = findSubsequentDepartureTimes(this.inputs)
      console.log("🚀 ~ file: main.spec.js ~ line 21 ~ departureTime", departureTime)
      expect(departureTime).to.equal(1068781)
    })
  })
})
