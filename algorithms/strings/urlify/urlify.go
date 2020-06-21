package main

import "fmt"

func urlify(s string, trueLen int) string {
	arr := []byte(s)
	actualIdx := len(arr)

	for i := trueLen - 1; i >= 0; i-- {
		if arr[i] == ' ' {
			arr[actualIdx-1] = '0'
			arr[actualIdx-2] = '2'
			arr[actualIdx-3] = '%'
			actualIdx -= 3
		} else {
			arr[actualIdx-1] = arr[i]
			actualIdx--
		}
	}

	return string(arr)
}

func main() {
	str := "Mr John Smith    "

	encodedStr := urlify(str, 13)
	fmt.Println("Encoded str : ", encodedStr)
}
