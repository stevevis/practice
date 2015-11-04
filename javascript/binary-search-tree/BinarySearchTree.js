"use strict"

var BinarySearchTree = function(node) {
    if (node instanceof BinarySearchTree.Node) {
        this.head = node
    } else {
        this.head = new BinarySearchTree.Node(node)
    }
}

BinarySearchTree.prototype.insert = function(node) {
    if (node instanceof BinarySearchTree.Node) {
        this.head.insert(node)
    } else {
        this.head.insert(new BinarySearchTree.Node(node))
    }
}

BinarySearchTree.prototype.traverseInOrder = function() {
    this.head.traverseInOrder()
}

BinarySearchTree.prototype.traverseLevelOrder = function() {
    this.head.traverseLevelOrder()
}

BinarySearchTree.Node = function(value) {
    this.value = value
    this.left = null
    this.right = null
}

BinarySearchTree.Node.prototype.insert = function(node) {
    if (node.value < this.value) {
        if (this.left) {
            this.left.insert(node)
        } else {
            this.left = node
        }
    } else if (node.value > this.value) {
        if (this.right) {
            this.right.insert(node)
        } else {
            this.right = node
        }
    } else {
        return true
    }
}

BinarySearchTree.Node.prototype.traverseInOrder = function() {
    if (this.left) {
        this.left.traverseInOrder()
    }
    console.log(this.value)
    if (this.right) {
        this.right.traverseInOrder()
    }
}

BinarySearchTree.Node.prototype.traverseLevelOrder = function() {
    var queue = []
    queue.push(this)

    var currentCount = 1
      , nextCount = 0
    while (queue.length > 0) {
        var temp = queue.shift()
        process.stdout.write(temp.value + " ")
        currentCount--
        if (temp.left) {
            queue.push(temp.left)
            nextCount++
        }
        if (temp.right) {
            queue.push(temp.right)
            nextCount++
        }
        if (currentCount === 0) {
            process.stdout.write("\n")
            currentCount = nextCount
            nextCount = 0
        }
    }
}

module.exports = BinarySearchTree
