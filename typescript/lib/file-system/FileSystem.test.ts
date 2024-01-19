import FileSystem from './FileSystem';

test('create a directory at root', () => {
  const fs = new FileSystem();
  fs.makeDirectory('foo');
  expect(() => {fs.makeDirectory('foo')}).toThrowError();
});

test('create a nested directory', () => {
  const fs = new FileSystem();
  expect(() => {fs.makeDirectory('foo/bar')}).toThrowError();
  fs.makeDirectory('foo');
  fs.makeDirectory('foo/bar');
  fs.makeDirectory('foo/bar/baz');
  expect(() => {fs.makeDirectory('foo/bar/baz')}).toThrowError();
});

test('write a file at root', () => {
  const fs = new FileSystem();
  fs.writeFile('foo', "bar");
  expect(fs.readFile('foo')).toEqual('bar');
  fs.writeFile('foo', "baz");
  expect(fs.readFile('foo')).toEqual('baz');
});

test('write a file in a directory', () => {
  const fs = new FileSystem();
  fs.makeDirectory('data');
  fs.writeFile('data/foo', "bar");
  expect(fs.readFile('data/foo')).toEqual('bar');
  fs.writeFile('data/foo', "baz");
  expect(fs.readFile('data/foo')).toEqual('baz');
});

test('read a directory', () => {
  const fs = new FileSystem();
  fs.makeDirectory('foo');
  expect(() => {fs.readFile('foo')}).toThrowError();
});

test('wrote a directory', () => {
  const fs = new FileSystem();
  fs.makeDirectory('foo');
  expect(() => {fs.writeFile('foo', 'content')}).toThrowError();
});