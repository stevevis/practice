"use strict";

// Write a method to return all subsets of a set.

function getSubsets(set, index) {
  var subsets = [];
  if (set.length === index) {
    subsets.push([]);
  } else {
    subsets = getSubsets(set, index + 1);
    var value = set[index];
    var moreSubsets = subsets.map(function(subset) {
      return subset.concat([value]);
    });
    subsets = subsets.concat(moreSubsets);
  }
  return subsets;
}

var subsets = getSubsets([ 1, 2, 3, 4], 0);
console.log(subsets);
