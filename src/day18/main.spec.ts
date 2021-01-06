import chai = require("chai");
const { expect } = chai;
import { evaluateExpression, evaluateExpressionV2 } from "./main";

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
        const result = evaluateExpression(input);
        expect(result).to.equal(output);
      });
    });
  });

  describe.only("part b examples", () => {
    const examples = [
      // trying to find simpler examples....

      { input: "((1 * 2) * (1 + 3 * 2) + 2) + 4", output: 24 },
      // 2 * 10
      // { input: "((4 + 1) * (5 * 1 + 1) + 1) + 2", output: 57 },
      // { input: "(1 + 2 * 3 * 4 + 5) + 6", output: 87 }, // 24
      // { input: "(2 * (3 * 2 + 1)) + 1", output: 19 }, // 24
      // { input: "((2 * 1 + 3) + (1 + 4)) + 1", output: 14 }, // 24
      // 4 * 2 * 2 + 2
      // 18

      // SHOULD BE:    A(M(A(1,3),M(2,A(1,1))) , 2)
      //               A(M(4, 4), 2)
      //               A(16, 2) = 18

      // CURRENTLY IS: M(A(1, 3), A(M(2, A(1, 1)), 2)
      //               M(4, A(4, 2)) 
      //               M(4, 6) = 24

      // { input: "(1 * 2 + 3) + 4", output: 9 },
      // { input: "(1 + 2 * 3) + 2", output: 8 },

      // base cases

      // { input: "1 + 2 * 3 + 4", output: 21 },
      // { input: "1 + 2 * 3 + 4 * 5 + 6", output: 231 },
      // { input: "1 + (2 * 3) + (4 * (5 + 6))", output: 51 },
      // { input: "2 * 3 + (4 * 5)", output: 46 },
      // { input: "5 + (8 * 3 + 9 + 3 * 4 * 3)", output: 1445 },
      // // ADD(5, 
      // //       MUL(ADD(MUL(8, ADD(3, 9)), 3), MUL(4, 3))
      // //    )

      // { input: "5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))", output: 669060 },
      // { input: "((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6)", output: 11664 },
      // { input: "((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 1", output: 11665 },
      // {
      //   input: "((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2",
      //   output: 23340,
      // },
    ];

    examples.forEach(({ input, output }, idx) => {
      it(`scenario ${idx}`, function () {
        const result = evaluateExpressionV2(input);
        expect(result).to.equal(output);
      });
    });
  });
});
