import Trie from './Trie';

test('Insert word', () => {
  const trie = new Trie();
  trie.insert('Foo');
  expect(trie.contains('Foo')).toBe(true);
});

test('Insert empty word', () => {
  const trie = new Trie();
  expect(() => {
    trie.insert('');
  }).toThrowError();
})

test('Does not contain word', () => {
  const trie = new Trie();
  trie.insert('Foo');
  expect(trie.contains('Bar')).toBe(false);
});

test('Insert extension word', () => {
  const trie = new Trie();
  trie.insert('Foo');
  trie.insert('Foobar');
  expect(trie.contains('Foobar')).toBe(true);
});

test('Is prefix', () => {
  const trie = new Trie();
  trie.insert('Foobar');
  expect(trie.isPrefix('f')).toBe(true);
  expect(trie.isPrefix('Foo')).toBe(true);
});

test('Is not prefix', () => {
  const trie = new Trie();
  trie.insert('Foobar');
  expect(trie.isPrefix('bar')).toBe(false);
});
