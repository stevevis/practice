"use strict";

var fs = require("fs");
var path = require("path");

var LETTERS = "abcdefghijklmnopqrstuvwxyz";

function WordLadder() {
  var dictionaryFile = path.join(__dirname, "words.txt");
  var dictionary = fs.readFileSync(dictionaryFile).toString();

  this.letters = LETTERS.split("");
  this.words = {};

  dictionary.split("\n").forEach(word => {
    this.words[word] = 1;
  });
}

WordLadder.prototype.solve = function(start, end) {
  console.log("Finding ladder from " + start + " to " + end);
  this.solution = [];
  this.getLadderBreadthFirst(start, end);
  console.log(this.solution);
};

WordLadder.prototype.getLadderBreadthFirst = function(start, end) {
  var queue = [];
  queue.push([start]);

  while (queue.length > 0) {
    var ladder = queue.shift();
    for (var i = 0; i < this.letters.length; i++) {
      var lastWord = ladder.slice(-1).pop();
      for (var j = 0; j < lastWord.length; j++) {
        var split = lastWord.split("");
        split[j] = this.letters[i];
        var nextWord = split.join("");
        if (nextWord === end) {
          this.solution = [].concat(ladder, nextWord);
          return;
        }
        else if (ladder.indexOf(nextWord) >= 0) {
          // skip word that's already in the ladder
        } else if (this.words[nextWord]) {
          queue.push([].concat(ladder, nextWord));
        }
      }
    }
  }
};

/**
 * This is a really stupid way to solve this problem that takes a really long time.
 */
WordLadder.prototype.getLadderDepthFirst = function(start, end, ladder) {
  this.letters.forEach(replacement => {
    ladder.push(start);
    var split = start.split("");

    split.forEach((letter, index) => {
      split[index] = replacement;
      var next = split.join("");

      if (this.solution.length && ladder.length >= this.solution.length - 1) {
        return;
      }
      else if (ladder.indexOf(next) >= 0) {
        // skip word that's already in the ladder
      }
      else if (next === end) {
        this.solution = [].concat(ladder, next);
        console.log("Found a solution with length: " + this.solution.length);
        return;
      }
      else if (this.words[next]) {
        this.getLadder(next, end, ladder);
      }

      split[index] = letter;
    });

    ladder.pop();
  });
};

module.exports = WordLadder;
