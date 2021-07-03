import LeastRecentlyUsedCache from './LeastRecentlyUsedCache';

test('Insert and get', () => {
  const cache = new LeastRecentlyUsedCache<string>(10);
  cache.insert('foo', 'bar');
  expect(cache.get('foo')).toBe('bar');
});

test('Insert into full cache', () => {
  const cache = new LeastRecentlyUsedCache<string>(2);
  cache.insert('one', 'value1');
  cache.insert('two', 'value2');
  cache.insert('three', 'value3');
  expect(cache.get('one')).toBe(undefined);
  expect(cache.get('two')).toBe('value2');
  expect(cache.get('three')).toBe('value3');
});

test('Move from middle to first', () => {
  const cache = new LeastRecentlyUsedCache<string>(3);
  cache.insert('one', 'value1');
  cache.insert('two', 'value2');
  cache.insert('three', 'value3');
  cache.get('two');
  cache.insert('four', 'value4');
  expect(cache.get('one')).toBe(undefined);
  expect(cache.get('two')).toBe('value2');
  expect(cache.get('three')).toBe('value3');
  expect(cache.get('four')).toBe('value4');
});

test('Move from last to first', () => {
  const cache = new LeastRecentlyUsedCache<string>(3);
  cache.insert('one', 'value1');
  cache.insert('two', 'value2');
  cache.insert('three', 'value3');
  cache.get('one');
  cache.insert('four', 'value4');
  expect(cache.get('one')).toBe('value1');
  expect(cache.get('two')).toBe(undefined);
  expect(cache.get('three')).toBe('value3');
  expect(cache.get('four')).toBe('value4');
});

test('Max size 1', () => {
  const cache = new LeastRecentlyUsedCache<string>(1);
  cache.insert('one', 'value1');
  cache.insert('two', 'value2');
  expect(cache.get('one')).toBe(undefined);
  expect(cache.get('two')).toBe('value2');
});

test('Print cache', () => {
  const cache = new LeastRecentlyUsedCache<string>(3);
  cache.insert('one', 'value1');
  cache.insert('two', 'value2');
  cache.insert('three', 'value3');
  const cacheString = cache.printCache();
  const cacheArray = cacheString.split('\n');
  expect(cacheArray.length).toBe(3);
});
