import {Board} from '../objects/board.js';
import {COLORS, HEIGHT, WIDTH} from '../constants/config.js';
import {SessionController} from './sessionController.js';
import {Tetromino} from '../objects/tetromino.js';
import {TETROMINOS} from '../constants/tetromino.js';
import {fillMatrixWith} from '../utilities.js';

export {Session};

// Output: random integer in range [min, max]
function generateRandomInt(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

function generateTetromino() {
  const tetrominoIndex = generateRandomInt(0, TETROMINOS.length - 1);
  const colorIndex = generateRandomInt(1, COLORS.length - 1);
  return new Tetromino(TETROMINOS[tetrominoIndex], colorIndex);
}

class Session {
  constructor(endSessionEventListener) {
    this.board = new Board(WIDTH, HEIGHT);
    this.controller = new SessionController(this.board);
    this.tetromino = generateTetromino();
    this.controller.setTetromino(this.tetromino);
    this.endSessionEvent = endSessionEventListener;
  }

  onMovementEvent(direction, isTriggeredByTick = false) {
    const success = this.controller.doMovement(direction);
    if (!isTriggeredByTick || success) return;

    this.controller.fix();
    this.tetromino = generateTetromino();
    const isAlive = this.controller.setTetromino(this.tetromino);

    if (!isAlive) {
      this.endSessionEvent();
    }
  }

  onRotationEvent(direction) {
    this.controller.doRotation(direction);
  }

  view() {
    let grid = structuredClone(this.board.grid);
    fillMatrixWith(grid, this.tetromino.shape(), this.tetromino.x,
        this.tetromino.y);
    return grid;
  }
}