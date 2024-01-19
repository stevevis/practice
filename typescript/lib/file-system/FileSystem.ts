const DELIMITER = '/';

interface PathAndLastChild {
  path: string[]
  leaf: string
}

export default class FileSystem {
  private root: Node;

  constructor() {
    this.root = new Node(true);
  }

  public readFile(path: string): string | undefined{
    const pathAndChild = this.getPathAndLastChild(path);
    const parentNode = this.root.findDir(pathAndChild.path);
    return parentNode?.readFile(pathAndChild.leaf);
  }

  public writeFile(path: string, content: string): void {
    const pathAndChild = this.getPathAndLastChild(path);
    const parentNode = this.root.findDir(pathAndChild.path);
    parentNode?.writeFile(pathAndChild.leaf, content)
  }

  public makeDirectory(path: string): void {
    const pathAndChild = this.getPathAndLastChild(path);
    const parentNode = this.root.findDir(pathAndChild.path)
    if (parentNode === undefined) {
      throw new Error(`Can't create ${path} because ${pathAndChild.path.join(DELIMITER)} does not exist`)
    }
    parentNode.makeDirectory(pathAndChild.leaf)
  }

  private getPathAndLastChild(path: string): PathAndLastChild {
    if (path.startsWith(DELIMITER)) {
      path = path.substring(1);
    }

    if (path.endsWith(DELIMITER)) {
      path = path.substring(0, path.length - 1);
    }

    const parts = path.split(DELIMITER);
    const leaf = parts.pop();

    if (leaf === undefined) {
      throw new Error(`The path [${path}] is empty!`);
    }

    return {
      path: parts,
      leaf: leaf
    }
  }

  public print(): void {
    this.root.print()
  }
}

class Node {
  private children: Map<string, Node>
  private isDir: boolean
  private content: string | undefined;

  constructor(isDir: boolean) {
    this.children = new Map<string, Node>();
    this.isDir = isDir
  }

  public makeDirectory(name: string): Node {
    if (this.children.has(name)) {
      throw new Error(`Directory ${name} already exists`);
    } else {
      const dir = new Node(true);
      this.children.set(name, dir);
      return dir;
    }
  }

  public readFile(name: string): string {
    const node = this.children.get(name);
    if (node === undefined) {
      throw new Error(`${name} does not exist`)
    } else if (node.isDir) {
      throw new Error(`${name} is a directory`)
    } else {
      return node.content || "";
    }
  }

  public writeFile(name: string, content: string): void {
    let node = this.children.get(name);
    if (node === undefined) {
      node = new Node(false);
      this.children.set(name, node);
    } else if (node.isDir) {
      throw new Error(`${name} is a directory`)
    }
    node.content = content;
  }

  public findDir(path: string[]): Node | undefined {
    const pathCopy = path.slice();
    const next = pathCopy.shift();
    if (next === undefined) {
      return this;
    }

    const node = this.children.get(next);
    if (node === undefined) {
      return undefined;
    }

    if (!node.isDir) {
      throw new Error(`${next} is not a directory!`)
    }

    if (pathCopy.length > 0) {
      return node.findDir(pathCopy);
    } else {
      return node;
    }
  }

  public print(level = 0): void {
    this.children.forEach((node, key) => {
      let output = "";
      for (let i = 0; i < level; i++) {
        output += "-";
      }
      if (level > 0) {
        output += " "
      }
      output += key;
      console.log(output);
      node.print(level + 1)
    });
  }
}

// const fs = new FileSystem();
// fs.makeDirectory("foo");
// fs.makeDirectory("bar");
// fs.makeDirectory("foo/bar");
// fs.makeDirectory("bar/foo");
// fs.makeDirectory("foo/baz");
// fs.makeDirectory("foo/bar/car");
// fs.print()
