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
      { input: [0,'17,x,13,19'], result: 3417 },

      // these 3 are very similar
      { input: [0, '67,7,59,61'], result: 754018 }, // 25192 diff to next
      { input: [0, '67,x,7,59,61'], result: 779210 }, // 7 * 59 * 61 = 25193... 93??? not 92??
      { input: [0, '67,x,x,7,59,61'], result: 779210 }, // 25192 diff to next...
      { input: [0, '67,x,x,x,7,59,61'], result: 779210 }, // same here
      { input: [0, '67,x,x,x,x,7,59,61'], result: 779210 }, // and here... ??
      { input: [0, '67,x,x,x,x,x,7,59,61'], result: 779210 },
      
      { input: [0, '67,7,x,59,61'], result: 1261476 },
      { input: [0, '67,7,x,x,59,61'], result: 81003 },
      { input: [0, '67,7,x,x,x,59,61'], result: 588461 },
      { input: [0, '67,7,x,x,x,x,59,61'], result: 1095919 },

      { input: [0, '1789,37,47,1889'], result: 1202161486 },
    ];

    // const example = 1
    // it.only(`scenario ${example}`, function () {
    //   const timestamp = findSubsequentDepartureTimes(examples[example].input)
    //   expect(timestamp).to.equal(examples[example].result)
    // })

    examples.forEach(({ input, result }, idx ) => {
      it(`scenario ${idx}`, function () {
        const timestamp = findSubsequentDepartureTimes(input)

        expect(timestamp).to.equal(result)
      })
    })

    it("should find the correct timestamp for subsequent bus departures", function () {
      this.timeout(20000);
      const departureTime = findSubsequentDepartureTimes(this.inputs);
      expect(departureTime).to.equal(1068781);
    });
  });
});
