export {
  TETROMINO_O,
  TETROMINO_Z,
  TETROMINO_S,
  TETROMINO_J,
  TETROMINO_L,
  TETROMINO_T,
  TETROMINO_I,
  TETROMINOS,
};

const TETROMINO_O = {
  shapes:
      [
        [
          [1, 1],
          [1, 1],
        ],
      ],
  rawShape:
      [
        [1, 1],
        [1, 1],
      ],
};

const TETROMINO_Z = {
  shapes:
      [
        [
          [0, 0, 0],
          [1, 1, 0],
          [0, 1, 1],
        ],
        [
          [0, 0, 1],
          [0, 1, 1],
          [0, 1, 0],
        ],
      ],
  rawShape:
      [
        [1, 1, 0],
        [0, 1, 1],
      ],
};
const TETROMINO_S = {
  shapes:
      [
        [
          [0, 0, 0],
          [0, 1, 1],
          [1, 1, 0],
        ],
        [
          [0, 1, 0],
          [0, 1, 1],
          [0, 0, 1],
        ],
      ],
  rawShape:
      [
        [0, 1, 1],
        [1, 1, 0],
      ],
};

const TETROMINO_J = {
  shapes:
      [
        [
          [1, 0, 0],
          [1, 1, 1],
          [0, 0, 0],
        ],
        [
          [0, 1, 1],
          [0, 1, 0],
          [0, 1, 0],
        ],
        [
          [0, 0, 0],
          [1, 1, 1],
          [0, 0, 1],
        ],
        [
          [0, 1, 0],
          [0, 1, 0],
          [1, 1, 0],
        ],
      ],
  rawShape:
      [
        [1, 0, 0],
        [1, 1, 1],
      ],
};
const TETROMINO_L = {
  shapes:
      [
        [
          [0, 0, 1],
          [1, 1, 1],
          [0, 0, 0],
        ],
        [
          [0, 1, 0],
          [0, 1, 0],
          [0, 1, 1],
        ],
        [
          [0, 0, 0],
          [1, 1, 1],
          [1, 0, 0],
        ],
        [
          [1, 1, 0],
          [0, 1, 0],
          [0, 1, 0],
        ],
      ],
  rawShape:
      [
        [0, 0, 1],
        [1, 1, 1],
      ],
};

const TETROMINO_T = {
  shapes:
      [
        [
          [0, 0, 0],
          [1, 1, 1],
          [0, 1, 0],
        ],
        [
          [0, 1, 0],
          [1, 1, 0],
          [0, 1, 0],
        ],
        [
          [0, 1, 0],
          [1, 1, 1],
          [0, 0, 0],
        ],
        [
          [0, 1, 0],
          [0, 1, 1],
          [0, 1, 0],
        ],
      ],
  rawShape:
      [
        [1, 1, 1],
        [0, 1, 0],
      ],
};

const TETROMINO_I = {
      shapes:
          [
            [
              [0, 0, 0, 0],
              [0, 0, 0, 0],
              [1, 1, 1, 1],
              [0, 0, 0, 0],
            ],
            [
              [0, 0, 1, 0],
              [0, 0, 1, 0],
              [0, 0, 1, 0],
              [0, 0, 1, 0],
            ],
          ],
      rawShape:
          [
            [1, 1, 1, 1],
          ],
    }
;

const TETROMINOS = [
  TETROMINO_O,
  TETROMINO_Z,
  TETROMINO_S,
  TETROMINO_J,
  TETROMINO_L,
  TETROMINO_T,
  TETROMINO_I,
];
