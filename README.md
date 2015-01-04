SudokuSolver
============

Sudoku solver that uses [Backtracking algorithm](http://en.wikipedia.org/wiki/Backtracking) and is written in [TypeScript](http://www.typescriptlang.org/).

## Installation

Download source via [bower](http://bower.io/).

````bash
bower install sudoku-solver --save
````

## Example usage

````javascript

// Construct SudokuSolver with two-dimensional number array where this.sudoku[row][column]
var sudokuSolver = new SudokuSolver(this.sudoku, this.regions);

// Returns two-dimensional number array or undefined on failure 
var solution = sudokuSolver.solve();
````

## Demo

Check it out [here](http://ukupat.github.io/sudoku-solver/)

## License

[Apache 2.0 License](//github.com/ukupat/sudoku-solver/blob/master/LICENSE)
