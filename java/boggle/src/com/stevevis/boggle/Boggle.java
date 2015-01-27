package com.stevevis.boggle;

import com.stevevis.dictionary.DictionaryFactory;
import com.stevevis.dictionary.IDictionary;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.TimeUnit;

/**
 * Created by Steve on 12/11/14.
 */
public class Boggle {
    private static final int BOARD_SIZE = 4;

    private IDictionary dictionary;
    private char[][] board = new char[BOARD_SIZE][BOARD_SIZE];
    private List<String> words;

    public Boggle() {
        dictionary = DictionaryFactory.buildDictionary();
        initBoard();
    }

    private void initBoard() {
        Random r = new Random();
        for (int i = 0; i < BOARD_SIZE; i++) {
            for (int j = 0; j < BOARD_SIZE; j++) {
                board[i][j] = (char) (r.nextInt(26) + 'a');
            }
        }
    }

    public void printBoard() {
        for (int i = 0; i < BOARD_SIZE; i++) {
            for (int j = 0; j < BOARD_SIZE; j++) {
                System.out.print(board[i][j]);
                System.out.print(' ');
            }
            System.out.print('\n');
        }
    }

    public void printWords() {
        words = new ArrayList<String>();

        for (int i = 0; i < BOARD_SIZE; i++) {
            for (int j = 0; j < BOARD_SIZE; j++) {
                boolean[][] visited = new boolean[BOARD_SIZE][BOARD_SIZE];
                visited[i][j] = true;
                dfs(i, j, "", visited);
            }
        }

        System.out.println("Found " + words.size() + " words");
        for (String word : words) {
            System.out.println(word);
        }
    }

    /*
     * Perform a depth first search of the boggle board starting at the given location, adding dictionary words to our
     * list as we find them.
     */
    private void dfs(int x, int y, String current, boolean[][] visited) {
        String word = current + String.valueOf(board[x][y]);

        if (word.length() > 2 && dictionary.contains(word)) {
            words.add(word);
        }

        if (dictionary.isPrefix(word)) {
            for (int i = (x - 1 >= 0 ? x - 1 : 0); i <= (x + 1 < BOARD_SIZE ? x + 1 : x); i++) {
                for (int j = (y - 1 >= 0 ? y - 1 : 0); j <= (y + 1 < BOARD_SIZE ? y + 1 : y); j++) {
                    if (!visited[i][j]) {
                        visited[i][j] = true;
                        dfs(i, j, word, visited);
                        visited[i][j] = false;
                    }
                }
            }
        }
    }

    public static void main(String[] args) {
        Boggle boggle = new Boggle();
        boggle.printBoard();

        final long start = System.nanoTime();
        boggle.printWords();
        final long durationMillis = TimeUnit.NANOSECONDS.toMillis(System.nanoTime() - start);
        System.out.println("Took " + durationMillis + "ms to complete boggle!");
    }
}
