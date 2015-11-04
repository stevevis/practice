"use strict";

var BinarySearchTree = require("./BinarySearchTree")

var bst = new BinarySearchTree(100)
bst.insert(50)
bst.insert(25)
bst.insert(75)
bst.insert(150)
bst.insert(125)
bst.insert(175)
bst.insert(20)
bst.insert(10)
bst.insert(120)

console.log("In order traversal")
bst.traverseInOrder()

console.log("Level order traversal")
bst.traverseLevelOrder()
