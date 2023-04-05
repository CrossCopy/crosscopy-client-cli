use crate::argparse::stdin_reader;
use crate::types::args::RegisterArgs;

pub struct RegisterParser {}

impl RegisterParser {
    pub fn parse_email(email: &Option<String>) -> String {
        stdin_reader::read_email(email)
    }

    pub fn parse_password(password: &Option<String>) -> String {
        stdin_reader::read_password(password)
    }

    pub fn parse(email: &Option<String>, password: &Option<String>) -> RegisterArgs {
        RegisterArgs {
            email: RegisterParser::parse_email(email),
            password: RegisterParser::parse_password(password),
        }
    }
}
