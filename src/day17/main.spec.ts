import chai = require("chai");
const { expect } = chai;
import { getInputs } from "../../utils/files";
import { createGrid, getGridActiveCount, getGridStr, runGridNTimes3D, runGridNTimes4D } from "./main";

describe("day 17", () => {
  beforeEach(function () {
    this.inputs = getInputs(17, { filepath: "input.spec.txt" });
    this.grid = createGrid(this.inputs);
  });

  describe("part a examples", () => {
    it("should create the grid", function () {
      const gridStr = getGridStr(this.grid, 0);
      expect(gridStr).to.equal(`.#.
..#
###`);
    });

    it("should create the correct grid sizing", function () {
      expect(this.grid.sizing.minX).to.equal(0);
      expect(this.grid.sizing.minY).to.equal(0);
      expect(this.grid.sizing.minZ).to.equal(0);
      expect(this.grid.sizing.maxX).to.equal(2);
      expect(this.grid.sizing.maxY).to.equal(2);
      expect(this.grid.sizing.maxZ).to.equal(0);
    });

    it("should sucessfully cycle to the next grid", function () {

      const grid1 = runGridNTimes3D(this.grid, 1)

      const gridStr1 = getGridStr(grid1, -1);
      expect(gridStr1).to.equal(`#..
..#
.#.`);

      const gridStr2 = getGridStr(grid1, 0);
      expect(gridStr2).to.equal(`#.#
.##
.#.`);

      const gridCount = getGridActiveCount(grid1);
      expect(gridCount).to.equal(11);

      const grid2 = runGridNTimes3D(this.grid, 2)
      const gridCount2 = getGridActiveCount(grid2);
      expect(gridCount2).to.equal(21);
    });

    it('should find the total cube count', function () {
      const finalGrid = runGridNTimes3D(this.grid, 6)
      const count = getGridActiveCount(finalGrid)

      expect(count).to.equal(112)
    })
  });

  describe("part b examples", () => {
    it('should find the total cube count', function () {
      const finalGrid = runGridNTimes4D(this.grid, 6)
      const count = getGridActiveCount(finalGrid)

      expect(count).to.equal(848)
    })
  });
});
