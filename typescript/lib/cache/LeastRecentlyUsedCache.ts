import * as util from 'util';

export default class LeastRecentlyUsedCache<T> {
  private maxSize: number;
  private index = new Map<string, CacheEntry<T>>();
  private cache = new CacheList<T>();

  constructor(maxSize: number) {
    this.maxSize = maxSize;
  }

  public insert(key: string, value: T): void {
    if (this.cache.numItems === this.maxSize) {
      const removed = this.cache.deleteLast();
      if (removed) {
        this.index.delete(removed.key);
      }
    }
    
    const item = new CacheEntry(key, value);
    this.cache.insertFirst(item);
    this.index.set(key, item);
  }

  public get(key: string): T | undefined {
    const item = this.index.get(key);
    if (item) {
      this.cache.moveToFront(item);
    }
    return item?.value;
  }

  public printCache(): string {
    return this.cache.printCache();
  }
}

class CacheList<T> {
  private head?: CacheEntry<T>;
  private tail?: CacheEntry<T>;
  private _numItems = 0;

  get numItems(): number {
    return this._numItems;
  }

  public insertFirst(item: CacheEntry<T>): void {
    if (this.head === undefined) {
      this.head = item;
      this.tail = item;
    } else {
      this.head.prev = item;
      item.next = this.head;
      this.head = item;
    }

    this._numItems += 1;
  }

  public deleteLast(): CacheEntry<T> | undefined {
    let deleted;

    if (this.tail) {
      deleted = this.tail;
      this.tail = deleted.prev;
      delete this.tail?.next;
      this._numItems =- 1;
    }

    return deleted;
  }

  public moveToFront(item: CacheEntry<T>): void {
    if (!item.prev) {
      // Already at the front
      return;
    }
    
    item.prev.next = item.next;

    if (item.next) {
      item.next.prev = item.prev;
    } else {
      this.tail = item.prev;
    }

    if (this.head) {
      this.head.prev = item;
    }

    item.next = this.head;
    item.prev = undefined;
    this.head = item;
  }

  public printCache(): string {
    let result = '';
    let current = this.head;
    while(current) {
      result += `${util.inspect(current, {breakLength: Infinity})}\n`
      current = current.next;
    }
    return result.trim();
  }
}

class CacheEntry<T> {
  key: string;
  value: T;
  prev?: CacheEntry<T>;
  next?: CacheEntry<T>;

  constructor(key: string, value: T) {
    this.key = key;
    this.value = value;
  }
}
