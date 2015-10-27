"use strict";

function swap(array, x, y) {
  console.log("Swap " + array[x] + " and " + array[y]);
  var t = array[x];
  array[x] = array[y];
  array[y] = t;
}

function partition(array, left, right) {
  var pivotIndex = Math.floor((left + right) / 2);
  var pivot = array[pivotIndex];

  while (left <= right) {
    while (array[left] < pivot) { left++; }
    while (pivot < array[right]) { right--; }

    if (left <= right) {
      swap(array, left, right);
      left++;
      right--;
    }
  }

  return left;
}

function quicksort(array, left, right) {
  var index = partition(array, left, right);
  if (left < index - 1) {
    quicksort(array, left, index - 1);
  }
  if (index < right) {
    quicksort(array, index, right);
  }
}

var array = [ 5, 11, 1, 8, 9, 12, 3, 4, 14 ];
quicksort(array, 0, array.length - 1);
console.log(array);
