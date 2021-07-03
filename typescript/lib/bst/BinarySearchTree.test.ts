import BinarySearchTree, { DELIMINATOR } from "./BinarySearchTree";

const testCase = [10, 5, 15, 8, 3, 20, 12, 13, 14, 19, 18];

test('Find first item', () => {
  const bst = createBst(testCase);
  expect(bst.find(10)).toBe(bst);
});

test('Serialize level order', () => {
  const bst = createBst(testCase);
  const levelOrderString = bst.serializeLevelOrder();
  const levelOrderArray = levelOrderString.split('\n');
  expect(levelOrderArray.length).toBe(5);
  levelOrderArray.forEach((level) => {
    const values = level.split(DELIMINATOR).map((value) => {
      return parseInt(value);
    });
    expect(isArrayInOrder(values)).toBe(true);
  });
});

test('Serialize in order', () => {
  const bst = createBst(testCase);
  const sorted = Array.from(testCase).sort((a, b) => a - b);
  expect(bst.serializeInOrder()).toBe(sorted.join(DELIMINATOR));
});

test('Serialize and deserialize', () => {
  const bst = createBst(testCase);
  const bstString = bst.serialize();
  const bstDeserialized = BinarySearchTree.deserialize(bstString);
  expect(bstDeserialized.serializeInOrder()).toBe(bst.serializeInOrder());
});

test('Deserialize from empty string', () => {
  expect(() => {
    BinarySearchTree.deserialize('');
  }).toThrowError();
});

test('Delete head from BST', () => {
  const bst = new BinarySearchTree(10);
  expect(() => {
    bst.delete(10);
  }).toThrowError();
});

test('Delete left leaf from BST', () => {
  const bst = createBst(testCase);
  bst.delete(3);
  expect(bst.find(3)).toBe(undefined);
  expectBstIsInOrder(bst, DELIMINATOR)
});

test('Delete right leaf from BST', () => {
  const bst = createBst(testCase);
  bst.delete(8);
  expect(bst.find(8)).toBe(undefined);
  expectBstIsInOrder(bst, DELIMINATOR)
});

test('Delete with only left children', () => {
  const bst = createBst(testCase);
  bst.delete(20);
  expect(bst.find(20)).toBe(undefined);
  expectBstIsInOrder(bst, DELIMINATOR)
});

test('Delete with only right children', () => {
  const bst = createBst(testCase);
  bst.delete(12);
  expect(bst.find(12)).toBe(undefined);
  expectBstIsInOrder(bst, DELIMINATOR)
});

test('Delete with children on both sides', () => {
  const bst = createBst(testCase);
  bst.delete(10);
  expect(bst.find(10)).toBe(undefined);
  expectBstIsInOrder(bst, DELIMINATOR)
});

function createBst(values: number[]): BinarySearchTree {
  const bst = new BinarySearchTree(values[0]);
  values.slice(1).forEach((value) => {
    bst.insert(value);
  });
  return bst;
}

function expectBstIsInOrder(bst: BinarySearchTree, deliminator: string) {
  const bstString = bst.serializeInOrder();
  const array = bstString.split(deliminator).map((value) => {
    return parseInt(value);
  });
  expect(isArrayInOrder(array)).toBe(true);
}

function isArrayInOrder(array: number[]): boolean {
  const sortedArray = Array.from(array).sort((a, b) => a - b);
  return array.join(' ') === sortedArray.join(' ');
}
