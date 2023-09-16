export {colorMatrix, fillMatrixWith, safeCall};

function colorMatrix(matrix, value) {
  for (let j = 0; j < matrix.length; ++j) {
    for (let i = 0; i < matrix[j].length; ++i) {
      if (matrix[j][i] !== 0) {
        matrix[j][i] = value;
      }
    }
  }
}

function fillMatrixWith(base, matrix, x, y) {
  for (let j = 0; j < matrix.length; ++j) {
    if (y + j < 0) continue;
    for (let i = 0; i < matrix[j].length; ++i) {
      if (matrix[j][i] !== 0) {
        base[y + j][x + i] = matrix[j][i];
      }
    }
  }
}

function safeCall(moduleName, obj, func, ...params) {
  if (obj === null || obj === undefined) {
    console.warn(`[${moduleName}] Cannot call '${func.name}' on empty obj`);
    return;
  }
  func.call(obj, ...params);
}
