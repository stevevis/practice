"use strict";

var ALIVE = "*";
var DEAD = " ";

function Life(width, height) {
  this.width = width;
  this.height = height;
  this.space = [];

  for (var i = 0; i < this.height; i++) {
    this.space[i] = [];
    for (var j = 0; j < this.width; j++) {
      this.space[i][j] = DEAD;
    }
  }
}

Life.prototype.setAlive = function(x, y) {
  this.space[x][y] = ALIVE;
};

Life.prototype.setDead = function(x, y) {
  this.space[x][y] = DEAD;
};

Life.prototype.print = function() {
  for (var i = 0; i < this.height; i++) {
    for (var j = 0; j < this.width; j++) {
      process.stdout.write(this.space[i][j] + " ");
    }
    process.stdout.write("\n");
  }
  process.stdout.write("\n");
};

Life.prototype.tick = function() {
  var newSpace = [];
  for (var i = 0; i < this.height; i++) {
    newSpace[i] = [];
    for (var j = 0; j < this.width; j++) {
      var neighbours = this.countNeighbours(i, j);
      if (this.space[i][j] === ALIVE) {
        if (neighbours < 2 || neighbours > 3) {
          newSpace[i][j] = DEAD;
        } else {
          newSpace[i][j] = ALIVE;
        }
      } else {
        if (neighbours === 3) {
          newSpace[i][j] = ALIVE;
        } else {
          newSpace[i][j] = DEAD;
        }
      }
    }
  }
  this.space = newSpace;
};

Life.prototype.countNeighbours = function(x, y) {
  var alive = 0;

  for (var i = x - 1; i < x + 2 && i > -1 && i < this.height; i++) {
    for (var j = y - 1; j < y + 2 && j > -1 && j < this.width; j++) {
      if (i === x && j === y) {
        continue;
      } else {
        if (this.space[i][j] === ALIVE) {
          alive++;
        }
      }
    }
  }

  return alive;
};

Life.prototype.live = function() {
  this.life = setTimeout(function() {
    this.tick();
    this.print();
    this.live();
  }.bind(this), 500);
};

Life.prototype.die = function() {
  clearTimeout(this.life);
};

module.exports = Life;
