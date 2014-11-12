package com.stevevis.dictionary;

/**
 * Created by Steve on 12/11/14.
 */
public interface IDictionary {
    /**
     * Add a word to the dictionary.
     *
     * @param string
     */
    public void add(String string);

    /**
     * Returns true if the dictionary contains the given word, otherwise false.
     *
     * @param string
     * @return
     */
    public boolean contains(String string);

    /**
     * Returns true if the given string is the start of a word in the dictionary, otherwise false. If the string is a
     * complete word and not the start of another word, this method will return false.
     *
     * @param string
     * @return
     */
    public boolean isPrefix(String string);

    /**
     * Print the contents of the dictionary to stdout.
     */
    public void printWords();
}
