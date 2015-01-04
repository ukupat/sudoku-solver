class SudokuSolver {

	regions: Object = {};

	constructor(public table: number[][], public regionPos: number[][]) {}

	/**
	 * Public function for solving the sudoku from the upper left corner
	 *
	 * Returns solved table if we were successful
	 */
	public solve(): number[][] {
		if (this.solveSudoku(0, 0))
			return this.table;
	}

	/**
	 * Recursive function for solving the sudoku with increasing row and column params.
	 *
	 * Using Backtracking algorithm http://en.wikipedia.org/wiki/Backtracking
	 * - Ignores filled numbers
	 * - Tries to find a suitable number by looping through numbers
	 * - Back tracks when suitable number wasn't found
	 * - Ends when we have reached to the row limit: returns true when we were successful
	 */
	private solveSudoku(row: number, column: number): boolean {
		var result: boolean = false;

		if (row > 8)
			return this.wasSolved();

		if (this.table[row][column] !== 0) {
			return this.solveNextField(row, column);
		} else {
			for (var i = 1; i < 10; i++) {
				if (this.addNumber(i, row, column))
					result = this.solveNextField(row, column);
				if (result === true)
					return true;
			}
			this.backTrackField(row, column);
		}
	}

	private solveNextField(row: number, column: number): boolean {
		if (column > 7)
			return this.solveSudoku(row + 1, 0);
		else
			return this.solveSudoku(row, column + 1);
	}

	/**
	 * Resets the field when we could not find a suitable number
	 */
	private backTrackField(row: number, column: number) {
		this.table[row][column] = 0;
	}

	private addNumber(number: number, row: number, column: number) {
		if (this.isValidForColumn(number, column) && this.isValidForRow(number, row) && this.isValidForRegion(number, row, column)) {
			this.table[row][column] = number;

			return true;
		}
		return false;
	}

	private isValidForColumn(number: number, column: number): boolean {
		for (var i = 0; i < 9; i++)
			if (this.table[i][column] === number)
				return false;

		return true;
	}

	private isValidForRow(number: number, row: number): boolean {
		for (var i = 0; i < 9; i++)
			if (this.table[row][i] === number)
				return false;

		return true;
	}

	// TODO can be optimised
	private isValidForRegion(number: number, row: number, column: number): boolean {
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
	}

	private wasSolved(): boolean {
		for (var i = 0; i < 9; i++)
			for (var j = 0; j < 9; j++)
				if (this.table[i][j] === 0)
					return false;

		return true;
	}
}