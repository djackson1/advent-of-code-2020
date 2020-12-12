const { getInputs } = require('../../utils/files')
const inputs = getInputs(11)

const EMPTY = 'L'
const OCCUPIED = '#'
const FLOOR = '.'

const DIRS = [[1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1]]

function prettyPrint(grid) {
  grid.forEach(str => {
    console.log(str)
  })
  console.log()
}

function getGridItem(grid, x, y) {
  const width = grid[0].length
  const height = grid.length

  if (x < 0 || x >= width) return null
  if (y < 0 || y >= height) return null

  return grid[y][x]
}

function countAdjacentOccupied(grid, x, y) {
  return DIRS.reduce((count, [dx, dy]) => {
    const gridItem = getGridItem(grid, x + dx, y + dy)

    if (gridItem === OCCUPIED) {
      return count + 1
    }
    return count
  }, 0)
}

function countAdjacentOccupiedUnlimited(grid, x, y) {
  return DIRS.reduce((count, [dx, dy]) => {
    for (let i = 0; ; i++) {
      const gridItem = getGridItem(grid, x + dx * i, y + dy * i)

      if (!gridItem) break;

      if (gridItem === OCCUPIED) {
        return count + 1
      }
      //  else if (gridItem === EMPTY){ 
      //   // continue
      // }
    }
    
    console.log("🚀 ~ file: main.js ~ line 60 ~ returnDIRS.reduce ~ count", count)
    return count

    // if (gridItem === OCCUPIED) {
    //   return count + 1
    // }
    // return count
  }, 0)
}

function areAllAdjacentUnoccupied(grid, x, y) {
  const occupiedCount = countAdjacentOccupied(grid, x, y)
  return occupiedCount === 0
}

function iterateGrid(oldGrid, { adjacentFn, adjacentMaxCount }) {
  const newGrid = oldGrid.map((row, y) => {
    const newRowData = row.split("").map((cell, x) => {
      if (cell === FLOOR) return FLOOR

      if (cell === EMPTY) {
        if (areAllAdjacentUnoccupied(oldGrid, x, y)) {
          return OCCUPIED
        } else {
          return EMPTY
        }
      }

      if (cell === OCCUPIED) {
        const adjacentCount = adjacentFn(oldGrid, x, y)

        if (adjacentCount >= adjacentMaxCount) {
          return EMPTY
        }

        return OCCUPIED
      }
    })

    return newRowData.join('')
  })

  return newGrid
}

const defaults = { adjacentFn: countAdjacentOccupied, adjacentMaxCount: 4 }
function iterateUntilStable(grid, { adjacentFn, adjacentMaxCount } = defaults) {
  console.log("🚀 ~ file: main.js ~ line 99 ~ iterateUntilStable ~ adjacentMaxCount", adjacentMaxCount)
  console.log("🚀 ~ file: main.js ~ line 99 ~ iterateUntilStable ~ adjacentFn", adjacentFn)
  prettyPrint(grid)
  let curGrid = grid

  while (true) {
    const nextGrid = iterateGrid(curGrid, { adjacentFn, adjacentMaxCount })
    prettyPrint(nextGrid)

    if (curGrid.join() === nextGrid.join()) {
      return nextGrid
    }

    curGrid = nextGrid
  }
}

function getGridOccupiedCount(grid) {
  return grid.reduce((acc, rowStr) => {
    return acc + rowStr.split('').reduce((count, cell) => {
      if (cell === OCCUPIED) {
        return count + 1
      }
      return count
    }, 0)
  }, 0)
}

function countOccupiedSeatsUnlimitedLength(grid) {
  const options = {
    adjacentFn: countAdjacentOccupiedUnlimited,
    adjacentMaxCount: 5
  }
  const stableGrid = iterateUntilStable(grid, options)
  return getGridOccupiedCount(stableGrid)
}

function countOccupiedSeats(grid) {
  const stableGrid = iterateUntilStable(grid)
  return getGridOccupiedCount(stableGrid)
}

const a = () => {
  const occupied = countOccupiedSeats(inputs)
  console.log(`a = ${occupied}`)
}

const b = () => {
  console.log(`b = ${'?'}`)
}

var runningAsScript = require.main === module
if (runningAsScript) {
  a();
  b();
}

module.exports = {
  a,
  b,
  countOccupiedSeats,
  countOccupiedSeatsUnlimitedLength
}
