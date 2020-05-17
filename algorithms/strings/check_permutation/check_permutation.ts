function checkPermutation(s1: string, s2: string): boolean {
    if (s1.length != s2.length) return false;

    let chars: number[] = fill(256, 0);

    for (let i = 0; i < s1.length; i++)
        chars[s1.charCodeAt(i)]++;

    for (let i = 0; i < s2.length; i++) {
        chars[s2.charCodeAt(i)]--;
        if (chars[s2.charCodeAt(i)] < 0)
            return false;
    }

    return true;
}

function fill(len: number, el: number): number[] {
    const arr: number[] = Array(len);
    for (let i = 0; i < len; i++) arr[i] = el;
    return arr;
}

const wordsList = [["apple", "papel"], ["mango", "orange"], ["aaaa", "aaa"]];

for (const words of wordsList)
    console.log(`${words[0]} ${words[1]} : ${checkPermutation(words[0], words[1])}`);
