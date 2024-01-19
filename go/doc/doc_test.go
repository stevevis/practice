package doc

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestCreateLayer(t *testing.T) {
	doc := NewDocument()
	err := doc.CreateLayer("foo")
	assert.Nil(t, err)
	err = doc.CreateLayer("foo")
	assert.Error(t, err)
}

func TestApply(t *testing.T) {
	layerId := "layer1"
	doc := NewDocument()
	doc.CreateLayer(layerId)
	err := doc.Apply(layerId, "foo", "bar")
	assert.Nil(t, err)
	layer := doc.GetLayer(layerId)
	assert.Equal(t, "bar", layer.GetProp("foo"))

	err = doc.Apply("layer2", "foo", "bar")
	assert.Error(t, err)
}

func TestUndo(t *testing.T) {
	layerId := "layer1"
	doc := NewDocument()
	doc.CreateLayer(layerId)
	doc.Apply(layerId, "color", "red")
	doc.Apply(layerId, "color", "blue")
	layer := doc.GetLayer(layerId)
	assert.Equal(t, "blue", layer.GetProp("color"))
	doc.Undo()
	assert.Equal(t, "red", layer.GetProp("color"))
	doc.Undo()
	assert.Nil(t, layer.GetProp("color"))
}

func TestCommitBatch(t *testing.T) {
	layer1Id := "layer1"
	layer2Id := "layer2"

	doc := NewDocument()
	doc.CreateLayer(layer1Id)
	doc.Apply(layer1Id, "color", "red")
	doc.Apply(layer1Id, "color", "blue")
	doc.Apply(layer1Id, "shape", "square")
	doc.CreateLayer(layer2Id)
	doc.Apply(layer2Id, "color", "purple")
	doc.Apply(layer2Id, "shape", "circle")
	doc.CommitBatch()

	layer1 := doc.GetLayer(layer1Id)
	assert.Equal(t, "blue", layer1.GetProp("color"))
	assert.Equal(t, "square", layer1.GetProp("shape"))
	layer2 := doc.GetLayer(layer2Id)
	assert.Equal(t, "purple", layer2.GetProp("color"))
	assert.Equal(t, "circle", layer2.GetProp("shape"))

	doc.Apply(layer1Id, "color", "red")
	doc.Apply(layer2Id, "color", "yellow")
	doc.CommitBatch()
	assert.Equal(t, "red", layer1.GetProp("color"))
	assert.Equal(t, "yellow", layer2.GetProp("color"))

	doc.Undo()
	assert.Equal(t, "blue", layer1.GetProp("color"))
	assert.Equal(t, "purple", layer2.GetProp("color"))

	doc.Undo()
	assert.Nil(t, layer1.GetProp("color"))
	assert.Nil(t, layer1.GetProp("shape"))
	assert.Nil(t, layer2.GetProp("color"))
	assert.Nil(t, layer2.GetProp("shape"))
}
