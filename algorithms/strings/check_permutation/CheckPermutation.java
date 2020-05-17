import java.util.Arrays;
import java.util.List;

public class CheckPermutation {

    private static boolean checkPermutation(String s1, String s2) {
        if (s1.length() != s2.length())
            return false;

        int[] chars = new int[256];

        for (char ch : s1.toCharArray())
            chars[ch]++;

        for (char ch : s2.toCharArray()) {
            chars[ch]--;
            if (chars[ch] < 0)
                return false;
        }

        return true;
    }

    public static void main(String[] args) {
        List<String> wordsList = Arrays.asList("apple", "papel", "mango", "orange", "aaaa", "aaa");

        for (int i = 0; i < wordsList.size(); i += 2) {
            String first = wordsList.get(i);
            String second = wordsList.get(i + 1);

            System.out.println(String.format("%s %s : %s", first, second, checkPermutation(first, second)));
        }
    }

}