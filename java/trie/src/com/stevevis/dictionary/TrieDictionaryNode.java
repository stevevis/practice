package com.stevevis.dictionary;

/**
 * Created by Steve on 12/11/14.
 */
public class TrieDictionaryNode {
    boolean isEnd;
    int numChildren;
    TrieDictionaryNode[] children;

    TrieDictionaryNode(int size) {
        this.isEnd = false;
        this.numChildren = 0;
        this.children = new TrieDictionaryNode[size];
    }

    /**
     * Add a new child node to this trie node for the given character.
     *
     * @param value
     * @return
     */
    TrieDictionaryNode addChild(char value) {
        TrieDictionaryNode result = this;
        int numeric = value;

        if (this.children[numeric] == null) {
            result = new TrieDictionaryNode(this.children.length);
            this.children[numeric] = result;
            this.numChildren += 1;
        } else {
            result = this.children[numeric];
        }

        return result;
    }

    /**
     * Return the child node for the given character, if it exist.
     *
     * @param value
     * @return
     */
    TrieDictionaryNode getChild(char value) {
        TrieDictionaryNode result = null;
        int numeric = value;

        if (this.children[numeric] != null) {
            result = this.children[numeric];
        }

        return result;
    }

    /**
     * Print all words under this node.
     *
     * @param word
     */
    void print(String word) {
        if (this.isEnd) {
            System.out.println(word);
        }

        for (int i = 0; i < this.children.length; i++) {
            String prefix = word;
            if (this.children[i] != null) {
                prefix = prefix + (char)i;
                this.children[i].print(prefix);
            }
        }
    }
}
