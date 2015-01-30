package com.stevevis.spellchecker;

import com.stevevis.dictionary.TrieDictionaryTest;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Random;

/**
 * Created by Steve on 30/01/15.
 */
public class SpellCheckerTest {
    private static final int CHANCE_OF_DUPLICATE = 5; // chances out of 100
    private static final int CHANCE_OF_UPPER_CASE = 5; // chances out of 100
    private static final String WORD_FILE = "words.txt";
    private static final ClassLoader CLASS_LOADER = TrieDictionaryTest.class.getClassLoader();

    private int totalTests = 0;
    private int testFailures = 0;

    private SpellChecker spellChecker;
    private Random random;

    public static void main(String[] args) {
        SpellCheckerTest spellCheckerTest = new SpellCheckerTest();

        InputStream inputStream = CLASS_LOADER.getResourceAsStream(WORD_FILE);
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream))) {
            reader.lines().forEach(spellCheckerTest::testWord);
        } catch (IOException e){
            System.out.println(e.getMessage());
        }

        System.out.println(String.format("Finished spell checked test: %d tests failed out of %d total tests",
                spellCheckerTest.testFailures, spellCheckerTest.totalTests));
    }

    public SpellCheckerTest() {
        this.spellChecker = new SpellChecker();
        this.random = new Random();
    }

    private void testWord(String word) {
        String test = errorizeWord(word);
        String suggestion = spellChecker.getSuggestion(test);
        this.totalTests++;

        if (suggestion.equals(SpellChecker.NO_SUGGESTION)) {
            System.out.println("Test failed! Did not find a suggestion for '" + test + "' (original word was '" + word + "')");
            this.testFailures++;
        }
    }

    private String errorizeWord(String word) {
        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < word.length(); i++) {
            char current = word.charAt(i);

            // If the current character is a vowel, substitute it for a random vowel (possibly the same vowel)
            if (SpellChecker.VOWELS.indexOf(current) != -1) {
                current = SpellChecker.VOWELS.charAt(random.nextInt(SpellChecker.VOWELS.length()));
            }

            // If the random number is less than the chance of upper case, convert current to upper case
            int rand = random.nextInt(100);
            if (rand < CHANCE_OF_UPPER_CASE) {
                current = Character.toUpperCase(current);
            }

            // Append the current char to the string builder
            sb.append(current);

            // If the random number is less than the chance of duplicate, we need to add duplicate character(s)
            rand = random.nextInt(100);
            if (rand < CHANCE_OF_DUPLICATE) {
                // Add a random number of duplicate characters to the string builder
                rand = random.nextInt(6) + 1;
                for (int j = 0; j < rand; j++) {
                    sb.append(current);
                }
            }
        }

        return sb.toString();
    }
}
