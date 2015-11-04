"use strict";

/*
 * This is a map that uses the combination of a key and a time to index values. When values are inserted the key is used
 * as the index into a map, and the time is used to sort the value in a binary search tree. This allows for multiple
 * values of the same key as long as the times are different. When retrieving a value for a given key and time, if a
 * value for the exact time does not exist, the value for the nearest previous time will be returned.
 */

function TimeMap() {
  this.map = {};
}

TimeMap.prototype.get = function(key, time) {
  var node = this.map[key];
  return node.getValue(time);
};

TimeMap.prototype.put = function(key, time, value) {
  var node = new TimeMap.TimeNode(time, value);
  if (!this.map[key]) {
    this.map[key] = new TimeMap.TimeNode(time, value);
  } else {
    this.map[key].insert(node);
  }
  this.printKey(key);
};

TimeMap.prototype.printKey = function(key) {
  this.map[key].print();
  process.stdout.write("\n");
};

TimeMap.TimeNode = function(time, value) {
  this.time = time;
  this.value = value;
  this.left = null;
  this.right = null;
};

TimeMap.TimeNode.prototype.insert = function(node) {
  if (node.time < this.time) {
    if (this.left) {
      this.left.insert(node);
    } else {
      this.left = node;
    }
  } else if (node.time > this.time) {
    if (this.right) {
      this.right.insert(node);
    } else {
      this.right = node;
    }
  } else {
    return true;
  }
};

TimeMap.TimeNode.prototype.getValue = function(time, lastValue) {
  if (time === this.time) {
    return this.value;
  } else if (time < this.time && this.left) {
    return this.left.getValue(time, lastValue);
  } else if (time > this.time && this.right) {
    return this.right.getValue(time, this.value);
  } else if (time < this.time && !this.left) {
    return lastValue;
  } else if (time > this.time && !this.right) {
    return this.value;
  }
};

TimeMap.TimeNode.prototype.print = function() {
  if (this.left) {
    this.left.print();
  }
  process.stdout.write("{ time: " + this.time + ", value: " + this.value + " } -> ");
  if (this.right) {
    this.right.print();
  }
};

module.exports = TimeMap;
