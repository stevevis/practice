export default class Trie {
  private isEnd = false;
  private children = new Map<string, Trie>();

  public setIsEnd(): void {
    this.isEnd = true;
  }

  public insert(word: string): void {
    this.throwIfEmptyWord(word);
    const firstChar = this.getFirstChar(word);
    let child = this.children.get(firstChar);

    if (child === undefined) {
      child = new Trie();
      this.children.set(firstChar, child);
    }

    if (word.length > 1) {
      child.insert(word.substring(1));
    } else {
      child.setIsEnd();
    }
  }

  public contains(word: string): boolean {
    this.throwIfEmptyWord(word);
    const firstChar = this.getFirstChar(word);
    const child = this.children.get(firstChar);
    
    if (child === undefined) {
      return false;
    } else if (word.length > 1) {
      return child.contains(word.substring(1));
    } else {
      return child.isEnd;
    }
  }

  public isPrefix(word: string): boolean {
    this.throwIfEmptyWord(word);
    const firstChar = this.getFirstChar(word);
    const child = this.children.get(firstChar);

    if (child === undefined) {
      return false;
    } else if (word.length > 1) {
      return child.isPrefix(word.substring(1));
    } else {
      return child.children.size > 0;
    }
  }

  private throwIfEmptyWord(word: string): void {
    if (word.length < 1) {
      throw new Error('Input word is empty');
    }
  }

  private getFirstChar(word: string): string {
    return word.substring(0, 1).toLowerCase();
  }
}
