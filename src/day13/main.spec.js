const chai = require("chai");
const { expect } = chai;
const { getInputs } = require("../../utils/files");
const { partASolution, findSubsequentDepartureTimes } = require("./main");

describe("day 13", () => {
  beforeEach(function () {
    this.inputs = getInputs(13, { filepath: "input.spec.txt" });
  });

  describe("part a examples", () => {
    it("should find the closest bus time", function () {
      const minutes = partASolution(this.inputs);
      expect(minutes).to.equal(295);
    });
  });

  describe("part b examples", () => {
    const examples = [
      { input: "0\n17,x,13,19", result: 3417 },
      { input: "0\n67,7,59,61", result: 754018 },
      { input: "0\n67,x,7,59,61", result: 779210 },
      { input: "0\n67,7,x,59,61", result: 1261476 },
      { input: "0\n1789,37,47,1889", result: 1202161486 },
    ];

    examples.forEach(({ input, result }, idx ) => {
      it(`scenario ${idx}`, function () {
        const timestamp = findSubsequentDepartureTimes(input)

        expect(timestamp).to.equal(result)
      })
    })

    it("should find the correct timestamp for subsequent bus departures", function () {
      this.timeout(20000);
      const departureTime = findSubsequentDepartureTimes(this.inputs);
      console.log(
        "🚀 ~ file: main.spec.js ~ line 21 ~ departureTime",
        departureTime
      );
      expect(departureTime).to.equal(1068781);
    });
  });
});
