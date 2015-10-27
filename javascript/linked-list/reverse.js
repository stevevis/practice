"use strict";

var LinkedList = require("./LinkedList")

// Create the head node and initialize a list
var head = new LinkedList.Node(1, null);
var list = new LinkedList(head)

// Add a bunch of nodes to the list
for (var i = 2; i <= 10; i++) {
    list.add(new LinkedList.Node(i))
}

console.log("The original array...")
list.print()

console.log("\nReversing the array iteratively...")
list.reverseIterative()
list.print()

console.log("\nReversing the array recursively...")
list.reverseRecursive()
list.print()
