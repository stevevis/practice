"use strict";

var LinkedList = require("./LinkedList")

// Create the head node and initialize a list
var head = new LinkedList.Node(1, null)
var list = new LinkedList(head)

// Add a bunch of nodes to the list
for (var i = 2; i <= 10; i++) {
    list.add(new LinkedList.Node(i))
}

// Should return null because there is no cycle
console.log(list.findCycle())

// Search for the 6th node
var sixth = list.head;
while (sixth.value !== 6) {
  sixth = sixth.next
}

// Set last node next pointer to sixth node to create a cycle
list.last.next = sixth

// Should return node 10 that is pointing to node 6
console.log(list.findCycle())

// Test a list with only two nodes
var node1 = new LinkedList.Node(1, null)
var node2 = new LinkedList.Node(2, null)
node1.next = node2
node2.next = node1
var cycle = new LinkedList(node1)
console.log(cycle.findCycle())
