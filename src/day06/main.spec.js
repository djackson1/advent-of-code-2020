const chai = require("chai");
const { expect } = chai;
const { getUniqueGroupAnswerCount, getSumOfGroupUniqueAnswers } = require("./main");

describe("day 6", () => {
  describe("part a examples", () => {
    describe("group examples", () => {
      const groupExamples = [
        { group: ["abcx", "abcy", "abcz"], result: 6 },
        { group: ["a", "b"], result: 2 },
        { group: ["aaaaabaaaaa"], result: 2 },
      ];

      groupExamples.forEach(({ group, result }, id) => {
        it(`scenario ${id + 1} should reutrn ${result} unqiue answers`, () => {
          expect(getUniqueGroupAnswerCount(group)).to.equal(result);
        });
      });
    });

    describe('multiple groups', () => { 
      const groupExamples = [
        { groups: [["abcx", "abcy", "abcz"], ['a','b']], result: 8 }
      ]

      groupExamples.forEach(({ groups, result }, id) => {
        it(`scenario ${id + 1} should reutrn a sum of ${result} for multiple groups`, () => {
          expect(getSumOfGroupUniqueAnswers(groups)).to.equal(result);
        })
      })
    })
  });

  describe("part b examples", () => {});
});
