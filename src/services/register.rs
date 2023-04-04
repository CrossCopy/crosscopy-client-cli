use crate::services::types::Service;

pub struct RegisterService {
    pub email: String,
    pub password: String,
}

impl Service for RegisterService {
    fn run(&self) {
        todo!()
    }
}