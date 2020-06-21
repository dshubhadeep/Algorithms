public class Urlify {

    private static void urlify(char[] arr, int trueLength) {
        int index = arr.length;

        for (int i = trueLength - 1; i >= 0; i--) {
            if (arr[i] == ' ') {
                arr[index - 1] = '0';
                arr[index - 2] = '2';
                arr[index - 3] = '%';
                index -= 3;
            } else {
                arr[--index] = arr[i];
            }
        }
    }

    public static void main(String[] args) {
        String str = "Mr John Smith    ";
        char[] arr = str.toCharArray();

        urlify(arr, 13);

        System.out.println("Encoded string : " + new String(arr));
    }

}