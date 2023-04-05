use std::io::{Error, ErrorKind};
use regex::Regex;

pub fn validate_email(email: &str) -> Result<(), Error> {
    let re = Regex::new(r"^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$").unwrap();
    if !re.is_match(email) {
        Err(Error::new(ErrorKind::InvalidInput, "Invalid Email"))
    } else {
        Ok(())
    }
}

/// Validate password, return Error if failed, return Ok() if success
pub fn validate_password(password: &str) -> Result<(), Error> {
    let re = Regex::new(r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$")
        .unwrap();
    if password.len() < 8 {
        Err(Error::new(
            ErrorKind::InvalidInput,
            "Password must be longer than 8 characters.",
        ))
    } else if !re.is_match(password) {
        Err(Error::new(
            ErrorKind::InvalidInput,
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
        ))
    } else {
        Ok(())
    }
}
