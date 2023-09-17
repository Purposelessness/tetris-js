import {Engine} from './engine/engine.js';

const engine = new Engine(document);

document.addEventListener('keydown', function(event) {
  engine.onKeydown(event);
});

document.getElementById('play-button').onclick = function() {
  engine.run();
};
