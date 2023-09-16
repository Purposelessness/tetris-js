import {Engine} from './engine/engine.js';

const board = document.getElementById('board');
const ctx = board.getContext('2d');

const engine = new Engine(ctx);

document.addEventListener('keydown', function(event) {
  engine.onKeydown(event);
});

document.getElementById('play-button').onclick = function() {
  engine.run();
};
