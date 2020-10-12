def palindrome_permutation(phrase):
    phrase = phrase.lower()
    table = [0 for _ in range(ord('z') - ord('a') + 1)]
    countodd = 0
    for c in phrase:
        x = char_number(c)
        if x != -1:
            table[x] += 1
            if table[x] % 2:
                countodd += 1
            else:
                countodd -= 1

    return countodd <= 1


def char_number(c):
    a = ord('a')
    z = ord('z')
    val = ord(c)

    if a <= val <= z:
        return val - a

    return -1


print(palindrome_permutation("Tact Coa"))
