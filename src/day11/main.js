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

  if (x < 0 || x >= width) return -1
  if (y < 0 || y >= height) return -1

  return grid[y][x]
}

function countAdjacentOccupied (grid, x, y) {
  return DIRS.reduce((count, [dx, dy]) => {
    const gridItem = getGridItem(grid, x + dx , y + dy)

    if(gridItem === OCCUPIED) {
      return count + 1
    }
    return count
  }, 0)
}

function areAllAdjacentUnoccupied (grid, x, y){
  const occupiedCount = countAdjacentOccupied(grid, x, y)
  return occupiedCount === 0
}

function iterateGrid(oldGrid) {
  const newGrid = oldGrid.map((row, y) => {
    const newRowData = row.split("").map((cell, x) => {
      if(cell === FLOOR) return FLOOR

      if(cell === EMPTY) {
        if(areAllAdjacentUnoccupied(oldGrid, x, y)) {
          return OCCUPIED
        } else {
          return EMPTY
        }
      }

      if(cell === OCCUPIED){ 
        const adjacentCount = countAdjacentOccupied(oldGrid, x, y)

        if(adjacentCount >= 4) {
          return EMPTY
        }

        return OCCUPIED
      }
    })

    return newRowData.join('')
  })

  return newGrid
}

function iterateUntilStable (grid) {
  // prettyPrint(grid)
  let curGrid = grid

  while(true) {
    const nextGrid = iterateGrid(curGrid)
    // prettyPrint(nextGrid)

    if(curGrid.join() === nextGrid.join()) {
      return nextGrid
    }

    curGrid = nextGrid
  }
}

function countOccupiedSeats(grid) {
  const stableGrid = iterateUntilStable(grid)
  
  return stableGrid.reduce((acc, rowStr) => {

    return acc + rowStr.split('').reduce((count, cell) => {
      if(cell === OCCUPIED) {
        return count + 1
      }
      return count
    }, 0)
  }, 0)
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
  countOccupiedSeats
}
