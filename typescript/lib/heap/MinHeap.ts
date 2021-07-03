export default class MinHeap {
  private heap: number[];

  constructor() {
    this.heap = [];
  }

  public insert(value: number): void {
    const index = this.heap.length;
    this.heap[index] = value;
    this.bubbleUp(index);
  }

  public peak(): number {
    return this.heap[0];
  }

  public pop(): number {
    const value = this.heap[0];
    const lastIndex = this.heap.length - 1;
    this.swap(0, lastIndex);
    this.heap.splice(lastIndex);
    this.bubbleDown(0);
    return value;
  }

  private bubbleUp(index: number): void {
    const parentIndex = Math.ceil(index / 2) - 1;
    if (parentIndex >= 0 && this.heap[index] < this.heap[parentIndex]) {
      this.swap(index, parentIndex);
      this.bubbleUp(parentIndex);
    }
  }

  private bubbleDown(index: number): void {
    const leftIndex = index * 2 + 1;
    const rightIndex = index * 2 + 2;
    if (this.heap[index] > this.heap[leftIndex]) {
      this.swap(index, leftIndex);
      this.bubbleDown(leftIndex);
    } 
    if (this.heap[index] > this.heap[rightIndex]) {
      this.swap(index, rightIndex);
      this.bubbleDown(rightIndex);
    }
  }

  private swap(x: number, y: number): void {
    const temp = this.heap[x];
    this.heap[x] = this.heap[y];
    this.heap[y] = temp;
  }
}
