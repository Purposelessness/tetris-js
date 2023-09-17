export {colorMatrix, fillMatrixWith, safeCall, cleanBoardLines};

function checkBoardLine(boardLine) {
  return boardLine.every((cell) => { return cell !== 0; });
}

function cleanBoardLines(board, tetromino) {
  const shape = tetromino.shape();
  const grid = board.grid;
  const y = tetromino.y;
  let linesToPop = 0;
  for (let j = shape.length - 1; j >= 0; --j) {
    for (let i = 0; i < shape[j].length; ++i) {
      if (shape[j][i] === 0) continue;
      if (checkBoardLine(grid[y + j])) {
        ++linesToPop;
        break;
      }
    }
  }
  for (let i = 0; i < linesToPop; ++i) {
    grid.pop();
    grid.unshift(Array(grid[0].length).fill(0));
  }
  return linesToPop;
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
