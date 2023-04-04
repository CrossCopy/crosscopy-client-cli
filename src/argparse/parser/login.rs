use crate::argparse::stdin_reader;

pub struct LoginParser {}

impl LoginParser {
    pub fn parse_email(email: &Option<String>) -> String {
        stdin_reader::read_email(email)
    }

    pub fn parse_password(password: &Option<String>) -> String {
        stdin_reader::read_password(password)
    }
}
