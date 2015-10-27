"use strict";

var Heap = require("./heap.js");

var heap = new Heap();
heap.insert(50);
heap.insert(95);
heap.insert(80);
heap.insert(90);
heap.insert(40);
heap.insert(70);
heap.insert(85);
heap.insert(100);

heap.deleteMin();
heap.deleteMin();
heap.deleteMin();
heap.deleteMin();
