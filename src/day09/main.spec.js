const chai = require('chai')
const { expect } = chai
const { getInputs } = require('../../utils/files')
const { canTargetBeSummed, findEncryptionWeakness, findInvalidNumber } = require('./main')

describe('day 09', () => {
  before(function () {
    this.inputs = getInputs(9, { filepath: 'input.spec.txt', fn: Number })
    console.log("🚀 ~ file: main.spec.js ~ line 9 ~ this.inputs", this.inputs)
  })

  describe('can arr be summed to target', () => {
    const scenarios = [
      { arr: [1, 2, 3, 4], target: 7, isValid: true },
      { arr: [1, 3, 5, 7], target: 7, isValid: false },
      { arr: [15, 34, 333, 1444], target: 545, isValid: false },
      { arr: [15, 34, 333, 1444], target: 367, isValid: true },
    ]

    scenarios.map(({ arr, target, isValid }, id) => {
      it(`scenario ${id} should correct validate the input and target`, function () {
        expect(canTargetBeSummed(arr, target)).to.equal(isValid)
      })

    })
  })

  describe('part a examples', () => {
    // tests
    it("should find the number that can't be summed", function () {
      const preambleSize = 5
      const result = findInvalidNumber(this.inputs, preambleSize)

      expect(result).to.equal(127)
    })
  })

  describe('part b examples', () => {

    it('shoud find the encryption weakness', function () {
      const target = 127
      const weakness = findEncryptionWeakness(this.inputs, target)

      expect(weakness).to.equal(62)
    })
  })
})
