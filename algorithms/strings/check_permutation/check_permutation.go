package main

import "fmt"

func checkPermutation(s1 string, s2 string) bool {
	if len(s1) != len(s2) {
		return false
	}

	chars := make([]int, 256)

	for _, ch := range s1 {
		chars[int(ch)]++
	}

	for _, ch := range s2 {
		chars[int(ch)]--
		if chars[int(ch)] < 0 {
			return false
		}
	}

	return true
}

func main() {

	words := [6]string{"apple", "papel", "mango", "orange", "aaaa", "aaa"}

	for i := 0; i < len(words); i += 2 {
		first := words[i]
		second := words[i+1]

		fmt.Printf("%s %s : %t\n", first, second, checkPermutation(first, second))
	}

}
