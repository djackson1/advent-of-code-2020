const { get, setWith } = require("lodash/fp");
const { getInputs } = require("../../utils/files");

const ACTIVE = "#";
const INACTIVE = ".";

type GridSize = {
  minX: number;
  minY: number;
  minZ: number;
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
const DIRS = createDirs();

function getGridCell(cells: Object, position: Position): string {
  const { x, y, z } = position;
  return get(`[${z}][${y}][${x}]`, cells) || INACTIVE;
}

export function getGridStr(grid: Grid, z: number) {
  const {
    sizing: { minX, maxX, minY, maxY },
    cells,
  } = grid;

  let str = "";
  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      const pos = { z, y, x };
      const cell = getGridCell(cells, pos);
      str += cell;
    }
    if (y !== maxY) {
      str += "\n";
    }
  }

  return str;
}

function getNextCellState(cells: Object, position: Position): string {
  const cur = getGridCell(cells, position);
  
  const activeCount = DIRS.reduce((acc, dir) => {
    const pos = {
      x: position.x + dir.x,
      y: position.y + dir.y,
      z: position.z + dir.z,
    };
    const nextCell = getGridCell(cells, pos);
    
    if (nextCell === ACTIVE) return acc + 1;
    
    return acc;
  }, 0);
  
  if(position.x === 0 && position.y === 0 && position.z === 0) {
    console.log('AC', activeCount)
    console.log("🚀 ~ file: main.ts ~ line 69 ~ getNextCellState ~ position", position)
  }

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

export function cycleGrid(grid: Grid): Grid {
  const minX = grid.sizing.minX - 1;
  const minY = grid.sizing.minY - 1;
  const minZ = grid.sizing.minZ - 1;
  const maxX = grid.sizing.maxX + 1;
  const maxY = grid.sizing.maxY + 1;
  const maxZ = grid.sizing.maxZ + 1;

  let cells = {};

  for (let z = minZ; z <= maxZ; z++) {
    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        // console.log("zyx", z, y, x);

        const nextCell = getNextCellState(grid.cells, { x, y, z });
        if (z === -1 && y === 0) {
          console.log("zyx", z, y, x, nextCell);
        }
        cells = setWith(Object, `[${z}][${y}][${x}]`, nextCell, cells);
      }
    }
  }

  const nextGrid = { cells, sizing: { minX, minY, minZ, maxX, maxY, maxZ } };
  return nextGrid;
}

export function createGrid(inputs: string[]): Grid {
  const maxX = inputs[0].length - 1;
  const maxY = inputs.length - 1;

  let cells = {};
  inputs.forEach((row, curY) => {
    const rowData = row.split("");

    rowData.forEach((cell, curX) => {
      cells = setWith(Object, `[0][${curY}][${curX}]`, cell, cells);
    });
  });

  const grid = {
    cells,
    sizing: {
      minX: 0,
      minY: 0,
      minZ: 0,
      maxX,
      maxY,
      maxZ: 0,
    },
  };

  return grid;
}

export function a(): void {
  const inputs = getInputs(15);
  console.log(`a = ${"?"}`);
}

export function b(): void {
  const inputs = getInputs(15);
  console.log(`b = ${"?"}`);
}
