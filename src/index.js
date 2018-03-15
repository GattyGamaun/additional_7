module.exports = function solveSudoku(matrix) {

  let column = 0;
  let rower = 0;

  if (!findUnsigned()) {
    return true;
  }
  for (let num = 1; num <= 9; num++) {
    if (isSafe(num)) {
      matrix[rower][column] = num;
      if (solveSudoku(matrix)) {
        // console.log(matrix)
        return matrix;
      } else {
        matrix[rower][column] = 0;
      }
    }
  }

  return matrix;


  function isSafe(digit) {
    return !isUsedRow(digit) &&
      !isUsedColumn(digit);
    !isUsedBox(row - row % 3, col - col % 3, digit);
  }

  function findUnsigned() {
    for (let rowPos = 0; rowPos < 9; rowPos++) {
      for (let colPos = 0; colPos < 9; colPos++) {
        let value = matrix[rowPos][colPos];
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
    // console.log( boolmatrix, isFull );
    return isFull;
  }

  function isUsedBox(posRow, posCol, digit) {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (matrix[row + posRow][col + posCol] === digit) {
          return true;
        }
      }
    }
    return false;
  }

  function isUsedRow(digit) {
    // console.log(matrix[row]);
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
    // console.log(columnAr);
    return isColumn;
  }
}
