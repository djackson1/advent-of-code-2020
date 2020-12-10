const chai = require("chai");
const { expect } = chai;
const { getInputs } = require("../../utils/files");
const { createSortedInputs, getArrangementCount, findAdapterJoltageDifference } = require("./main");

describe("day 10", () => {
  beforeEach(function () {
    this.inputs1 = createSortedInputs(
      getInputs(10, { filepath: "input1.spec.txt", fn: Number })
    );
    this.inputs2 = createSortedInputs(
      getInputs(10, { filepath: "input2.spec.txt", fn: Number })
    );
  });

  describe("part a examples", () => {
    describe("inputs1 file", function () {
      it("should find the joltage differences", function () {
        const counts = findAdapterJoltageDifference(this.inputs1);

        expect(counts[1]).to.equal(7);
        expect(counts[3]).to.equal(5);
      });
    });

    describe("inputs2 file", function () {
      it("should find the joltage differences", function () {
        const counts = findAdapterJoltageDifference(this.inputs2);

        expect(counts[1]).to.equal(22);
        expect(counts[3]).to.equal(10);
      });
    });
  });

  describe("part b examples", () => {
    describe("inputs1 file", function () {
      it("should find the arrangement count", function () {
        expect(getArrangementCount(this.inputs1)).to.equal(8);
      });
    });

    describe("inputs2 file", function () {
      it("should find the arrangement count", function () {
        expect(getArrangementCount(this.inputs2)).to.equal(19208);
      });
    });
  });
});
