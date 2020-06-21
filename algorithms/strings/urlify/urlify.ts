function urlify(str: string, true_len: number): string {
    let actualIdx = str.length;
    const arr = str.split('');

    for (let i = true_len - 1; i >= 0; i--) {
        if (arr[i] == ' ') {
            arr[actualIdx - 1] = '0';
            arr[actualIdx - 2] = '2';
            arr[actualIdx - 3] = '%';
            actualIdx -= 3;
        } else {
            arr[--actualIdx] = arr[i];
        }
    }

    return arr.join('');
}

const str = "Mr John Smith    ";
const encoded_str = urlify(str, 13);
console.log(`Encoded string : ${encoded_str}`);