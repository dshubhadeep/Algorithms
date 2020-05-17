def check_permutation(s1, s2):
    if len(s1) != len(s2):
        return False

    # char counter
    chars = [0] * 256

    for ch in s1:
        chars[ord(ch)] += 1

    for ch in s2:
        chars[ord(ch)] -= 1
        if (chars[ord(ch)] < 0):
            return False

    return True


wordsList = [["apple", "papel"], ["mango", "orange"], ["aaaa", "aaa"]]

for words in wordsList:
    print("{} : {}".format(words, check_permutation(words[0], words[1])))
