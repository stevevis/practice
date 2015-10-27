"use strict";

function swap(array, x, y) {
  var t = array[x];
  array[x] = array[y];
  array[y] = t;
}

function Heap() {
  this.heap = [];
}

Heap.prototype.insert = function(value) {
  var index = this.heap.length;
  this.heap[index] = value;
  this.bubbleUp(index);
  console.log(this.heap);
};

Heap.prototype.bubbleUp = function(index) {
  var parent = Math.ceil(index / 2) - 1;
  if (parent >= 0 && this.heap[index] > this.heap[parent]) {
    swap(this.heap, index, parent);
    this.bubbleUp(parent);
  }
};

Heap.prototype.getMin = function() {
  return this.heap[0];
};

Heap.prototype.deleteMin = function() {
  var last = this.heap.length - 1;
  this.heap[0] = this.heap[last];
  this.heap.splice(last, 1);
  this.bubbleDown(0);
  console.log(this.heap);
};

Heap.prototype.bubbleDown = function(index) {
  var left = index * 2 + 1;
  var right = index * 2 + 2;
  if (this.heap[index] < this.heap[left]) {
    swap(this.heap, index, left);
    this.bubbleDown(left);
  }
  if (this.heap[index] < this.heap[right]) {
    swap(this.heap, index, right);
    this.bubbleDown(right);
  }
};

module.exports = Heap;
