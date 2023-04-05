use crate::argparse::stdin_reader;
use crate::types::args::LoginArgs;

pub struct LoginParser {}

impl LoginParser {
    pub fn parse_email(email: &Option<String>) -> String {
        stdin_reader::read_email(email)
    }

    pub fn parse_password(password: &Option<String>) -> String {
        stdin_reader::read_password(password)
    }

    pub fn parse(email: &Option<String>, password: &Option<String>) -> LoginArgs {
        LoginArgs {
            email: LoginParser::parse_email(email),
            password: LoginParser::parse_password(password)
        }
    }
}
