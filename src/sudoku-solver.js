var SudokuSolver = (function () {
    function SudokuSolver(table) {
        this.table = table;
    }
    /**
     * Public function for solving the sudoku from the upper left corner
     *
     * Returns solved table if we were successful
     */
    SudokuSolver.prototype.solve = function () {
        if (this.solveSudoku(0, 0))
            return this.table;
    };
    /**
     * Recursive function for solving the sudoku with increasing row and column params.
     *
     * Using Backtracking algorithm http://en.wikipedia.org/wiki/Backtracking
     * - Ignores filled numbers
     * - Tries to find a suitable number by looping through numbers
     * - Back tracks when suitable number wasn't found
     * - Ends when we have reached to the row limit: returns true when we were successful
     */
    SudokuSolver.prototype.solveSudoku = function (row, column) {
        var result = false;
        if (row > 8)
            return this.wasSolved();
        if (this.table[row][column] !== 0) {
            return this.solveNextField(row, column);
        }
        else {
            for (var i = 1; i < 10; i++) {
                if (this.addNumber(i, row, column))
                    result = this.solveNextField(row, column);
                if (result === true)
                    return true;
            }
            this.backTrackField(row, column);
        }
    };
    SudokuSolver.prototype.solveNextField = function (row, column) {
        if (column > 7)
            return this.solveSudoku(row + 1, 0);
        else
            return this.solveSudoku(row, column + 1);
    };
    /**
     * Resets the field when we could not find a suitable number
     */
    SudokuSolver.prototype.backTrackField = function (row, column) {
        this.table[row][column] = 0;
    };
    SudokuSolver.prototype.addNumber = function (number, row, column) {
        if (this.isValidForColumn(number, column) && this.isValidForRow(number, row) && this.isValidForZone(number, row, column)) {
            this.table[row][column] = number;
            return true;
        }
        return false;
    };
    SudokuSolver.prototype.isValidForColumn = function (number, column) {
        for (var i = 0; i < 9; i++)
            if (this.table[i][column] === number)
                return false;
        return true;
    };
    SudokuSolver.prototype.isValidForRow = function (number, row) {
        for (var i = 0; i < 9; i++)
            if (this.table[row][i] === number)
                return false;
        return true;
    };
    SudokuSolver.prototype.isValidForZone = function (number, row, column) {
        var zoneRow = Math.floor(row / 3) * 3;
        var zoneColumn = Math.floor(column / 3) * 3;
        for (var i = zoneRow; i < zoneRow + 3; i++)
            for (var j = zoneColumn; j < zoneColumn + 3; j++)
                if (this.table[i][j] === number)
                    return false;
        return true;
    };
    SudokuSolver.prototype.wasSolved = function () {
        for (var i = 0; i < 9; i++)
            for (var j = 0; j < 9; j++)
                if (this.table[i][j] === 0)
                    return false;
        return true;
    };
    return SudokuSolver;
})();
//# sourceMappingURL=sudoku-solver.js.map