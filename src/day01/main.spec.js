const chai = require("chai");
const { expect } = chai;
const { getInputs } = require('../../utils/files')
const { findSumToAndMultiply, getOrderedInputs } = require("./main");

describe("day01", () => {
  beforeEach(function () {
    this.inputs = getInputs(1, { filepath: 'input.spec.txt', fn: Number })
    this.orderedInputs = getOrderedInputs(this.inputs)
    const { orderedLow, orderedHigh } = this.orderedInputs
    this.orderedLow = orderedLow
    this.orderedHigh = orderedHigh
  })

  describe.only("part a examples", () => {
    it('should find the product of the 2 numbers that sum to 2020', function () {
      const result = findSumToAndMultiply(this.orderedLow, this.orderedHigh)

      expect(result).to.equal(514579)
    })
  })

  describe("part b examples", () => {
  });
});
