"use strict";

var Sudoku = require("./Sudoku.js");

var sudoku = new Sudoku();

var easyGame = [
  [ 3, 1, 0, 0, 0, 4, 2, 6, 0 ],
  [ 7, 0, 4, 0, 0, 3, 0, 0, 0 ],
  [ 0, 0, 0, 0, 5, 0, 3, 0, 4 ],
  [ 0, 0, 2, 5, 0, 9, 0, 3, 7 ],
  [ 8, 0, 3, 0, 0, 0, 9, 0, 2 ],
  [ 6, 7, 0, 3, 0, 1, 5, 0, 0 ],
  [ 2, 0, 8, 0, 1, 0, 0, 0, 0 ],
  [ 0, 0, 0, 2, 0, 0, 1, 0, 5 ],
  [ 0, 9, 1, 7, 0, 0, 0, 2, 6 ]
];

sudoku.setGame(easyGame);
sudoku.solveSimple();
sudoku.print();

var hardGame = [
  [ 0, 9, 0, 6, 0, 0, 0, 0, 0 ],
  [ 2, 0, 0, 0, 3, 0, 0, 4, 0 ],
  [ 0, 0, 5, 4, 1, 0, 0, 0, 0 ],
  [ 5, 0, 3, 9, 0, 0, 0, 0, 0 ],
  [ 4, 0, 6, 0, 0, 0, 7, 0, 3 ],
  [ 0, 0, 0, 0, 0, 7, 1, 0, 5 ],
  [ 0, 0, 0, 0, 2, 4, 9, 0, 0 ],
  [ 0, 8, 0, 0, 5, 0, 0, 0, 4 ],
  [ 0, 0, 0, 0, 0, 6, 0, 7, 0 ]
];

sudoku.setGame(hardGame);
sudoku.solve();

var solved = sudoku.isSolved();
if (solved) {
  console.log("Sudoku is solved!");
} else {
  console.log("Sudoku could not be solved");
}

sudoku.print();
