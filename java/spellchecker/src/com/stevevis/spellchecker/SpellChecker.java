package com.stevevis.spellchecker;

import com.stevevis.dictionary.DictionaryFactory;
import com.stevevis.dictionary.IDictionary;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.text.WordUtils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by Steve on 27/01/15.
 * See http://www.twitch.tv/problems/spellcheck
 */
public class SpellChecker {
    public static final String VOWELS = "aeiou";
    public static final String NO_SUGGESTION = "NO SUGGESTION!";

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
        // Check the word we were given first, in case it is correct
        if (dictionary.contains(word)) {
            return word;
        }

        // Normalize the word to lower case
        word = word.toLowerCase();

        Set<String> candidates = new HashSet<String>();

        // Build up a list of possible corrections using the repeated letters rule
        addRepeatPermutations(word, 0, candidates);

        // Also add a version of each candidate with the first letter capitalized, in case of proper noun
        addProperNounCandidates(candidates);

        // Add the vowel permutations for each existing candidate suggestion
        Set<String> vowelPermutations = new HashSet<String>();
        for (String candidate : candidates) {
            addVowelPermutations(candidate, 0, vowelPermutations);
        }
        candidates.addAll(vowelPermutations);

        // Check all of our possible corrections against the dictionary
        Set<String> suggestions = new HashSet<String>();
        for (String candidate : candidates) {
            if (dictionary.contains(candidate)) {
                suggestions.add(candidate);
            }
        }

        if (suggestions.size() == 0) {
            return NO_SUGGESTION;
        }

        return getBestSuggestion(word, suggestions);
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
    private void addVowelPermutations(String word, int startAt, Set<String> candidates) {
        for (int i = startAt; i < word.length(); i++) {
            if (VOWELS.indexOf(word.charAt(i)) >= 0) {
                String prefix = word.substring(0, i);
                String postfix = word.substring(i + 1, word.length());

                for (int j = 0; j < VOWELS.length(); j++) {
                    char replacement = VOWELS.charAt(j);
                    String candidate = prefix + replacement + postfix;

                    // If the prefix + replacement is not an actual word there is no point continuing down this branch
                    if (!dictionary.isPrefix(prefix + replacement)) {
                        continue;
                    }

                    // Add the candidate to the list before recursing because we prefer candidates with less changes
                    candidates.add(candidate);

                    // Recurse each candidate to check for further vowels
                    addVowelPermutations(candidate, i + 1, candidates);
                }

                return;
            }
        }
    }

    /**
     * This method detects repeated characters within the word and adds all permutations of the number of characters
     * repeated in each sequence of repeated characters to the candidate set. E.g. for wyynn it would add:
     * - wyynn
     * - wyyn
     * - wynn
     * - wyn
     *
     * @param word
     * @param startAt
     * @param candidates
     */
    private void addRepeatPermutations(String word, int startAt, Set<String> candidates) {
        for (int i = startAt + 1; i < word.length(); i++) {
            // Scan forward until we hit a repeated character
            if (word.charAt(i) == word.charAt(i - 1)) {
                char repeat = word.charAt(i);
                int countRepeats = 1;

                // Count how many times this character is repeated in a row
                for (int j = i; j < word.length(); j++) {
                    if (word.charAt(j) == repeat) {
                        countRepeats++;
                    } else {
                        break;
                    }
                }

                // Get the prefix and postfix to the sequence of repeated characters
                String prefix = word.substring(0, i - 1);
                String postfix = "";
                if (i - 1 + countRepeats < word.length()) {
                    postfix = word.substring(i - 1 + countRepeats, word.length());
                }

                // Build the permutations for number of repeated characters and recurse for each one
                for (int j = 1; j <= countRepeats; j++) {
                    StringBuilder sb = new StringBuilder();
                    sb.append(prefix);
                    for (int k = 0; k < j; k++) {
                        sb.append(repeat);
                    }
                    sb.append(postfix);
                    addRepeatPermutations(sb.toString(), i + j - 1, candidates);
                }

                return;
            }
        }

        // When there are no more repeat characters in the string, we can add it to our candidate list
        candidates.add(word);
    }

    /**
     * For each word in the candidates set, add a capitalized version e.g for street add Street.
     *
     * @param candidates
     */
    private void addProperNounCandidates(Set<String> candidates) {
        Set<String> capitalizedCandidates = new HashSet<String>();

        for (String candidate : candidates) {
            capitalizedCandidates.add(WordUtils.capitalize(candidate));
        }

        candidates.addAll(capitalizedCandidates);
    }

    /**
     * Use the Levenshtein distance algorithm (http://en.wikipedia.org/wiki/Levenshtein_distance) to figure out the best
     * suggestion from our list of dictionary suggestions.
     *
     * @param word
     * @param suggestions
     * @return
     */
    private String getBestSuggestion(String word, Set<String> suggestions) {
        String best = "";
        for (String suggestion : suggestions) {
            if (StringUtils.getLevenshteinDistance(word, suggestion) < StringUtils.getLevenshteinDistance(word, best)) {
                best = suggestion;
            }
        }
        return best;
    }

    private void printCandidates(Set<String> candidates) {
        System.out.println("All candidates:");
        for (String candidate : candidates) {
            System.out.println(candidate);
        }
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
