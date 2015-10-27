"use strict";

// Write a method to compute all permutations of a string.

function insertCharIntoPosition(char, position, str) {
  var start = str.substring(0, position);
  var end = str.substring(position);
  return start + char + end;
}

function getPermutations(str) {
  var permutations = [];
  if (str === null || str.length === 0) {
    permutations.push("");
    return permutations;
  } else {
    permutations = getPermutations(str.substring(1));
    var char = str.substring(0, 1);
    var newPermutations = [];
    permutations.forEach(function(perm) {
      for (var i = 0; i <= perm.length; i++) {
        newPermutations.push(insertCharIntoPosition(char, i, perm));
      }
    });
    permutations = permutations.concat(newPermutations);
  }
  return permutations;
}

var permutations = getPermutations("abc");
console.log(permutations);
