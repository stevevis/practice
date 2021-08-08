class FileSystem {
  root;

  constructor() {
    this.root = new Node('/', true);
  }

  mkdir(dirPath) {
    const nameAndParent = this._getNameAndParent(dirPath);
    nameAndParent.parent.mkdir(nameAndParent.name);
  }

  writeFile(filePath, content) {
    const nameAndParent = this._getNameAndParent(filePath);
    nameAndParent.parent.writeFile(nameAndParent.name, content);
  }

  readFile(filePath) {
    const nameAndParent = this._getNameAndParent(filePath);
    return nameAndParent.parent.readFile(nameAndParent.name);
  }

  _getNameAndParent(path) {
    const parts = path.split('/');
    return {
      name: parts.pop(),
      parent: this.root.find(parts),
    };
  }
}

class Node {
  name;
  isDir;
  content;
  children;

  constructor(name, isDir) {
    this.name = name;
    this.isDir = isDir;
    this.children = {};
  }

  _setContent(content) {
    if (!this.isDir) {
      this.content = content;
    }
  }

  find(path) {
    // If there was a / at the start of the path, remove the empty path part before it
    if (path[0] === '') {
      path.shift();
    }

    if (path.length === 0) {
      return this;
    }
    
    const nextDir = path.shift();
    const child = this.children[nextDir];

    if (child !== undefined && child.isDir) {
      return child.find(path);
    } else {
      throw new Error(`Could not find dir ${nextDir} in ${this.name}`);
    }
  }

  mkdir(dirName) {
    if (this.children[dirName] === undefined) {
      console.log(`Adding ${dirName} to ${this.name}`);
      this.children[dirName] = new Node(dirName, true);
    } else {
      throw new Error(`${dirName} already exists in ${this.name}`);
    }
  }

  writeFile(fileName, content) {
    if (this.children[fileName] === undefined) {
      console.log(`Adding ${fileName} to ${this.name} with content ${content}`);
      this.children[fileName] = new Node(fileName, false);
      this.children[fileName]._setContent(content);
    } else {
      throw new Error(`${fileName} already exists in ${this.name}`);
    }
  }

  readFile(fileName) {
    const file = this.children[fileName];
    if (file !== undefined && !file.isDir) {
      return this.children[fileName].content;
    } else {
      throw new Error(`${fileName} does not exist in ${this.name}`);
    }
  }
}

let fs = new FileSystem();
fs.mkdir('/foo');
fs.mkdir('foo/bar');
//fs.mkdir('bar/foo');
fs.writeFile('/foo/bar/test.txt', 'FooBar');
console.log(fs.readFile('/foo/bar/test.txt'));
//fs.writeFile('/foo/bar/test.txt/foo', 'foo');
fs.mkdir('foo/bar/baz');
fs.writeFile('/foo/bar/baz/test.txt', 'FooBarBaz');
console.log(fs.readFile('/foo/bar/baz/test.txt'));
