package com.stevevis.dictionary;

/**
 * Created by Steve on 12/11/14.
 */
public class TrieDictionary implements IDictionary {
    private static final int NODE_LIMIT = 26;

    TrieDictionaryNode head;

    TrieDictionary() {
        head = new TrieDictionaryNode(NODE_LIMIT);
    }

    @Override
    public void add(String string) {
        TrieDictionaryNode current = this.head;
        for (char c : string.toLowerCase().toCharArray()) {
            current = current.addChild(c);
        }
        current.isEnd = true;
    }

    @Override
    public boolean contains(String string) {
        TrieDictionaryNode current = this.head;
        for (char c : string.toLowerCase().toCharArray()) {
            current = current.getChild(c);
            if (current == null) {
                return false;
            }
        }
        return current.isEnd;
    }

    @Override
    public boolean isPrefix(String string) {
        TrieDictionaryNode current = this.head;
        for (char c : string.toLowerCase().toCharArray()) {
            current = current.getChild(c);
            if (current == null) {
                return false;
            }
        }
        return current.numChildren > 0;
    }

    @Override
    public void printWords() {
        head.print("");
    }
}
