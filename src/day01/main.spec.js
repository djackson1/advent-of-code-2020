const chai = require("chai");
const { expect } = chai;
const { getInputs } = require('../../utils/files.ts')
const { findSumToAndMultiply } = require("./main");

describe("day01", () => {
  beforeEach(function () {
    this.inputs = getInputs(1, { filepath: 'input.spec.txt' })
    console.log("🚀 ~ file: main.spec.js ~ line 9 ~ this.inputs", this.inputs)
  })

  describe.only("part a examples", () => {
    it('should find the product of the 2 numbers that sum to 2020', function () {
      const result = findSumToAndMultiply(this.inputs)

      expect(result).to.equal(514579)
    })
  })

  describe("part b examples", () => {
  });
});
