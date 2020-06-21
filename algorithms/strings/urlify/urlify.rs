// TODO Try to do in-place

fn urlify(s: &str, _true_len: u8) -> String {
    let encoded_str = s.trim().replace(" ", "%20");
    return encoded_str;
}

fn main() {
    let s = String::from("Mr John Smith    ");

    let encoded_str = urlify(&s, 13);
    println!("Encoded string : {}", encoded_str);
}