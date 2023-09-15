import * as co from './constants/config.js';
import {Board} from './board.js';

const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

ctx.canvas.width = co.COLUMNS * co.BLOCK_SIZE;
ctx.canvas.height = co.ROWS * co.BLOCK_SIZE;

ctx.scale(co.BLOCK_SIZE, co.BLOCK_SIZE);

const board = new Board();

export function play() {
  board.reset();
  console.table(board.grid);
}

document.getElementById('play-button').onclick = play
