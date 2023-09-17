export {getEmptyMatrix, colorMatrix, fillMatrixWith, safeCall, cleanBoardLines};

function getEmptyMatrix(height, width) {
  return Array.from({length: height}, () =>
      Array(width).fill(0));
}

function checkBoardLine(boardLine) {
  if (boardLine === null || boardLine === undefined) return false;
  return boardLine.every((cell) => { return cell !== 0; });
}

function cleanBoardLines(board, tetromino) {
  const shape = tetromino.shape();
  const grid = board.grid;
  const gridWidth = grid[0].length;
  const y = tetromino.y;
  let linesToPop = [];
  for (let j = shape.length - 1; j >= 0; --j) {
    for (let i = 0; i < shape[j].length; ++i) {
      if (shape[j][i] === 0) continue;
      if (checkBoardLine(grid[y + j])) {
        linesToPop.push(y + j);
        break;
      }
    }
  }
  if (linesToPop.length <= 0) return 0;

  for (let i = 0; i < linesToPop.length; ++i) {
    grid.splice(linesToPop[i], 1);
  }
  grid.unshift(...getEmptyMatrix(linesToPop.length, gridWidth));
  return linesToPop.length;
}

function colorMatrix(matrix, value) {
  for (let j = 0; j < matrix.length; ++j) {
    for (let i = 0; i < matrix[j].length; ++i) {
      if (matrix[j][i] !== 0) {
        matrix[j][i] = value;
      }
    }
  }
}

function fillMatrixWith(base, matrix, x, y) {
  for (let j = 0; j < matrix.length; ++j) {
    if (y + j < 0) continue;
    for (let i = 0; i < matrix[j].length; ++i) {
      if (matrix[j][i] !== 0) {
        base[y + j][x + i] = matrix[j][i];
      }
    }
  }
}

function safeCall(moduleName, obj, func, ...params) {
  if (obj === null || obj === undefined) {
    console.warn(`[${moduleName}] Cannot call '${func.name}' on empty obj`);
    return;
  }
  func.call(obj, ...params);
}
