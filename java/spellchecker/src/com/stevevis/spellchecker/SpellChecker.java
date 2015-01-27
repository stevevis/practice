package com.stevevis.spellchecker;

import com.stevevis.dictionary.DictionaryFactory;
import com.stevevis.dictionary.IDictionary;
import org.apache.commons.lang3.StringUtils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Steve on 27/01/15.
 * See http://www.twitch.tv/problems/spellcheck
 */
public class SpellChecker {
    private static final String VOWELS = "aeiou";

    private IDictionary dictionary;

    public SpellChecker() {
        this.dictionary = DictionaryFactory.buildDictionary();
    }

    /**
     * Get the best spelling correction for the given word, the following types of spelling mistakes are corrected:
     *
     * - Case (upper/lower) errors: "inSIDE" => "inside"
     * - Repeated letters: "jjoobbb" => "job"
     * - Incorrect vowels: "weke" => "wake"
     *
     * @param word The word to be corrected
     * @return
     */
    public String getSuggestion(String word) {
        // Normalize the word to lower case
        word = word.toLowerCase();

        // Check the word we were given first, in case it is correct
        if (dictionary.contains(word)) {
            return word;
        }

        // Build up a list of possible corrections using the repeated letters rule
        List<String> repeatsRemoved = new ArrayList<String>();
        addRepeatsRemoved(word, 0, repeatsRemoved);

        // Feed each candidate from the repeated letters rule into the vowel replacement function
        List<String> candidates = new ArrayList<String>();
        for (String candidate : repeatsRemoved) {
            addAlternateVowels(candidate, 0, candidates);
        }

        // Check all of our possible corrections against the dictionary
        List<String> suggestions = new ArrayList<String>();
        for (String candidate : candidates) {
            if (dictionary.contains(candidate)) {
                suggestions.add(candidate);
            }
        }

        if (suggestions.size() == 0) {
            return "NO SUGGESTION";
        }

        // Use the Levenshtein distance algorithm (http://en.wikipedia.org/wiki/Levenshtein_distance) to figure out the
        // best suggestion from our list of dictionary suggestions
        String best = "";
        for (String suggestion : suggestions) {
            if (StringUtils.getLevenshteinDistance(word, suggestion) < StringUtils.getLevenshteinDistance(word, best)) {
                best = suggestion;
            }
        }
        return best;
    }

    /**
     * This method figures out any alternate words the given string could be if each vowel is replaced by another vowel.
     * E.g. Strap could be:
     * - Strep
     * - Strop
     * - Strip
     * - Strup
     *
     * @param word The string to generate candidates from
     * @param startAt The index in the string to start searching from
     * @param candidates A list to add the candidate strings to
     */
    private void addAlternateVowels(String word, int startAt, List<String> candidates) {
        for (int i = startAt; i < word.length(); i++) {
            if (VOWELS.indexOf(word.charAt(i)) >= 0) {
                String prefix = word.substring(0, i);
                String postfix = word.substring(i + 1, word.length());

                for (int j = 0; j < VOWELS.length(); j++) {
                    char replacement = VOWELS.charAt(j);
                    String candidate = prefix + replacement + postfix;

                    // Add the candidate to the list before recursing because we prefer candidates with less changes
                    candidates.add(candidate);

                    // Recurse each candidate to check for further vowels
                    addAlternateVowels(candidate, i + 1, candidates);
                }

                return;
            }
        }
    }

    /**
     * This method figures out all the different words the given string could be when the same character does not appear
     * more than twice in a row. E.g. Strrreeeettttt could be:
     * - Stret
     * - Strett
     * - Street
     * - Streett
     * - Strret
     * - Strreet
     * - Strrett
     * - Strreett
     *
     * @param word The string to generate candidates from
     * @param startAt The index in the string to start searching from
     * @param candidates A list to add the candidate strings to
     */
    private void addRepeatsRemoved(String word, int startAt, List<String> candidates) {
        for (int i = startAt + 1; i < word.length(); i++) {
            // Scan forward until we hit a repeated character
            if (word.charAt(i) == word.charAt(i - 1)) {
                char repeat = word.charAt(i);
                int next = i + 1;

                // Scan forward until we hit the next non repeat character, and put that index in 'next'
                while (next < word.length()) {
                    if (word.charAt(next) != repeat) {
                        break;
                    }
                    next++;
                }

                // The contents of the string before the repeated character
                String prefix = word.substring(0, i - 1);

                // Recurse using (prefix + (repeat x 1) + postfix) and (prefix + (repeat x 2) + postfix)
                addRepeatsRemoved(prefix + word.substring(next - 1, word.length()), i, candidates);
                addRepeatsRemoved(prefix + word.substring(next - 2, word.length()), i, candidates);

                return;
            }
        }

        // When there are no more repeat characters in the string, we can add it to our candidate list
        candidates.add(word);
    }

    public static void main(String[] args) throws IOException {
        SpellChecker spellChecker = new SpellChecker();

        InputStreamReader inputStreamReader  = new InputStreamReader(System.in);
        BufferedReader bufferedReader = new BufferedReader(inputStreamReader);
        String input;

        System.out.print("> ");
        while ((input = bufferedReader.readLine()) != null) {
            System.out.println(spellChecker.getSuggestion(input));
            System.out.print("> ");
        }
    }
}
