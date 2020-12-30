import chai = require("chai");
const { expect } = chai;
import { getInputs } from "../../utils/files";
import { createMappedValues, extractNoteInfo, getInvalidCount } from "./main";

describe("day 16", () => {
  beforeEach(function () {
    this.inputs = getInputs(16, { filepath: "input.spec.txt" });
    this.info = extractNoteInfo(this.inputs);
    this.mappedValues = createMappedValues(this.info.fields);
  });

  describe("part a examples", () => {
    it("extracts field information", function () {
      const fields = [
        { field: "class", min1: 1, max1: 3, min2: 5, max2: 7 },
        { field: "row", min1: 6, max1: 11, min2: 33, max2: 44 },
        { field: "seat", min1: 13, max1: 40, min2: 45, max2: 50 },
      ];
      expect(this.info.fields).to.deep.equal(fields);

      expect(this.info.ticket).to.deep.equal([7, 1, 14]);

      const nearbyTickets = [
        [7, 3, 47],
        [40, 4, 50],
        [55, 2, 20],
        [38, 6, 12],
      ];
      expect(this.info.otherTickets).to.deep.equal(nearbyTickets);
    });

    it("creates a map of available values", function () {
      const valuesThatExist = [1, 2, 3, 5, 6, 7, 6, 11, 13, 40, 46, 39, 50];
      const valuesThatDontExist = [4, 12, 51, 52, -1];

      valuesThatExist.forEach((val) => {
        expect(this.mappedValues[val]).to.exist;
      });

      valuesThatDontExist.forEach((val) => {
        expect(this.mappedValues[val]).to.not.exist;
      });
    });

    it("should find all the invalid values", function () {
      const invalidCount = getInvalidCount(this.mappedValues, this.info.otherTickets)

      expect(invalidCount).to.equal(71)
    });
  });

  describe("part b examples", () => {
    // tests
  });
});
