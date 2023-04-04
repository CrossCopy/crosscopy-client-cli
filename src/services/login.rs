
use crate::services::types::Service;

pub struct LoginService {
    pub email: String,
    pub password: String,
}

impl Service for LoginService {
    fn run(&self) {
        // todo!()
    }
}