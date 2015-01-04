var SudokuSolver = (function () {
    function SudokuSolver(table, regionPos) {
        this.table = table;
        this.regionPos = regionPos;
        this.regions = {};
    }
    /**
     * Public function for solving the sudoku from the upper left corner
     *
     * Returns solved table if we were successful
     */
    SudokuSolver.prototype.solve = function () {
        this.solveSudoku(0, 0);
        if (this.wasSolved())
            return this.table;
    };
    /**
     * Recursive function for solving the sudoku with increasing row and column params.
     *
     * Tries to find a suitable number by looping throw numbers
     * Ignores filled numbers
     * Ends when we have reached to the row limit
     */
    SudokuSolver.prototype.solveSudoku = function (row, column) {
        var result = false;
        if (row > 8)
            return true;
        if (this.table[row][column] !== 0) {
            return this.solveNextField(row, column);
        }
        else {
            for (var i = 1; i < 10; i++)
                if (this.addNumber(i, row, column))
                    result = this.solveNextField(row, column);
            if (result === true)
                return true;
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
        if (this.isValidForColumn(number, column) && this.isValidForRow(number, row) && this.isValidForRegion(number, row, column)) {
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
    // TODO can be optimised
    SudokuSolver.prototype.isValidForRegion = function (number, row, column) {
        for (var i = 1; i < 10; i++)
            this.regions[i] = [];
        this.regions[this.regionPos[row][column]].push(number);
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                if (this.regions[this.regionPos[i][j]].indexOf(this.table[i][j]) !== -1) {
                    return false;
                }
                if (this.table[i][j] !== 0) {
                    this.regions[this.regionPos[i][j]].push(this.table[i][j]);
                }
            }
        }
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