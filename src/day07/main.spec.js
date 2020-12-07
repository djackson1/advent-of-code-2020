const chai = require("chai");
const { expect } = chai;
const { getInputs } = require("../../utils/files");
const { createMappedInputs, iterativelyCreateFullBagMap } = require('./main')

describe("day 07", () => {
  describe("part a examples", () => {
    describe("using the test input file", () => {
      beforeEach(function () {
        this.inputs = getInputs(7, { filepath: 'input.spec.txt' })
      })

      it("it loads the file", function () {
        const [firstLine] = this.inputs
        expect(firstLine).to.equal('light red bags contain 1 bright white bag, 2 muted yellow bags.')
      });

      it('correctly creates a map the inputs file lines', function () {
        const mappedInputs = createMappedInputs(this.inputs);
        const bagMap = iterativelyCreateFullBagMap(mappedInputs)
        console.log("🚀 ~ file: main.spec.js ~ line 21 ~ bagMap", bagMap)
      })
    });
  });

  describe("part b examples", () => {
    // tests
  });
});
