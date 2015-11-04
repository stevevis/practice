"use strict";

var TimeMap = require("./TimeMap");

var timeMap = new TimeMap();

timeMap.put("a", 5, "a");
console.log("Get a:4 = " + timeMap.get("a", 4));
console.log("Get a:5 = " + timeMap.get("a", 5));
console.log("Get a:6 = " + timeMap.get("a", 6));

timeMap.put("a", 3, "b");
console.log("Get a:1 = " + timeMap.get("a", 1));
console.log("Get a:3 = " + timeMap.get("a", 3));

timeMap.put("a", 10, "c");
console.log("Get a:7 = " + timeMap.get("a", 7));
console.log("Get a:11 = " + timeMap.get("a", 11));
