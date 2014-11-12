package com.stevevis.dictionary;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

/**
 * Created by Steve on 13/11/14.
 */
public class DictionaryFactory {
    private static final String WORD_FILE = "words.txt";
    private static final ClassLoader CLASS_LOADER = TrieDictionaryTest.class.getClassLoader();

    public static IDictionary buildDictionary() {
        IDictionary dictionary = new TrieDictionary();

        // Fill the dictionary with words from our word file
        InputStream inputStream = CLASS_LOADER.getResourceAsStream(WORD_FILE);
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream))) {
            reader.lines().forEach(dictionary::add);
        } catch (IOException e){
            System.out.println(e.getMessage());
        }

        return dictionary;
    }
}
