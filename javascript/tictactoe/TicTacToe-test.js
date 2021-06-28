"use strict";

var TicTacToe = require("./TicTacToe");

var game = new TicTacToe();
game.play("X", 0, 0);
game.play("O", 2, 2);
game.print();
