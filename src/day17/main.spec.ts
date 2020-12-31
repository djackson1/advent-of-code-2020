import chai = require("chai");
const { expect } = chai;
import { getInputs } from "../../utils/files";
import { cycleGrid, createGrid, getGridActiveCount, getGridStr } from "./main";

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

    //   z=-1
    // #..
    // ..#
    // .#.

    // z=0
    // #.#
    // .##
    // .#.

    // z=1
    // #..
    // ..#
    // .#.
    it("should sucessfully cycle to the next grid", function () {
      const nextGrid = cycleGrid(this.grid);

      const gridStr1 = getGridStr(nextGrid, -1);
      expect(gridStr1).to.equal(`.....
.....
.#...
...#.
..#..`);

const gridStr2 = getGridStr(nextGrid, 0);
expect(gridStr2).to.equal(`.....
.....
.#.#.
..##.
..#..`);

      const gridCount = getGridActiveCount(nextGrid);
      expect(gridCount).to.equal(11);

      const grid2 = cycleGrid(nextGrid);
      const gridCount2 = getGridActiveCount(grid2);
      expect(gridCount2).to.equal(21);
    });
  });

  describe("part b examples", () => {
    // tests
  });
});
