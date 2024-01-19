package bst

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestBst(t *testing.T) {
	bst := NewBST[int, string]()
	bst.Insert(10, "ten")
	bst.Insert(12, "twelve")
	bst.Insert(8, "eight")
	bst.Insert(9, "nine")
	bst.Insert(5, "five")
	bst.Insert(11, "eleven")
	bst.Insert(15, "fifteen")

	val, _ := bst.Search(10)
	assert.Equal(t, "ten", val)
	val, _ = bst.Search(12)
	assert.Equal(t, "twelve", val)
	val, _ = bst.Search(8)
	assert.Equal(t, "eight", val)
	val, _ = bst.Search(9)
	assert.Equal(t, "nine", val)
	val, _ = bst.Search(5)
	assert.Equal(t, "five", val)
	val, _ = bst.Search(11)
	assert.Equal(t, "eleven", val)
	val, _ = bst.Search(15)
	assert.Equal(t, "fifteen", val)

	err := bst.Insert(5, "ten")
	assert.Error(t, err)

	_, err = bst.Search(20)
	assert.Error(t, err)
}
