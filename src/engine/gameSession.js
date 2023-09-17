import {Board} from '../objects/board.js';
import {COLORS, HEIGHT, WIDTH} from '../constants/config.js';
import {GameSessionController} from './gameSessionController.js';
import {Tetromino} from '../objects/tetromino.js';
import {TETROMINOS} from '../constants/tetromino.js';
import {cleanBoardLines, fillMatrixWith} from '../utilities/utilities.js';
import {EventHandler} from '../utilities/eventHandler.js';

export {GameSession};

// Output: random integer in range [min, max]
function generateRandomInt(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

function generateTetromino() {
  const tetrominoIndex = generateRandomInt(0, TETROMINOS.length - 1);
  const colorIndex = generateRandomInt(1, COLORS.length - 1);
  return new Tetromino(TETROMINOS[tetrominoIndex], colorIndex);
}

class GameSession {
  constructor() {
    this.board = new Board(WIDTH, HEIGHT);
    this.controller = new GameSessionController(this.board);
    this.tetromino = null;

    this.sessionEndedEventHandler = new EventHandler('sessionEnded');
    this.redrawEventHandler = new EventHandler('redraw');
    this.nextTetrominoGeneratedEventHandler = new EventHandler(
        'nextTetrominoGenerated');
    this.linesCleanedEventHandler = new EventHandler('linesCleaned');
  }

  setTetromino(force = false) {
    if (this.tetromino === null) {
      this.tetromino = generateTetromino();
      this.nextTetromino = generateTetromino();
    } else {
      this.tetromino = this.nextTetromino;
      this.nextTetromino = generateTetromino();
    }

    const isAlive = this.controller.setTetromino(this.tetromino, force);
    this.callRedraw();
    this.callNextTetrominoGenerated();
    return isAlive;
  }

  callRedraw() {
    this.redrawEventHandler.call({'view': this.view()});
  }

  callNextTetrominoGenerated() {
    this.nextTetrominoGeneratedEventHandler.call(
        {'tetromino': this.nextTetromino.rawShape});
  }

  onMovementEvent(direction, isTriggeredByTick = false) {
    const success = this.controller.doMovement(direction);
    if (!isTriggeredByTick || success) {
      this.callRedraw();
      return;
    }

    this.controller.fix();
    let linesCount = cleanBoardLines(this.board, this.tetromino);
    if (linesCount > 0) {
      console.info(`[Session] Lines cleared: ${linesCount}`);
      this.linesCleanedEventHandler.call({'count': linesCount});
    }

    const isAlive = this.setTetromino(true);
    if (!isAlive) {
      this.sessionEndedEventHandler.call();
    }
  }

  onRotationEvent(direction) {
    this.controller.doRotation(direction);
    this.callRedraw();
  }

  view() {
    let grid = structuredClone(this.board.grid);
    fillMatrixWith(grid, this.tetromino.shape(), this.tetromino.x,
        this.tetromino.y);
    return grid;
  }
}