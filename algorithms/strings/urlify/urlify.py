def urlify(str, true_len):
    actual_idx = len(str)
    arr = list(str)

    for i in reversed(range(true_len)):
        if arr[i] == ' ':
            arr[actual_idx-3:actual_idx] = '%20'
            actual_idx -= 3
        else:
            arr[actual_idx - 1] = arr[i]
            actual_idx -= 1

    return ''.join(arr)


str = "Mr John Smith    "
encoded_str = urlify(str, 13)
print("Encoded string : {}".format(encoded_str))
