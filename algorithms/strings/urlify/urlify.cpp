#include <iostream>
using namespace std;

void urlify(char *arr, int true_length)
{
    int actual_idx = sizeof(arr) / sizeof(arr[0]);

    for (int i = true_length - 1; i >= 0; i--)
    {
        if (arr[i] == ' ')
        {
            arr[actual_idx - 1] = '0';
            arr[actual_idx - 2] = '2';
            arr[actual_idx - 3] = '%';
            actual_idx -= 3;
        }
        else
        {
            arr[--actual_idx] = arr[i];
        }
    }
}

int main()
{
    char str[] = "Mr John Smith    ";
    urlify(str, 13);

    cout << "Encoded string : " << str << "\n";

    return 0;
}