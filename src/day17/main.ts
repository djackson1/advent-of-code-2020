const { get, setWith } = require("lodash/fp");
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

function createDirs(): Position[] {
  const dirs = [];
  for (let z = -1; z <= 1; z++) {
    for (let y = -1; y <= 1; y++) {
      for (let x = -1; x <= 1; x++) {
        if (!(x === 0 && y === 0 && z === 0)) {
          dirs.push({ x, y, z });
        }
      }
    }
  }
  return dirs;
}
const DIRS_3D = createDirs();

function getGridCell(cells: Object, position: Position): string {
  const { w, x, y, z } = position;
  return get(`[${w}][${z}][${y}][${x}]`, cells) || INACTIVE;
}

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

function getNextCellState3D(cells: Object, position: Position): string {
  const cur = getGridCell(cells, position);

  const activeCount = DIRS_3D.reduce((acc, dir) => {
    const pos = {
      w: position.w,
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

function cycleGrid(grid: Grid, nextCellStateFn: Function): Grid {
  const minW = grid.sizing.minW - 1;
  const minX = grid.sizing.minX - 1;
  const minY = grid.sizing.minY - 1;
  const minZ = grid.sizing.minZ - 1;
  const maxW = grid.sizing.maxW + 1;
  const maxX = grid.sizing.maxX + 1;
  const maxY = grid.sizing.maxY + 1;
  const maxZ = grid.sizing.maxZ + 1;
  
  let cells = {};
  
  for (let z = minZ; z <= maxZ; z++) {
    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        for (let w = minW; w <= maxW; w++) {
          const nextCell = nextCellStateFn(grid.cells, { w, x, y, z });
          // const nextCell = getNextCellState3D(grid.cells, { w: 0, x, y, z });
          cells = setWith(Object, `[${w}][${z}][${y}][${x}]`, nextCell, cells);
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
  return cycleGrid(grid, getNextCellState3D)
}



export function runGridNTimes(grid: Grid, count: number) {
  console.log("🚀 ~ file: main.ts ~ line 167 ~ runGridNTimes ~ count", count)
  const nextGrid = cycleGrid3D(grid);

  if (count === 1) return nextGrid;

  return runGridNTimes(nextGrid, count - 1);
}

export function createGrid(inputs: string[]): Grid {
  const maxX = inputs[0].length - 1;
  const maxY = inputs.length - 1;

  let cells = {};
  inputs.forEach((row, curY) => {
    const rowData = row.split("");

    rowData.forEach((cell, curX) => {
      cells = setWith(Object, `[0][0][${curY}][${curX}]`, cell, cells);
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

  const finalGrid = runGridNTimes(grid, 6);

  const count = getGridActiveCount(finalGrid);

  console.log(`a = ${count}`);
}

export function b(): void {
  const inputs = getInputs(17);
  console.log(`b = ${"?"}`);
}
