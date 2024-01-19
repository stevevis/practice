package fs

import (
	"fmt"
	"strings"
)

const delimiter = "/"

type FileSystem interface {
	MakeDir(path string) error
	Write(path string, data string) error
	Read(path string) (string, error)
}

type inMemoryFS struct {
	root *iNode
}

func (fs *inMemoryFS) MakeDir(path string) error {
	// Trim any trailing slashes, we'll allow creating a dir with a trailing slash
	path = strings.TrimRight(path, delimiter)

	dirName, parent, err := fs.getNameAndParent(path)
	if err != nil {
		return err
	}

	err = parent.addChild(dirName, true, "")
	if err != nil {
		return err
	}

	return nil
}

func (fs *inMemoryFS) Write(path string, data string) error {
	fileName, parent, err := fs.getNameAndParent(path)
	if err != nil {
		return err
	}

	err = parent.addChild(fileName, false, data)
	if err != nil {
		return err
	}

	return nil
}

func (fs *inMemoryFS) Read(path string) (string, error) {
	fileName, parent, err := fs.getNameAndParent(path)
	if err != nil {
		return "", err
	}

	return parent.readChild(fileName)
}

func (fs *inMemoryFS) getPathParts(path string) ([]string, error) {
	// Trim any leading slash, we always treat paths as absolute
	path = strings.TrimLeft(path, delimiter)

	parts := strings.Split(path, delimiter)

	// Handle empty string input or trailing slash
	if len(parts) == 0 || parts[len(parts)-1] == "" {
		return nil, fmt.Errorf("Invalid path %s", path)
	}

	return parts, nil
}

func (fs *inMemoryFS) getNameAndParent(path string) (string, *iNode, error) {
	parts, err := fs.getPathParts(path)
	if err != nil {
		return "", nil, err
	}

	name := parts[len(parts)-1]
	parentPath := parts[:(len(parts) - 1)]

	if parent, found := fs.root.find(parentPath); found {
		return name, parent, nil
	} else {
		return "", nil, fmt.Errorf("Could not find parent path %s", parentPath)
	}
}

func NewInMemoryFS() FileSystem {
	return &inMemoryFS{
		root: &iNode{
			children: map[string]*iNode{},
			isDir:    true,
		},
	}
}

type iNode struct {
	children map[string]*iNode
	isDir    bool
	data     string
}

func (i *iNode) addChild(name string, isDir bool, data string) error {
	if _, found := i.children[name]; found {
		return fmt.Errorf("Failed to create %s, node already exists", name)
	}

	i.children[name] = &iNode{
		children: map[string]*iNode{},
		isDir:    isDir,
		data:     data,
	}

	return nil
}

func (i *iNode) readChild(name string) (string, error) {
	file, found := i.children[name]

	if !found {
		return "", fmt.Errorf("file %s does not exist", name)
	}

	if file.isDir {
		return "", fmt.Errorf("%s is a directory", name)
	}

	return file.data, nil
}

func (i *iNode) find(path []string) (*iNode, bool) {
	if len(path) == 0 {
		return i, true
	}

	first, rest := path[0], path[1:]
	if child, found := i.children[first]; found {
		if len(rest) == 0 {
			return child, true
		} else if rest[0] == "" && child.isDir {
			// If the path ends in /, we only return the child if it's a dir
			return child, true
		} else {
			return child.find(rest)
		}
	}
	return nil, false
}
