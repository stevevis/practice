"use strict";

var fs = require("fs");
var path = require("path");

var dataFile = path.join(__dirname, "weather.dat");
var data = fs.readFileSync(dataFile).toString();
var lines = data.split("\n");
lines.splice(0, 2);

var minSpread = { day: 0, spread: Number.MAX_SAFE_INTEGER };

for (var i = 0; i < lines.length; i++) {
  var line = lines[i];
  var items = line.trim().split(/\s+/);

  if (items.length < 3) {
    continue;
  }

  var maxTemp = items[1].replace(/\*/, "");
  var minTemp = items[2].replace(/\*/, "");

  if (maxTemp - minTemp < minSpread.spread) {
    minSpread.day = i;
    minSpread.spread = maxTemp - minTemp;
  }
}

console.log("Minimum temperature spread was on day " + minSpread.day + " (" + minSpread.spread + " degrees)");
