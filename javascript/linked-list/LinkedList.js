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

    process.stdout.write(node.value + " ")

    if (node.next) {
        this.print(node.next)
    }
}

/**
 * Reverse the list using an iterative approach.
 */
LinkedList.prototype.reverseIterative = function() {
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
LinkedList.prototype.reverseRecursive = function(node) {
    if (!node) {
        node = this.head
    }

    if (node.next) {
        var next = this.reverseRecursive(node.next)
        next.next = node
        node.next = null
    } else {
        this.head = node
    }

    return node
}

/**
 * If the list has a cycle, this will return the node that creates the cycle by pointing back to a node in the list.
 */
LinkedList.prototype.findCycle = function() {
    if (!this.head.next) {
        return null;
    }

    var last = this.head
    var slow = this.head.next
    var fast = this.head.next.next
    var foundCycle = false

    while (fast && fast.next) {
        if (fast === slow) {
            if (foundCycle) {
                return last
            } else {
                foundCycle = true
                slow = this.head
            }
        }
        last = fast.next
        slow = slow.next
        fast = fast.next.next
    }
    return null;
}

module.exports = LinkedList
