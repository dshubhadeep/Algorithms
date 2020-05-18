#include <iostream>
#include <string>
#include <vector>
using namespace std;

bool is_unique(string s)
{
    if (s.length() > 128)
        return false;

    vector<bool> char_set(128, false);

    for (char ch : s)
    {
        if (char_set[(int)ch])
            return false;

        char_set[(int)ch] = true;
    }

    return true;
}

int main()
{
    vector<string> words{"abcde", "hello", "apple", "kite", "padle"};

    for (string word : words)
        cout << word << " : " << (is_unique(word) ? "true" : "false") << endl;

    return 0;
}