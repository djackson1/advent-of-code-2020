import chai = require("chai");
import { getInputs } from "../../utils/files";
import { findNthNumber } from "./main";
const { expect } = chai;

describe("day 15", () => {
  beforeEach(function () {
    this.inputs = getInputs(15, { filepath: "input.spec.txt", fn: Number });
  });

  describe("part a examples", () => {
    describe('example "0,3,6"', () => {
      beforeEach(function () {
        this.inputs = [0, 3, 6];
      });

      it("turn 4 should equal 0", function () {
        const result = findNthNumber(this.inputs, 4);
        expect(result).to.equal(0);
      });
      it("turn 9 should equal 4", function () {
        const result = findNthNumber(this.inputs, 9);
        expect(result).to.equal(4);
      });
    });

    const examples = [
      { input: [1, 3, 2], output: 1 },
      { input: [2, 1, 3], output: 10 },
      { input: [1, 2, 3], output: 27 },
      { input: [2, 3, 1], output: 78 },
      { input: [3, 2, 1], output: 438 },
      { input: [3, 1, 2], output: 1836 },
    ];

    examples.forEach(({ input, output }, idx) => {
      it(`scenario ${idx} should correctly find the 2020th number spoke`, function () {
        const result = findNthNumber(input);
        expect(result).to.equal(output);
      });
    });
  });

  describe("part b examples", () => {
    const examples = [
      { input: [0, 3, 6], output: 175594 },
      { input: [1, 3, 2], output: 2578 },
      { input: [2, 1, 3], output: 3544142 },
      { input: [1, 2, 3], output: 261214 },
      { input: [2, 3, 1], output: 6895259 },
      { input: [3, 2, 1], output: 18 },
      { input: [3, 1, 2], output: 362 },
    ];

    examples.forEach(({ input, output }, idx) => {
      it(`scenario ${idx} should correctly find the 30000000th number spoke`, function () {
        this.timeout(20000)
        const result = findNthNumber(input, 30000000);
        expect(result).to.equal(output);
      });
    });
  });
});
