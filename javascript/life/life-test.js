"use strict";

var Life = require("./Life");
var life = new Life(17, 10);

var alive = [
    { x: 4, y: 6 }, { x: 4, y: 11 },
    { x: 5, y: 4 }, { x: 5, y: 5 }, { x: 5, y: 7 }, { x: 5, y: 8 }, { x: 5, y: 9 }, { x: 5, y: 10 }, { x: 5, y: 12 }, { x: 5, y: 13 },
    { x: 6, y: 6 }, { x: 6, y: 11 }
  ];

alive.forEach(function(pos) {
  life.setAlive(pos.x, pos.y);
});

life.print();
life.live();
