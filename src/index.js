let matrix = [
  [6, 5, 0, 7, 3, 0, 0, 8, 0],
  [0, 0, 0, 4, 8, 0, 5, 3, 0],
  [8, 4, 0, 9, 2, 5, 0, 0, 0],
  [0, 9, 0, 8, 0, 0, 0, 0, 0],
  [5, 3, 0, 2, 0, 9, 6, 0, 0],
  [0, 0, 6, 0, 0, 0, 8, 0, 0],
  [0, 0, 9, 0, 0, 0, 0, 0, 6],
  [0, 0, 7, 0, 0, 0, 0, 5, 0],
  [1, 6, 5, 3, 9, 0, 4, 7, 0]
];

let column = 0;
let rower = 0;
let rowCube = 0;
let colCube = 0;
console.log(solveSudoku(matrix));
// console.log("isUsedBox: " + isUsedBox(0, 0, 9));

function solveSudoku() {
  if (!findUnsigned()) {
    return true;
  }
  for (let num = 1; num <= 9; num++) {
    if (isSafe(num)) {
      matrix[rower][column] = num;
      let rowRem = rower;
      let colRem = column;
      let valRem = num
      if (solveSudoku(matrix)) {
        console.log(matrix)
        return matrix;
      } else {
        matrix[rower][column] = 0;
        if (valRem < 9){
          matrix[rowRem][colRem] = valRem + 1;
        }else {
          matrix[rowRem][colRem] = 1;
        }
        
        if (solveSudoku(matrix)) {
          return matrix;
        }
      }
    }
  }
  console.log(matrix);

  return false;
}

function isSafe(digit, row, col) {
  return !isUsedRow(digit) &&
    !isUsedColumn(digit) &&
    !isUsedBox(digit);
}

function isUsedBox(digit) {
  let isBox = null;
  let box = [];
  if ((rowCube < 3) && (colCube < 3)) {
    for (let k = 0; k < 3; k++) {
      for (let i = 0; i < 3; i++) {
        box.push(matrix[k][i]);
      }
    }
  } else if ((rowCube < 3) && (colCube > 2 && colCube < 6)) {
    for (let k = 0; k < 3; k++) {
      for (let i = 3; i < 6; i++) {
        box.push(matrix[k][i]);
      }
    }
  } else if ((rowCube < 3) && (colCube > 5)) {
    for (let k = 0; k < 3; k++) {
      for (let i = 6; i < 9; i++) {
        box.push(matrix[k][i]);
      }
    }
  } else if ((rowCube > 2 && rowCube < 6) && (colCube < 3)) {
    for (let k = 3; k < 6; k++) {
      for (let i = 0; i < 3; i++) {
        box.push(matrix[k][i]);
      }
    }
  } else if ((rowCube > 2 && rowCube < 6) && (colCube > 2 && colCube < 6)) {
    for (let k = 3; k < 6; k++) {
      for (let i = 3; i < 6; i++) {
        box.push(matrix[k][i]);
      }
    }
  } else if ((rowCube > 2 && rowCube < 6) && (colCube > 5)) {
    for (let k = 3; k < 6; k++) {
      for (let i = 6; i < 9; i++) {
        box.push(matrix[k][i]);
      }
    }
  } else if ((rowCube > 5) && (colCube < 3)) {
    for (let k = 6; k < 9; k++) {
      for (let i = 0; i < 3; i++) {
        box.push(matrix[k][i]);
      }
    }
  } else if ((rowCube > 5) && (colCube > 2 && colCube < 6)) {
    for (let k = 6; k < 9; k++) {
      for (let i = 3; i < 6; i++) {
        box.push(matrix[k][i]);
      }
    }
  } else {
    for (let k = 6; k < 9; k++) {
      for (let i = 6; i < 9; i++) {
        box.push(matrix[k][i]);
      }
    }
  }

  isBox = box.some(function (x) {
    return x === digit;
  });
  console.log(box);
  return isBox;
}

function findUnsigned() {
  for (let rowPos = 0; rowPos < 9; rowPos++) {
    for (let colPos = 0; colPos < 9; colPos++) {
      let value = matrix[rowPos][colPos];
      rowCube = rowPos;
      colCube = colPos;
      if (value === 0) {
        rower = rowPos;
        column = colPos;
        return true;
      }
    }
  }
  return false;
}

function isSudokuFull(matrix) {
  let isFull = null;
  let boolmatrix = [];
  for (let i = 0; i < 9; i++) {
    boolmatrix[i] = matrix[i].every(function (x) {
      return (x !== 0);
    });
  }
  isFull = boolmatrix.every(function (value) {
    return value === true;
  })
  return isFull;
}

function isUsedRow(digit) {
  let isRow = matrix[rower].some(function (x) {
    return x === digit;
  });
  return isRow;
}

function isUsedColumn(digit) {
  let isColumn = null;
  let columnAr = [];
  for (let i = 0; i < 9; i++) {
    columnAr[i] = matrix[i][column];
  }
  isColumn = columnAr.some(function (x) {
    return x === digit;
  });
  return isColumn;
}
