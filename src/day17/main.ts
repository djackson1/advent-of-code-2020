const { setWith } = require("lodash/fp");
const { getInputs } = require("../../utils/files");

const ACTIVE = "#";
const INACTIVE = ".";

type GridSize = {
  minW: number;
  minX: number;
  minY: number;
  minZ: number;
  maxW: number;
  maxX: number;
  maxY: number;
  maxZ: number;
};

type Grid = {
  cells: Object;
  sizing: GridSize;
};

type Position = {
  x: number;
  y: number;
  z: number;
  w: number;
};

function createDirectionVectors(minW, maxW): Position[] {
  const dirs = [];
  for (let w = minW; w <= maxW; w++) {
    for (let z = -1; z <= 1; z++) {
      for (let y = -1; y <= 1; y++) {
        for (let x = -1; x <= 1; x++) {
          if (!(x === 0 && y === 0 && z === 0 && w === 0)) {
            dirs.push({ w, x, y, z });
          }
        }
      }
    }
  }
  return dirs;
}
const DIRS_3D = createDirectionVectors(0, 0); // W is always 0 in 3D
const DIRS_4D = createDirectionVectors(-1, 1); // get the W directions for 4D

function getGridCell(cells: Object, position: Position): string {
  const { w, x, y, z } = position;

  // much quicker than lodash get... =/
  if (!cells[w]) return INACTIVE;
  if (!cells[w][z]) return INACTIVE;
  if (!cells[w][z][y]) return INACTIVE;
  if (!cells[w][z][y][x]) return INACTIVE;

  return cells[w][z][y][x];
}

// kind of useless, but nice to print out the grid
export function getGridStr(grid: Grid, z: number) {
  const {
    sizing: { minX, maxX, minY, maxY },
    cells,
  } = grid;

  let str = "";
  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      const pos = { w: 0, x, y, z };
      const cell = getGridCell(cells, pos);
      str += cell;
    }
    if (y !== maxY) {
      str += "\n";
    }
  }

  return str;
}

export function getGridActiveCount(grid: Grid): number {
  const {
    cells,
    sizing: { minW, minX, minY, minZ, maxW, maxX, maxY, maxZ },
  } = grid;

  let count = 0;

  for (let z = minZ; z <= maxZ; z++) {
    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        for (let w = minW; w <= maxW; w++) {
          const cell = getGridCell(cells, { w, x, y, z });

          if (cell === ACTIVE) {
            count += 1;
          }
        }
      }
    }
  }

  return count;
}

function getNextCellState(
  cells: Object,
  position: Position,
  directions: Position[]
): string {
  const cur = getGridCell(cells, position);

  const activeCount = directions.reduce((acc, dir) => {
    const pos = {
      w: position.w + dir.w,
      x: position.x + dir.x,
      y: position.y + dir.y,
      z: position.z + dir.z,
    };
    const nextCell = getGridCell(cells, pos);

    if (nextCell === ACTIVE) return acc + 1;

    return acc;
  }, 0);

  if (cur === ACTIVE) {
    if (activeCount === 2 || activeCount === 3) {
      return ACTIVE;
    }
    return INACTIVE;
  }

  // inactive
  if (activeCount === 3) {
    return ACTIVE;
  }

  return INACTIVE;
}

function getNextCellState3D(cells: Object, position: Position): string {
  return getNextCellState(cells, position, DIRS_3D);
}
function getNextCellState4D(cells: Object, position: Position): string {
  return getNextCellState(cells, position, DIRS_4D);
}

function cycleGrid(grid: Grid, nextCellStateFn: Function): Grid {
  let minW = 999;
  let minX = 999;
  let minY = 999;
  let minZ = 999;
  let maxW = -999;
  let maxX = -999;
  let maxY = -999;
  let maxZ = -999;
  const cells = {};

  for (let w = grid.sizing.minW - 1; w <= grid.sizing.maxW + 1; w++) {
    for (let z = grid.sizing.minZ - 1; z <= grid.sizing.maxZ + 1; z++) {
      for (let y = grid.sizing.minY - 1; y <= grid.sizing.maxY + 1; y++) {
        for (let x = grid.sizing.minX - 1; x <= grid.sizing.maxX + 1; x++) {
          const nextCell = nextCellStateFn(grid.cells, { w, x, y, z });

          // much quicker than lodash setWith again =/
          if (!cells[w]) cells[w] = {};
          if (!cells[w][z]) cells[w][z] = {};
          if (!cells[w][z][y]) cells[w][z][y] = {};

          cells[w][z][y][x] = nextCell;

          // update bounds so we don't process more than we need to
          if (nextCell === ACTIVE) {
            if (w < minW) minW = w;
            if (x < minX) minX = x;
            if (y < minY) minY = y;
            if (z < minZ) minZ = z;
            if (w > maxW) maxW = w;
            if (x > maxX) maxX = x;
            if (y > maxY) maxY = y;
            if (z > maxZ) maxZ = z;
          }
        }
      }
    }
  }

  const nextGrid = {
    cells,
    sizing: { minW, minX, minY, minZ, maxW, maxX, maxY, maxZ },
  };

  return nextGrid;
}

export function cycleGrid3D(grid: Grid): Grid {
  return cycleGrid(grid, getNextCellState3D);
}
export function cycleGrid4D(grid: Grid): Grid {
  return cycleGrid(grid, getNextCellState4D);
}

export function runGridNTimes(
  grid: Grid,
  count: number,
  cycleFn: Function
): Grid {
  const nextGrid = cycleFn(grid);

  if (count === 1) return nextGrid;

  return runGridNTimes(nextGrid, count - 1, cycleFn);
}

export function runGridNTimes3D(grid: Grid, count: number) {
  return runGridNTimes(grid, count, cycleGrid3D);
}
export function runGridNTimes4D(grid: Grid, count: number) {
  return runGridNTimes(grid, count, cycleGrid4D);
}

export function createGrid(inputs: string[]): Grid {
  const maxX = inputs[0].length - 1;
  const maxY = inputs.length - 1;

  const cells = {
    [0]: { // w
      [0]: {}, // z
    },
  };
  
  inputs.forEach((row, curY) => {
    const rowData = row.split("");

    rowData.forEach((cell, curX) => {
      // no need to check W and Z as they are always 0 to start with
      if (!cells[0][0][curY]) cells[0][0][curY] = {};
      cells[0][0][curY][curX] = cell;
    });
  });

  const grid = {
    cells,
    sizing: {
      minW: 0,
      minX: 0,
      minY: 0,
      minZ: 0,
      maxW: 0,
      maxX,
      maxY,
      maxZ: 0,
    },
  };

  return grid;
}

export function a(): void {
  const inputs = getInputs(17);
  const grid = createGrid(inputs);

  const finalGrid = runGridNTimes3D(grid, 6);

  const count = getGridActiveCount(finalGrid);

  console.log(`a = ${count}`);
}

export function b(): void {
  const inputs = getInputs(17);
  const grid = createGrid(inputs);

  const finalGrid = runGridNTimes4D(grid, 6);

  const count = getGridActiveCount(finalGrid);

  console.log(`b = ${count}`);
}
