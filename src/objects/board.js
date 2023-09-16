import {fillMatrixWith} from '../utilities.js';

export {Board};

function getEmptyBoard(rows, columns) {
  return Array.from({length: rows}, () =>
      Array(columns).fill(0));
}

class Board {
  constructor(width, height) {
    this.grid = getEmptyBoard(height, width);
  }

  fillWith(matrix, x, y) {
    fillMatrixWith(this.grid, matrix, x, y);
  }

  areIntersected(val, x, y) {
    if (val === 0) {
      return false;
    }

    // Board has left, right and bottom limits
    let yCheck = y >= this.grid.length;
    let xCheck = x < 0 || x >= this.grid[0].length;
    if (yCheck || xCheck) {
      return true;
    }

    return this.grid[y][x] !== 0;
  }

  intersectsWith(matrix, x, y) {
    for (let j = 0; j < matrix.length; ++j) {
      if (y + j < 0) continue;
      for (let i = 0; i < matrix[j].length; ++i) {
        if (this.areIntersected(matrix[j][i], x + i, y + j)) {
          return true;
        }
      }
    }
    return false;
  }
}
