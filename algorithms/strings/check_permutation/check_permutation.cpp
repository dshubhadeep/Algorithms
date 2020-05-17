#include <iostream>
#include <vector>
#include <string>
using namespace std;

bool check_permutation(string s1, string s2)
{
    if (s1.length() != s2.length())
        return false;

    vector<int> chars(256, 0);

    for (size_t i = 0; i < s1.length(); i++)
        chars[s1[i]]++;

    for (size_t i = 0; i < s2.length(); i++)
    {
        chars[s2[i]]--;
        if (chars[s2[i]] < 0)
            return false;
    }

    return true;
}

int main()
{
    vector<string> wordsVec{"apple", "papel", "mango", "orange", "aaaa", "aaa"};

    for (size_t i = 0; i < wordsVec.size(); i += 2)
    {
        string first = wordsVec[i];
        string second = wordsVec[i + 1];
        cout << first << " " << second << " : " << (check_permutation(first, second) ? "true" : "false") << endl;
    }

    return 0;
}