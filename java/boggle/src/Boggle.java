import com.stevevis.dictionary.DictionaryFactory;
import com.stevevis.dictionary.IDictionary;

import java.util.Random;

/**
 * Created by Steve on 12/11/14.
 */
public class Boggle {
    private static final int BOARD_SIZE = 5;

    private IDictionary dictionary;
    private char[][] board = new char[BOARD_SIZE][BOARD_SIZE];

    public Boggle() {
        dictionary = DictionaryFactory.buildDictionary();
        initBoard();
        printWords();
    }

    private void initBoard() {
        Random r = new Random();
        for (int i = 0; i < BOARD_SIZE; i++) {
            for (int j = 0; j < BOARD_SIZE; j++) {
                board[i][j] = (char) (r.nextInt(26) + 'a');
            }
        }
    }

    private void printWords() {
        // TODO Play the game!
    }

    public static void main(String[] args) {
        Boggle boggle = new Boggle();
    }
}
