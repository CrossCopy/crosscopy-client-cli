// The function we want to test
fn add_numbers(a: i32, b: i32) -> i32 {
    a + b
}

// The test function
#[test]
fn test_add_numbers() {
    assert_eq!(add_numbers(2, 2), 4);
    assert_eq!(add_numbers(0, 0), 0);
    assert_eq!(add_numbers(-5, 5), 0);
}
