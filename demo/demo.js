/* global SudokuSolver */
/* exported SudokuSolverDemo */

var SudokuSolverDemo = (function () {
	'use strict';

	function readFile(filePath, field, onLoadCallback) {
		if (!filePath.files || !filePath.files[0]) {
			console.error('File is missing -> ' + field);
			return false;
		}
		var reader = new FileReader();

		reader.onload = onLoadCallback;
		reader.readAsText(filePath.files[0]);

		return true;
	}

	function parseInput(data) {
		try {
			var ret = [];
			var lines = data.split('\n');

			for (var i = 0; i < 9; i++) {
				ret.push([]);
				var elements = lines[i].split(' ');

				for (var j = 0; j < 9; j++) {
					var element = elements[j].trim() === '-' ? 0 : parseInt(elements[j]);

					if (element < 0 || element > 9) {
						console.error('File format is invalid');
						continue;
					}
					ret[i].push(element);
				}
			}
			return ret;
		} catch(err) {
			console.error('Something went wrong with parsing: ' + err.message);
		}
	}

	function drawBoard(table) {
		for (var i = 0; i < 9; i ++) {
			for (var j = 0; j < 9; j ++) {
				if (table[i][j] === 0) {
					document.getElementById('field-' + i + '-' + j).innerHTML = '<span class="missing">?</span>';
				} else {
					document.getElementById('field-' + i + '-' + j).innerHTML = table[i][j];
				}
			}
		}
	}

	function sayJee() {
		document.getElementById('solve-btn').innerHTML = 'Solved';
	}

	function saySorry() {
		document.getElementById('solve-btn').innerHTML = 'Unsolvable';
		document.getElementById('solve-btn').className = 'fail';
	}

	function sayError() {
		document.getElementById('solve-btn').innerHTML = 'Error';
		document.getElementById('solve-btn').className = 'fail';
	}

	function resetBtn() {
		document.getElementById('solve-btn').innerHTML = 'Solve';
		document.getElementById('solve-btn').className = '';
	}

	return {
		sudokuTable: [],
		regions: [],

		init: function () {
			this.sudokuTable = parseInput(
				'- - 5 - 2 - 8 4 -\n' +
				'8 9 - 7 5 - - - -\n' +
				'- - 4 - - - 5 - 9\n' +
				'7 2 - 1 6 5 - - -\n' +
				'- - 6 2 - 8 1 - -\n' +
				'- - - 4 7 3 - 8 6\n' +
				'5 - 3 - - - 6 - -\n' +
				'- - - - 1 6 - 3 4\n' +
				'- 4 7 - 8 - 9 - -\n'
			);
			this.regions = parseInput(
				'1 1 1 2 2 2 3 3 3\n' +
				'1 1 1 2 2 2 3 3 3\n' +
				'1 1 1 2 2 2 3 3 3\n' +
				'4 4 4 5 5 5 6 6 6\n' +
				'4 4 4 5 5 5 6 6 6\n' +
				'4 4 4 5 5 5 6 6 6\n' +
				'7 7 7 8 8 8 9 9 9\n' +
				'7 7 7 8 8 8 9 9 9\n' +
				'7 7 7 8 8 8 9 9 9\n'
			);
			drawBoard(this.sudokuTable);
		},

		readSudokuTable: function (filePath) {
			var self = this;

			readFile(filePath, 'sudoku table', function (e) {
				var sudoku = parseInput(e.target.result);

				if (sudoku) {
					self.sudokuTable = sudoku;
					drawBoard(self.sudokuTable);
					resetBtn();
				} else {
					sayError();
				}
			});
		},

		readRegions: function (filePath) {
			var self = this;

			readFile(filePath, 'regions', function (e) {
				var regions = parseInput(e.target.result);

				if (regions) {
					self.regions = parseInput(e.target.result);
					resetBtn();
				} else {
					sayError();
				}
			});
		},

		solve: function () {
			try {
				var sudokuSolver = new SudokuSolver(this.sudokuTable, this.regions);
				var solution = sudokuSolver.solve();

				if (solution) {
					drawBoard(solution);
					sayJee();
				} else {
					saySorry();
				}
			} catch (e) {
				console.error('Something went wrong while solving Sudoku: ' + e.message);
				sayError();
			}
		}
	};
}());

SudokuSolverDemo.init();
