"use strict";

function BaseConverter() {
  // no-op
}

BaseConverter.prototype.charToValue = function(char) {
  var value = 0;
  if (char >= "0" && char <= "9") { value = char.charCodeAt(0) - "0".charCodeAt(0); }
  else if (char >= "A" && char <= "F") { value = 10 + char.charCodeAt(0) - "A".charCodeAt(0); }
  else if (char >= "a" && char <= "f") { value = 10 + char.charCodeAt(0) - "a".charCodeAt(0); }
  return value;
};

BaseConverter.prototype.baseStringToInt = function(base, string) {
  if (base < 2 || (base > 10 && base !== 16)) { return -1; }
  var value = 0;
  for (var i = string.length - 1; i >= 0; i--) {
    var digit = this.charToValue(string.charAt(i));
    if (digit < 0 || digit >= base) {
      return -1;
    }
    var exp = string.length - 1 - i;
    value += digit * Math.pow(base, exp);
  }
  return value;
};

module.exports = BaseConverter;
