export {
  WIDTH, HEIGHT, VERTICAL_OFFSETS, BLOCK_SIZE, GRID_WIDTH, NONE_COLOR, COLORS,
};

const WIDTH = 10;
const HEIGHT = 20;
const VERTICAL_OFFSETS = 100;
const BLOCK_SIZE = Math.floor(
    (window.innerHeight - VERTICAL_OFFSETS) / HEIGHT);
const GRID_WIDTH = 0.007;

const NONE_COLOR = '#999999';
const COLORS = [
  NONE_COLOR,
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'purple',
];
