import {colorMatrix} from '../utilities/utilities.js';

export {Tetromino};

class Tetromino {
  constructor(struct, color) {
    this.x = 0;
    this.y = 0;
    this.shapes = struct.shapes;
    this.rawShape = struct.rawShape;
    this.shape_index = 0;
    this.color = color;
    this.height = this.shape().length;
    this.width = this.shape()[0].length;

    for (let i = 0; i < this.shapes.length; ++i) {
      colorMatrix(this.shapes[i], this.color);
    }
  }

  rotateClockwise() {
    ++this.shape_index;
    if (this.shape_index >= this.shapes.length) {
      this.shape_index = 0;
    }
  }

  rotateCounterclockwise() {
    --this.shape_index;
    if (this.shape_index < 0) {
      this.shape_index = this.shapes.length - 1;
    }
  }

  shape() {
    return this.shapes[this.shape_index];
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }
}