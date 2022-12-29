const grid: number[][] = [
  [ 0, 1, 0, 0, 0, 0, 0, 0, 0, 0], // 1
  [ 0, 1, 1, 0, 1, 1, 0, 0, 1, 0], // 2
  [ 0, 1, 1, 0, 0, 0, 0, 1, 0, 0], // 1
  [ 0, 0, 1, 0, 0, 1, 0, 1, 0, 0], // 1
  [ 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], // 0
  [ 0, 0, 0, 1, 1, 1, 1, 1, 0, 0], // 0
  [ 0, 1, 0, 0, 0, 1, 0, 0, 0, 0], // 1
  [ 0, 1, 0, 0, 0, 1, 0, 0, 1, 1], // 1
  [ 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], // 0
  [ 0, 0, 1, 0, 0, 0, 0, 0, 0, 1], // 2
];

// Find the number of connected islands in the grid, assuming we can fit the whole grid into memory
function numIslands(grid: number[][]): number {
  let numIslands = 0;

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col] === 1) {
        numIslands++;
        flood(grid, row, col);
      }
    }
  }

  return numIslands;
}

// Flood the island at grid[row][col]
const flood = function(grid: number[][], row: number, col: number): void {
  if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length || grid[row][col] !== 1) {
    return;
  }

  grid[row][col] = 2;
  flood(grid, row - 1, col);
  flood(grid, row + 1, col);
  flood(grid, row, col - 1);
  flood(grid, row, col + 1);
}

console.log(`Num islands = ${numIslands(grid)}`);

// Reset the grid to original state
for (let row = 0; row < grid.length; row++) {
  for (let col = 0; col < grid[0].length; col++) {
    if (grid[row][col] === 2) {
      grid[row][col] = 1;
    }
  }
}

// Find the number of connected islands using the least amount of memory possible - we process just two lines of the
// grid at a time.

function numIslandsBig(grid: number[][]): number {
  let numIslands = 0;

  // First look for any visited islands in the first row and flood their connected parts in the second row
  for (let i = 0; i < grid[1].length; i++) {
    const current = grid[0][i];
    if (current === 2) {
      grid[0][i] = 1;
      flood(grid, 0, i);
    }
  }

  // Then look for new islands in the second row and flood them
  for (let i = 0; i < grid[1].length; i++) {
    const current = grid[1][i];
    if (current === 1 && grid[0][i] !== 2) {
      numIslands++;
      flood(grid, 1, i);
    }
  }

  // console.table(grid);
  // console.log(`numIslandsBig: ${numIslands}`);

  return numIslands;
}

const buffer: number[][] = new Array(2);
buffer[0] = new Array(grid[0].length).fill(0);
buffer[1] = grid[0];
let count = numIslandsBig(buffer);

for (let nextRow = 1; nextRow < grid.length; nextRow++) {
  buffer[0] = buffer[1];
  buffer[1] = grid[nextRow];
  count += numIslandsBig(buffer);
}

console.log(`Num islands (big) = ${count}`);
