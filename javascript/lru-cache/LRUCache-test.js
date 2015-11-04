"use strict";

var LRUCache = require("./LRUCache");

var cache = new LRUCache(5);

console.log("Put a, b & c");
cache.put("a", "a");
cache.put("b", "b");
cache.put("c", "c");
cache.print();

console.log("Get a");
cache.get("a");
cache.print();

console.log("Put d, e & f");
cache.put("d", "d");
cache.put("e", "e");
cache.put("f", "f");
cache.print();

console.log("Get c");
cache.get("c");
cache.print();

console.log("Put g");
cache.put("g", "g");
cache.print();

console.log("Get e");
cache.get("e");
cache.print();

console.log("Delete d");
cache.delete("d");
cache.print();
