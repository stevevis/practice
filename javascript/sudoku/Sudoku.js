"use strict";

// The total value that all integers in a complete row/column/square should add up to
var COMPLETE_VALUE = 9 + 8 + 7 + 6 + 5 + 4 + 3 + 2 + 1;

/*
 * Constructor that creates an empty game
 */
function Sudoku() {
  this.game = [];
  for (var i = 0; i < 9; i++) {
    this.game[i] = [];
    for (var j = 0; j < 9; j++) {
      this.game[i][j] = 0;
    }
  }
}

/*
 * Print the current game
 */
Sudoku.prototype.print = function() {
  for (var i = 0; i < 9; i++) {
    if (i % 3 === 0) { process.stdout.write("\n"); }
    for (var j = 0; j < 9; j++) {
      if (j % 3 === 0) { process.stdout.write("  "); }
      process.stdout.write(this.game[i][j] + " ");
    }
    process.stdout.write("\n");
  }
  process.stdout.write("\n");
};

/*
 * Set a given square to a given value
 */
Sudoku.prototype.setValue = function(row, col, value) {
  this.game[row][col] = value;
};

/*
 * Set the game to the given 2d array
 */
Sudoku.prototype.setGame = function(game) {
  this.game = game;
  console.log("New game!");
  this.print();
};

/*
 * Check if the current game is solved, return 1 for solved and 0 for not solved
 */
Sudoku.prototype.isSolved = function() {
  for (var x = 0; x < 9; x++) {
    var row = [];
    var col = [];

    for (var y = 0; y < 9; y++) {
      row.push(this.game[x][y]);
      col.push(this.game[y][x]);

      if (x % 3 === 0 && y % 3 === 0) {
        var square = [];
        for (var i = x; i < x + 3; i++) {
          for (var j = y; j < y + 3; j++) {
            square.push(this.game[i][j]);
          }
        }

        if (!this.isArrayComplete(square)) {
          return 0;
        }
      }
    }

    if (!this.isArrayComplete(row)) {
      return 0;
    }

    if (!this.isArrayComplete(col)) {
      return 0;
    }
  }

  return 1;
};

/*
 * Validate that the given array of numbers adds up to the expected value of a complete row/column/square and does not
 * contain any duplicate numbers
 */
Sudoku.prototype.isArrayComplete = function(array) {
  var seen = [];
  var total = 0;

  array.forEach(function(value) {
    if (seen[value]) {
      return 0;
    } else {
      seen[value] = 1;
      total += value;
    }
  });

  return total === COMPLETE_VALUE;
};

/*
 * Get all possible values for a given square, based on the current game state
 */
Sudoku.prototype.getPossibleValues = function(x, y) {
  var seen = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];

  for (var i = 0; i < 9; i++) {
    seen[this.game[x][i]] = 1;
    seen[this.game[i][y]] = 1;
  }

  var squareX = x - (x % 3);
  var squareY = y - (y % 3);
  for (var j = squareX; j < squareX + 3; j++) {
    for (var k = squareY; k < squareY + 3; k++) {
      seen[this.game[j][k]] = 1;
    }
  }

  var possibleValues = [];
  seen.forEach(function(value, index) {
    if (value !== 1 && index !== 0) {
      possibleValues.push(index);
    }
  });

  return possibleValues;
};

/*
 * Return the coordinates of the next unsolved square in the current game
 */
Sudoku.prototype.getNextEmpty = function() {
  for (var x = 0; x < 9; x++) {
    for (var y = 0; y < 9; y++) {
      if (this.game[x][y] === 0) {
        return { row: x, col: y };
      }
    }
  }
};

/*
 * Solve the current game using a back-tracking depth first search algorithm
 */
Sudoku.prototype.solve = function() {
  if (this.isSolved()) {
    return true;
  }

  var next = this.getNextEmpty();
  var possibleValues = this.getPossibleValues(next.row, next.col);

  if (possibleValues.length === 0) {
    return false;
  }

  for (var i = 0; i < possibleValues.length; i++) {
    this.setValue(next.row, next.col, possibleValues[i]);
    var finished = this.solve();
    if (finished) {
      return true;
    }
  }

  this.setValue(next.row, next.col, 0);
  return false;
};

/*
 * Solve the current game using a simple algorithm that looks for squares with only one possible value based on the
 * current game state, this will not solve harder games where there is sometimes no obvious square to solve
 */
Sudoku.prototype.solveSimple = function() {
  var canBeSolved = 0;

  for (var x = 0; x < 9; x++) {
    for (var y = 0; y < 9; y++) {
      var value = this.game[x][y];
      if (value !== 0) { continue; }
      var possibleValues = this.getPossibleValues(x, y);
      if (possibleValues.length === 1) {
        this.setValue(x, y, possibleValues[0]);
        canBeSolved = 1;
      }
    }
  }

  if (!canBeSolved) {
    console.log("Sudoku cannot be solved");
  } else if (!this.isSolved()) {
    this.solveSimple();
  } else {
    console.log("Sudoku is solved!");
  }
};

module.exports = Sudoku;
