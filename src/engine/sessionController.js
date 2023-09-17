export {SessionController};

class SessionController {
  constructor(board) {
    this.board = board;
    this.tetromino = null;
  }

  setTetromino(tetromino) {
    this.tetromino = tetromino;
    const startY = 2 - this.tetromino.shape().length;
    const startX = Math.floor(this.board.grid[0].length / 2);
    return this.moveTo(startX, startY);
  }

  doMovement(direction) {
    if (this.tetromino === null) {
      console.warn('[Controller] Tetromino is null');
      return false;
    }

    switch (direction) {
      case 'left':
        return this.moveTo(this.tetromino.x - 1, this.tetromino.y);
      case 'right':
        return this.moveTo(this.tetromino.x + 1, this.tetromino.y);
      case 'down':
        return this.moveTo(this.tetromino.x, this.tetromino.y + 1);
      default:
        console.warn('[Controller] Unknown movement direction');
    }
    return false;
  }

  doRotation(direction) {
    let applyRotation = (object, action, undoAction) => {
      action.call(object);
      if (this.board.intersectsWith(this.tetromino.shape(),
          this.tetromino.x, this.tetromino.y)) {
        console.debug('[Controller] Cannot rotate');
        undoAction.call(object);
        return false;
      }
      return true;
    };

    switch (direction) {
      case 'clockwise':
        return applyRotation(
            this.tetromino,
            this.tetromino.rotateClockwise,
            this.tetromino.rotateCounterclockwise,
        );
      case 'counterclockwise':
        return applyRotation(
            this.tetromino,
            this.tetromino.rotateCounterclockwise,
            this.tetromino.rotateClockwise,
        );
      default:
        console.warn('[Controller] Unknown rotation direction');
    }
    return false;
  }

  moveTo(x, y) {
    if (this.board.intersectsWith(this.tetromino.shape(), x, y)) {
      console.debug(`[Controller] Cannot move to (${x}, ${y})`);
      return false;
    }

    this.tetromino.setPosition(x, y);
    return true;
  }

  fix() {
    this.board.fillWith(
        this.tetromino.shape(),
        this.tetromino.x,
        this.tetromino.y,
    );
    this.tetromino = null;
  }
}