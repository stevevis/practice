"use strict";

var BaseConverter = require("./BaseConverter.js");

var bc = new BaseConverter();
console.log(bc.baseStringToInt(16, "FA"));
console.log(bc.baseStringToInt(2, "11111010"));
