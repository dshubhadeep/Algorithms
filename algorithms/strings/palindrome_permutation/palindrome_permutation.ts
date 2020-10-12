function checkPalindromPermutation(str: string): boolean {
    const charSet = new Set<string>();
    str = str.toLowerCase();

    for (const ch of str) {
        if (ch !== ' ') {
            if (charSet.has(ch))
                charSet.delete(ch);
            else
                charSet.add(ch);
        }
    }

    return charSet.size <= 1;
}

console.log(checkPalindromPermutation('Tact Coa'));