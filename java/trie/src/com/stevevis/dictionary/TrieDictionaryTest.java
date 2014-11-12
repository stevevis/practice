package com.stevevis.dictionary;

/**
 * Created by Steve on 13/11/14.
 */
public class TrieDictionaryTest {
    IDictionary dictionary;

    TrieDictionaryTest() {
        dictionary = DictionaryFactory.buildDictionary();
    }

    void testContains() {
        System.out.println("Dictionary contains Abelmoschus: " + (dictionary.contains("Abelmoschus") ? "Passed" : "Failed"));
        System.out.println("Dictionary does not contain Abelmoschusus: " + (!dictionary.contains("Abelmoschusus") ? "Passed" : "Failed"));
        System.out.println("Dictionary does not contain Abip: " + (!dictionary.contains("Abip") ? "Passed" : "Failed"));
    }

    void testIsPrefix() {
        System.out.println("Abip is prefix in dictionary: " + (dictionary.isPrefix("Abip") ? "Passed" : "Failed"));
        System.out.println("Abelma is not a prefix in dictionary: " + (!dictionary.isPrefix("Abelma") ? "Passed" : "Failed"));
        System.out.println("Abelmoschus is not a prefix in dictionary: " + (!dictionary.isPrefix("Abelmoschus") ? "Passed" : "Failed"));
    }

    public static void main(String[] args) {
        TrieDictionaryTest test = new TrieDictionaryTest();
        test.testContains();
        test.testIsPrefix();
    }
}
