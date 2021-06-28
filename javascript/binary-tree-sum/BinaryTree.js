"use strict"

const DELIMETER = ",";
const TERMINATOR = "X";

const serializeBinaryTree = function(node, treeString) {
  treeString += node.value + DELIMETER;

  if (node.left) {
    treeString = serializeBinaryTree(node.left, treeString);
  } else {
    treeString += TERMINATOR + DELIMETER;
  }

  if (node.right) {
    treeString = serializeBinaryTree(node.right, treeString)
  } else {
    treeString += TERMINATOR + DELIMETER;
  }

  return treeString;
}

const deserializeBinaryTree = function(node, values) {
  var left = values.shift();

  if (left !== TERMINATOR) {
    // console.log("Adding " + left + " to left of " + node.value);
    node.left = new BinaryTree(left)
    deserializeBinaryTree(node.left, values);
  } else {
    // console.log("Left of " + node.value + " is a dead end");
  }

  var right = values.shift();

  if (right !== TERMINATOR) {
    // console.log("Adding " + right + " to right of " + node.value);
    node.right = new BinaryTree(right)
    deserializeBinaryTree(node.right, values);
  } else {
    // console.log("Right of " + node.value + " is a dead end");
  }
}

const findSumInBinaryTree = function(sum, node, path) {
  checkPath(sum, node, path);

  if (node.left) {
    findSumInBinaryTree(sum, node.left, []);
  }

  if (node.right) {
    findSumInBinaryTree(sum, node.right, []);
  }
}

const checkPath = function(sum, node, path) {
  console.log("Find sum: " + sum + ", current node: " + node.value + ", current path: [" + path + "]");

  path.push(parseInt(node.value));
  const pathSum = getPathSum(path);

  if (pathSum === sum && path.length > 1) {
    console.log("Found a path: " + path);
    return;
  }

  if (node.left && (pathSum + parseInt(node.left.value)) <= sum) {
    checkPath(sum, node.left, path.slice(0));
  }

  if (node.right && (pathSum + parseInt(node.right.value)) <= sum) {
    checkPath(sum, node.right, path.slice(0));
  }
}

const getPathSum = function(path) {
  let sum = 0;
  path.forEach(val => {
    sum += parseInt(val);
  });
  return sum;
}

class BinaryTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  print(node) {
    if (node === undefined) {
      this.print(this);
    }

    if (node && node.left) {
      this.print(node.left);
    }

    if (node) {
      console.log(node.value);
    }

    if (node && node.right) {
      this.print(node.right);
    }
  }

  serialize() {
    return serializeBinaryTree(this, "");
  }

  deserialize(treeString) {
    var values = treeString.split(DELIMETER);
    var next = values.shift();

    this.value = next;
    deserializeBinaryTree(this, values);
  }

  findSum(sum) {
    findSumInBinaryTree(sum, this, []);
  }
}

//var treeString = "2,5,1,3,X,X,X,9,X,6,X,X,7,10,X,X,4,X,X,";
//var treeString = "2,X,7,X,8,X,9,X,1,X,2,X,3,X,X,"
var treeString = "10,8,6,3,1,X,X,4,X,X,7,X,X,9,X,X,18,12,11,X,X,14,13,X,X,15,X,X,20,X,X,";
//var treeString = "10,6,4,X,X,2,2,X,X,X,8,1,1,X,X,X,2,X,X,"
var myTree = new BinaryTree(null);
myTree.deserialize(treeString);
var serialized = myTree.serialize();

if (treeString === serialized) {
  console.log("Validation succeeded!");
} else {
  console.log("Validation failed!");
  console.log("Serialized tree string: " + serialized);
}

myTree.print();
myTree.findSum(12 + 14 + 13);
