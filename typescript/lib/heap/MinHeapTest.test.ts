import MinHeap from './MinHeap';

test('Insert', () => {
  const minHeap = new MinHeap();
  minHeap.insert(5);
  expect(minHeap.peak()).toBe(5);
  minHeap.insert(4);
  expect(minHeap.peak()).toBe(4);
  minHeap.insert(6);
  expect(minHeap.peak()).toBe(4);
  minHeap.insert(3);
  expect(minHeap.peak()).toBe(3);
  minHeap.insert(2);
  expect(minHeap.peak()).toBe(2);
});

test('Pop', () => {
  const minHeap = new MinHeap();
  minHeap.insert(5);
  minHeap.insert(6);
  minHeap.pop();
  expect(minHeap.peak()).toBe(6);
});

test('Bubble down left', () => {
  const minHeap = new MinHeap();
  minHeap.insert(5);
  minHeap.insert(6);
  minHeap.insert(7);
  minHeap.insert(4);
  minHeap.insert(3);
  minHeap.pop();
  expect(minHeap.peak()).toBe(4);
});

test('Bubble down right', () => {
  const minHeap = new MinHeap();
  minHeap.insert(5);
  minHeap.insert(9);
  minHeap.insert(7);
  minHeap.insert(10);
  minHeap.insert(8);
  minHeap.pop();
  expect(minHeap.peak()).toBe(7);
});

test('Insert and pop', () => {
  const minHeap = new MinHeap();
  minHeap.insert(5);
  minHeap.insert(9);
  minHeap.insert(7);
  minHeap.insert(10);
  minHeap.insert(8);
  expect(minHeap.pop()).toBe(5);
  expect(minHeap.pop()).toBe(7);
  expect(minHeap.pop()).toBe(8);
  expect(minHeap.pop()).toBe(9);
  expect(minHeap.pop()).toBe(10);
});
