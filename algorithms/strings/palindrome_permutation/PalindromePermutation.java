import java.util.*;

public class PalindromePermutation {

    private static int getCharNumber(Character c) {
        int a = Character.getNumericValue('a');
        int z = Character.getNumericValue('z');

        int val = Character.getNumericValue(c);
        if (a <= val && val <= z) {
            return val - a;
        }
        return -1;
    }

    private static int[] buildCharFrequencyTable(String str) {
        int[] table = new int[Character.getNumericValue('z') - Character.getNumericValue('a') + 1];
        for (char c : str.toCharArray()) {
            int x = getCharNumber(c);
            if (x != -1) {
                table[x]++;
            }
        }
        return table;
    }

    private static boolean checkPalindromePermutation(String str) {
        int[] table = buildCharFrequencyTable(str.toLowerCase());

        boolean foundOdd = false;
        for (int count : table) {
            if (count % 2 == 1) {
                if (foundOdd) {
                    return false;
                }
                foundOdd = true;
            }
        }
        return true;
    }

    public static void main(String[] args) {
        String str = "Tact Coa";
        System.out.println(checkPalindromePermutation(str));
    }

}
