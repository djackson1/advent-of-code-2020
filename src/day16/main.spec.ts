import chai = require("chai");
const { expect } = chai;
import { getInputs } from "../../utils/files";
import { extractNoteInfo } from "./main";

describe("day 16", () => {
  beforeEach(function () {
    this.inputs = getInputs(16, { filepath: "input.spec.txt" });
    this.info = extractNoteInfo(this.inputs);
  });

  it("extracts field information", function () {
    const fields = [
      { field: "class", min1: '1', max1: '3', min2: '5', max2: '7' },
      { field: "row", min1: '6', max1: '11', min2: '33', max2: '44' },
      { field: "seat", min1: '13', max1: '40', min2: '45', max2: '50' },
    ];
    expect(this.info.fields).to.deep.equal(fields);

    expect(this.info.ticket).to.equal("7,1,14");

    const nearbyTickets = ["7,3,47", "40,4,50", "55,2,20", "38,6,12"];
    expect(this.info.otherTickets).to.deep.equal(nearbyTickets);
  });

  describe("part a examples", () => {
    // tests
  });

  describe("part b examples", () => {
    // tests
  });
});
