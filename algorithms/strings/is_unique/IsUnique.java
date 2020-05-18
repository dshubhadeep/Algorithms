import java.util.Arrays;
import java.util.List;

public class IsUnique {

    private static boolean isUnique(String s) {
        if (s.length() > 128)
            return false;

        boolean[] charSet = new boolean[128];

        for (char ch : s.toCharArray()) {
            if (charSet[ch] == true)
                return false;

            charSet[ch] = true;
        }

        return true;
    }

    public static void main(String[] args) {
        List<String> words = Arrays.asList("abcde", "hello", "apple", "kite", "padle");

        for (String word : words)
            System.out.printf("%s : %s\n", word, isUnique(word));
    }

}