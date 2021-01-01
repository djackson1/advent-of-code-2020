import chai = require("chai");
const { expect } = chai;
import { evaluateExpression } from './main'

describe("day 18", () => {
  describe("part a examples", () => {
    const examples = [
      { input: "1 + (2 * 3) * 4", output: 28 },
      { input: "2 * 3 + (4 * 5)", output: 26 },
      { input: "5 + (8 * 3 + 9 + 3 * 4 * 3)", output: 437 },
      { input: "5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))", output: 12240 },
      {
        input: "((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2",
        output: 13632,
      },
    ];

    examples.forEach(({ input, output }, idx) => {
      it(`scenario ${idx}`, function () {
        const result = evaluateExpression(input)
        expect(result).to.equal(output)
      })
    })
  });

  describe("part b examples", () => {
    // tests
  });
});
