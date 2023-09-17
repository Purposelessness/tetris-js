import {
  BLOCK_SIZE,
  COLORS,
  GRID_WIDTH,
  HEIGHT,
  WIDTH,
} from '../constants/config.js';

export {ViewManager};

class ViewManager {
  onRedrawEvent = (event) => {
    this.redraw(event.get('view'));
  };

  onLinesCleanedEvent = (event) => {
    this.linesLabel.textContent = parseInt(this.linesLabel.textContent) +
        event.get('count');
  };

  constructor(document) {
    this.ctx = document.getElementById('game-board').getContext('2d');
    this.nextTetrominoCtx = document.getElementById('next-tetromino').
        getContext('2d');

    this.nameLabel = document.getElementById('name');
    this.scoreLabel = document.getElementById('score');
    this.linesLabel = document.getElementById('lines');
    this.levelLabel = document.getElementById('level');

    this.configureContext();
  }

  configureContext() {
    this.ctx.canvas.width = WIDTH * BLOCK_SIZE;
    this.ctx.canvas.height = HEIGHT * BLOCK_SIZE;
    this.ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

    this.nextTetrominoCtx.width = 4 * BLOCK_SIZE;
    this.nextTetrominoCtx.height = 4 * BLOCK_SIZE;
    this.nextTetrominoCtx.scale(BLOCK_SIZE, BLOCK_SIZE);
  }

  redraw(view) {
    for (let j = 0; j < view.length; ++j) {
      for (let i = 0; i < view[j].length; ++i) {
        const colorIndex = view[j][i];
        this.ctx.fillStyle = COLORS[colorIndex];
        this.ctx.fillRect(
            i + GRID_WIDTH, j + GRID_WIDTH,
            1 - 2 * GRID_WIDTH, 1 - 2 * GRID_WIDTH,
        );
      }
    }
  }
}