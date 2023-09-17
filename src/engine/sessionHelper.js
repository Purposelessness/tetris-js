export {cleanBoardLines};

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