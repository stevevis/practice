import { once } from 'events';
import fs from 'fs';
import readline from 'readline';
import Trie from '../trie/Trie';

const trie = new Trie();
const words: string[] = [];
const board: string[][] = [
  ['p', 'e', 't', 'i'],
  ['i', 'n', 'e', 'm'],
  ['u', 'j', 's', 'r'],
  ['c', 's', 'm', 'e']
];

(async function run() {
  await importWordsToTrie('./words.txt', trie);
  findWords(board);
  console.log(words);
})();

async function importWordsToTrie(wordsFile: string, trie: Trie) {
  console.log('Building trie dictionary...');
  const rl = readline.createInterface({
    input: fs.createReadStream(wordsFile),
    crlfDelay: Infinity
  });

  rl.on('line', (line) => {
    if (line.length > 2) {
      trie.insert(line);
    }
  });

  await once(rl, 'close');
  console.log('Finished building dictionary');
}

function findWords(board: string[][]): void {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const seen: boolean[][] = [
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false, false],
      ];
      dfs(board, i, j, seen, '');
    }
  }
}

function dfs(board: string[][], x: number, y: number, seen: boolean[][], wordSoFar: string): void {
  if (x < 0 || y < 0 || x >= board.length || y >= board[0].length || seen[x][y]) {
    return;
  }

  wordSoFar += board[x][y];
  if (trie.contains(wordSoFar)) {
    words.push(wordSoFar);
  }

  if (trie.isPrefix(wordSoFar)) {
    seen[x][y] = true;
    for (let row = x - 1; row <= x + 1; row++) {
      for (let col = y - 1; col <= y + 1; col++) {
        dfs(board, row, col, seen, wordSoFar);
      }
    }
    seen[x][y] = false;
  }
}
