module.exports = function solveSudoku(matrix) {

    let tempMatrix = copyMatrix(matrix);
    let indexesOfZero = findIndexesOfZero(tempMatrix);
    let solvedSudoku = solveSudoku(tempMatrix, indexesOfZero);

    //copy to temp matrix
    function copyMatrix(table) {
        const ar = [];
        for (let i = 0; i < 9; i++) {
            ar.push(table[i]);
        }
        return ar;
    }

    //find indexes of zero
    function findIndexesOfZero(table) {
        let zeroPositions = [];
        for (let i = 0; i < table.length; i++) {
            for (let j = 0; j < table[i].length; j++) {
                let tempAr = [];
                if (table[i][j] === 0) {
                    tempAr.push(i);
                    tempAr.push(j);
                    zeroPositions.push(tempAr);
                }
            }
        }
        return zeroPositions;
    }

    //is used passing number in the row
    function isUsedRow(table, row, number) {
        for (let i = 0; i < table[row].length; i++) {
            if (table[row][i] === number) {
                return false;
            }
        }
        return true;
    }

    //is used passing number in the column
    function isUsedColumn(table, column, number) {
        for (let i = 0; i < 9; i++) {
            if (table[i][column] === number) {
                return false
            }
        }
        return true;
    }

    //is used passing number in the 3x3 box
    function isUsedBox(table, column, row, number) {

        let columnCorner = 0;
        let rowCorner = 0;

        while (column >= columnCorner + 3) {
            columnCorner += 3;
        }

        while (row >= rowCorner + 3) {
            rowCorner += 3;
        }

        for (let i = rowCorner; i < rowCorner + 3; i++) {
            for (let j = columnCorner; j < columnCorner + 3; j++) {
                if (tempMatrix[i][j] === number) {
                    return false;
                }
            }
        }
        return true;
    }

    //is used passing number in the each position
    function isSafeToAdd(table, column, row, number) {
        if (isUsedBox(table, column, row, number) && isUsedColumn(table, column, number)
            && isUsedRow(table, row, number)) {
            return true;
        }
        return false;
    }

    //inserting numbers into zeros elements
    function solveSudoku(table, indexesOfZero) {

        let maxValue = 9;

        for (let i = 0; i < indexesOfZero.length;) {
            let row = indexesOfZero[i][0];
            let column = indexesOfZero[i][1];
            // Try the next value
            let value = table[row][column] + 1;
            // Was a valid number found?
            let found = false;
            // Keep trying new values until either the maxValue
            // was reached or a valid value was found
            while (!found && value <= maxValue) {
                // If a valid value is found, mark found true,
                // set the position to the value, and move to the
                // next position
                if (isSafeToAdd(table, column, row, value)) {
                    found = true;
                    table[row][column] = value;
                    i++;
                }
                // Otherwise, try the next value
                else {
                    value++;
                }
            }
            // If no valid value was found and the maxValue was
            // reached, move back to the previous position
            if (!found) {
                table[row][column] = 0;
                i--;
            }
        }
        return table;
    }

    return solvedSudoku;
}
