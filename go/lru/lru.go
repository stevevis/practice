package lru

import (
	"container/list"
	"fmt"
)

type Cache[K comparable, V any] interface {
	Get(key K) V
	Save(key K, val V) error
}

type cacheItem[K comparable, V any] struct {
	key K
	val V
}

type lruCache[K comparable, V any] struct {
	list    *list.List
	cache   map[K]*list.Element
	maxSize int
}

func (c *lruCache[K, V]) Get(key K) V {
	el, found := c.cache[key]
	if !found {
		return *new(V)
	}
	c.list.MoveToFront(el)

	item, _ := el.Value.(*cacheItem[K, V])
	return item.val
}

func (c *lruCache[K, V]) Save(key K, val V) error {
	if _, found := c.cache[key]; found {
		return fmt.Errorf("Key %v is already defined", key)
	}

	el := c.list.PushFront(&cacheItem[K, V]{
		key: key,
		val: val,
	})

	if c.list.Len() > c.maxSize {
		last := c.list.Back()
		item, _ := last.Value.(*cacheItem[K, V])
		c.list.Remove(last)
		delete(c.cache, item.key)
	}

	c.cache[key] = el
	return nil
}

func NewLRUCache[K comparable, V any](maxSize int) Cache[K, V] {
	return &lruCache[K, V]{
		list:    list.New(),
		cache:   map[K]*list.Element{},
		maxSize: maxSize,
	}
}
