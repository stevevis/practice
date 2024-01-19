package fs

import (
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestINodeFind(t *testing.T) {
	root := &iNode{
		children: map[string]*iNode{},
		isDir:    true,
	}

	tempDir := &iNode{
		children: map[string]*iNode{},
		isDir:    true,
	}
	root.children["temp"] = tempDir

	fooFile := &iNode{
		data: "bar",
	}
	tempDir.children["foo"] = fooFile

	assertFind(t, root, "temp", tempDir)
	assertFind(t, root, "temp/", tempDir)
	assertFind(t, root, "/temp", nil)

	assertFind(t, root, "temp/foo", fooFile)
	assertFind(t, root, "temp/foo/", nil)
}

func assertFind(t *testing.T, root *iNode, path string, node *iNode) {
	result, found := root.find(strings.Split(path, delimiter))
	if node != nil {
		assert.True(t, found)
		assert.Equal(t, node, result)
	} else {
		assert.False(t, found)
	}
}

func TestFsMakeDir(t *testing.T) {
	fs := NewInMemoryFS()
	err := fs.MakeDir("foo")
	assert.Nil(t, err)
	err = fs.MakeDir("foo")
	assert.Error(t, err)
	err = fs.MakeDir("/foo")
	assert.Error(t, err)
	err = fs.MakeDir("/foo/")
	assert.Error(t, err)
	err = fs.MakeDir("foo/")
	assert.Error(t, err)

	err = fs.MakeDir("foo/bar")
	assert.Nil(t, err)
	err = fs.MakeDir("bar/foo")
	assert.Error(t, err)
	err = fs.MakeDir("")
	assert.Error(t, err)
}

func TestFsReadWrite(t *testing.T) {
	fs := NewInMemoryFS()
	fs.Write("/foo.txt", "foo")
	fooData, _ := fs.Read("foo.txt")
	assert.Equal(t, "foo", fooData)

	err := fs.Write("/foo.txt", "foo")
	assert.Error(t, err)
	err = fs.Write("/bad.txt/", "bad")
	assert.Error(t, err)

	fs.MakeDir("foo")
	fs.Write("foo/foo.txt", "foo")
	fooData, _ = fs.Read("/foo/foo.txt")
	assert.Equal(t, "foo", fooData)

	_, err = fs.Read("/foo/bar.txt")
	assert.Error(t, err)
	_, err = fs.Read("foo")
	assert.Error(t, err)
	_, err = fs.Read("")
	assert.Error(t, err)
}
