function isUnique(s: string): boolean {
    if (s.length > 128) return false;

    const char_set: boolean[] = fill(128, false);

    for (let i = 0; i < s.length; i++) {
        if (char_set[s.charCodeAt(i)])
            return false;

        char_set[s.charCodeAt(i)] = true;
    }

    return true;
}

function fill(len: number, val: boolean): boolean[] {
    const arr: boolean[] = Array(len);
    for (let i = 0; i < len; i++) arr[i] = val;
    return arr;
}

const words = ["abcde", "hello", "apple", "kite", "padle"];

for (const word of words)
    console.log(`${word} : ${isUnique(word)}`);

