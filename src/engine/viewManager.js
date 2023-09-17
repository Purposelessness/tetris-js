import {
  BLOCK_SIZE,
  COLORS,
  GRID_WIDTH,
  HEIGHT,
  NONE_COLOR,
  WIDTH,
} from '../constants/config.js';

export {ViewManager};

function squareWidth() {
  return 1 - 2 * GRID_WIDTH;
}

function resetContext(ctx) {
  ctx.fillStyle = NONE_COLOR;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

class ViewManager {
  onRedrawEvent = (event) => {
    this.redraw(event.get('view'));
  };

  onNextTetrominoGeneratedEvent = (event) => {
    this.redrawNextTetromino(event.get('tetromino'));
  };

  onSessionInfoChangedEvent = (event) => {
    this.nameLabel.textContent = event.get('name');
    this.scoreLabel.textContent = event.get('score');
    this.linesLabel.textContent = event.get('linesCleared');
    this.levelLabel.textContent = event.get('level');
  };

  constructor(document, name) {
    this.ctx = document.getElementById('game-board').getContext('2d');
    this.nextTetrominoCtx = document.getElementById('next-tetromino').
        getContext('2d');

    this.nameLabel = document.getElementById('name');
    this.scoreLabel = document.getElementById('score');
    this.linesLabel = document.getElementById('lines');
    this.levelLabel = document.getElementById('level');

    this.configureContext();
    this.nameLabel.textContent = name;
  }

  configureContext() {
    this.ctx.canvas.width = WIDTH * BLOCK_SIZE;
    this.ctx.canvas.height = HEIGHT * BLOCK_SIZE;
    this.ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

    this.nextTetrominoCtxWidth = 4;
    this.nextTetrominoCtx.canvas.width =
        this.nextTetrominoCtxWidth * BLOCK_SIZE;
    this.nextTetrominoCtx.canvas.height =
        this.nextTetrominoCtxWidth * BLOCK_SIZE;
    this.nextTetrominoCtx.scale(BLOCK_SIZE, BLOCK_SIZE);
  }

  redraw(view) {
    resetContext(this.ctx);
    for (let j = 0; j < view.length; ++j) {
      for (let i = 0; i < view[j].length; ++i) {
        const colorIndex = view[j][i];
        if (colorIndex === 0) continue;
        this.ctx.fillStyle = COLORS[colorIndex];
        this.ctx.fillRect(
            i + GRID_WIDTH, j + GRID_WIDTH,
            squareWidth(), squareWidth(),
        );
      }
    }
  }

  redrawNextTetromino(shape) {
    const cy = (this.nextTetrominoCtxWidth - shape.length) / 2;
    const cx = (this.nextTetrominoCtxWidth - shape[0].length) / 2;

    resetContext(this.nextTetrominoCtx);
    for (let j = 0; j < shape.length; ++j) {
      for (let i = 0; i < shape[0].length; ++i) {
        const colorIndex = shape[j][i];
        this.nextTetrominoCtx.fillStyle = COLORS[colorIndex];
        this.nextTetrominoCtx.fillRect(
            cx + i + GRID_WIDTH, cy + j + GRID_WIDTH,
            squareWidth(), squareWidth(),
        );
      }
    }
  }

  // Returns the position in the leaderboard where the score should be inserted.
  findPositionInLeaderboard(currentScore) {
    const leaderboard = document.getElementById('leaderboard');
    let left = 1;
    let right = leaderboard.rows.length;
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      const score = parseInt(leaderboard.rows[mid].cells[2].textContent);
      if (currentScore < score) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }
    return left;
  }

  onSessionEndedEvent(sessionInfo) {
    const leaderboard = document.getElementById('leaderboard');
    const row = document.createElement('tr');
    const positionElement = document.createElement('td');
    const nameElement = document.createElement('td');
    const scoreElement = document.createElement('td');

    const positionIndex = this.findPositionInLeaderboard(sessionInfo.score);
    positionElement.textContent = positionIndex;
    nameElement.textContent = sessionInfo.name;
    scoreElement.textContent = sessionInfo.score;

    row.appendChild(positionElement);
    row.appendChild(nameElement);
    row.appendChild(scoreElement);

    // Insert row in the correct position.
    if (positionIndex === leaderboard.rows.length ||
        leaderboard.rows.length === 1) {
      leaderboard.appendChild(row);
    } else {
      leaderboard.insertBefore(row, leaderboard.rows[positionIndex]);
    }

    // Correct positions in other rows.
    for (let i = positionIndex + 1; i < leaderboard.rows.length; ++i) {
      leaderboard.rows[i].cells[0].textContent = i;
    }

    // Delete last row if there are more than 20 rows (one row is header).
    if (leaderboard.rows.length > 21) {
      leaderboard.deleteRow(leaderboard.rows.length - 1);
    }
  }
}