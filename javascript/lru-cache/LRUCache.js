"use strict";

function printLinkedList(node) {
  if (!node) {
    return;
  }
  process.stdout.write("{ " + node.key + " = " + node.value + " }");
  if (node.next) {
    process.stdout.write(" -> ");
    printLinkedList(node.next);
  } else {
    process.stdout.write("\n");
  }
}

function LRUCache(limit) {
  this.cache = null;
  this.last = null;
  this.index = {};
  this.limit = limit;
  this.count = 0;
}

LRUCache.prototype.get = function(key) {
  var node = this.index[key];

  if (node.prev) {
    node.prev.next = node.next;
  }

  if (node.next) {
    node.next.prev = node.prev;
  }

  if (key === this.last.key) {
    this.last = node.prev;
  }

  node.prev = null;
  node.next = this.cache;
  this.cache.prev = node;
  this.cache = node;

  return node.value;
};

LRUCache.prototype.put = function(key, value) {
  var node = new LRUCache.Node(key, value, this.cache, null);

  if (this.cache) {
    this.cache.prev = node;
    if (this.count === this.limit) {
      this.delete(this.last.key);
    }
  } else {
    this.last = node;
  }

  this.cache = node;
  this.index[key] = node;
  this.count += 1;
};

LRUCache.prototype.delete = function(key) {
  var node = this.index[key];

  if (!node) {
    return;
  }

  node.prev.next = node.next;

  if (key === this.last.key) {
    this.last = node.prev;
  }

  delete this.index[key];
  this.count -= 1;
};

LRUCache.prototype.print = function() {
  printLinkedList(this.cache);
};

LRUCache.Node = function(key, value, next, prev) {
  this.key = key;
  this.value = value;
  this.next = next;
  this.prev = prev;
};

module.exports = LRUCache;
