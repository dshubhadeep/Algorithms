fn check_permutation(s1: &str,s2: &str) -> bool {
    if s1.len() != s2.len() {
        return false
    }

    let mut chars: [i32;256] = [0;256];

    for ch in s1.chars() {
        chars[ch as usize] += 1;
    }

    for ch in s2.chars() {
        chars[ch as usize] -= 1;
        if chars[ch as usize] < 0 {
            return false
        }
    }

    true
}

fn main() {

    // Probably a better way to do this
    let words: [String;6] = [
        String::from("apple"),
        String::from("papel"),
        String::from("mango"), 
        String::from("orange"), 
        String::from("aaaa"), 
        String::from("aaa")
    ];

    let mut i = 0;

    loop {
        if i >= words.len() {
            break;
        }
        
        println!("{} {} : {}", words[i], words[i+1], check_permutation(&words[i], &words[i+1]));

        i += 2;
    }

}