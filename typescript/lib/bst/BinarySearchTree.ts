export const DELIMINATOR = ' ';
export const TERMINATOR = '.';

interface BstLevel {
  readonly bst?: BinarySearchTree;
  readonly level: number;
}

interface Count {
  count: number;
}

export default class BinarySearchTree {
  value: number;
  private left?: BinarySearchTree;
  private right?: BinarySearchTree;

  constructor(value: number) {
    this.value = value;
  }

  public insert(value: number): void {
    if (value < this.value) {
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

  public findKthLargest(k: number, count: Count = { count: 0 }): number {
    let result = -1;

    if (this.right && count.count < k) {
      const right = this.right.findKthLargest(k, count);
      if (right !== -1) {
        result = right;
      }
    }

    count.count++;
    //console.log(`[${k}] At value ${this.value} count is ${count.count}`);
    if (count.count === k) {
      result = this.value;
    }

    if (this.left && count.count < k) {
      const left = this.left.findKthLargest(k, count);
      if (left !== -1) {
        result = left;
      }
    }

    return result;
  }

  public delete(value: number, parent?: BinarySearchTree): void {
    if (this.value === value) {
      if (this.left === undefined && this.right === undefined) {
        // If both left and right are undefined, then we can delete the leaf node
        if (parent === undefined) {
          throw new Error("Can't delete last node in BST!");
        } else if (parent.left?.value === this.value) {
          delete parent.left;
        } else {
          delete parent.right;
        }
      } else if (this.left === undefined && this.right !== undefined) {
        // If we only have a right node, just replace this node with the right node
        this.value = this.right.value;
        this.left = this.right.left;
        this.right = this.right.right;
      } else if (this.right === undefined && this.left !== undefined) {
        // If we only have a left node, just replace this node with the left node
        this.value = this.left.value;
        this.right = this.left.right;
        this.left = this.left.left;
      } else if (this.right !== undefined) {
        // If we have a right and a left node, swap this with the next node in order on the right side, then delete this node
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
    data += `${DELIMINATOR}${this.value}`;
    if (this.right) {
      data = this.right.serializeInOrder(data);
    }
    return data.trim();
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
          data = data.trim();
          data += '\n';
          currentLevel = current.level;
        }
        if (current.bst) {
          data += `${current.bst.value}${DELIMINATOR}`;
          currentLevelHasValue = true;
        } else {
          data += `.${DELIMINATOR}`;
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
    return data.trim();
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

    if (next && next !== TERMINATOR) {
      bst = new BinarySearchTree(parseInt(next));
      bst.left = BinarySearchTree.deserializeFromArray(values);
      bst.right = BinarySearchTree.deserializeFromArray(values);
    }

    return bst;
  }
}
