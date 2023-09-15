import {COLUMNS, ROWS} from './constants/config.js';

function getEmptyBoard() {
  return Array.from({length: ROWS}, () =>
      Array(COLUMNS).fill(0));
}

export class Board {
  reset() {
    this.grid = getEmptyBoard();
  }
}
