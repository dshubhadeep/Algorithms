def is_unique(s):
    if len(s) > 128:
        return False

    char_set = [False] * 128

    for ch in s:
        if char_set[ord(ch)]:
            return False

        char_set[ord(ch)] = True

    return True


words = ["abcde", "hello", "apple", "kite", "padle"]

for word in words:
    print("{} : {}".format(word, is_unique(word)))
