"use strict";

function merge(array, helper, low, middle, high) {
  console.log("Merging...");
  console.log(array);
  console.log(helper);
  console.log("Low: " + low + ", Middle: " + middle + ", High: " + high);

  for (var i = low; i <= high; i++) {
    helper[i] = array[i];
  }

  var helperLeft = low;
  var helperRight = middle + 1;
  var current = low;

  while (helperLeft <= middle && helperRight <= high) {
    if (helper[helperLeft] <= helper[helperRight]) {
      array[current] = helper[helperLeft];
      helperLeft++;
    } else {
      array[current] = helper[helperRight];
      helperRight++;
    }
    current++;
  }

  var remaining = middle - helperLeft;
  for (var j = 0; j <= remaining; j++) {
    array[current + i] = helper[helperLeft + i];
  }
}

function mergesort(array, helper, low, high) {
  if (low < high) {
    var middle = Math.floor((low + high) / 2);
    mergesort(array, helper, low, middle);
    mergesort(array, helper, middle + 1, high);
    merge(array, helper, low, middle, high);
  }
}

function sort(array) {
  var helper = [];
  mergesort(array, helper, 0, array.length - 1);
}

var array = [5, 11, 3, 1, 9];
sort(array);
console.log(array);
