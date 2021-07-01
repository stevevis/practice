const DELIMINATOR = ',';
const TERMINATOR = '.';

interface BstLevel {
  readonly bst?: BinarySearchTree;
  readonly level: number;
}

export default class BinarySearchTree {
  private value: number;
  private left?: BinarySearchTree;
  private right?: BinarySearchTree;

  constructor(value: number) {
    this.value = value;
  }

  public insert(value: number): void {
    if (this.value === undefined) {
      this.value = value;
    } else if (value < this.value) {
      this.left ? this.left.insert(value) : this.left = new BinarySearchTree(value);
    } else {
      this.right ? this.right.insert(value) : this.right = new BinarySearchTree(value)
    }
  }

  public find(value: number): BinarySearchTree | undefined {
    if (this.value === value) {
      return this;
    } else if (this.value > value) {
      return this.left?.find(value);
    } else {
      return this.right?.find(value);
    }
  }

  public delete(value: number, parent?: BinarySearchTree): void {
    if (this.value === value) {
      if (this.left === undefined && this.right === undefined) {
        if (parent === undefined) {
          throw new Error("Can't delete last node in BST!");
        } else if (parent.left?.value === this.value) {
          delete parent.left;
        } else {
          delete parent.right;
        }
      } else if (this.left === undefined && this.right !== undefined) {
        this.value = this.right.value;
        this.left = this.right.left;
        this.right = this.right.right;
      } else if (this.right === undefined && this.left !== undefined) {
        this.value = this.left.value;
        this.right = this.left.right;
        this.left = this.left.left;
      } else if (this.right !== undefined) {
        this.value = parseInt(this.right.serializeInOrder().split(' ')[0]);
        this.right.delete(this.value, this);
      }
    } else if (this.value > value) {
      this.left?.delete(value, this);
    } else {
      this.right?.delete(value, this);
    }
  }
  
  public serializeInOrder(data = ''): string {
    if (this.left) {
      data = this.left.serializeInOrder(data);
    }
    data += `${this.value} `;
    if (this.right) {
      data = this.right.serializeInOrder(data);
    }
    return data;
  }

  public serializeLevelOrder(): string {
    let data = '';
    let currentLevel = 1;
    let currentLevelHasValue = false;

    const queue: BstLevel[] = [];
    queue.push({bst: this, level: currentLevel});

    while (queue.length) {
      const current: BstLevel | undefined = queue.shift();

      if (current) {
        if (current.level > currentLevel)  {
          if (!currentLevelHasValue) {
            const parts = data.split('\n');
            parts.pop();
            data = parts.join('\n');
            break;
          } else {
            currentLevelHasValue = false;
          }
          data += '\n';
          currentLevel = current.level;
        }
        if (current.bst) {
          data += `${current.bst.value} `;
          currentLevelHasValue = true;
        } else {
          data += '. '
        }
        if (current.bst?.left) {
          queue.push({bst: current.bst.left, level: current.level + 1});
        } else {
          queue.push({level: current.level + 1});
        }
        if (current.bst?.right) {
          queue.push({bst: current.bst.right, level: current.level + 1});
        } else {
          queue.push({level: current.level + 1});
        }
      }
    }
    return data;
  }

  public serialize(data = ''): string {
    data += `${this.value}${DELIMINATOR}`;
    if (this.left) {
      data = this.left.serialize(data);
    } else {
      data += TERMINATOR + DELIMINATOR;
    }
    if (this.right) {
      data = this.right.serialize(data);
    } else {
      data += TERMINATOR + DELIMINATOR;
    }
    return data;
  }

  public static deserialize(data: string): BinarySearchTree {
    const values = data.split(DELIMINATOR);
    const bst = BinarySearchTree.deserializeFromArray(values);

    if (bst === undefined) {
      throw new Error(`Failed to create BST from data: ${data}`);
    }

    return bst;
  }

  private static deserializeFromArray(values: string[]): BinarySearchTree | undefined {
    const next = values.shift();
    let bst;

    if (next !== undefined && next !== TERMINATOR) {
      bst = new BinarySearchTree(parseInt(next));
      bst.left = BinarySearchTree.deserializeFromArray(values);
      bst.right = BinarySearchTree.deserializeFromArray(values);
    }

    return bst;
  }
}

const bst = new BinarySearchTree(10);
bst.insert(8);
bst.insert(9);
bst.insert(5);
bst.insert(1);
bst.insert(20);
bst.insert(15);
bst.insert(18);
bst.insert(22);

const inOrder = bst.serializeInOrder();
console.log(inOrder);

const levelOrder = bst.serializeLevelOrder();
console.log(levelOrder);

const serialized = bst.serialize();
console.log(serialized);

console.log("\nTest deserialization...\n");

const deserializedBst = BinarySearchTree.deserialize(serialized);
console.log(deserializedBst.serializeInOrder());
console.log(deserializedBst.serializeLevelOrder());
console.log(deserializedBst.serialize());

console.log("\nTest deletion...\n");
console.log("Delete 10");
bst.delete(10);
console.log(bst.serializeLevelOrder());

console.log("\nDelete 8");
bst.delete(8);
console.log(bst.serializeLevelOrder());

console.log("\nDelete 22");
bst.delete(22);
console.log(bst.serializeLevelOrder());

console.log("\nDelete 5");
bst.delete(5);
console.log(bst.serializeLevelOrder());

console.log("\nDelete 15");
bst.delete(15);
console.log(bst.serializeLevelOrder());

console.log("\nDelete 18");
bst.delete(18);
console.log(bst.serializeLevelOrder());

console.log("\nDelete 1");
bst.delete(1);
console.log(bst.serializeLevelOrder());

console.log("\nDelete 9");
bst.delete(9);
console.log(bst.serializeLevelOrder());

try {
  console.log("\nDelete 20");
  bst.delete(20);
  console.log(bst.serializeLevelOrder());
} catch (e) {
  console.log(e.message);
}
