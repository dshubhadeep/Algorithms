package main

import "fmt"

func isUnique(s string) bool {
	if len(s) > 128 {
		return false
	}

	charSet := make([]bool, 128)

	for _, ch := range s {
		if charSet[ch] {
			return false
		}
		charSet[ch] = true
	}

	return true
}

func main() {
	words := [5]string{"abcde", "hello", "apple", "kite", "padle"}

	for _, word := range words {
		fmt.Printf("%s : %t\n", word, isUnique(word))
	}
}
