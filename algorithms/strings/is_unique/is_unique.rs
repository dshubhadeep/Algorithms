fn is_unique(s: &str) -> bool {
    if s.len() > 128 {
        return false
    }

    let mut char_set: [bool;128] = [false;128];

    for ch in s.chars() {
        if char_set[ch as usize] {
            return false;
        }
        
        char_set[ch as usize] = true;
    }

    true
}


fn main() {

    let words: [String;5] = [
        String::from("abcde"),
        String::from("hello"),
        String::from("apple"), 
        String::from("kite"), 
        String::from("padle")    
    ];

    for word in words.iter() {
        println!("{} : {}", word,is_unique(&word));
    }

}