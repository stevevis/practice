"use strict";

var DELIMETER = ",";
var TERMINATOR = "X";

var BinaryTree = function(node) {
  if (node instanceof BinaryTree.Node) {
    this.head = node;
  } else {
    this.head = new BinaryTree.Node(node);
  }
}

BinaryTree.prototype.traverseInOrder = function() {
  this._traverseInOrder(this.head);
}

BinaryTree.prototype._traverseInOrder = function(node) {
  if (node.left) {
    this.traverseInOrder(node.left);
  }

  console.log(node.value);

  if (node.right) {
    this.traverseInOrder(node.right);
  }
}

BinaryTree.prototype.serialize = function() {
  return this._serialize(this.head, "");
}

BinaryTree.prototype._serialize = function(node, treeString) {
  treeString += node.value + DELIMETER;

  if (node.left) {
    treeString = this._serialize(node.left, treeString);
  } else {
    treeString += TERMINATOR + DELIMETER;
  }

  if (node.right) {
    treeString = this._serialize(node.right, treeString)
  } else {
    treeString += TERMINATOR + DELIMETER;
  }

  return treeString;
}

BinaryTree.prototype.deserialize = function(treeString) {
  var values = treeString.split(DELIMETER);
  var next = values.shift();

  this.head = new BinaryTree.Node(next);
  this._deserialize(this.head, values);
}

BinaryTree.prototype._deserialize = function(node, values) {
  var left = values.shift();

  if (left !== TERMINATOR) {
    console.log("Adding " + left + " to left of " + node.value);
    node.left = new BinaryTree.Node(left)
    this._deserialize(node.left, values);
  } else {
    console.log("Left of " + node.value + " is a dead end");
  }

  var right = values.shift();

  if (right !== TERMINATOR) {
    console.log("Adding " + right + " to right of " + node.value);
    node.right = new BinaryTree.Node(right)
    this._deserialize(node.right, values);
  } else {
    console.log("Right of " + node.value + " is a dead end");
  }
}

BinaryTree.Node = function(value) {
    this.value = value
    this.left = null
    this.right = null
}

BinaryTree.Node.prototype.insertLeft = function(value) {
  this.left = new BinaryTree.Node(value);
  return this.left;
}

BinaryTree.Node.prototype.insertRight = function(value) {
  this.right = new BinaryTree.Node(value);
  return this.right;
}

var treeString = "2,5,1,3,X,X,X,9,X,6,X,X,7,10,X,X,4,X,X,";
//var treeString = "2,X,7,X,8,X,9,X,1,X,2,X,3,X,X,"
var myTree = new BinaryTree(null);
myTree.deserialize(treeString);
var serialized = myTree.serialize();

if (treeString === serialized) {
  console.log("Validation succeeded!");
} else {
  console.log("Validation failed!");
  console.log("Serialized tree string: " + serialized);
}
