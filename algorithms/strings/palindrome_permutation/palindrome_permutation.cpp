#include <string>
#include <vector>
#include <iostream>

using namespace std;

int getCharNumber(const char &c)
{
    int a = (int)'a';
    int z = (int)'z';
    int val = (int)c;

    if (a <= val && val <= z)
    {
        return val - 'a';
    }

    return -1;
}

vector<int> buildCharFrequencyTable(string phrase)
{
    vector<int> table(getCharNumber('z') - getCharNumber('a') + 1, 0);
    for (char &c : phrase)
    {
        int x = getCharNumber(tolower(c));
        if (x != -1)
        {
            table[x]++;
        }
    }
    return table;
}

bool checkMaxOneOdd(vector<int> &table)
{
    bool foundOdd = false;
    for (auto count : table)
    {
        if (count % 2 == 1)
        {
            if (foundOdd)
            {
                return false;
            }
            foundOdd = true;
        }
    }
    return true;
}

bool isPermutationOfPalindrome(const string &phrase)
{
    vector<int> table = buildCharFrequencyTable(phrase);
    return checkMaxOneOdd(table);
}

int main(int argc, const char *argv[])
{
    string input = "Tact Coa";
    string isPermutation = isPermutationOfPalindrome(input) ? "yes" : "no";
    cout << isPermutation << endl;
    return 0;
}