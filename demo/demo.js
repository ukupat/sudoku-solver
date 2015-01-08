/* global SudokuSolver */
/* exported SudokuSolverDemo */

var SudokuSolverDemo = (function () {
	'use strict';

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
				if (table[i][j] !== 0) {
					document.getElementById('field-' + i + '-' + j).value = table[i][j];
				}
			}
		}
	}

	function addInputListeners() {
		var inputs = document.getElementsByClassName('field');

		for (var i = 0; i < inputs.length; i ++) {
			inputs[i].addEventListener('keypress', inputListener);
		}
	}

	function inputListener(e) {
		e.preventDefault();

		if (isValidInput(e)) {
			this.value = String.fromCharCode(e.which);
		} else {
			this.value = '';
		}
	}

	function isValidInput(event) {
		return event.charCode > 48 && event.charCode < 58;
	}

	function getSudokuTable() {
		var ret = [];
		var value;

		for (var i = 0; i < 9; i ++) {
			ret.push([]);

			for (var j = 0; j < 9; j ++) {
				value = document.getElementById('field-' + i + '-' + j).value;

				if (value !== '') {
					ret[i][j] = parseInt(value);
				} else {
					ret[i][j] = 0;
				}
			}
		}
		return ret;
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

	function resetBoard() {
		var inputs = document.getElementsByClassName('field');

		for (var i = 0; i < inputs.length; i ++) {
			inputs[i].value = '';
		}
	}

	return {
		sudokuTable: [],

		init: function () {
			var sudokuTable = parseInput(
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
			drawBoard(sudokuTable);
			addInputListeners();
		},

		solve: function () {
			try {
				var sudokuSolver = new SudokuSolver(getSudokuTable());

				console.time('Solving sudoku took');
				var solution = sudokuSolver.solve();
				console.timeEnd('Solving sudoku took');

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
		},

		reset: function () {
			resetBtn();
			resetBoard();
		}
	};
}());

SudokuSolverDemo.init();
