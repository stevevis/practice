package lru

import (
	"fmt"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestLRUCache(t *testing.T) {
	cache := NewLRUCache[string, string](3)
	cache.Save("key1", "val1")
	val := cache.Get("key1")
	assert.Equal(t, "val1", val)
}

func TestLRUCache_GetNotFound(t *testing.T) {
	cache := NewLRUCache[string, string](3)
	cache.Save("key1", "val1")
	val := cache.Get("key2")
	assert.Equal(t, "", val)
}

func TestLRUCache_SaveExistingKey(t *testing.T) {
	cache := NewLRUCache[string, string](3)
	cache.Save("key1", "val1")
	err := cache.Save("key1", "val1")
	assert.Error(t, err)
}

func TestLRUCache_DeleteLeastRecentlyUsed(t *testing.T) {
	cache := NewLRUCache[string, string](3)
	for i := 1; i < 5; i++ {
		cache.Save(fmt.Sprintf("key%d", i), fmt.Sprintf("val%d", i))
	}
	val1 := cache.Get("key1")
	assert.Equal(t, "", val1)
	val2 := cache.Get("key2")
	assert.Equal(t, "val2", val2)
}
