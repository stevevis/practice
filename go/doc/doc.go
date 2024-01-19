package doc

import (
	"container/list"
	"errors"
	"fmt"
)

type Document interface {
	CreateLayer(id string) error
	GetLayer(id string) Layer
	Apply(id string, prop string, val any) error
	Undo() error
	CommitBatch() error
}

type document struct {
	layers          map[string]Layer
	historyStack    *list.List
	uncommitedStack *list.List
}

func NewDocument() Document {
	return &document{
		layers:          map[string]Layer{},
		historyStack:    list.New(),
		uncommitedStack: list.New(),
	}
}

// CreateLayer implements Document.
func (d *document) CreateLayer(id string) error {
	if _, found := d.layers[id]; found {
		return fmt.Errorf("Layer with id %s already exists", id)
	}

	d.layers[id] = NewLayer(id)
	return nil
}

// GetLayer implements Document.
func (d *document) GetLayer(id string) Layer {
	if layer, found := d.layers[id]; found {
		return layer
	}
	return nil
}

// Apply implements Document.
func (d *document) Apply(id string, prop string, val any) error {
	if _, found := d.layers[id]; !found {
		return fmt.Errorf("No layer if id %s exists", id)
	}

	layer := d.layers[id]
	d.uncommitedStack.PushFront(&historyEntry{
		id:   id,
		prop: prop,
		val:  layer.GetProp(prop),
	})
	layer.SetProp(prop, val)
	return nil
}

// Undo implements Document.
func (d *document) Undo() error {
	if d.uncommitedStack.Len() > 0 {
		el := d.uncommitedStack.Front()
		entry := el.Value.(*historyEntry)
		d.layers[entry.id].SetProp(entry.prop, entry.val)
		d.uncommitedStack.Remove(el)
	} else if d.historyStack.Len() > 0 {
		el := d.historyStack.Front()
		batch := el.Value.(*list.List)
		for e := batch.Front(); e != nil; e = e.Next() {
			entry := e.Value.(*historyEntry)
			d.layers[entry.id].SetProp(entry.prop, entry.val)
		}
		d.historyStack.Remove(el)
	}
	return nil
}

// CommitBatch implements Document.
func (d *document) CommitBatch() error {
	if d.uncommitedStack.Len() == 0 {
		return errors.New("No uncommited changes to commit")
	}

	d.historyStack.PushFront(d.uncommitedStack)
	d.uncommitedStack = list.New()
	return nil
}

type historyEntry struct {
	id   string
	prop string
	val  any
}
