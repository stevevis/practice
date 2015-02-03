"use strict";

/**
 * A linked list of nodes.
 */
var LinkedList = function(head) {
    this.head = head
    this.last = head
}

/**
 * A node in a linked list.
 */
LinkedList.Node = function(value, next) {
    this.value = value
    this.next = next
}

/**
 * Add a node to a linked list.
 */
LinkedList.prototype.add = function(node) {
    this.last.next = node
    this.last = node
}

/**
 * Print the contents of a linked list with recursion, starting at the given node.
 */
LinkedList.prototype.print = function(node) {
    if (!node) {
        node = this.head
    }

    process.stdout.write(node.value + ' ')

    if (node.next) {
        this.print(node.next)
    }
}

/**
 * Reverse the list using an iterative approach.
 */
LinkedList.prototype.reverse_i = function() {
    var previousNode = null
    var currentNode = this.head

    while (currentNode) {
        var nextNode = currentNode.next
        currentNode.next = previousNode
        previousNode = currentNode
        currentNode = nextNode
    }

    this.head = previousNode
}

/**
 * Reverse the list recursively.
 */
LinkedList.prototype.reverse_r = function(node) {
    if (!node) {
        node = this.head
    }

    if (node.next) {
        var next = this.reverse_r(node.next)
        next.next = node
        node.next = null
    } else {
        this.head = node
    }

    return node
}

module.exports = LinkedList
