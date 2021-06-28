"use strict";

function TicTacToe() {
  this.game = [];
  for (var row = 0; row < 3; row++) {
    this.game[row] = [];
    for (var col = 0; col < 3; col++) {
      this.game[row][col] = " ";
    }
  }
}

TicTacToe.prototype.play = function(player, row, col) {
  this.game[row][col] = player;
};

TicTacToe.prototype.print = function() {
  process.stdout.write("+-----------+\n");
  for (var row = 0; row < 3; row++) {
    process.stdout.write("| ");
    for (var col = 0; col < 3; col++) {
      process.stdout.write(this.game[row][col] + " | ");
    }
    process.stdout.write("\n+-----------+\n");
  }
};

TicTacToe.prototype.lookForForcedMove = function(player) {
  for (var row = 0; row < 3; row++) {
    for (var col = 0; col < 3; col++) {
      if (this.game[row][col] !== player && this.game[row][col] !== " ") {
        
      }
    }
  }
};

module.exports = TicTacToe;
