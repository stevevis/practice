package bst

import (
	"cmp"
	"fmt"
)

type BinarySearchTree[K cmp.Ordered, V any] interface {
	Insert(key K, val V) error
	Search(key K) (V, error)
}

type binarySearchTree[K cmp.Ordered, V any] struct {
	key   *K
	val   *V
	left  BinarySearchTree[K, V]
	right BinarySearchTree[K, V]
}

// Insert implements BinarySearchTree.
func (b *binarySearchTree[K, V]) Insert(key K, val V) error {
	if b.key == nil {
		b.key = &key
		b.val = &val
		b.left = NewBST[K, V]()
		b.right = NewBST[K, V]()
	} else if key < *(b.key) {
		return b.left.Insert(key, val)
	} else if key > *(b.key) {
		return b.right.Insert(key, val)
	} else {
		return fmt.Errorf("Key %v is alredy in the BST", key)
	}

	return nil
}

// Search implements BinarySearchTree.
func (b *binarySearchTree[K, V]) Search(key K) (V, error) {
	if b.key == nil {
		return *new(V), fmt.Errorf("Could not find a val for key %v", key)
	} else if key < *(b.key) {
		return b.left.Search(key)
	} else if key > *(b.key) {
		return b.right.Search(key)
	} else {
		return *b.val, nil
	}
}

func NewBST[K cmp.Ordered, V any]() BinarySearchTree[K, V] {
	return &binarySearchTree[K, V]{}
}
